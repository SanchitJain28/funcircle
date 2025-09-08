import React from "react";
import { useChatRoomMembers } from "@/hooks/useChat";
import { generateAvatarUrl } from "@/utils/AvatarUrlMaker";

interface RoomMember {
  user_id: string;
  first_name: string;
  role: "admin" | "moderator" | "member" | "system";
  joined_at: string; // ISO timestamp
  last_seen_at: string; // ISO timestamp
  is_muted: boolean;
  is_banned: boolean;
}

export default function ChatRoomMembers({
  params,
}: {
  params: { id: string };
}) {
  const { data, isPending, isError } = useChatRoomMembers(params.id);
  const size = 128;

  if (isPending)
    return <div className="text-[#F9F9F9]">Loading members...</div>;
  if (isError)
    return <div className="text-[#E74C3C]">Failed to load members.</div>;

  return (
    <div className="bg-black p-4 rounded-lg max-w-md mx-auto">
      <h2 className="text-[#F9F9F9] text-2xl font-bold mb-4">Room Members</h2>
      <ul className="space-y-3">
        {data.map((member : RoomMember) => {
          const src = generateAvatarUrl(member.first_name ?? "", {
            size,
            rounded: true,
          });

          let roleColor = "text-[#FFD580]"; // default member
          if (member.role === "admin") roleColor = "text-[#F26610]";
          else if (member.role === "moderator") roleColor = "text-[#8A36EB]";
          else if (member.role === "system") roleColor = "text-[#F1C40F]";

          return (
            <li
              key={member.user_id}
              className="flex items-center gap-3 border-b border-gray-800 pb-2"
            >
              <img
                src={src}
                alt={member.first_name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-[#F9F9F9] font-semibold">
                  {member.first_name}
                </p>
                <p className={`text-sm ${roleColor}`}>
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
