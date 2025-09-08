import React from "react";
import ChatRoomDetailsClient from "./ChatRoomDetailsClient";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: room_id } = await params;

  return (
    <div>
      <ChatRoomDetailsClient params={{id:room_id}}/>
    </div>
  );
}
