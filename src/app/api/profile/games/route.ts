import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Invalid or empty JSON body",
        error,
        code: "INVALID_JSON",
      },
      { status: 400 }
    );
  }

  const { user_id } = body;
  if (!user_id) {
    return NextResponse.json(
      {
        status: false,
        message: "User ID is missing",
        code: "MISSING_USER_ID",
        error: {
          message: "Please provide User ID",
        },
      },
      {
        status: 404,
      }
    );
  }
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("users")
      .select("first_name,email,user_id,usersetlevel,adminsetlevel,location")
      .eq("user_id", user_id);
    return NextResponse.json({
        data
    })
  } catch (error) {
    console.log(error);
  }
}
