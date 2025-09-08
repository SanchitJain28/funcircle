"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  AlertCircle,
  Search,
  PlusCircle,
  BellOff,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserChats } from "@/hooks/useChat";
import CustomHeader from "@/components/header-footers/CustomHeader";
import Link from "next/link";

// --- HELPER FUNCTIONS ---
const formatTimeAgo = (isoString: string | null): string => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m";
  return Math.floor(seconds) + "s";
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

interface UserRoom {
  id: string;
  name: string;
  description: string | null;
  type: "group" | "direct" | string; // adjust if you have fixed values
  sport_type: string | null;
  avatar_url: string | null;
  max_members: number;
  is_active: boolean;
  created_by: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  member_count: number;
  last_message: {
    content: string;
    sent_at: string; // ISO timestamp
    sender_id: string;
    sender_name: string;
  } | null; // can be null if no message yet
  user_membership: {
    role: "member" | "admin" | string; // adjust roles as needed
    joined_at: string; // ISO timestamp
    last_seen_at: string | null; // maybe null if never seen
    is_muted: boolean;
  };
}

const ChatListItem = ({ chat }: { chat: UserRoom }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Link href={`/chat/${chat.id}`}>
      <motion.li
        variants={containerVariants}
        whileHover={{ backgroundColor: "rgba(242, 102, 16, 0.1)", scale: 1.01 }}
        className="flex items-center p-4 cursor-pointer transition-colors duration-200 border-b border-gray-800"
      >
        <div className="relative mr-4">
          {chat.avatar_url ? (
            <img
              src={chat.avatar_url}
              alt={chat.name}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#8A36EB] flex items-center justify-center text-xl font-bold text-[#F9F9F9]">
              {getInitials(chat.name)}
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-[#F9F9F9]">{chat.name}</h3>
            <span className="text-xs text-gray-400">
              {formatTimeAgo(chat.last_message?.sent_at ?? null)}
            </span>
          </div>
          <div className="flex justify-between items-start mt-1">
            <p className="text-sm text-gray-400 truncate pr-4">
              {chat.last_message
                ? `${chat.last_message.sender_id === "user-123" ? "You: " : ""}${chat.last_message.content}`
                : "No messages yet"}
            </p>
            <div className="flex items-center space-x-2">
              {chat.user_membership.is_muted && (
                <BellOff className="w-4 h-4 text-gray-500" />
              )}
              {/* Example of unread count badge */}
              {/* <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#F26610] rounded-full">2</span> */}
            </div>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-gray-600 ml-2" />
      </motion.li>
    </Link>
  );
};

const ChatListSkeleton = () => (
  <div className="space-y-2 p-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 animate-pulse">
        <div className="w-14 h-14 bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <MessageSquare className="w-24 h-24 text-gray-600 mb-4" />
    <h2 className="text-2xl font-bold text-[#F9F9F9] mb-2">No Chats Yet</h2>
    <p className="text-gray-400 mb-6">
      Start a conversation to see your chats here.
    </p>
    <button className="flex items-center justify-center px-6 py-3 bg-[#F26610] text-[#F9F9F9] font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300">
      <PlusCircle className="w-5 h-5 mr-2" />
      New Chat
    </button>
  </div>
);

const ErrorState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8 text-[#E74C3C]">
    <AlertCircle className="w-24 h-24 mb-4" />
    <h2 className="text-2xl font-bold mb-2">Something Went Wrong</h2>
    <p className="text-red-400">
      We couldn&apos;t load your chats. Please try again later.
    </p>
  </div>
);

// --- MAIN COMPONENT ---
export default function ChatsClient() {
  const { user, authLoading } = useAuth();
  const { data: userChats, isPending, isError } = useUserChats(user?.uid ?? "");

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="bg-[#000000] text-[#F9F9F9] h-screen flex flex-col font-sans">
      <CustomHeader />
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800 shadow-lg sticky top-0 bg-black/80 backdrop-blur-sm z-10">
        <h1 className="text-2xl font-bold">Chats</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Search className="w-6 h-6 text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <PlusCircle className="w-6 h-6 text-[#F26610]" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <AnimatePresence mode="wait">
          {isPending ||
            (authLoading && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ChatListSkeleton />
              </motion.div>
            ))}

          {isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ErrorState />
            </motion.div>
          )}

          {!isPending && !isError && !authLoading && (
            <>
              {userChats && userChats.length > 0 ? (
                <motion.ul
                  key="chat-list"
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-gray-800"
                >
                  {userChats.map((chat) => (
                    <ChatListItem key={chat.id} chat={chat} />
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <EmptyState />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
