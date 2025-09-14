import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: 500,
        message: "Invalid Body",
        code: "INTERNAL_API_BODY",
        error,
      },
      {
        status: 500,
      }
    );
  }
  const { requester, partner, action } = body;
  if (!action) {
    return NextResponse.json(
      {
        status: false,
        message: "Action is required",
        code: "ACTION_REQUIRED",
        error: {
          message: "Action is required",
        },
      },
      {
        status: 400,
      }
    );
  }

  if (!requester || !partner) {
    return NextResponse.json(
      {
        status: false,
        message: "Requester and Partner are required",
        code: "REQUESTER_AND_PARTNER_REQUIRED",
        error: {
          message: "Requester and Partner are required",
        },
      },
      {
        status: 400,
      }
    );
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("duos")
      .update({ status: action })
      .eq("requester_id", requester)
      .eq("partner_id", partner);

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error updating the user status",
          code: "DATABASE_ERROR",
          error,
        },
        {
          status: 500,
        }
      );
    }

    console.log(data, error);

    return NextResponse.json(
      {
        status: true,
        message: "Updated the Duo Status",
        code: "SUCCESS",
        data,
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
        message: "Internal Server Error",
        error,
        code: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
