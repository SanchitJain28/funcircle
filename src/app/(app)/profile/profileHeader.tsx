"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, User, Crown } from "lucide-react";
import { Archivo } from "next/font/google";
import React from "react";
import { UserProfile } from "@/app/types";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"] });

export function ProfileHeader({ profile }: { profile: UserProfile }) {
  if (!profile) return;
  return (
    <main className={archivo.className}>
      <div className="py-6 font-sans max-w-md mx-auto mb-4  text-white border rounded-2xl px-6 border-zinc-700 bg-[#1E1E1E] backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="relative group">
              <Avatar className="h-20 w-20 ring-2 ring-zinc-600 shadow-xl transition-all duration-300 group-hover:ring-zinc-500 group-hover:shadow-2xl">
                <AvatarImage
                  src="https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
                  alt="John Doe's profile picture"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-6 h-6 border-2 border-zinc-800 flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col justify-start min-w-0 flex-1">
              <h2 className="text-2xl font-semibold text-white mb-1 truncate tracking-tight">
                {profile.first_name?.slice(0, 18)}
              </h2>
              <p className="text-sm text-zinc-400 mb-3 truncate font-medium">
                {profile.email}
              </p>
              <Badge
                variant="secondary"
                className="w-fit text-xs font-medium bg-zinc-700/50 text-zinc-200 border-zinc-600 hover:bg-zinc-700 transition-colors duration-200"
              >
                <Crown className="w-3 h-3 mr-1 text-yellow-400" />
                {profile.usersetlevel}
              </Badge>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-zinc-700/50 transition-all duration-200 border border-transparent hover:border-zinc-600"
            aria-label="Edit profile"
          >
            <Edit2 className="h-4 w-4 text-zinc-400 hover:text-zinc-200 transition-colors duration-200" />
          </Button>
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-[#8C35EB] to-[#A855F7] hover:from-[#7C3AED] hover:to-[#9333EA] text-white rounded-xl font-medium py-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="font-medium">You are connected with John</span>
            </div>
          </Button>
        </div>
      </div>
    </main>
  );
}
