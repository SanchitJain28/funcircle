import CustomHeader from "@/components/header-footers/CustomHeader";
import React from "react";
import EventTicketClient from "./EventTicketClient";

interface EventTicketPageProps {
  params: Promise<{
    group_id: string;
  }>;
}

export default async function EventTicketPage({ params }: EventTicketPageProps) {

  const { group_id } =await params;


  return (
    <div className="min-h-screen bg-[#0f0f11]">
      <CustomHeader />

      <EventTicketClient group_id = {group_id}/>
    </div>
  );
}

