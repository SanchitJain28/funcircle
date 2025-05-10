import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    user_id,
    total_price,
    status,
    paymentid,
    ticket_id,
    ticket_quantity,
    ticket_price,
  } = await request.json();
  try {
    //CREATE A ORDER IN SUPABASE
    const supabase = await createClient();
    const orderResponse = await supabase
      .from("orders")
      .insert({
        user_id,
        total_price,
        status,
        paymentid,
      })
      .select("id") // 👈 This fetches the newly inserted `id`
      .single();
    if (orderResponse.error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error Creating Order in Supabase",
          error: orderResponse.error,
        },
        { status: 401 }
      );
    }
    console.log("ORDER CREATED");

    const orderId = orderResponse.data.id;

    //AFTER ORDER CREATION UPDATE THE TICKET TABLE
    console.log(ticket_id,ticket_quantity)
    const response = await supabase.rpc("increment_bookedtickets", {
      ticket_id: ticket_id,
      increment_by: ticket_quantity,
    });
    
    if (response.error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error Updating the ticket row , Tickets table not updated",
          error: response.error,
        },
        { status: 401 }
      );
    }

    console.log("INCREMENT HAPPENED");

    //AFTER UPDAING TICKET UPDATE ORDER ITEMS

    const orderItemsResponse = await supabase.from("Orderitems").insert({
      order_id: orderId,
      ticket_id: ticket_id,
      quantity: ticket_quantity,
      sub_price: ticket_price,
      userid: user_id,
    });

    if (orderItemsResponse.error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error Creating Order Items",
          error: orderItemsResponse.error,
        },
        { status: 401 }
      );
    }

    console.log("ALL TASKS HAPPENED SUCCESFULLy");

    //ALL THE THREE THINGS HAPPENED NOW FINAL
    return NextResponse.json(
      {
        status: true,
        message: "Succesful",
        orderId,
        quantity:ticket_quantity
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
