"use client";

import { useToast } from "@/app/Contexts/ToastContext";
import { ChatMessage } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import BlurredChatBackground from "@/components/background/BlurryChatBackground";
import MessageComponent from "@/components/chat/MessageComponent";
import CustomHeader from "@/components/header-footers/CustomHeader";
import {
  MoreVerticalIcon,
  PaperclipIcon,
  SendIcon,
} from "@/components/icons/app-icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ApiError, useChatRoomDetails, useChatRooms } from "@/hooks/useChat";
import CheckEmptyProfile from "@/hooks/useCheckEmptyProfile";
// import { generateAvatarUrl } from "@/utils/AvatarUrlMaker";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import React, {
  JSX,
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import SideBarButton from "@/components/header-footers/SideBarButton";
import { useQueryClient } from "@tanstack/react-query";
import { usePersistentParams } from "@/app/Contexts/PersistentParamsContext";

const supabase = createClient();

// Optimized animation variants
const messageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25, // Reduced from 0.4
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.15,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: 0.1, // Reduced delay
    },
  },
};

export default function ChatClient({ params }: { params: { id: string } }) {
  const { user, authLoading } = useAuth();
  const query = useQueryClient();

  const { data, isError, isPending } = useChatRooms({
    room_id: params.id,
    user_id: user?.uid ?? "",
  });

  const { showToast } = useToast();

  const [messages, setMessages] = useState<ChatMessage[]>(
    Array.isArray(data?.messages) ? data?.messages : []
  );

  useEffect(() => {
    setMessages(data?.messages ? data.messages : []);
  }, [data?.messages]);

  const handleJoinChatRoom = useCallback(async () => {
    interface RoomInfo {
      id: string;
      name: string;
      description: string;
      type: string;
    }

    interface ChatRoomForHandleJoinRoom {
      success: boolean;
      is_member: boolean;
      room: RoomInfo;
      messages: ChatMessage[]; // you can replace `any[]` with a Message[] interface if you define message structure
      message: string;
    }
    try {
      await axios.post("/api/chat/join", {
        room_id: params.id,
        user_id: user?.uid,
      });

      showToast({
        variant: "success",
        message: "Joined chat room successfully",
      });

      query.setQueryData(
        ["chat", params.id, user?.uid],
        (oldData: ChatRoomForHandleJoinRoom) => {
          if (oldData) {
            return {
              ...oldData,
              is_member: true,
            };
          }
          return oldData;
        }
      );
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const AxiosError = error as AxiosError<ApiError>;
        showToast({
          variant: "danger",
          message: `Failed To join room : ${AxiosError.message}`,
        });
        return;
      }
      showToast({
        variant: "danger",
        message: `Unexpected Error Occured While Joining the Chat Room`,
      });
    }
  }, [params.id, user?.uid, showToast]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      try {
        await axios.post("/api/chat/send-message", {
          room_id: params.id,
          user_id: user?.uid,
          content,
        });
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          const AxiosError = error as AxiosError<ApiError>;
          showToast({
            variant: "danger",
            message: `Failed To Send Message : ${AxiosError.message}`,
          });
          return;
        }
        showToast({
          variant: "danger",
          message: `Unexpected Error Occured While Joining the Chat Room`,
        });
      }
    },
    [params.id, user?.uid, showToast]
  );

  useEffect(() => {
    // Subscribe to new messages
    const channel = supabase
      .channel(`room-${params.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "chat",
          table: "messages",
          filter: `room_id=eq.${params.id}`,
        },
        (payload) => {
          const payloadMessage = payload.new;
          const newMessage = {
            id: payloadMessage.id,
            room_id: payloadMessage.room_id,
            content: payloadMessage.content,
            sender_id: payloadMessage.sender_id,
            message_type: payloadMessage.message_type,
            media_url: payloadMessage.media_url,
            shared_match_id: payloadMessage.shared_match_id,
            shared_ticket_id: payloadMessage.shared_ticket_id,
            sent_at: payloadMessage.created_at,
            sender_name: payloadMessage.sender_name,
            user: {
              id: payloadMessage.sender_id,
              username: payloadMessage.sender_name,
            },
          };

          // Optimistic update - add message immediately
          setMessages((prev) => [...prev, newMessage]);
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.id]);

  // Loading state
  if (isPending || authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#000000] text-white">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-[#8A36EB] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading chat...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#000000] text-white">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-2">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-400 text-sm">
            Couldn&apos;t fetch chat room details. Try refreshing.
          </p>
        </div>
      </div>
    );
  }

  if (!isPending && !user) {
    return (
      <>
        <BlurredChatBackground />
      </>
    );
  }

  if (!data?.is_member) {
    return (
      <JoinGroup
        room_id={params.id}
        user_id={user?.uid ?? ""}
        room={{
          id: data?.room.id ?? "",
          name: data?.room.name ?? "",
          description: data?.room.description,
        }}
        onJoin={handleJoinChatRoom}
      />
    );
  }

  return (
    <div>
      {user?.uid && (
        <>
          <CheckEmptyProfile fieldsToCheck={["first_name"]} />

          <ChatUI
            params={{ id: params.id }}
            messages={messages}
            user_id={user.uid}
            onSendMessage={handleSendMessage}
          />
        </>
      )}
    </div>
  );
}

// Memoized JoinGroup component to prevent unnecessary re-renders
const JoinGroup = memo(function JoinGroup({
  room_id,
  user_id,
  room,
  onJoin,
}: {
  room_id: string;
  user_id: string;
  room: {
    id: string;
    name: string;
    description?: string;
    avatar_url?: string;
    max_members?: number;
    member_count?: number;
  };
  onJoin: (room_id: string, user_id: string) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const handleJoin = useCallback(async () => {
    setLoading(true);
    try {
      await onJoin(room_id, user_id);
    } catch (err) {
      console.error("Failed to join group:", err);
    } finally {
      setLoading(false);
    }
  }, [onJoin, room_id, user_id]);

  return (
    <>
      <CheckEmptyProfile fieldsToCheck={["first_name"]} />

      <CustomHeader />
      <div className="flex items-center justify-center h-screen bg-[#000000] text-white">
        <div className="max-w-md w-full bg-[#000000] min-h-screen my-auto shadow-lg p-6 text-center">
          {/* Avatar */}
          {/* <SideBarButton /> */}

          {/* Group Info */}
          <h2 className="text font-bold mb-2">{room.name}</h2>
          {room.description && (
            <p className="text-gray-400 text-sm mb-4">{room.description}</p>
          )}
          {/* <p className="text-gray-500 text-sm mb-6">
            {room.member_count ?? 0}/{room.max_members ?? "∞"} members
          </p> */}

          {/* Join Button */}
          <Button
            onClick={handleJoin}
            disabled={loading}
            className="w-full bg-[#F26610] hover:bg-[#F26610]/90 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Group"
            )}
          </Button>
        </div>
      </div>
    </>
  );
});

// Memoized TypingIndicator to prevent unnecessary re-renders
const TypingIndicator = memo(function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-center space-x-2 text-zinc-500 text-sm"
    >
      <div className="flex space-x-1">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          className="w-2 h-2 bg-[#FFD580] rounded-full"
        />
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
          className="w-2 h-2 bg-[#B58CF4] rounded-full"
        />
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
          className="w-2 h-2 bg-[#FFD580] rounded-full"
        />
      </div>
      <span>Sending...</span>
    </motion.div>
  );
});

// Memoized MessageItem to prevent unnecessary re-renders
const MessageItem = memo(function MessageItem({
  message,
  user_id,
}: {
  message: ChatMessage;
  user_id: string;
}) {
  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout // Smooth layout animations
      layoutId={message.id} // Stable layout animation
    >
      <MessageComponent message={message} user_id={user_id} />
    </motion.div>
  );
});

function ChatUI({
  params,
  messages,
  user_id,
  onSendMessage,
}: {
  params: { id: string };
  messages: ChatMessage[];
  user_id: string;
  onSendMessage: (content: string) => Promise<void>;
}): JSX.Element {
  const { data: chatRoomDetails } = useChatRoomDetails(params.id);
  const { params: queryParams } = usePersistentParams();

  const [newMessage, setNewMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Optimized scroll to bottom with requestAnimationFrame
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(scrollToBottom);
  }, [messages]);

  const handleSendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (newMessage.trim() === "") return;

      setIsTyping(true);

      try {
        await onSendMessage(newMessage);
        setNewMessage(""); // Clear input immediately for better UX
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setIsTyping(false);
      }
    },
    [newMessage, onSendMessage]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMessage(e.target.value);
    },
    []
  );

  // const avatarSrc = chatRoomDetails ? generateAvatarUrl(chatRoomDetails.name ?? "", {
  //   size: 128,
  //   rounded: true,
  // }) : '';

  return (
    <>
      <div className="flex h-screen bg-[#000000] font-sans text-[#F9F9F9]">
        <main className="flex-1 flex flex-col bg-zinc-900/50 shadow-2xl rounded-l-2xl overflow-hidden">
          {chatRoomDetails ? (
            <>
              {/* Chat Header */}
              <Link href={`/chat/${params.id}/room-details`}>
                <motion.div
                  variants={headerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="cursor-pointer">
                    <header className="flex items-center justify-between p-6 border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative"
                        >
                          {!(queryParams.headhide === "true") && (
                            <SideBarButton />
                          )}
                        </motion.div>
                        <div>
                          <h2 className="font-semibold text-sm text-[#F9F9F9]">
                            {chatRoomDetails.name}
                          </h2>
                          <p className="text-sm text-zinc-400">
                            {chatRoomDetails.member_count} members • Online
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-zinc-500 hover:text-[#8A36EB] transition-all duration-200 p-2 rounded-full hover:bg-zinc-800"
                      >
                        <MoreVerticalIcon className="h-5 w-5" />
                      </motion.button>
                    </header>
                  </div>
                </motion.div>
              </Link>

              {/* Messages Area - Removed staggered animations */}
              <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-black/20 to-zinc-900/10 space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg) => (
                    <MessageItem key={msg.id} message={msg} user_id={user_id} />
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && <TypingIndicator />}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <motion.footer
                variants={footerVariants}
                initial="hidden"
                animate="visible"
                className="p-6 bg-black/70 border-t border-zinc-800"
              >
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center space-x-4"
                >
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-zinc-400 hover:text-[#8A36EB] transition-all duration-200 p-2 rounded-full hover:bg-zinc-800"
                  >
                    <PaperclipIcon className="h-5 w-5" />
                  </motion.button>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={handleInputChange}
                      placeholder="Type a message..."
                      className="w-full px-6 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8A36EB] focus:border-transparent text-[#F9F9F9] placeholder-zinc-500 transition-all duration-200 hover:bg-zinc-700"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!newMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-[#F26610] to-[#FF7A2D] text-white p-3 rounded-2xl hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#F26610] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    aria-label="Send message"
                  >
                    <motion.div
                      animate={
                        newMessage.trim() && !isTyping
                          ? { rotate: [0, -15, 0], scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <SendIcon className="h-5 w-5" />
                    </motion.div>
                  </motion.button>
                </form>
              </motion.footer>
            </>
          ) : (
            // Loading/Empty State
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-zinc-800 rounded-full mx-auto flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-8 h-8 border-2 border-zinc-500 border-t-[#8A36EB] rounded-full"
                  />
                </div>
                <p className="text-zinc-400 text-lg">
                  Select a room to start chatting
                </p>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
}
