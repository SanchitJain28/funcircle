import { createClient } from "@/app/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { user_data } = await request.json();

  try {
    const { data, error } = await supabase
      .from("users")
      .upsert([user_data], { onConflict: "user_id" }); // conflict on column, not value

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Unexpected error occurred",
          error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Profile upserted",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upsert error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occurred",
        error,
      },
      { status: 500 }
    );
  }
}
