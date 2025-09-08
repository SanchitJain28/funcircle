"use client";
import React from "react";
import { MapPin } from "lucide-react";
import { Venue } from "@/app/types";
import VenueScreen from "./VenueScreen";

interface VenueClientProps {
  venues: Venue[];
  onVenueChange: (venueId: number) => void;
  activeVenueId: number;
  onToggleSelection: (isSelecting: boolean) => void;
  isSelecting: boolean;
}

export default function VenueClient({
  venues = [],
  onVenueChange,
  activeVenueId,
  onToggleSelection,
  isSelecting,
}: VenueClientProps) {
  const handleVenueSelect = (venueId: number) => {
    onVenueChange(venueId);
    onToggleSelection(false); // Close venue screen after selection
  };

  const handleBack = () => {
    onToggleSelection(false); // Tell parent to hide the selection screen
  };

  // The parent component now decides when to show this screen
  if (isSelecting) {
    return (
      <VenueScreen
        venues={venues}
        onBack={handleBack}
        onVenueSelect={handleVenueSelect}
        selectedVenueId={activeVenueId}
      />
    );
  }

  // This is the default display view
  const selectedVenue = venues.find((v) => v.id === activeVenueId);

  return (
    <div className="mx-4 my-2 bg-black text-white rounded-lg">
      <div className="space-y-4">
        {selectedVenue ? (
          <div
            className="bg-black border border-zinc-700 rounded-lg p-4 cursor-pointer transition-colors hover:bg-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A36EB]"
            onClick={() => onToggleSelection(true)} // Just tell the parent to enter selection mode
          >
            <div className="flex items-center gap-3">
              <div className="flex">
                <p className="font-medium text-lg text-white">
                  {selectedVenue.venue_name}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin size={18} color="#3B81F6" className="mr-1" />
                {""}
                <p className="text-gray-500"> Nearest venue</p>
              </div>

              <button className=" bg-black text-zinc-200 border border-zinc-600  py-1 px-4 rounded-xl">See All locations</button>
            </div>
          </div>
        ) : (
          <div className="bg-black/60 border border-dashed border-[#8A36EB] rounded-lg p-4 text-center">
            <p className="text-gray-400">No venue selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
