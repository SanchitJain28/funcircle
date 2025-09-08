import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const venue_id = request.nextUrl.searchParams.get("v_id");
  if (!venue_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected Error Occured .",
        error: {
          message: "Please Provide the VENUE_ID",
        },
        code: "INVALID_PARAMETERS",
      },
      {
        status: 404,
      }
    );
  }
  try {
    const { data, error } = await supabase
      .from("venues")
      .select(
        "id,venue_name,images,maps_link,description,location,lat,lng,group_id"
      )
      .eq("id", venue_id)
      .single();

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Unexpected Error Occured .",
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
        message: "Success . ",
        data,
        code: "SUCESS ERROR",
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
        message: "Unexpected Error occured",
        error,
        code: "INTERNAL_SERVOR_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
