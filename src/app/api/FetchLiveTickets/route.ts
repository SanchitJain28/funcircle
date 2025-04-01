import { createClient } from "@/app/utils/supabase/server";
import {  NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("tickets")
      .select("*,venueid(*)")
      .eq("ticketstatus", "live")
      .order("created_at", { ascending: false });
    if (error) {
      return NextResponse.json({
        success: false,
        error: "Error fetching tickets ",
        message:error,
      },{status: 500});
    }
    return NextResponse.json({
        success: true,
        data,
    },{status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error fetching tickets",
    },{status: 500});
  }
}
