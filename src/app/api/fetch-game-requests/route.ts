import { createClient } from "@/app/utils/supabase/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { user_id } = await request.json();
  try {
    if (!user_id) {
      return NextResponse.json(
        {
          status: false,
          message: "User ID is required",
        },
        { status: 401 }
      );
    }

    const { data: requests, error: RequestError } = await supabase
      .from("game_requests")
      .select("*")
      .eq("reciever", user_id);

    if (RequestError) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured !! ☹☹",
          error: RequestError,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Requests fetched successfully",
        requests,
      },
      { status: 201 }
    );

    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal Sevor Error occured",
        error,
      },
      { status: 501 }
    );
  }
}
