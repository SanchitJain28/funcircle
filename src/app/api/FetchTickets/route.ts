import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const supabase=await createClient()
    try {
        const {group_id}=await request.json()
        const {data,error}=await supabase
        .from("tickets")
        .select(`*,venueid(*)`)
        .eq("group_id",group_id)
        .eq("ticketstatus","live")
        if(error){
            return NextResponse.json({
                success:false,
                message:"failed to fetch tickets because "+error
            })
        }
        return NextResponse.json({
            success:true,
            data
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"sorry unexpected error occured"
        },{status:500})
    }
}
