import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      {
        status: false,
        message: "Invalid or empty JSON body",
        error: err,
        code: "INVALID_JSON",
      },
      { status: 400 }
    );
  }
  const { room_id, user_id } = body;
  if (!room_id || !user_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Room id or user id was not provided",
        error: {
          message: "Please provide an Room id and user id",
        },
        code: "INVALID_PARAMS",
      },
      {
        status: 404,
      }
    );
  }
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("chat")
      .rpc("get_room_messages", {
        p_room_id: room_id,
        p_user_id: user_id,
      });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error occured while fetching messages",
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
        message: "Messages fetched successfully",
        data,
        code: "MESSAGES_FETCHED",
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
        message: "Internal Servor Occured",
        error,
        code: "INTERNAL_SERVOR_ERROR",
      },
      {
        status: 501,
      }
    );
  }
}
