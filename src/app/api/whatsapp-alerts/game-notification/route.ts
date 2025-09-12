import { createClient } from "@/app/utils/supabase/server";
import { adminAuth } from "@/lib/firebase-admin";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Invalid or empty JSON body",
        code: "INVALID_JSON",
      },
      { status: 400 }
    );
  }
  const { user_id, ticket_id } = body;
  if (!user_id) {
    return NextResponse.json(
      {
        status: false,
        message: "user_id is required",
        code: "USER_ID_REQUIRED",
        error: {
          message: "Please provide an user id",
        },
      },
      {
        status: 404,
      }
    );
  }

  if (!ticket_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Venue Location was Not provided",
        code: "VENUE_LOCATION_REQUIRED",
        error: {
          message: "Please provide an Venue Location",
        },
      },
      {
        status: 404,
      }
    );
  }

  try {
    const supabase = await createClient();
    const userRecord = await adminAuth.getUser(user_id);

    const { data: ticketdata, error: TicketError } = await supabase
      .from("tickets")
      .select("*,venueid(*)")
      .eq("id", ticket_id)
      .single();


    if (TicketError) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured (TICKET ERROR) !!",
          code: "DATABASE_ERROR_OCCURED",
          error: TicketError,
        },
        {
          status: 403,
        }
      );
    }

    const venueParameter = {
      type: "text",
      text: ticketdata.venueid.venue_name,
    };

    const levelParameter = {
      type: "text",
      text: ticketdata.title,
    };

    const buttonParameter = {
      type: "text",
      text: String(ticket_id),
    };

    const bodyParameters = [venueParameter, levelParameter];
    const buttonParameters = [buttonParameter];

    const whatsappApiRequestBody = {
      messaging_product: "whatsapp",
      to: "+919650296375",
      type: "template",
      template: {
        name: "game_notification",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: bodyParameters,
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: buttonParameters,
          },
        ],
      },
    };

    const { data } = await axios.post(
      `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      whatsappApiRequestBody,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      {
        status: true,
        message: `Message sent to ${userRecord.uid} and ${userRecord.displayName} and ${userRecord.phoneNumber}`,
        data,
        code: "SUCCESS",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
        error,
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
