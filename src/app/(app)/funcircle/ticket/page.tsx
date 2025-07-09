import React from "react";
import { Suspense } from "react";
import TicketClient from "./TicketClient";
import axios from "axios";

interface TicketPageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function Page({ searchParams }: TicketPageProps) {
  const { id } = await searchParams;

  if (!id) {
    return <div>No ticket ID provided</div>;
  }

  const {
    data: { ticket },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/FetchIndividualTicket?id=${id}`
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicketClient ticket={ticket} />
    </Suspense>
  );
}
