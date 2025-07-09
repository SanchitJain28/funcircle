import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { status, user_id, duo_id } = await req.json();
  try {
    if (!status) {
      return NextResponse.json(
        {
          status: false,
          message: "No status described.",
        },
        { status: 400 }
      );
    }
    const { error } = await supabase.rpc("handle_duo_requests", {
      p_duo_id: duo_id,
      p_user_id: user_id,
      p_status: status,
    });
    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error occured",
          error,
        },
        { status: 501 }
      );
    }

    if (status === "declined") {
      return NextResponse.json(
        {
          status: true,
          message: "Duo Request Declined",
          declined: true,
        },
        { status: 201 }
      );
    }
    return NextResponse.json(
      {
        status: true,
        message: "Duo Request Accepted",
        accepted: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected server error occured",
      },
      { status: 501 }
    );
  }
}
