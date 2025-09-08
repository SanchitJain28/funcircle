import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
  const { formData, user_id } = body;
  console.log(formData)
  if (!user_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Please Provide an user_id to update the profile",
        error: {
          message: "User id was not provided",
        },
        code: "INVALID_PARAMS",
      },
      {
        status: 404,
      }
    );
  }

  if (!formData) {
    return NextResponse.json(
      {
        status: false,
        message:
          "No data was provide to update the profile or creating the profile",
        error: {
          message: "No data was provided to update or create profile",
        },
        code: "INVALID_PARAMS",
      },
      {
        status: 404,
      }
    );
  }
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .upsert(
        { ...formData, user_id }, // make sure user_id is included
        { onConflict: "user_id" } // tells Supabase which column to check
      )
      .select();

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Profile Cannot be updated",
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
        message: "Profile upserted Succesfully",
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
        message: "Unexpected error occured",
        error,
        code: "INTERNAL_SERVOR_ERROR",
      },
      {
        status: 501,
      }
    );
  }
}
