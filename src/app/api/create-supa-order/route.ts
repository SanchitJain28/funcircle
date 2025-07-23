import { EmailTemplate } from "@/components/email/email-template";
import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderData {
  user_id: string;
  total_price: number;
  status: string;
  paymentid: string;
  ticket_name: string;
  ticket_id: string;
  ticket_quantity: number;
  ticket_price: number;
  email: string;
  name: string;
  phoneNumber: string;
  location: string;
  map_link: string;
}

export async function POST(request: NextRequest) {
  const orderData: OrderData = await request.json();
  const {
    user_id,
    total_price,
    status,
    paymentid,
    ticket_name,
    ticket_id,
    ticket_quantity,
    ticket_price,
    email,
    name,
    phoneNumber,
    location,
    map_link,
  } = orderData;

  // Input validation
  if (!paymentid || !user_id || !ticket_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Missing required fields: paymentid, user_id, or ticket_id",
      },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  try {
    // First, try to find existing order by payment ID
    const existingOrderQuery = await supabase
      .from("orders")
      .select("id, user_id")
      .eq("paymentid", paymentid)
      .single();

    if (existingOrderQuery.data && !existingOrderQuery.error) {
      console.log(`Order already exists for payment ID: ${paymentid}`);

      //SEND THE ORDER CONFIRMATION //NON-BLOCKING
      resend.emails.send({
        from: "Fun Circle <noreply@funcircleapp.com>",
        to: [email],
        subject: `Order Confirmation: ${ticket_name}`,
        react: await EmailTemplate({
          ticketName: ticket_name,
          orderId: `FC${ticket_id}${existingOrderQuery.data.id}`,
          ticket_quantity,
          location,
          map_link,
          name,
          phoneNumber,
        }),
      });

      console.log("Confirmation email sent successfully");

      return NextResponse.json(
        {
          status: true,
          message: "Order already exists (created by webhook)",
          orderId: existingOrderQuery.data.id,
          quantity: ticket_quantity,
          duplicate: true,
        },
        { status: 200 }
      );
    }

    // If order doesn't exist, create it with database transaction
    console.log(`Creating new order for payment ID: ${paymentid}`);

    // Start transaction by creating the main order
    const orderResponse = await supabase
      .from("orders")
      .insert({
        user_id,
        total_price,
        status,
        paymentid,
      })
      .select("id")
      .single();

    // Handle unique constraint violation (race condition)
    if (orderResponse.error) {
      if (orderResponse.error.code === "23505") {
        // Unique constraint violation
        console.log("Unique constraint violation - order already exists");

        // Fetch the existing order
        const existingOrder = await supabase
          .from("orders")
          .select("id")
          .eq("paymentid", paymentid)
          .single();

        if (existingOrder.data) {
          return NextResponse.json(
            {
              status: true,
              message: "Order already exists (created simultaneously)",
              orderId: existingOrder.data.id,
              quantity: ticket_quantity,
              duplicate: true,
            },
            { status: 200 }
          );
        }
      }

      // Other database errors
      console.error("Error creating order:", orderResponse.error);
      return NextResponse.json(
        {
          status: false,
          message: "Error creating order in database",
          error: orderResponse.error.message,
        },
        { status: 500 }
      );
    }

    const orderId = orderResponse.data.id;
    console.log(`Order created successfully with ID: ${orderId}`);

    // Update ticket bookings
    const ticketUpdateResponse = await supabase.rpc("increment_bookedtickets", {
      ticket_id: ticket_id,
      increment_by: ticket_quantity,
    });

    if (ticketUpdateResponse.error) {
      console.error(
        "Error updating ticket bookings:",
        ticketUpdateResponse.error
      );

      // Rollback: Delete the created order
      await supabase.from("orders").delete().eq("id", orderId);

      return NextResponse.json(
        {
          status: false,
          message: "Error updating ticket availability",
          error: ticketUpdateResponse.error.message,
        },
        { status: 500 }
      );
    }

    console.log("Ticket bookings updated successfully");

    // Create order items
    const orderItemsResponse = await supabase.from("Orderitems").insert({
      order_id: orderId,
      ticket_id: ticket_id,
      quantity: ticket_quantity,
      sub_price: ticket_price,
      userid: user_id,
    });

    if (orderItemsResponse.error) {
      console.error("Error creating order items:", orderItemsResponse.error);

      // Rollback: Decrement tickets and delete order
      await supabase.rpc("increment_bookedtickets", {
        ticket_id: ticket_id,
        increment_by: -ticket_quantity, // Decrement
      });
      await supabase.from("orders").delete().eq("id", orderId);

      return NextResponse.json(
        {
          status: false,
          message: "Error creating order items",
          error: orderItemsResponse.error.message,
        },
        { status: 500 }
      );
    }

    console.log("Order items created successfully");

    // Send confirmation email (non-blocking)
    try {
      resend.emails.send({
        from: "Fun Circle <noreply@funcircleapp.com>",
        to: [email],
        subject: `Order Confirmation: ${ticket_name}`,
        react: await EmailTemplate({
          ticketName: ticket_name,
          orderId: `FC${ticket_id}${orderId}`,
          ticket_quantity,
          location,
          map_link,
          name,
          phoneNumber,
        }),
      });
      console.log("Confirmation email sent successfully");
    } catch (emailError) {
      // Log email error but don't fail the order
      console.error("Error sending confirmation email:", emailError);
    }

    // Return success response
    return NextResponse.json(
      {
        status: true,
        message: "Order created successfully",
        orderId,
        quantity: ticket_quantity,
        duplicate: false,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error in order creation:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected server error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
