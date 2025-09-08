import { ChatMessage } from "@/app/types";
import { generateAvatarUrl } from "@/utils/AvatarUrlMaker";
import React from "react";

interface MessageProps {
  message: ChatMessage;
  user_id: string;
}

export default function MessageComponent({ message, user_id }: MessageProps) {
  const isYou =
    message.sender_id === user_id && message.message_type !== "system";

  const size = 128;
  const src = generateAvatarUrl(message.user.username, { size, rounded: true });
  return (
    <div
      className={`flex items-end gap-3 my-2 ${
        isYou ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar on left if not you */}
      {!isYou && message.message_type !== "system" && (
        <img
          src={src}
          alt={message.user.username}
          className="w-8 h-8 rounded-full"
        />
      )}

      {/* Message bubble */}
      {message.message_type === "system" ? (
        <div className="w-full flex justify-center my-3">
          <p className="text-xs text-gray-400 bg-gray-800/60 px-3 py-1 rounded-full">
            {message.content}
          </p>
        </div>
      ) : (
        <div
          className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
            isYou
              ? "bg-[#F26610] text-white rounded-br-none" // your messages
              : "bg-[#1A1A1A] text-gray-200 rounded-bl-none" // others messages
          }`}
        >
          <p className="text-xs text-purple-400  py-1 rounded-full">
            {message.user.username}
          </p>

          <p className="text-sm">{message.content}</p>
          <p
            className={`text-xs mt-1  ${
              isYou ? "text-white/70" : "text-gray-400"
            }`}
          >
            {new Date(message.sent_at).toLocaleString("en-US", {
              weekday: "short", // e.g. Mon, Tue
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      )}

      {/* Avatar on right if you */}
      {isYou && message.message_type !== "system" && (
        <img
          src={src}
          alt={message.user.username}
          className="w-8 h-8 rounded-full"
        />
      )}
    </div>
  );
}
