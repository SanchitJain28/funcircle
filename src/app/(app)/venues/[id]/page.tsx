import React from "react";
import VenueClient from "./VenueClient";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <VenueClient params={{ id }} />
    </div>
  );
}
