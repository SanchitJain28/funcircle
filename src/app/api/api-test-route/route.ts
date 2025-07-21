import { createClient } from "@/app/utils/supabase/server";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data: ticketData, error: ticketError } = await supabase
    .from("tickets") // Adjust table name as per your schema
    .select(
      `
        *,
        venueid:venues(
          location,
          maps_link
        )
      `
    )
    .eq("id", 259)
    .single();

  if (ticketError) {
    return NextResponse.json({
      message: " Error occured",
      error,
    });
  }

  return NextResponse.json({
    ticketData,
  });
}
