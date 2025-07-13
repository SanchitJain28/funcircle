import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { squad_name, squad_members, user_id } = await request.json();
  if (!squad_name || !squad_members)
    return NextResponse.json(
      {
        status: false,
        message: "Invalid request 😡😠",
      },
      { status: 400 }
    );
  if (typeof squad_name !== "string" || !Array.isArray(squad_members)) {
    return NextResponse.json(
      { status: false, message: "Invalid data 🥴" },
      { status: 400 }
    );
  }
  if (squad_members.length < 2 || squad_members.length > 8) {
    return NextResponse.json(
      {
        status: false,
        message:
          "A squad must have at least 2 members and at most 8 members. 😅😅",
      },
      { status: 400 }
    );
  }
  if (!user_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Unauthorized 🤐🤐",
      },
      { status: 401 }
    );
  }
  try {
    const { data, error } = await supabase
      .from("squads")
      .insert({
        squad_name,
        squad_members,
        squad_admin: user_id,
      })
      .select("*");

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Some Error occured !! 😪😯",
          error,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Squad Created Successfully !! 😀😀",
      data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
