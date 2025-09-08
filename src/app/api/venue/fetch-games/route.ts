import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const venue_id = request.nextUrl.searchParams.get("v_id");
  if (!venue_id) {
    return NextResponse.json(
      {
        status: false,
        message: "No params Provided",
        error: {
          message: "Please Provide the VENUE_ID",
        },
        code: "INVALID_PARAM",
      },
      {
        status: 404,
      }
    );
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tickets")
      .select(
        `
    id,
    group_id,
    type,
    title,
    description,
    capacity,
    startdatetime,
    enddatetime,
    ticketstatus,
    price,
    priceincludinggst,
    ticketpergroup,
    sku,
    bookedtickets,
    location,
    wooid,
    images,
    servicecharge,
    venue:venueid (
      id,
      venue_name,
      images,
      maps_link,
      description,
      location,
      lat,
      lng,
      group_id
    )
  `
      )
      .eq("venueid", venue_id)
      .eq("ticketstatus", "live");

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured",
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
        message: "Internal Servor Error Occured. ",
        error,
        code: "INTERNAL_SERVOR_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
