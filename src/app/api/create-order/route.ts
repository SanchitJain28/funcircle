import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(request: NextRequest) {
  const { amount, notes } = await request.json();
  try {
    const options = {
      amount: amount, // Amount in paise
      currency: "INR",
      receipt: "order_rcptid_11",
      notes: notes,
    };
    const order = await instance.orders.create(options);
    return NextResponse.json(
      {
        status: true,
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
