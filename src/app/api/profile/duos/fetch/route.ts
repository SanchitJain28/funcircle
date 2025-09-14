import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: 500,
        message: "Invalid Body",
        code: "INTERNAL_API_BODY",
        error,
      },
      {
        status: 500,
      }
    );
  }
  const { user_id } = await body;
  if (!user_id) {
    return NextResponse.json(
      {
        status: 500,
        message: "user_id was not provided",
        code: "USERID_NOT_PROVIDED",
      },
      {
        status: 404,
      }
    );
  }
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("duos")
      .select(
        `
    id,
    status,
    created_at,
    requester:requester_id (user_id, first_name, email, usersetlevel, adminsetlevel),
    partner:partner_id (user_id, first_name, email, usersetlevel, adminsetlevel)
  `
      )
      .or(`requester_id.eq.${user_id},partner_id.eq.${user_id}`);

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "No Duos was found",
          data: null,
          code: "NO_DATA",
        },
        {
          status: 201,
        }
      );
    }

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured",
          error,
          code: "DATABASE_ERROR",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Duo's fethced Succesfully !!",
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
        status: 500,
        message: "Internal Server Error",
        code: "INTERNAL_SERVOR_ERROR",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
