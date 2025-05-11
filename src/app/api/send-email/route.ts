import { EmailTemplate } from "@/app/components/email-template";
import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

const resend = new Resend("re_H4MGC23R_3qwvL4U5qAGG9iMQLCvMn328");

export async function POST(req: NextRequest) {
  const { email, orderId, ticket_quantity } = await req.json();
  const { data, error } = await resend.emails.send({
    from: "Fun Circle <no-reply@funcircleapp.com>",
    to: [email],
    subject: "your ticket has been confirmed",
    react: await EmailTemplate({ ticketName: "Badminton ticket" ,orderId,ticket_quantity}),
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
