import React from "react";
import BookingClient from "./BookingClient";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <BookingClient params={{ id }} />
    </div>
  );
}
