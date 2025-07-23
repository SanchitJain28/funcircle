import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();

interface PaymentProps {
  id: string;
  notes: {
    ticketId: string;
    userId: string;
    quantity: number;
  };
  amount: number;
}

export async function createOrderFromWebhook(payment: PaymentProps) {
  try {
    console.log("Creating order from webhook for payment:", payment.id);

    // Extract order details from payment notes
    const { ticketId, userId, quantity } = payment.notes || {};

    if (!ticketId || !userId) {
      if (!userId) {
        console.log("User Id was not provided", userId, ticketId);
        throw new Error("Missing userId in payment notes");
      } else {
        console.log("Ticket id was not provided", userId, ticketId);
        throw new Error("Missing ticketId in payment notes");
      }
    }

    // Fetch ticket details from database
    const { data: ticketData, error: ticketError } = await supabase
      .from("tickets") // Adjust table name as per your schema
      .select(
        `
        *,
        venueid:venues(
          location,
          maps_link
        )
      `
      )
      .eq("id", ticketId)
      .single();

    if (ticketError || !ticketData) {
      throw new Error(
        `Failed to fetch ticket details: ${ticketError?.message}`
      );
    }

    // Calculate order details from payment amount
    const totalAmount = payment.amount / 100; // Convert paise to rupees
    const ticketPrice = ticketData.price;

    // Call the RPC function
    const { data: orderId, error } = await supabase.rpc(
      "create_order_and_update_tickets",
      {
        p_user_id: userId,
        p_total_price: totalAmount,
        p_status: "confirmed",
        p_paymentid: payment.id,
        p_ticket_id: ticketId,
        p_ticket_quantity: quantity,
        p_ticket_price: ticketPrice,
      }
    );

    if (error) {
      throw error;
    }

    console.log(
      `ORDER FROM THE WEBHOOK SUCESFULLY CREATED AND INCREMENTED By ${quantity} \n`
    );

    return {
      orderId,
      quantity,
    };
  } catch (error) {
    console.error("Error creating order from webhook:", error);
    throw error;
  }
}

export async function checkExistingOrder(payment_id: string) {
  try {
    console.log("CHECKING ORDER IN THE DATABASE FOR", payment_id);

    const { data: order, error } = await supabase
      .from("orders")
      .select("id")
      .eq("paymentid", payment_id)
      .single();

    if (error) {
      return false;
    }

    return order.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
