import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      {
        status: false,
        message: "Invalid or empty JSON body",
        error: err,
        code: "INVALID_JSON",
      },
      { status: 400 }
    );
  }
  const { user_id } = body;

  console.log(user_id)
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
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .select("first_name,email,user_id,usersetlevel,adminsetlevel")
      .eq("user_id", user_id)

      console.log(data)

      const profileData = data && data.length > 0 ? data[0] : [];

      console.log("PROFILE DATA",profileData)

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured",
          code: "DATABASE_ERROR_OCCURED",
          error,
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Profile fetched Succesfully !",
        data:profileData,
        code: "PROFILE_FETCHED_SUCCESFULLY",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occurred",
        error,
        code: "INTERNAL_SERVOR_ERROR",
      },
      { status: 501 }
    );
  }
}
