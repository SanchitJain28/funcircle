"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeTab = VenueTabs.find((venue) => venue.id === activeTabId);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (venueId: number) => {
    onChange(venueId);
    setIsOpen(false);
  };

  if (!VenueTabs || VenueTabs.length === 0) {
    return (
      <div className="text-center p-4 text-purple-300 bg-gray-900 rounded-lg border border-gray-800">
        No venues available
      </div>
    );
  }

  return (
    <div className="relative w-full " ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {activeTab ? (
            <>
              {activeTab.images && activeTab.images.length > 0 && (
                <div className="w-8 h-8 rounded-md bg-gray-700 overflow-hidden flex-shrink-0">
                  <Image
                  width={32}
                    height={32}
                    src={activeTab.images[0] || "/placeholder.svg"}
                    alt={activeTab.venue_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white truncate">
                  {activeTab.venue_name}
                </div>
                {activeTab.location && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-400 truncate">
                      {activeTab.location}
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <span className="text-gray-400">Select a venue...</span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
          {VenueTabs.map((venue) => (
            <button
              key={venue.id}
              onClick={() => handleSelect(venue.id)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors duration-150 border-b border-gray-700 last:border-b-0 ${
                activeTab?.id === venue.id
                  ? "bg-purple-600/20 text-purple-300"
                  : "text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                {venue.images && venue.images.length > 0 && (
                  <div className="w-8 h-8 rounded-md bg-gray-700 overflow-hidden flex-shrink-0">
                    <Image
                      width={32}
                      height={32}
                      src={venue.images[0] || "/placeholder.svg"}
                      alt={venue.venue_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{venue.venue_name}</div>
                  {venue.location && (
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-400 truncate">
                        {venue.location}
                      </span>
                    </div>
                  )}
                </div>
                {activeTab?.id === venue.id && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
