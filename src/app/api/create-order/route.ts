import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: "rzp_live_Kz3EmkP4EWRTam",
  key_secret: "H8PGj6qXeae6I8IWGpY1KKdq",
});
export async function POST(request: NextRequest) {
  const { amount } = await request.json();
  try {
    const options = {
      amount: amount, // Amount in paise
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    return NextResponse.json(
      {
        status: false,
        message: "Razorpay order created",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexprected Error happened",
        error,
      },
      { status: 501 }
    );
  }
}
