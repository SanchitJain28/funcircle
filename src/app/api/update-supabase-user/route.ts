import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { data, user_id } = await request.json();
  const supabase = await createClient();

  if (!user_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Un Authenticated , Please login through phone. number",
        code: "login_error",
      },
      { status: 403 }
    );
  }
  try {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("user_id", user_id);

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database error occured",
          code: "database_error",
          error,
        },
        { status: 501 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "User has updated Sucessfully !! ",
        code: "success",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected internal server error occured",
      },
      { status: 501 }
    );
  }
}
