"use client";
import React from "react";

export interface Venue {
  id: number;
  created_at: string;
  venue_name: string;
  images: string[];
  maps_link: string;
  description: string;
  location: string;
}

export default function VenueTabsList({
  VenueTabs,
  onChange,
  activeTabId,
}: {
  VenueTabs: Venue[];
  onChange: (change: number) => void;
  activeTabId: number;
}) {
  const activeTab = VenueTabs.find((venue) => venue.id === activeTabId);
  if (!VenueTabs || VenueTabs.length === 0) {
    return (
      <div className="text-center p-4 text-purple-300 bg-black rounded-lg">
        No venues available
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0F0F11]">
      {/* Scrollable Tabs */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 p-4 min-w-max flex-col">
          {VenueTabs.map((venue) => (
            <button
              key={venue.id}
              onClick={() => onChange(venue.id)}
              className={`
                px-4 py-2 rounded-xl text font-medium whitespace-nowrap transition-all duration-200
                ${
                  activeTab?.id === venue.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                    : "bg-gray-800 text-purple-300 hover:bg-gray-700 hover:text-purple-200"
                }
              `}
            >
              {venue.venue_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
