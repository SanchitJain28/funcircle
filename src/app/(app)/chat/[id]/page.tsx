import React from "react";
import ChatClient from "./ChatClient";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: room_id } = await params;
  return (
    <div>
      <ChatClient params={{ id: room_id }} />
    </div>
  );
}
