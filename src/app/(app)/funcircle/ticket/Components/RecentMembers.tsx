"use client";

import { useRecentMembers } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Users, Send, Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import axios, { type AxiosError } from "axios";
import { toast } from "react-toastify";
import { motion } from "motion/react";

export interface RecentMembersProps {
  member_name: string;
  member_id: string;
}

// Badminton Loading Animation Component
const BadmintonLoadingAnimation = () => {
  return (
    <div className="flex items-center gap-1">
      {/* Player with racket */}
      <motion.div
        className="relative"
        animate={{
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {/* Player body */}
        <motion.div
          className="w-3 h-4 bg-orange-500 rounded-full relative"
          animate={{
            scaleY: [1, 0.9, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {/* Head */}
          <div className="w-2 h-2 bg-orange-400 rounded-full absolute -top-1 left-0.5" />
          {/* Racket */}
          <motion.div
            className="absolute -right-1 top-0"
            animate={{
              rotate: [0, -30, 30, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {/* Racket handle */}
            <div className="w-0.5 h-3 bg-orange-600" />
            {/* Racket head */}
            <div className="w-2 h-2 border border-orange-600 rounded-full absolute -top-0.5 -left-0.75" />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Shuttlecock */}
      <motion.div
        className="ml-1"
        animate={{
          y: [-2, 2, -2],
          x: [0, 2, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-1 h-1 bg-white rounded-full relative">
          {/* Feathers */}
          <div className="absolute -top-0.5 left-0 w-0.5 h-1 bg-orange-300 rounded-t-full transform -rotate-12" />
          <div className="absolute -top-0.5 left-0 w-0.5 h-1 bg-orange-300 rounded-t-full" />
          <div className="absolute -top-0.5 left-0 w-0.5 h-1 bg-orange-300 rounded-t-full transform rotate-12" />
        </div>
      </motion.div>
      {/* Loading text */}
      <motion.span
        className="ml-1 text-xs"
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        Playing...
      </motion.span>
    </div>
  );
};

export default function RecentMembers({
  user_id,
  game_name,
  game_date,
  game_time,
  game_link,
}: {
  user_id: string;
  game_name: string;
  game_date: string;
  game_time: string;
  game_link: string;
}) {
  const { data: recentMembers } = useRecentMembers({
    user_id: user_id,
    enabled: !!user_id,
  });

  const [loading, setLoading] = useState<string | boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter members based on search term
  const filteredMembers = useMemo(() => {
    if (!recentMembers) return [];
    if (!searchTerm.trim()) return recentMembers;

    return recentMembers.filter((member) =>
      member.member_name
        ? member.member_name.toLowerCase().includes(searchTerm.toLowerCase())
        : null
    );
  }, [recentMembers, searchTerm]);

  const handleSendRequest = async (memberId: string) => {
    setLoading(memberId);
    try {
      const { data } = await axios.post(
        `/api/create-game-request?type=game-request`,
        {
          sender: user_id,
          reciever: memberId,
          game_name,
          game_date,
          game_time,
          game_link,
        }
      );
      toast("Game Request Sent Succesfully !! ");
      console.log(data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.data?.message) {
        toast(err.response.data.message);
      } else {
        toast("Unexpected Error occurred!! 😵");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
    // Add your request sending logic here
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="mx-6">
          <Button
            variant="outline"
            className="my-4 w-full  bg-[#1D1D1F] text-orange-500 border-orange-500 hover:bg-[#8338EC] hover:text-black"
          >
            <Users className="h-4 w-4" />
            Send Game Request (To Recently played)
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-black border-orange-500">
        <DrawerHeader>
          <DrawerTitle className="text-orange-500">
            Send Game Request
          </DrawerTitle>
          <DrawerDescription className="text-orange-300">
            View your recently active members
          </DrawerDescription>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
            <Input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black border-orange-500/20 text-white placeholder:text-orange-300/50 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </DrawerHeader>

        <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
          {filteredMembers && filteredMembers.length > 0 ? (
            <div className="space-y-2">
              {filteredMembers.map((member, index) => {
                return (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-orange-500/20 bg-black hover:bg-orange-500/10 transition-colors"
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-orange-500">
                          {member.member_name
                            ? member.member_name.charAt(0).toUpperCase()
                            : "U"}
                        </span>
                      </div>
                      <span className="font-medium text-white">
                        {member.member_name}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSendRequest(member.member_id)}
                      disabled={loading === member.member_id}
                      className="bg-orange-500 text-black hover:bg-orange-600 gap-1 min-w-[120px]"
                    >
                      {loading === member.member_id ? (
                        <BadmintonLoadingAnimation />
                      ) : (
                        <>
                          <Send className="h-3 w-3" />
                          Send Request
                        </>
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-orange-300">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>
                {searchTerm.trim()
                  ? `No members found matching "${searchTerm}"`
                  : "No recent members found"}
              </p>
            </div>
          )}
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black bg-transparent"
            >
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
