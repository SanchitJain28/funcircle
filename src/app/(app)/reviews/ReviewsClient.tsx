"use client";

import { useTicketMembers, useAuth } from "@/hooks/useAuth";
import { useUserReviews } from "@/hooks/useReviews";
import { Loader2, Users } from "lucide-react";
import React from "react";
import { TicketMemberNew } from "@/app/types";
import { TicketMemberCard } from "./TicketMemberCard";
import { useToast } from "@/app/Contexts/ToastContext";
import axios, { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useTicketInfo } from "@/hooks/useTicketInfo";
import { TicketCard } from "./TicketCardInfo";

export default function ReviewsClient({
  params,
}: {
  params: { t_id: string };
}) {
  const {
    data: members,
    isLoading,
    error,
  } = useTicketMembers({ t_id: params.t_id });
  const { user } = useAuth();
  const { showToast } = useToast();
  const { data: ticketInfo } = useTicketInfo(params.t_id);
  const queryClient = useQueryClient();

  console.log("Ticket Info:", ticketInfo);

  const [isSubmittingReview, setIsSubmittingReview] = React.useState(false);

  const { data: userReviews, isLoading: isLoadingReviews } = useUserReviews(
    user?.uid || ""
  );

  const handleMakeDuo = async (memberId: string) => {
    try {
      await axios.post("/api/handleDuoRequest", {
        user_id: user?.uid,
        partner_id: memberId,
      });

      showToast({
        variant: "success",
        message: "Duo Request Sent!!",
      });
    } catch (error) {
      const responseError = error as AxiosError;
      let errorMessage = "Failed to make duo. Please try again.";
      if (
        responseError.response &&
        responseError.response.data &&
        typeof responseError.response.data === "object" &&
        "message" in responseError.response.data
      ) {
        errorMessage =
          (responseError.response.data as { message?: string }).message ||
          errorMessage;
      }
      console.error("Failed to make duo", error);
      showToast({
        variant: "danger",
        message: errorMessage,
      });
    }
  };

  const handleRatingChange = async (memberId: string, rating: number) => {
    setIsSubmittingReview(true);
    if (!user) {
      showToast({
        variant: "danger",
        message: "You must be logged in to rate a member.",
      });
      return;
    }

    try {
      await axios.post("/api/create-review", {
        to_user_id: memberId,
        from_user_id: user.uid,
        ticket_id: params.t_id,
        rating,
      });

      showToast({
        variant: "success",
        message: `You rated member ${rating} stars!`,
      });

      // Invalidate and refetch reviews to update the UI
      queryClient.invalidateQueries({
        queryKey: ["user-reviews", user.uid],
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to submit review", error);
      showToast({
        variant: "danger",
        message:
          error.response?.data?.error ||
          "Failed to submit your rating. Please try again.",
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const filteredMembers = members?.filter(
    (member) => member.user_id !== user?.uid
  );

  if (isLoading || isLoadingReviews) {
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

  if (!filteredMembers || filteredMembers.length === 0) {
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
            There are no other members associated with this ticket yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-4">
          <div className="mb-6">
            {ticketInfo && <TicketCard ticketInfo={ticketInfo} />}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#8A36EB] rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Game Members</h1>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member: TicketMemberNew) => {
            const isReviewed = userReviews?.some(
              (review) =>
                review.to_user_id === member.user_id &&
                review.ticket_id === Number(params.t_id)
            );
            const existingRating = userReviews?.find(
              (review) =>
                review.to_user_id === member.user_id &&
                review.ticket_id === Number(params.t_id)
            )?.rating;

            return (
              <TicketMemberCard
                key={member.user_id}
                member={member}
                onMakeDuo={handleMakeDuo}
                onRatingChange={handleRatingChange}
                isReviewed={!!isReviewed}
                existingRating={existingRating}
                isReviewsLoading={isLoadingReviews}
                isSubmittingReview={isSubmittingReview}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
