import { createClient } from "@/app/utils/supabase/server";
import { SubscriptionConfirmationTemplate } from "@/components/email/subscription-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    user_id,
    venue_id,
    playing_date_and_time,
    type,
    email,
    venue_name,
    venue_address,
    first_name,
  } = await request.json();
  try {
    if (!user_id || !venue_id || !playing_date_and_time || !type) {
      if (!user_id) {
        return NextResponse.json(
          {
            status: false,
            message: "User id not provided . Un-Authunticated",
          },
          { status: 402 }
        );
      }
      return NextResponse.json(
        {
          status: false,
          message: "Subscription details not provided",
        },
        { status: 404 }
      );
    }

    //MAKE THE SUBSCRIPTION FOR 30 DAYS
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const { data, error } = await supabase
      .from("subscription")
      .insert({
        user_id,
        venue_id,
        playing_date_and_time,
        type,
        end_date: endDate,
      })
      .select()
      .single();

    console.log("Suubscibtion made succesfully in database");

    resend.emails.send({
      from: "Fun Circle <noreply@funcircleapp.com>",
      to: [email],
      subject: `Your subscription has been confirmed`,
      react: await SubscriptionConfirmationTemplate({
        venue_id,
        playing_date_and_time,
        type,
        venue_name,
        venue_address,
        customer_name: first_name,
        customer_email: email,
      }),
    });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Subscription Cannot be created",
          error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Subscription Created Succesfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected Error occured",
        error,
      },
      { status: 501 }
    );
  }
}
