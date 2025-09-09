import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ticket_id = request.nextUrl.searchParams.get("t_id");
  if (!ticket_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Ticket ID is missing",
        code: "MISSING_TICKET_ID",
        error: {
          message: "Please provide Ticket ID",
        },
      },
      {
        status: 501,
      }
    );
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_ticket_members", {
      p_ticket_id: ticket_id,
    });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured",
          code: "DATABASE_ERROR_OCCURED",
          error,
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Ticket Members Fetched Succesfully",
        data,
        code: "SUCCESS",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occured",
        error,
        code: "INTERNAL_SERVOR_ERROR",
      },
      { status: 501 }
    );
  }
}
