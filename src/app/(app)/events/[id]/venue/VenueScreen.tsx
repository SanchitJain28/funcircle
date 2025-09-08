"use client";
import { ArrowLeft, MapPin, ChevronDown, Search, Loader2, Navigation } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { motion } from "framer-motion";
// import { BackgroundGradientAnimation } from "@/components/background-graident-animation";
// import AnimatedGradientBackground from "@/components/background/Animatedbackground";
import { findNearestVenue } from "@/utils/DistanceCalulator";
import { Venue } from "@/app/types";

interface VenueScreenProps {
  venues: Venue[];
  onBack: () => void;
  onVenueSelect: (venueId: number) => void;
  selectedVenueId?: number;
}

export default function VenueScreen({
  venues,
  onBack,
  onVenueSelect,
  selectedVenueId,
}: VenueScreenProps) {
  const [search, setSearch] = useState("");
  const selectedVenue = venues.find((venue) => venue.id === selectedVenueId);
  const [isLoadingLocation, setLoadingLocation] = useState(false);

  const fetchLiveLocation = async () => {
    if (isLoadingLocation) return; // Prevent multiple clicks
    
    setLoadingLocation(true);
    
    const setFallbackVenue = () => {
      onVenueSelect(venues[0].id);
      setLoadingLocation(false);
    };

    if (!navigator.geolocation) {
      setFallbackVenue();
      return;
    }

    try {
      // Single geolocation call with proper error handling
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
        );
      });

      console.log("Position",position)

      const userLat = 28.414380417975067;
      const userLng = 77.03491321423753;
      const nearestVenue = findNearestVenue(userLat, userLng, venues);
      
      if (nearestVenue) {
        onVenueSelect(nearestVenue.id);
      } else {
        setFallbackVenue();
      }
    } catch (error) {
      console.log("Geolocation error:", error);
      setFallbackVenue();
    }
  };

  const filteredVenues = venues.filter(
    (venue) =>
      venue.venue_name.toLowerCase().includes(search.toLowerCase()) ||
      venue.location?.toLowerCase().includes(search.toLowerCase())
  );

  if (!venues || venues.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-900 p-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:bg-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Venue Selection</h1>
        </div>
        <div className="text-center p-8 text-zinc-400">No venues available</div>
      </div>
    );
  }

  return (
    <>
      <div className="text-white px-4 rounded-xl mt-4 mb-6 overflow-hidden relative">
        <div className="pb-4">
          <div className="flex items-center gap-4 mb-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:bg-zinc-800 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search venues or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {selectedVenue && (
            <div className="mb-2">
              <div className="border border-zinc-700 rounded-xl p-4 bg-zinc-800/60">
                <div className="text-zinc-400 text-sm mb-3">
                  Selected Venue:
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-zinc-700 overflow-hidden flex-shrink-0">
                    <Image
                      width={48}
                      height={48}
                      src={
                        selectedVenue.images?.[0] ||
                        "/elegant-wedding-venue.png"
                      }
                      alt={selectedVenue.venue_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-lg leading-tight mb-1">
                      {selectedVenue.venue_name}
                    </h3>
                    <div className="flex items-center gap-1 text-zinc-400 text-sm">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{selectedVenue.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Improved Around Your Location Button */}
          <div className="flex items-center gap-2 mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button
                className="w-full  border border-blue-500 rounded-xl p-4 h-auto transition-all duration-300  disabled:opacity-70 disabled:cursor-not-allowed ring-blue-500"
                onClick={fetchLiveLocation}
                disabled={isLoadingLocation}
              >
                <div className="flex items-center justify-center gap-3 w-full">
                  {isLoadingLocation ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="font-medium text-base">Finding Nearest Venue...</span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                        <Navigation className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-base text-white">
                          Around Your Location
                        </span>
                        <span className="text-blue-100 text-xs">
                          Find the nearest venue automatically
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </Button>
            </motion.div>
          </div>

          <div className="text-zinc-300 text-lg font-medium mb-4">
            Change Venue
          </div>
        </div>

        <div className="space-y-3 pb-6">
          {filteredVenues.map((venue) => (
            <motion.div
              key={venue.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-zinc-800 border border-zinc-700 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-zinc-750 hover:border-zinc-600 ${
                selectedVenueId === venue.id
                  ? "ring-1 ring-blue-500 border-blue-500 bg-zinc-800/80"
                  : ""
              }`}
              onClick={() => onVenueSelect(venue.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-zinc-700 overflow-hidden flex-shrink-0">
                  <Image
                    width={48}
                    height={48}
                    src={venue.images?.[0] || "/elegant-wedding-venue.png"}
                    alt={venue.venue_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white text-base truncate pr-2">
                      {venue.venue_name}
                    </h3>
                    <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-1 text-zinc-400 text-sm mt-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{venue.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredVenues.length === 0 && (
            <div className="text-center text-zinc-400 py-8">
              No venues match your search
            </div>
          )}
        </div>
      </div>
    </>
  );
}