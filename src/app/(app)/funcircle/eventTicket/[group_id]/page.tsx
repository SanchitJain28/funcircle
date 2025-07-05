import CustomHeader from "@/components/header-footers/CustomHeader";
import axios from "axios";
import React from "react";
import EventTicketClient from "./EventTicketClient";
interface EventTicketPageProps {
  params: {
    group_id: string;
  };
}

export default async function EventTicketPage({
  params,
}: EventTicketPageProps) {
  const { group_id } = params;

  const {
    data: { data },
  } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/FetchTickets`, {
    group_id,
  });

  return (
    <div className="min-h-screen bg-[#0f0f11]">
      <CustomHeader />
      <EventTicketClient group_id={group_id} data={data} />
    </div>
  );
}
