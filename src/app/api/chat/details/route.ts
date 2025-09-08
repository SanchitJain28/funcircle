import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const room_id = request.nextUrl.searchParams.get("r_id");
  const supabase = await createClient();

  if (!room_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Room id was not provided",
        error: {
          message: "Please provide an Room id",
        },
        code: "INVALID_PARAMS",
      },
      {
        status: 404,
      }
    );
  }
  try {
    const { data, error } = await supabase.schema("chat").rpc("get_room_details_with_user", {
      room_id,
    });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured",
          error,
          code: "DATABASE_ERROR",
        },
        {
          status: 403,
        }
      );
    }
    return NextResponse.json(
      {
        status: true,
        message: "Room details fetched successfully",
        data,
        code: "ROOM_DETAILS_FETCHED",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal Servor Error occured",
        error,
        code: "INTERNAL_SERVOR_ERROR",
      },
      {
        status: 501,
      }
    );
  }
}
