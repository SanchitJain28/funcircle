import { EmailTemplate } from "@/components/email/email-template";
import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, orderId, ticket_quantity ,location,map_link,name,phoneNumber} = await req.json();
  const { data, error } = await resend.emails.send({
    from: "Fun Circle <no-reply@funcircleapp.com>",
    to: [email],
    subject: "your ticket has been confirmed",
    react: await EmailTemplate({ ticketName: "Badminton ticket" ,orderId,ticket_quantity,location,map_link,name,phoneNumber}),
  });

  if (error) {
    return NextResponse.json({
      error,
    });
  }
  return NextResponse.json({
    data,
  });
}
