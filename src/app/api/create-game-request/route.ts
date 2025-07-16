import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const type = request.nextUrl.searchParams.get("type");
  const { sender, reciever, game_name, game_date, game_time, game_link } =
    await request.json();

  try {
    if (!sender) {
      return NextResponse.json(
        { status: false, message: "Sender is required" },
        { status: 401 }
      );
    }
    if (!reciever) {
      return NextResponse.json(
        { status: false, message: "Receiver is required" },
        { status: 401 }
      );
    }
    if (!game_date || !game_name || !game_time) {
      return NextResponse.json(
        { status: false, message: "Game Details are required" },
        { status: 401 }
      );
    }

    // Check for existing recent request
    const { data: existingRequest, error: fetchError } = await supabase
      .from("game_requests")
      .select("id, created_at")
      .eq("sender", sender)
      .eq("reciever", reciever)
      .eq("type", type)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      return NextResponse.json(
        { status: false, message: "Error fetching existing requests" },
        { status: 500 }
      );
    }

    if (existingRequest) {
      const createdTime = new Date(existingRequest.created_at);
      const now = new Date();
      const diffInHours =
        (now.getTime() - createdTime.getTime()) / (1000 * 60 * 60); // ms to hours

      if (diffInHours < 3) {
        return NextResponse.json(
          {
            status: false,
            message: `You can only send a new request after 3 hours. Please wait ${(
              3 - diffInHours
            ).toFixed(1)} more hour(s).`,
          },
          { status: 429 } // 429 = Too Many Requests
        );
      }
    }

    // Insert new request
    const { error: insertError } = await supabase.from("game_requests").insert({
      sender,
      reciever,
      type,
      data: {
        game_name,
        game_date,
        game_time,
        game_link,
      },
    });

    if (insertError) {
      return NextResponse.json(
        {
          status: false,
          message: "A Database Error occurred 😥",
          error: insertError,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Request sent successfully! 😁",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
