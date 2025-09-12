import { createClient } from "@/app/utils/supabase/server";
import { adminAuth } from "@/lib/firebase-admin";
import { formatDateAndTime } from "@/utils/FormatDateAndTime";
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
  const { order_id } = body;

  if (!order_id) {
    return NextResponse.json(
      {
        status: false,
        message: "order-id was Not provided",
        code: "ORDER_ID_REQUIRED",
        error: {
          message: "Please provide an order-id",
        },
      },
      {
        status: 404,
      }
    );
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .rpc("get_order_with_ticket", { order_id_input: order_id })
      .single();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryData = data as any;

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured (TICKET ERROR) !!",
          code: "DATABASE_ERROR_OCCURED",
          error: error,
        },
        {
          status: 403,
        }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userRecord = await adminAuth.getUser((data as any).userid);
    if (!userRecord) {
      return NextResponse.json(
        {
          status: false,
          message: "User Not Found",
          code: "USER_NOT_FOUND",
          error: {
            message: "User Not Found",
          },
        },
        {
          status: 404,
        }
      );
    }

    const start = formatDateAndTime(queryData.ticket.startdatetime);
    const end = formatDateAndTime(queryData.ticket.enddatetime);

    const dateString = `${start.dayName}, ${start.day} ${start.monthName}, ${start.hours12}${start.ampm}-${end.hours12}${end.ampm}`;

    const ticketName = queryData.ticket.title;
    const ticketLocation = queryData.ticket.venue.venue_name;
    const ticketDate = dateString;

    const ticketInfoParameter = {
      type: "text",
      text: ticketName + " at " + ticketLocation + "," + ticketDate,
    };

    const numberOfSlotsParameter = {
      type: "text",
      text: queryData.quantity,
    };

    const bodyParameters = [ticketInfoParameter,numberOfSlotsParameter];

    const whatsappApiRequestBody = {
      messaging_product: "whatsapp",
      to: "+919650296375",
      type: "template",
      template: {
        name: "booking_confirmed_me",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: bodyParameters,
          },
        ],
      },
    };

    const { data: whatsappApiResponse } = await axios.post(
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
        whatsappApiResponse,
        code: "SUCCESS",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
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
