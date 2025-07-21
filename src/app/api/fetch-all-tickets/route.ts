import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  try {
    const { data: tickets, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch tickets", details: error.message },
        { status: 500 }
      );
    }

    // Transform the data to match the interface expected by your sitemap
    const transformedTickets = tickets.map((ticket) => ({
      ...ticket,
      startdatetime: ticket.startdatetime
        ? new Date(ticket.startdatetime)
        : null,
      enddatetime: ticket.enddatetime ? new Date(ticket.enddatetime) : null,
    }));

    return NextResponse.json(transformedTickets, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
