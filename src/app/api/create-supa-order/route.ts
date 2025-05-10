import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    user_id,
    total_price,
    status,
    paymentid,
    // ticked_id,
    // ticket_quantity,
  } = await request.json();
  try {
    //CREATE A ORDER IN SUPABASE
    const supabase = await createClient();
    const { error } = await supabase.from("orders").insert({
      user_id,
      total_price,
      status,
      paymentid,
    });
    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error Creating Order in Supabase",
          error,
        },
        { status: 401 }
      );
    }

    //AFTER ORDER CREATION UPDATE THE TICKET TABLE

    // const response = await supabase
    //   .from("tickets")
    //   .update({})
    //   .increment("bookedtickets", 1);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected Internal Servor error occured",
      },
      { status: 501 }
    );
  }
}
