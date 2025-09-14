"use client";
import { useToast } from "@/app/Contexts/ToastContext";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/hooks/useChat";
import { useUserDuos } from "@/hooks/useProfile";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";

interface UserSummary {
  user_id: string;
  first_name: string;
  email?: string;
  usersetlevel?: string;
  adminsetlevel?: string;
}

interface Duo {
  id: string;
  status: "pending" | "accepted" | "rejected" | string;
  created_at: string;
  requester: UserSummary;
  partner: UserSummary;
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "accepted":
        return "bg-[#2ECC71] text-white";
      case "rejected":
        return "bg-[#E74C3C] text-white";
      case "pending":
        return "bg-[#F1C40F] text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const DuoCard = ({
  duo,
  currentUserId,
}: {
  duo: Duo;
  currentUserId?: string;
}) => {
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRequester = duo.requester.user_id === currentUserId;
  const otherUser = isRequester ? duo.partner : duo.requester;
  const role = isRequester ? "Requested" : "Received";
  const query = useQueryClient();

  const handleDuoStatus = async (
    action: "accepted" | "declined",
    requester: string
  ) => {
    if (!currentUserId) {
      showToast({
        variant: "warning",
        message: "Please Login to perform this action",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        data: { data },
      } = await axios.post("/api/profile/duos/handle", {
        action, 
        requester,
        partner: currentUserId,
      });
      query.invalidateQueries({ queryKey: ["user-duos", currentUserId] });
      showToast({
        variant: "success",
        message: `Duo has been ${action}ed`,
      });
      return data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        showToast({
          variant: "danger",
          message:
            axiosError.response?.data?.message ?? "Unexpected Error Occured",
        });
      } else {
        showToast({
          variant: "danger",
          message: "Unexpected Error Occured While Updating Duo's Status",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#000000] border border-gray-800 rounded-lg p-4 hover:border-[#8A36EB] transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F26610] rounded-full flex items-center justify-center text-[#F9F9F9] font-semibold">
            {otherUser.first_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-[#F9F9F9] font-medium">
              {otherUser.first_name}
            </h3>
            <p className="text-[#8A36EB] text-sm">{role}</p>
          </div>
        </div>
        <StatusBadge status={duo.status} />
      </div>

      <div className="flex items-center justify-between text-sm">
        {(otherUser.usersetlevel || otherUser.adminsetlevel) && (
          <div className="text-[#FFD580] text-xs">
            Level: {otherUser.usersetlevel || otherUser.adminsetlevel}
          </div>
        )}
      </div>

      {/* Accept/Decline buttons only if received + pending */}
      {role === "Received" && duo.status === "pending" && (
        <div className="flex gap-3 mt-4">
          <button
            disabled={isSubmitting}
            onClick={() => handleDuoStatus("accepted", duo.requester.user_id)}
            className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50"
          >
            Accept
          </button>
          <button
            disabled={isSubmitting}
            onClick={() => handleDuoStatus("declined", duo.requester.user_id)}
            className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default function DuosClient() {
  const { user, authLoading } = useAuth();
  const { data, isPending, isError, error } = useUserDuos(user?.uid);

  if (isPending || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div
          className="w-12 h-12 border-4 border-t-[#F26610] border-r-[#8A36EB] border-b-[#B58CF4] border-l-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#E74C3C] text-white p-4 rounded-lg">
        An error occurred: {error.message}
      </div>
    );
  }

  if (!user && !authLoading && !isPending) {
    return (
      <div className="text-center p-8 text-[#F9F9F9]">
        <p>Please log in to view your duos</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400">
        <p>No duos found</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#F9F9F9]">Your Duos</h2>
          <span className="text-[#8A36EB] text-sm">{data.length} total</span>
        </div>

        <div className="grid gap-4">
          {data.map((duo: Duo) => (
            <DuoCard key={duo.id} duo={duo} currentUserId={user?.uid} />
          ))}
        </div>
      </div>
    </>
  );
}
