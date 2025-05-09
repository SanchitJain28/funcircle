import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { user_id, first_name, email } = await request.json();
  try {
    const supabase = await createClient();
    const { data, error } =await supabase.from("users").insert({
      user_id,
      first_name,
      email,
    });
    if (error) {
      return NextResponse.json({
        status: false,
        error,
        message: "Unexpected Supabase error occured",
      },{status:403});
    }
    return NextResponse.json({
        status: true,
        message: "User creation Sucessful",
        data
      },{status:201});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      error,
      message: "Unexpected Error occured",
    },{status:500});
  }
}
