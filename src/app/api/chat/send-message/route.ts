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
  const { room_id, content, message_type, media_url, user_id } = body;
  if (!room_id || !user_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Room ID or User ID is missing",
        code: "MISSING_ROOM_ID",
        error: {
          message: "Please provide Room ID and User ID",
        },
      },
      {
        status: 404,
      }
    );
  }

  if (!message_type && !content) {
    return NextResponse.json(
      {
        status: false,
        message: "text Message should have content",
        code: "EMPTY_MESSAGE",
        error: {
          message: "Message type text cannot be empty",
        },
      },
      {
        status: 404,
      }
    );
  }

  try {
    const supabase = await createClient();

    //CHECK IF USER EXISTS IN THIS ROOM;
    const { data: existingMember, error: existingMemberError } = await supabase
      .schema("chat")
      .from("room_members")
      .select("user_id")
      .eq("room_id", room_id)
      .eq("user_id", user_id);

    console.log(existingMember, existingMemberError);

    if (!existingMember || existingMember.length == 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Not a member of this group",
          error: {
            message: "You are not a member of this group",
          },
          code: "NOT_A_MEMBER",
        },
        {
          status: 403,
        }
      );
    }

    if (existingMemberError) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured While Searching Existing Member",
          error: existingMemberError,
          code: "DATABASE_ERROR",
        },
        {
          status: 403,
        }
      );
    }

    //SEND MESSAGE
    const { data: message, error } = await supabase
      .schema("chat")
      .from("messages")
      .insert({
        room_id,
        content,
        message_type,
        media_url,
        sender_id: user_id, // Get from auth
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured While Entering Into Message table",
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
        message: "Message Sent",
        data: message,
        code: "MESSAGE_SENT",
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
        message: "Internal Server Error Occured",
        error,
        code: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 501,
      }
    );
  }
}
