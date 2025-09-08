
import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { to_user_id, from_user_id, ticket_id, rating } = await req.json();
  const supabase =await createClient();

  if (!to_user_id || !from_user_id || !ticket_id || !rating) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // a user cannot rate themselves
  if (to_user_id === from_user_id) {
    return NextResponse.json(
      { error: "You cannot rate yourself" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        to_user_id,
        from_user_id,
        ticket_id,
        rating,
      })
      .select();

    if (error) {
      if (error.code === "23505") {
        // unique_violation
        return NextResponse.json(
          { error: "You have already rated this user." },
          { status: 409 }
        );
      }
      console.error("Error creating review:", error);
      return NextResponse.json(
        { error: "Failed to create review" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Review created successfully",
      data,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
