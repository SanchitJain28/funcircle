import CustomHeader from "@/components/header-footers/CustomHeader";
import React from "react";
import EventTicketClient from "./EventTicketClient";
import axios from "axios";

interface EventTicketPageProps {
  params: Promise<{
    group_id: string;
  }>;
}

export default async function EventTicketPage({
  params,
}: EventTicketPageProps) {
  const { group_id } = await params;

  try {
    const {
      data: { data },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/FetchTickets`,
      {
        group_id,
      }
    );

    return (
      <div className="min-h-screen bg-[#0f0f11]">
        <CustomHeader />
        <EventTicketClient group_id={group_id} data={data} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    return (
      <div className="min-h-screen bg-[#0f0f11]">
        <CustomHeader />
        <div className="p-4 text-center text-red-500">
          Failed to load tickets. Please try again.
        </div>
      </div>
    );
  }
}
