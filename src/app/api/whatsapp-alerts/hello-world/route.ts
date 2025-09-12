import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Invalid or empty JSON body",
        code: "INVALID_JSON",
      },
      { status: 400 }
    );
  }

  const { uid } = body;
  if (!uid) {
    return NextResponse.json(
      { status: false, message: "UID is required", code: "UID_REQUIRED" },
      { status: 400 }
    );
  }

  try {
    // fetch firebase user
    const userRecord = await adminAuth.getUser(uid);

    // send WhatsApp msg
    const { data } = await axios.post(
      `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: "+919650296375", // replace with userRecord.phoneNumber if you store it
        type: "template",
        template: { name: "hello_world", language: { code: "en_US" } },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      {
        status: true,
        message: `Message sent to ${userRecord.uid} and ${userRecord.displayName}`,
        data,
        code: "SUCCESS",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
        error,
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
