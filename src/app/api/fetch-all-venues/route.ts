import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("venues").select("*");
    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database error occured !!",
          code: "database_error",
          error,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Success",
        code: "success",
        data,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "message unexpected error occured",
        code: "internal_servor_error",
      },
      { status: 501 }
    );
  }
}
