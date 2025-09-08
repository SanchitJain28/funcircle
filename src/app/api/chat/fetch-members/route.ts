import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const room_id = request.nextUrl.searchParams.get("r_id");
  if (!room_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Room id is required",
        error: {
          message: "Room id is required",
        },
        code: "ROOM_ID_REQUIRED",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("chat")
      .rpc("get_room_members_with_names", { p_room_id: room_id });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "DATABASE_ERROR_OCCURED",
          error,
          code: "DATABASE_ERROR_OCCURED",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Group members fetched Succesfully !",
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
      {
        status: 501,
      }
    );
  }
}
