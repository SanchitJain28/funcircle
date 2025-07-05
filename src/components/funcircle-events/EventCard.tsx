"use client";
import Link from "next/link";
import React, { useState, useContext } from "react";
import { SkeletonCard } from "../../components/loading/SkelatonCard";
import { appContext } from "@/app/Contexts/AppContext";

interface EventCardProps {
  card_data: {
    name: string;
    profile_image: string;
    location: string;
    interests: string[];
    group_id: number;
  };
}

export default function EventCard({ card_data }: EventCardProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const context = useContext(appContext);
  if (!context) {
    throw new Error("appContext must be used within a AppProvider");
  }

  const { profile_image, location, name, interests, group_id } = card_data;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Show content even if image fails
  };

  return (
    <div className="rounded-lg overflow-hidden">
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative w-full aspect-[5/3] rounded-xl overflow-hidden bg-[#131315]">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <SkeletonCard className="w-full h-full" />
          </div>
        )}

        {!imageError && (
          <img
            src={profile_image}
            alt={`${name}'s profile image`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}

        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#131315] text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-2">📷</div>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div
        className={`py-4 px-1 transition-all duration-300 ${
          imageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-col space-y-3">
          {/* Title and Location */}
          <div>
            <h3 className="text-white text-lg font-medium line-clamp-1">
              {name}
            </h3>
            <p className="text-zinc-400 text-sm line-clamp-1">{location}</p>
          </div>

          {/* Interests Tags */}
          {interests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {interests.slice(0, 6).map((interest, index) => (
                <span
                  key={index}
                  className="text-xs text-white bg-[#575759] py-1 px-2 rounded-lg whitespace-nowrap"
                >
                  {interest}
                </span>
              ))}
              {interests.length > 6 && (
                <span className="text-xs text-zinc-400 py-1 px-2">
                  +{interests.length - 6} more
                </span>
              )}
            </div>
          )}

          {/* Booking Section */}
          <Link
            href={`funcircle/eventTicket/${group_id}`}
            className="bg-black rounded-lg border border-zinc-700 flex p-3 items-center justify-between hover:border-zinc-600 transition-colors duration-200 group"
          >
            <div className="flex flex-col">
              <p className="text-white text-sm font-medium">From ₹149</p>
              <p className="text-zinc-400 text-xs">onwards</p>
            </div>
            <button className="px-6 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-200 group-hover:scale-105 transform">
              Book slots
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
