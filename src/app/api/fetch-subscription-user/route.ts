import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { user_id } = await request.json();
  try {
    if (!user_id) {
      return NextResponse.json(
        {
          status: false,
          message: "User Id is required !! 😣😣",
        },
        { status: 403 }
      );
    }
    const { data: subscription, error } = await supabase
      .from("subscription")
      .select("*")
      .eq("user_id", user_id)
      .single();
    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          {
            status: true,
            message: "No Subscription found !! 😣😣",
            subscription: null,
          },
          { status: 201 }
        );
      }
      return NextResponse.json(
        {
          status: false,
          message: "Supabase Error occured !!😰😰",
          error,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        status: true,
        message: "Success !! 😀😀",
        subscription,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "UnExpected Error occured",
      },
      { status: 501 }
    );
  }
}
