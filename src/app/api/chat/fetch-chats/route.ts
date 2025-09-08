import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
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
    const { user_id } = body;

    if (!user_id) {
      return NextResponse.json(
        {
          status: false,
          message: "user_id is required",
          error: {
            message: "user_id was not provided",
            code: "INVALID_PARAMS",
          },
        },
        { status: 400 }
      );
    }

    // Fetch rooms with details from the view
    const { data: chats, error } = await supabase
      .schema("chat")
      .from("room_details")
      .select(
        `
        id,
        name,
        description,
        type,
        sport_type,
        avatar_url,
        max_members,
        is_active,
        created_by,
        created_at,
        updated_at,
        member_count,
        last_message_content,
        last_message_at,
        last_message_sender_id,
        last_message_sender_name,
        room_members!inner(
          role,
          joined_at,
          last_seen_at,
          is_muted
        )
      `
      )
      .eq("room_members.user_id", user_id)
      .eq("room_members.is_banned", false)
      .order("last_message_at", { ascending: false, nullsFirst: false });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occuredd !!",
          error,
          code: "DATABASE_ERROR_OCCURED",
        },
        { status: 403 }
      );
    }

    const transformedChats = chats?.map((chat) => ({
      id: chat.id,
      name: chat.name,
      description: chat.description,
      type: chat.type,
      sport_type: chat.sport_type,
      avatar_url: chat.avatar_url,
      max_members: chat.max_members,
      is_active: chat.is_active,
      created_by: chat.created_by,
      created_at: chat.created_at,
      updated_at: chat.updated_at,
      member_count: chat.member_count,
      last_message: chat.last_message_content
        ? {
            content: chat.last_message_content,
            sent_at: chat.last_message_at,
            sender_id: chat.last_message_sender_id,
            sender_name: chat.last_message_sender_name,
          }
        : null,
      user_membership: {
        role: chat.room_members[0]?.role,
        joined_at: chat.room_members[0]?.joined_at,
        last_seen_at: chat.room_members[0]?.last_seen_at,
        is_muted: chat.room_members[0]?.is_muted,
      },
    }));

    return NextResponse.json(
      {
        status: true,
        message: "Chats fetched successfully",
        data: transformedChats,
        code: "SUCCESS",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chat Fetch Error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occurred",
        error: String(error),
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
