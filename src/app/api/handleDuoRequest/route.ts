import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const { user_id, partner_id } = await request.json();

  try {
    if (!user_id || !partner_id) {
      return NextResponse.json(
        {
          status: false,
          message: "Please provide both user_id and partner_id.",
          code:"MISSING_PARAMETERS",
        },
        { status: 400 }
      );
    }

    if (user_id === partner_id) {
      return NextResponse.json(
        {
          status: false,
          message: "You can't duo with yourself, my friend 😅",
          code: "SAME_USER",
        },
        { status: 400 }
      );
    }

    // Check if either user is already in an accepted duo
    // const { data: existingDuos, error: checkError } = await supabase
    //   .from("duos")
    //   .select("*")
    //   .eq("status", "accepted")
    //   .or(
    //     `requester_id.eq.${user_id},partner_id.eq.${user_id},requester_id.eq.${partner_id},partner_id.eq.${partner_id}`
    //   );

    // if (checkError) {
    //   return NextResponse.json(
    //     {
    //       status: false,
    //       message: "Error checking existing duos",
    //       error: checkError,
    //     },
    //     { status: 500 }
    //   );
    // }

    // if (existingDuos.length > 0) {
    //   return NextResponse.json(
    //     {
    //       status: false,
    //       message: "One of the users is already in a duo.",
    //     },
    //     { status: 409 } // Conflict
    //   );
    // }

    // Create the new duo request
    const { data, error } = await supabase.from("duos").insert({
      requester_id: user_id,
      partner_id,
      status: "pending",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          {
            status: false,
            message:
              "You already have sent the request to be duo with this user",
            error,
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          status: false,
          message: "Error sending request",
          error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Duo request sent successfully.",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Duo creation error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected server error.",
        error,
      },
      { status: 500 }
    );
  }
}
