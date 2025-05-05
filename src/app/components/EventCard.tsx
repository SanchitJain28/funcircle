"use client";
import Link from "next/link";
import React, { useState } from "react";
import { appContext } from "../Contexts/AppContext";
import { SkeletonCard } from "./SkelatonCard";

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
  const context = React.useContext(appContext);
  if (!context) {
    throw new Error("appContext must be used within a AppProvider");
  }
  const { profile_image, location, name, interests, group_id } = card_data;
  return (
    <div className=" rounded-lg ">
      
      {/* //WHEN IMAGE IS NOT UPLOADED */}
      {!imageLoaded && (
        <div className=" rounded-lg bg-[#131315]">
          <SkeletonCard className="my-4" />
          <SkeletonCard className="my-4" />
          <SkeletonCard className="my-4" />
        </div>
      )}
      {/* //LEARNED A NEW THING FOR IMAGE THAT IS ONLOAD FUNCTION */}

      <img
        src={profile_image}
        alt={`${name}'s profile image`}
        width={500} // Specify the width of the image
        height={300} // Specify the height of the ima
        className="rounded-xl"
        onLoad={() => {
          setImageLoaded(true);
        }}
      />

      {imageLoaded && (
        <div className="py-4 px-1">
          <div className="flex flex-col">
            <p className="text-white text-lg">{name}</p>
            <p className="text-zinc-400 text-sm">{location}</p>
            <div className="grid grid-cols-3">
              {interests.map((e, index) => {
                return (
                  <p
                    key={index}
                    className="text-xs text-white mr-2 my-2 bg-[#575759] py-[4px] px-[6px] rounded-xl"
                  >
                    {e}
                  </p>
                );
              })}
            </div>
          </div>

          <Link
            href={`funcircle/eventTicket/${group_id}`}
            className="bg-black rounded-lg border border-zinc-700 flex p-2 items-center justify-between"
          >
            <p className="text-white mx-4 text-sm text-center">From Rs. 149 onwards</p>
            <button className=" px-8 font-bold p-2  bg-white rounded-lg">
              Book slots
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
