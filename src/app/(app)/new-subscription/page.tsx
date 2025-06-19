"use client"
import React from "react";

import CustomHeader from "@/app/components/CustomHeader";
import VenueCard from "@/components/VenueCard";

export default function Index() {
  const demoContent = [
    {
      id: 9,
      created_at: "2025-05-15 13:21:17.558335+00",
      venue_name: "Gurgaon Badminton Club, Sector 52, Wazirabad",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/faceout-b996d.appspot.com/o/users%2FGhO4QtVW4Dh7MrjfRmiqJI0gZQv2%2Fuploads%2F1747315265078854_0.jpg?alt=media&token=763f3db4-fe18-4c55-bc4f-57fabbc33ccc",
        "https://firebasestorage.googleapis.com/v0/b/faceout-b996d.appspot.com/o/users%2FGhO4QtVW4Dh7MrjfRmiqJI0gZQv2%2Fuploads%2F1747315265079309_1.jpg?alt=media&token=a70eec10-4d1c-4ec6-bff2-cac15305ce49",
      ],
      maps_link:
        "https://maps.app.goo.gl/3Yug1Jx9LWzWGzLQ8?g_st=com.google.maps.preview.copy",
      description:
        "very good place to play badminton, location is a bit inside but nearby",
      location: "Wazirabad, Sector 52, Gurugram, Haryana 122003, India",
      subscription_options: [
        { play: 8, price: 1240, name: "Weekend Pass", popular: false },
        { play: 12, price: 1800, name: "Pro Pass", popular: true },
        { play: 16, price: 2240, name: "Elite Pass", popular: false },
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen text-white">
      <CustomHeader />
      {/* Venues Section */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {demoContent.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
}
