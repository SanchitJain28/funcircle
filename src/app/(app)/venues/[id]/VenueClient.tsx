"use client";
import { useVenueDetails } from "@/hooks/useVenueInfo";
import React from "react";
import CustomHeader from "@/components/header-footers/CustomHeader";
import VenueGames from "./VenueGames";
import { VenueChatRooms } from "./VenueGroups";

export default function VenueClient({ params }: { params: { id: string } }) {
  const { data: venueData, isPending } = useVenueDetails(params.id);

  if (isPending) {
    return (
      <div className="bg-[#111] min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#F26610] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg">Loading Venue...</p>
        </div>
      </div>
    );
  }

  if (!venueData) {
    return (
      <div className="bg-[#111] min-h-screen flex items-center justify-center text-white">
        <p>Venue not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] min-h-screen antialiased text-gray-300">
      {/* <CustomHeader /> */}
      <CustomHeader />

      <div className="max-w-md mx-auto  shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={
              venueData.images[0] ||
              "/placeholder.svg?height=192&width=384&query=venue"
            }
            alt={venueData.venue_name + " image"}
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="p-4 bg-[#267bf2]">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="text font-bold text-[#F9F9F9] flex-1">
              {venueData.venue_name}
            </h1>
            <a
              href={venueData.maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 p-1 hover:bg-[#8A36EB] hover:bg-opacity-20 rounded transition-colors"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Google_Maps_icon_%282015-2020%29.svg/2048px-Google_Maps_icon_%282015-2020%29.svg.png"
                alt=""
                className="w-8 h-8"
              />{""}
            </a>
          </div>

          <p className="text-[#F9F9F9] text-opacity-80 text-sm leading-relaxed mb-3">
            {venueData.location}
          </p>
        </div>
      </div>

      <div className="px-4 mt-4">
        <VenueChatRooms params={{ id: params.id }} />

        <VenueGames params={{ id: params.id }} group_id={venueData.group_id} />
      </div>
    </div>
  );
}
