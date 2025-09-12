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
    const { data, error } = await supabase.rpc("get_user_games_list", {
      p_user_id: user_id,
    });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error in fetching user games list",
          error: error.message,
          code: "DATABASE_ERROR_OCCURED",
        },
        {
          status: 403,
        }
      );
    }

    if (data && data.length === 0) {
      return NextResponse.json(
        {
          status: true,
          message: "NO USER GAMES WAS FOUND",
          data: null,
          code: "SUCCESS",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        status: true,
        message: "User games list fetched successfully",
        data,
        code: "SUCCESS",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
