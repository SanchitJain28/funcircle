import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ticketid = request.nextUrl.searchParams.get("ticket-id");
  const orderid = request.nextUrl.searchParams.get("order-id");
  try {
    const supabase = await createClient();

    //FETCH DYNAMIC TICKET

    const ticket = await supabase
      .from("tickets")
      .select(`*,venueid(*)`)
      .eq("id", ticketid)
      .single();

    if (ticket.error) {
      return NextResponse.json(
        {
          status: false,
          message: "Ticket cannot be fetched",
        },
        { status: 403 }
      );
    }

    //fetch ORDER
    const order = await supabase
      .from("orders")
      .select(`created_at,status`)
      .eq("id", orderid)
      .single();

      if(order.error){
        return NextResponse.json(
            {
              status: false,
              message: "Order cannot be fetched",
            },
            { status: 403 }
          );
      }
      return NextResponse.json(
        {
          status: true,
          ticket: ticket.data,
          order: order.data
        },
        { status: 201 }
      );

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
