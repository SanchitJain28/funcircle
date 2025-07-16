"use client";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Clock, User, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function RequestClient() {
  const { notification } = useAuth();

  if (!notification) return;

  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleRequestClick = (gameLink: string) => {
    router.push(gameLink);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <CustomHeader />
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="px-4 py-4 sm:px-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Game Requests
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {notification.length} pending invitation
            {notification.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="px-4 py-6 sm:px-6 space-y-4">
        {notification.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              No game requests
            </h3>
            <p className="text-gray-500">
              You are all caught up! New requests will appear here.
            </p>
          </div>
        ) : (
          notification.map((request) => (
            <div
              key={request.id}
              onClick={() => handleRequestClick(request.data.game_link)}
              className="group relative bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 hover:border-[#8B35EA]/50 rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Notification indicator */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-[#8B35EA] rounded-full animate-pulse"></div>

              {/* Header with sender info */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#8B35EA]/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B35EA]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      {request.sender}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      invited you to play
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {getTimeAgo(request.created_at)}
                </span>
              </div>

              {/* Game details */}
              <div className="bg-black/30 rounded-lg p-3 sm:p-4 mb-3">
                <h4 className="font-medium text-white text-sm sm:text-base mb-3 line-clamp-2">
                  {request.data.game_name}
                </h4>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#8B35EA] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="text-sm font-medium text-white">
                        {formatDate(request.data.game_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#8B35EA] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Time</p>
                      <p className="text-sm font-medium text-white">
                        {formatTime(request.data.game_time)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#8B35EA] rounded-full"></div>
                  <span className="text-sm text-[#8B35EA] font-medium">
                    Tap to book
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#8B35EA] transition-colors" />
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B35EA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
            </div>
          ))
        )}
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-20 sm:h-8"></div>
    </div>
  );
}
