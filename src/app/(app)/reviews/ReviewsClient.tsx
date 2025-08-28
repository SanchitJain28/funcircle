"use client";

import {  useTicketMembers } from "@/hooks/useAuth";
import { Loader2, Users, Star } from "lucide-react";
import React from "react";
import { TicketMemberNew } from "@/app/types";
import { TicketMemberCard } from "./TicketMemberCard";
import { useToast } from "@/app/Contexts/ToastContext";

export default function ReviewsClient({
  params,
}: {
  params: { t_id: string };
}) {
  const { data, isLoading, error } = useTicketMembers({ t_id: params.t_id });
  // const { user } = useAuth();
  const {showToast}= useToast()
  const handleMakeDuo = async (memberId: string) => {
    console.log(memberId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleRatingChange = (memberId: string, rating: number) => {
    showToast({
      variant:"success",
      message:`You rated member ${memberId} with ${rating} stars!`
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#8A36EB] mx-auto" />
          <p className="text-gray-600">Loading ticket members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Error Loading Members
          </h2>
          <p className="text-gray-600">
            There was an issue loading the ticket members. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            No Members Found
          </h2>
          <p className="text-gray-600">
            There are no members associated with this ticket yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#8A36EB] rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Ticket Members</h1>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Review and collaborate with {data.length} member
            {data.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((member: TicketMemberNew) => (
            <TicketMemberCard
              key={member.user_id}
              member={member}
              onMakeDuo={handleMakeDuo}
              onRatingChange={handleRatingChange}
            />
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 bg-white rounded-lg border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[#8A36EB]">
                {data.length}
              </div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#8A36EB]">
                {data.filter((m) => m.adminsetlevel).length}
              </div>
              <div className="text-sm text-gray-600">Admin Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#8A36EB]">
                {data.filter((m) => m.tag).length}
              </div>
              <div className="text-sm text-gray-600">Tagged Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
