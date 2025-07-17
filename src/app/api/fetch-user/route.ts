import { getUserFromRequest } from "@/lib/server-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get user from request
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Now you have access to user.uid and other user properties
    console.log("User UID:", user.uid);
    console.log("User phone:", user.phone_number);

    // Use the user data as needed
    return NextResponse.json({
      message: "Success",
      userId: user.uid,
      userPhone: user.phone_number,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
