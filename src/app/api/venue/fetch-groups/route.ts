import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const venue_id = request.nextUrl.searchParams.get("v_id");
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("chat")
      .from("rooms")
      .select("*")
      .eq("venue_id", venue_id);

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Internal Servor Error Occured !!",
          error,
          code: "INTERNAL_SERVOR_ERROR_OCCURED",
        },
        {
          status: 501,
        }
      );
    }

    const { data: membersCount, error: membersCountError } = await supabase.schema("chat").rpc(
      "get_total_members_by_venue",
      {
        p_venue_id: venue_id,
      }
    );

    if (membersCountError) {
      return NextResponse.json(
        {
          status: false,
          message: "Internal Servor Error Occured !!",
          error:membersCountError,
          code: "INTERNAL_SERVOR_ERROR_OCCURED",
        },
        {
          status: 501,
        }
      );
    }
    return NextResponse.json(
      {
        status: true,
        message: "Venue Chats fetched Successfully !!",
        data :{
          venue_groups:data,
          members_count:membersCount
        },
        code: "SUCCESS",
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
        message: "Internal Servor Error Occured !!",
        error,
        code: "INTERNAL_SERVOR_ERROR_OCCURED",
      },
      {
        status: 501,
      }
    );
  }
}
