import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    try {
        //TO USE request.json() YOU HAVE TO USE POST REQUEST INSTEAD OF GET REQUEST
        const { group_type } = await request.json()
        const { data, error } = await supabase
            .from('groups')
            .select()
            .eq("group_type", group_type)
            .eq("location","Gurugram, Haryana, India")

        if (error) {
            return NextResponse.json({
                success: false,
                message: "Failed to fetch groups because " + error
            })
        }
        return NextResponse.json({
            success: true,
            data
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Sorry an unexpected error occured"
        }, { status: 500 })
    }
}