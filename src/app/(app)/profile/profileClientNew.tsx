"use client";

import React from "react";
import { ProfileHeader } from "./profileHeader";
import CustomHeader from "@/components/header-footers/CustomHeader";
// import ProfileTabs from "./ProfileTabs";
import { useAuth, useProfileWithTags } from "@/hooks/useAuth";
import { AlertCircle, User } from "lucide-react";
import { ProfileSkeleton } from "./ProfileClient";

export default function ProfileClientNew() {
  const { user, profile: userProfile } = useAuth();
  const { data, isLoading, error } = useProfileWithTags({
    id: user?.uid ?? "",
    enabled: !!user,
  });

  console.log(userProfile);

  const profile = data?.profile;
  // const tags = data?.tags;

  if (!user) {
    return (
      <div className="bg-black min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="p-4 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-zinc-600/50">
              <User className="h-8 w-8 text-zinc-400" />
            </div>
            <p className="text-zinc-400">Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="max-w-6xl mx-auto p-4">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  if (!profile || error) {
    return (
      <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="p-4 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-zinc-600/50">
              <AlertCircle className="h-8 w-8 text-zinc-400" />
            </div>
            <p className="text-zinc-400">Profile not found.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black min-h-screen">
      <CustomHeader />
      <div className="px-6 py-4">
        <ProfileHeader profile={profile} />

        <div className="px-3">
          <p className="text-zinc-300 text font-bold mb-4">Dashboard</p>
          {/* <ProfileTabs tags={tags} user_id={profile.user_id} /> */}
        </div>
      </div>
    </div>
  );
}
