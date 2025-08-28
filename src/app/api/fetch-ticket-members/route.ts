import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ticket_id = request.nextUrl.searchParams.get("t_id");

  if (!ticket_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Ticket ID is required",
        errorCode: "MISSING_TICKET_ID",
      },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_users_by_ticket", {
      p_ticket_id: ticket_id,
    });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: error.message ?? "Supabase error occurred",
          errorCode: "SUPABASE_RPC_ERROR",
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Ticket Members fetched successfully",
        data,
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error. Please try again later.",
        errorCode: "INTERNAL_ERROR",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
