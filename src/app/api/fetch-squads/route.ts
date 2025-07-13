import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { user_id } = await request.json();
  const supabase = await createClient();
  if (!user_id) {
    return NextResponse.json({
      status: false,
      message: "Invalid request 😡😠,Un-Authenticated",
    });
  }
  console.log("USER ID", user_id);
  try {
    const jsonQuery = JSON.stringify([{ member_id: user_id }]);

    const { data: userSquads, error } = await supabase
      .from("squads")
      .select("*")
      .filter("squad_members", "cs", jsonQuery);

    console.log("SQUADS", userSquads);

    if (error) {
      return NextResponse.json({
        status: false,
        message: "A supabase error occured !! ❌❌❌",
        error,
      });
    }
    return NextResponse.json({
      status: true,
      message: "Squads fetched successfully !! 😀😀",
      userSquads,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Something went wrong 😡😠",
    });
  }
}
