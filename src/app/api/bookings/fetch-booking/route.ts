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
  const { order_id } = body;
  if (!order_id) {
    return NextResponse.json(
      {
        status: false,
        message: "No order_id was provided",
        error: {
          message: "Please provide the order_id in the body",
        },
        code: "NO_ORDER_ID",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_order_with_ticket", {
      order_id_input: order_id,
    });

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "No order was found",
          data: null,
          code: "NO_ORDER_FOUND",
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
        data: data[0],
        code: "ORDERS_FETCHED_SUCCESSFULLY",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected Error Occcured",
        error,
        code: "INTERNAL_SERVOR_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
