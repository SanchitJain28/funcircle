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
          message: "Please provide user_id.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("duos")
      .select(
        `
        *,
        profiles:requester_id (
          first_name
        )
      `
      )
      .eq("partner_id", user_id);

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error getting Duo requests",
          error,
        },
        { status: 402 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "No requests currently",
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occurred",
        error,
      },
      { status: 501 }
    );
  }
}
