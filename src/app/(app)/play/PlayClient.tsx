"use client";

import { Venue } from "@/app/types";
import CustomHeader from "@/components/header-footers/CustomHeader";
import {
  // Ticket,
  useVenueAllDetails,
  // useVenueGames,
} from "@/hooks/useVenueInfo";
import {
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  MapPin,
  Navigation,
} from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import Image from "next/image";
// import { Tabs } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { User } from "firebase/auth";

export default function PlayClient() {
  const { user } = useAuth();
  return (
    <div className="bg-black min-h-screen">
      <CustomHeader />
      <div className="mb-6  p-4">
        <Image
          src={"/PLAy badminton (3).png"}
          alt=""
          width={1280}
          height={640}
          className="rounded-xl"
        />
      </div>
      <VenuesNearYou onVenueChange={() => {}} user={user} />

      <TournamentsNearYou />

      <ExploreAllVenuesAndAllGames user={user} />
    </div>
  );
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface VenueWithDistance extends Venue {
  distanceKm?: string;
  distanceValue?: number;
  duration?: string;
}

// New optimized function to calculate all distances in one API call
const calculateAllDistances = async (
  origin: Coordinates,
  venues: Venue[]
): Promise<
  Map<string, { distanceKm: string; distanceValue: number; duration: string }>
> => {
  try {
    const destinations = venues.map((venue) => ({
      id: venue.id,
      lat: venue.lat,
      lng: venue.lng,
    }));

    const { data } = await axios.post("/api/location/calculateDistance", {
      origin: {
        lat: origin.latitude,
        lng: origin.longitude,
      },
      destinations,
      mode: "driving",
    });

    const distanceMap = new Map();

    if (data.status && data.data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.data.forEach((result: any) => {
        const venueId = Number(result.venueId);
        if (result.distanceValue !== null) {
          distanceMap.set(venueId, {
            distanceKm: result.distanceKm,
            distanceValue: result.distanceValue,
            duration: result.duration,
          });
        }
      });
    }
    console.log("DISTANCE MAP");
    console.log(distanceMap);
    return distanceMap;
  } catch (error) {
    console.error("Error calculating distances:", error);
    return new Map();
  }
};

const VenuesNearYou = ({
  onVenueChange,
  user,
}: {
  limit?: number;
  onVenueChange: (venues: Venue[]) => void;
  user: User | null;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [locationRequested, setLocationRequested] = useState<boolean>(false);
  const [venuesWithDistance, setVenuesWithDistance] = useState<
    VenueWithDistance[]
  >([]);
  const [isCalculatingDistances, setIsCalculatingDistances] =
    useState<boolean>(false);

  const { data: venues, isPending, isError } = useVenueAllDetails({});
  const data: Venue[] | null | undefined = venues;

  const { coords, getPosition, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      timeout: 7000,
      maximumAge: 0,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (venues) {
      onVenueChange(venues);
    }
  }, [venues]);

  // Calculate distances when coordinates and venues are available
  useEffect(() => {
    if (coords && data && data.length > 0) {
      setIsCalculatingDistances(true);
      calculateAllDistances(coords, data).then((distanceMap) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const venuesWithDistanceData = data.map((venue: any) => ({
          ...venue,
          distanceKm: distanceMap.get(venue.id)?.distanceKm || "N/A",
          distanceValue: distanceMap.get(venue.id)?.distanceValue || Infinity,
          duration: distanceMap.get(venue.id)?.duration || "N/A",
        }));
        console.log(venuesWithDistanceData);
        setVenuesWithDistance(venuesWithDistanceData);
        setIsCalculatingDistances(false);
      });
    } else if (data) {
      // If no coordinates, just use venues without distance data
      setVenuesWithDistance(data.map((venue) => ({ ...venue })));
    }
  }, [coords, data]);

  const requestLocation = (): void => {
    setLocationRequested(true);
    try {
      getPosition();
    } catch (error) {
      console.log("Error Occured");
      console.log(error);
    }
  };

  const sortedVenues: VenueWithDistance[] = useMemo(() => {
    setCurrentIndex(0);
    if (!coords || !venuesWithDistance.length) return venuesWithDistance;

    const sortedVenuesList = [...venuesWithDistance].sort((a, b) => {
      const distanceA = a.distanceValue ?? Infinity;
      const distanceB = b.distanceValue ?? Infinity;
      return distanceA - distanceB;
    });

    onVenueChange(sortedVenuesList);

    return [...venuesWithDistance].sort((a, b) => {
      const distanceA = a.distanceValue ?? Infinity;
      const distanceB = b.distanceValue ?? Infinity;
      return distanceA - distanceB;
    });
  }, [coords, venuesWithDistance]);

  const groupedVenues = useMemo(() => {
    const groups: VenueWithDistance[][] = [];
    for (let i = 0; i < sortedVenues.length; i += 2) {
      groups.push(sortedVenues.slice(i, i + 2));
    }
    return groups;
  }, [sortedVenues]);

  const nextSlide = () => {
    if (currentIndex < groupedVenues.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F26610]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-8 min-h-[400px]">
        <p className="text-[#E74C3C]">
          Error loading venues. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:p-6 font-sans text-[#F9F9F9]">
      <div className="flex sm:flex-row justify-between  gap-4">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[#F26610] to-[#FFD580] text-transparent bg-clip-text">
            Venues
          </span>{" "}
          Near You
        </h2>
        {!locationRequested && !coords && (
          <button
            onClick={requestLocation}
            className="flex items-center gap-2 bg-[#F26610] text-white px-3 py-3 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-[#F26610]/30"
            disabled={isCalculatingDistances}
          >
            <Navigation className="w-5 h-5" />
            <span className="font-semibold text-sm">Find Nearest</span>
          </button>
        )}
        {locationRequested && !isGeolocationEnabled && (
          <div className="text-xs text-[#F1C40F] bg-[#F1C40F]/10 px-4 py-2 rounded-lg border border-[#F1C40F]/20">
            Location access needed to sort by distance.
          </div>
        )}
        {isCalculatingDistances && (
          <div className="text-xs text-blue-400 bg-blue-400/10 px-4 py-2 rounded-lg border border-blue-400/20 flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            Calculating distances...
          </div>
        )}
      </div>

      {(isCalculatingDistances || locationRequested) && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-white/10">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#F26610]" />
            <span className="text-sm font-medium">
              {isCalculatingDistances
                ? "Calculating distances to venues..."
                : "Fetching your location..."}
            </span>
          </div>
        </div>
      )}

      {sortedVenues.length > 0 ? (
        <div className="relative">
          <div className="relative overflow-hidden items-stretch">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0.8, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col"
            >
              {groupedVenues[currentIndex].map((venue: VenueWithDistance) => (
                <Link
                  href={
                    user
                      ? `/venues/${venue.id}`
                      : `/sign-up?redirect=${usePathname()}&cp=false`
                  }
                  key={venue.id}
                  // onClick={(e) => {
                  //   if (!user) {
                  //     e.preventDefault(); // stop navigation
                  //     showModal("signin"); // open login modal
                  //   }
                  // }}
                >
                  <div key={venue.id} className="w-full flex-shrink-0 my-2">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl shadow-[#000000]/40 overflow-hidden flex items-stretch">
                      {/* Image */}
                      <div className="w-1/3">
                        <Image
                          height={1080}
                          width={1080}
                          src={venue.images[0]}
                          alt={venue.venue_name}
                          className="w-full h-40 md:h-48 object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="w-2/3 p-4 md:p-5 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                            {venue.venue_name}
                          </h3>
                          {coords &&
                            venue.distanceKm &&
                            venue.distanceKm !== "N/A" && (
                              <div className="flex items-center gap-1 text-[#F26610] text-xs mb-2">
                                <MapPin className="w-3 h-3" />
                                <span>{venue.distanceKm} km away</span>
                                {venue.duration && venue.duration !== "N/A" && (
                                  <span className="text-gray-400">
                                    • {venue.duration}
                                  </span>
                                )}
                              </div>
                            )}
                        </div>

                        <p className="text-gray-300 text-xs md:text-sm line-clamp-3 mb-3">
                          {venue.description}
                        </p>

                        {/* Join Group Button */}
                        <button className="w-full bg-[#000000] border-[#F26610] border hover:bg-[#d9590e] text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200">
                          Join Group
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
          {sortedVenues.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:-left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/80 text-white p-3 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:-right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/80 text-white p-3 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          {sortedVenues.length > 1 && (
            <div className="flex justify-center mt-3 gap-2">
              <div className="flex justify-center mb-4 gap-2">
                {groupedVenues.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[#F26610] scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 text-gray-400 min-h-[400px] flex items-center justify-center bg-gray-900/50 rounded-2xl">
          No venues found.
        </div>
      )}
    </div>
  );
};

const TournamentsNearYou = () => {
  return (
    <div className="flex justify-center mx-4">
      {/* <Card className="bg-black border-[#8A36EB]/30 hover:border-[#8A36EB] transition-all duration-300 hover:shadow-lg hover:shadow-[#8A36EB]/20 max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 mx-auto text-[#F26610] mb-4" />
            <h2 className="text-2xl font-bold text-[#F9F9F9] mb-2">
              Tournaments Coming Soon
            </h2>
            <p className="text-[#F9F9F9]/70">
              Stay tuned for exciting gaming competitions
            </p>
          </div>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFD580]/20 text-[#F26610] border border-[#F26610]/30">
            <Trophy className="w-4 h-4 mr-2" />
            <span className="font-medium">Coming Soon</span>
          </div>
        </CardContent>
      </Card> */}
      <Image
        src={"/Gemini_Generated_Image_8ic72w8ic72w8ic7.png"}
        alt=""
        width={1280}
        height={640}
        className="rounded-xl"
      />
    </div>
  );
};

const ExploreAllVenuesAndAllGames = ({ user }: { user: User | null }) => {
  return (
    <div className="flex md:flex-row justify-between mx-4 my-4">
      <Link
        href={user ? `/venues` : `/sign-up?redirect=${usePathname()}&cp=false`}
        className="block"
      >
        <Card className="relative bg-zinc-900 border w-full border-orange-600 text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#8A36EB]/20 max-w-sm  rounded-lg cursor-pointer hover:scale-105">
          <CardContent className="relative p-4 text-center">
            <div className="mb-4">
              {/* <MapPin className="w-10 h-10 mx-auto text-[#F26610] mb-2" /> */}
              <h2 className="text-lg font-bold  mb-1">Explore Venues</h2>
              <p className="text-sm ">Discover venues nearby</p>
            </div>

            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FFD580]/30 text-[#F26610] border border-[#F26610]/30 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="font-medium">View All</span>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link
        href={
          user ? `/events/90` : `/sign-up?redirect=${usePathname()}&cp=false`
        }
        className="block"
      >
        <Card className="relative bg-zinc-900 border w-full border-orange-600 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#8A36EB]/20 max-w-sm text-white rounded-lg cursor-pointer hover:scale-105">
          <CardContent className="relative p-4 text-center">
            <div className="mb-4">
              {/* <Gamepad2 className="w-10 h-10 mx-auto text-[#F26610] mb-2" /> */}
              <h2 className="text-lg font-bold mb-1">Explore Games</h2>
              <p className="text-sm ">Browse gaming events</p>
            </div>

            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FFD580]/30 text-[#F26610] border border-[#F26610]/30 text-sm">
              <Gamepad2 className="w-4 h-4 mr-1" />
              <span className="font-medium">View All</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
