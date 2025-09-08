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

    const { data: roomData, error: roomError } = await supabase
      .schema("chat")
      .from("rooms")
      .select("id,name,type")
      .eq("id", room_id)
      .single();

    if (!roomData) {
      return NextResponse.json(
        {
          status: false,
          message: "Room not found",
          error: {
            message: "Room not found",
          },
          code: "ROOM_NOT_FOUND",
        },
        {
          status: 404,
        }
      );
    }

    if (roomError) {
      return NextResponse.json(
        {
          status: false,
          message: "Database error occucred While Fetching Room Data",
          error: roomError,
          code: "DATABASE_ERROR_OCCURED",
        },
        {
          status: 403,
        }
      );
    }

    const { data: existingMember, error: existingMemberError } = await supabase
      .schema("chat")
      .from("room_members")
      .select("user_id")
      .eq("room_id", room_id)
      .eq("user_id", user_id);

    console.log(existingMember);

    if (existingMember && existingMember.length !== 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Already a member",
          error: {
            message: "You are already a member of this group",
          },
          code: "ALREADY_THERE",
        },
        {
          status: 403,
        }
      );
    }

    if (existingMemberError) {
      //   if (existingMemberError.code == "PGRST116") {
      //     return NextResponse.json(
      //       {
      //         status: false,
      //         message: "Invalid user , User not found !!",
      //         error: existingMemberError,
      //         code: "INVALID_USER",
      //       },
      //       {
      //         status: 403,
      //       }
      //     );
      //   }
      return NextResponse.json(
        {
          status: false,
          message: "DataBase Error Occured While finding Existing membor",
          error: existingMemberError,
          code: "DATABASE_ERROR_OCCURED",
        },
        {
          status: 403,
        }
      );
    }

    const { error: insertError } = await supabase
      .schema("chat")
      .from("room_members")
      .insert({
        room_id: room_id,
        user_id: user_id,
        role: "member",
      });

    if (insertError) {
      return NextResponse.json(
        {
          status: false,
          message:
            "DataBase Error Occured While Inserting you in the Group chat",
          error: insertError,
          code: "DATABASE_ERROR_OCCURED",
        },
        {
          status: 403,
        }
      );
    }

    const { error: messageInsertError } = await supabase
      .schema("chat")
      .rpc("insert_system_message", {
        p_room_id: room_id,
        p_sender_id: user_id,
      });

    if (messageInsertError) {
      return NextResponse.json(
        {
          status: false,
          message:
            "DataBase Error Occured While Inserting you in the Group chat",
          error: messageInsertError,
          code: "DATABASE_ERROR_OCCURED",
        },
        {
          status: 403,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Successfully joined the room",
        data: {
          is_member: true,
        },
        code: "JOINED GROUP SUCCESFULLY",
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
        message: "Internal Servor Error Occuered",
        error,
        code: "INTERNAL_SERVOR_ERROR_OCCURED",
      },
      {
        status: 501,
      }
    );
  }
}
