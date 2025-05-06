import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const id = request.nextUrl.searchParams.get("id");
  try {
    const { data, error } = await supabase
      .from("tickets")
      .select(`*,venueid(*)`)
      .eq("id", id);

      const ticket =data?.[0]
    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error fetching tickets",
          error,
        },
        { status: 403 }
      );
    }
    return NextResponse.json(
      {
        status: true,
        ticket,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        error: "Error fetching tickets",
        message: "Unexpected Error occured",
      },
      { status: 500 }
    );
  }
}
