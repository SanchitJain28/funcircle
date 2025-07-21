// app/api/webhook/razorpay/route.js
import {
  checkExistingOrder,
  createOrderFromWebhook,
} from "@/lib/webhook-helpers";
import crypto from "crypto";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the raw body text for signature verification
    const body = await request.text();

    // Verify webhook signature
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return Response.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("Webhook signature verification failed");
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    // console.log("SIGNATURE VERFIED \n");

    // Parse the body after signature verification
    const payload = JSON.parse(body);
    const { event, payload: eventPayload } = payload;

    // console.log("Webhook event received:", event + "\n");

    // console.log("WEBHOOK PAYMENT PAYLOAD", eventPayload, +"\n");

    if (event === "payment.captured") {
      const payment = eventPayload.payment.entity;

      //   console.log("PAYMENT OBJECT: ", payment + "\n");

      //   console.log("Processing payment:", payment.id + "\n");

      //   console.log("PAYMENT NOTES : ", payment.notes + "\n");

      // Check if order already exists (idempotency)
      const existingOrder = await checkExistingOrder(payment.id);

      if (existingOrder) {
        console.log("Order already exists:", existingOrder.id);
        return Response.json(
          { status: "already_processed", orderId: existingOrder.id },
          { status: 200 }
        );
      }

      // Create order from webhook
      const result = await createOrderFromWebhook(payment);

      console.log("Order created successfully:", result.orderId);

      return Response.json(
        {
          status: "order_created",
          orderId: result.orderId,
          quantity: result.quantity,
        },
        { status: 200 }
      );
    }

    // Handle other events if needed
    console.log("Unhandled webhook event:", event);

    return Response.json(
      { status: "event_not_handled", event },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);

    return Response.json(
      { error: "Webhook processing failed" },
      { status: 200 }
    );
  }
}
