import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 100; // default limit = 10

  if (isNaN(limit) || limit <= 0) {
    return NextResponse.json(
      {
        status: false,
        message: "Invalid limit parameter",
        code: "INVALID_LIMIT",
      },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("venues")
      .select(
        "id,venue_name,images,maps_link,description,location,lat,lng,group_id"
      )
      .limit(limit);

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Internal Server Error Occurred!!",
          error,
          code: "INTERNAL_SERVER_ERROR",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Venues fetched successfully",
        data,
        code: "SUCCESS",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error Occurred!!",
        error,
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
