import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.rpc(
      "get_ticket_buddies_by_user_id",
      { p_user_id: userId }
    );

    const result = data.reverse();

    console.log(result);

    if (error) {
      console.error("Error fetching ticket buddies:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
