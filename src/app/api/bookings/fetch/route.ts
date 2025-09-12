import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Invalid API body",
        error,
        code: "INVALID_API_NODY",
      },
      {
        status: 400,
      }
    );
  }
  const { user_id } = body;
  if (!user_id) {
    return NextResponse.json(
      {
        status: false,
        message: "No user_id was provided",
        error: {
          message: "Please provide the user_id in the body",
        },
        code: "NO_USER_ID",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_orders_with_ticket", {
      user_id_input: "SGz9zPS1szV8vTHKfiPTg3ZKtsy1",
    });

    console.log(data)

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "No orders was found",
          data: null,
          code: "NO_ORDERS_FOUND",
        },
        {
          status: 200,
        }
      );
    }

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database Error Occured !!",
          error,
          code: "DATABASE_ERROR_CCOURED",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Orders Fetched Successfully",
        data: data,
        code: "ORDERS_FETCHED_SUCCESSFULLY",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Unexpected Error Occcured",
      error,
      code: "INTERNAL_SERVOR_ERROR",
    },{
        status:500
    });
  }
}
