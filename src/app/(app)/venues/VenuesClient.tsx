"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useVenueAllDetails } from "@/hooks/useVenueInfo";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { useGeolocated } from "react-geolocated";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Venue } from "@/app/types";
import Link from "next/link";
import { usePersistentParams } from "@/app/Contexts/PersistentParamsContext";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface VenueWithDistance extends Venue {
  distanceKm?: string;
  distanceValue?: number;
  duration?: string;
}

const VenuesClient = () => {
  const { data: venues, isError, isPending } = useVenueAllDetails({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const { params } = usePersistentParams();

  const hideLocationButton = searchParams.get("hidelocbtn") === "true" || params.hidelocbtn==="true"

  const [venuesWithDistance, setVenuesWithDistance] = useState<
    VenueWithDistance[]
  >([]);

  const [isCalculatingDistances, setIsCalculatingDistances] =
    useState<boolean>(false);
  const [, setLocationRequested] = useState<boolean>(false);

  // Get coordinates from URL parameters
  const urlCoordinates = useMemo(() => {
    const lat = searchParams.get("lat") || params.lat;
    const lng = searchParams.get("lng") || params.lng;

    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        return { latitude, longitude };
      }
    }

    return null;
  }, [searchParams]);

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
      console.log(distanceMap);
      return distanceMap;
    } catch (error) {
      console.error("Error calculating distances:", error);
      return new Map();
    }
  };

  const { coords, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      timeout: 7000,
      maximumAge: 0,
    },
    userDecisionTimeout: 5000,
  });

  // Use URL coordinates if available, otherwise use geolocation
  const effectiveCoords = urlCoordinates || coords;

  useEffect(() => {
    if (effectiveCoords && venues && venues.length > 0) {
      setIsCalculatingDistances(true);
      calculateAllDistances(effectiveCoords, venues).then((distanceMap) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const venuesWithDistanceData = venues.map((venue: any) => ({
          ...venue,
          distanceKm: distanceMap.get(venue.id)?.distanceKm || "N/A",
          distanceValue: distanceMap.get(venue.id)?.distanceValue || Infinity,
          duration: distanceMap.get(venue.id)?.duration || "N/A",
        }));
        console.log(venuesWithDistanceData);
        setVenuesWithDistance(venuesWithDistanceData);
        setIsCalculatingDistances(false);
      });
    } else if (venues) {
      // If no coordinates, just use venues without distance data
      setVenuesWithDistance(venues.map((venue) => ({ ...venue })));
    }
  }, [effectiveCoords, venues]);

  // Filter venues based on search query
  const filteredVenues = useMemo(() => {
    if (!searchQuery.trim()) return venuesWithDistance;

    const query = searchQuery.toLowerCase().trim();
    return venuesWithDistance.filter((venue) => {
      const nameMatch = venue.venue_name?.toLowerCase().includes(query);
      const locationMatch = venue.location?.toLowerCase().includes(query);
      return nameMatch || locationMatch;
    });
  }, [venuesWithDistance, searchQuery]);

  const sortedVenues: VenueWithDistance[] = useMemo(() => {
    if (!effectiveCoords || !filteredVenues.length) return filteredVenues;

    return [...filteredVenues].sort((a, b) => {
      const distanceA = a.distanceValue ?? Infinity;
      const distanceB = b.distanceValue ?? Infinity;
      return distanceA - distanceB;
    });
  }, [effectiveCoords, filteredVenues]);

  const requestLocation = (): void => {
    setLocationRequested(true);
    setLoading(true);
    try {
      getPosition();
    } catch (error) {
      console.log("Error Occured");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = (): void => {
    setSearchQuery("");
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading venues...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">
          An error occurred while loading venues
        </div>
      </div>
    );
  }

  if (!isPending && !isError && (!venues || venues.length === 0)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">No venues found</div>
      </div>
    );
  }

  // Use sortedVenues for display when location is available, otherwise use filteredVenues
  const venuesToDisplay =
    effectiveCoords && sortedVenues.length > 0 ? sortedVenues : filteredVenues;

  return (
    <>
      <CustomHeader />
      <div className="space-y-6 bg-black">
        {/* Header with location sorting */}
        <div className="backdrop-blur-md bg-black/70 border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left side - Text with Icon */}
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#F26610]" />
              <h2 className="text-lg font-semibold text-white">
                Get Nearest Venue
              </h2>
            </div>

            {/* Right side - Button */}
            {!hideLocationButton && (
              <Button
                onClick={requestLocation}
                disabled={
                  loading || isCalculatingDistances || !!effectiveCoords
                }
                className="bg-[#F26610] hover:bg-[#d9590e] text-white font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md shadow-[#F26610]/40 disabled:opacity-50"
              >
                {loading || isCalculatingDistances ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isCalculatingDistances
                      ? "Calculating..."
                      : "Getting Location..."}
                  </>
                ) : effectiveCoords ? (
                  <>
                    <Navigation className="w-4 h-4" />
                    {urlCoordinates
                      ? "Using URL Location"
                      : "Sorted by Distance"}
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    Sort by Distance
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/60" />
            </div>
            <Input
              type="text"
              placeholder="Search by venue name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-black/50 border-white/20 text-white placeholder-white/60 focus:border-[#F26610] focus:ring-[#F26610] rounded-lg"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-center mt-3">
              <p className="text-white/60 text-sm">
                {venuesToDisplay.length === 0
                  ? "No venues found matching your search"
                  : `Found ${venuesToDisplay.length} venue${venuesToDisplay.length !== 1 ? "s" : ""} matching "${searchQuery}"`}
              </p>
            </div>
          )}
        </div>

        {/* Venues Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-4">
          {venuesToDisplay.map((venue) => (
            <Link key={venue.id} href={`/venues/${venue.id}`}>
              <Card className="bg-black border-[black]/30 hover:border-[black] transition-all duration-300 hover:shadow-lg hover:shadow-[#8A36EB]/20">
                <CardContent className="">
                  <h3 className="text-lg font-bold text-[#F9F9F9] mb-2">
                    {venue.venue_name}
                  </h3>

                  <div className="flex items-center text-[#F9F9F9]/60 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1 text-[#F26610]" />
                    {venue.location}
                  </div>

                  {/* Display distance and duration if available */}
                  {venue.distanceKm && venue.distanceKm !== "N/A" && (
                    <div className="text-[#F26610] text-sm mb-3 font-medium">
                      📍 {venue.distanceKm} • {venue.duration}
                    </div>
                  )}

                  {/* <Button
                    onClick={() => window.open(venue.maps_link, "_blank")}
                    className="w-full bg-[#8A36EB] hover:bg-[#8A36EB]/80 text-white font-medium py-2 rounded-lg transition-colors duration-200"
                  >
                    View on Map
                  </Button> */}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {venuesToDisplay.length === 0 && searchQuery && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <Search className="w-16 h-16 text-white/30 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No venues found
            </h3>
            <p className="text-white/60 text-center mb-4">
              We couldn&apos;t find any venues matching &apos;{searchQuery}
              &apos;. Try adjusting your search terms.
            </p>
            <Button
              onClick={clearSearch}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export { VenuesClient };
