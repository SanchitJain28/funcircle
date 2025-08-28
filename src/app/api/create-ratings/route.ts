import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { member_id, user_id, rating, ticket_id } = await request.json();
  if (!member_id || !user_id || !rating || !ticket_id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("ratings").insert({
      to_user: member_id,
      from_user: user_id,
      rating,
      ticket_id,
    });
    if (error) {
      return NextResponse.json({
        message: "Error creating rating",
        error: error,
        status: false
      }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Rating created successfully", data, status: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating rating:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
