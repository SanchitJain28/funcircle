
import React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import SubscriptionOption from "./SubscriptionOption";


interface Venue {
  id: number;
  venue_name: string;
  images: string[];
  maps_link: string;
  description: string;
  location: string;
  subscription_options: {
    play: number;
    price: number;
    name: string;
    popular: boolean;
  }[];
}

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
      {/* Venue Header */}
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={venue.images[0]}
            alt={venue.venue_name}
            className="w-full h-full blur-md object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {venue.venue_name}
          </h2>
          <div className="flex items-center text-gray-300 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{venue.location}</span>
          </div>
          <p className="text-gray-200 text-sm md:text-base">{venue.description}</p>
        </div>
      </div>

      {/* Venue Details */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-purple-400">
            Subscription Plans
          </h3>
          <a
            href={venue.maps_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-400 hover:text-purple-400 transition-colors"
          >
            View on Maps
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Subscription Options */}
        <div className="grid gap-4 md:grid-cols-3">
          {venue.subscription_options.map((option, index) => (
            <SubscriptionOption key={index} option={option} />
          ))}
        </div>
      </div>
    </div>
  );
}
