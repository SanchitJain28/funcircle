"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useEventTickets } from "@/hooks/useEvents";
import { TicketType, Venue } from "@/app/types";
import axios from "axios";

import { Archivo } from "next/font/google";
import DateTabs from "./components/DateTabs";
import EventTicketSkeleton from "./loading";
import VenueClient from "./venue/VenueClient";
import TimeSwitch from "./components/TimeSwitch";
import TicketsList from "./components/TicketsList";
import KnowYourLevel from "./components/KnowYourLevel";
import { useGeolocated } from "react-geolocated";
import { usePersistentParams } from "@/app/Contexts/PersistentParamsContext";

type GroupedTickets = {
  date: string;
  am: TicketType[];
  pm: TicketType[];
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

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

// Find nearest venue using API-based distance calculation
const findNearestVenueAPI = async (
  latitude: number,
  longitude: number,
  venues: Venue[]
): Promise<Venue | null> => {
  if (!venues || venues.length === 0) {
    return null;
  }

  try {
    const distanceMap = await calculateAllDistances(
      { latitude, longitude },
      venues
    );
    let nearestVenue: Venue | null = null;
    let shortestDistance = Infinity;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    venues.forEach((venue:any) => {
      const distanceData = distanceMap.get(venue.id);
      console.log(`Venue ${venue.venue_name} (ID: ${venue.id}):`, distanceData);

      if (distanceData && distanceData.distanceValue < shortestDistance) {
        shortestDistance = distanceData.distanceValue;
        nearestVenue = venue;
        console.log(
          `New nearest venue: ${venue.venue_name} with distance ${distanceData.distanceValue}m`
        );
      }
    });

    if (nearestVenue) {
      console.log(
        `Final nearest venue: ${nearestVenue} (ID: ${nearestVenue}) - ${shortestDistance}m`
      );
    } else {
      console.log("No nearest venue found, all venues had no distance data");
    }

    return nearestVenue;
  } catch (error) {
    console.error("Error finding nearest venue:", error);
    // Fallback to first venue if API fails
    const fallbackVenue = venues.length > 0 ? venues[0] : null;
    if (fallbackVenue) {
      console.log(
        `Fallback to first venue: ${fallbackVenue.venue_name} (ID: ${fallbackVenue.id})`
      );
    }
    return fallbackVenue;
  }
};

export default function EventTicketClient({
  group_id,
  data,
}: {
  group_id: string;
  data: TicketType[];
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const venueIdFromQuery = searchParams.get("venue_id");
  const { params } = usePersistentParams();

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
  }, [searchParams, params]);

  // Geolocation hook
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 0,
      },
      userDecisionTimeout: 5000,
    });

  // States
  const [isMorning, setIsMorning] = useState<boolean>(true);
  const [groupedTickets, setGroupedTickets] = useState<GroupedTickets[]>([]);
  const [activeVenue, setActiveVenue] = useState<number | null>(
    venueIdFromQuery ? Number(venueIdFromQuery) : null
  );
  const [venueTabs, setVenueTabs] = useState<Venue[] | []>([]);
  const [activeDate, setActiveDate] = useState<string>("");
  const [isSelectingVenue, setIsSelectingVenue] = useState(false);
  const [hasSetInitialVenue, setHasSetInitialVenue] = useState(false);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);

  const { data: eventTickets, isLoading } = useEventTickets({
    group_id,
    initialData: data,
  });

  useEffect(() => {
    if (venueIdFromQuery) {
      setActiveVenue(Number(venueIdFromQuery));
    }
  }, [venueIdFromQuery]);

  function groupTicketsByDateWithAMPM(tickets: TicketType[]): GroupedTickets[] {
    const grouped: Record<string, { am: TicketType[]; pm: TicketType[] }> = {};

    tickets.forEach((ticket) => {
      const startDate = new Date(ticket.startdatetime);
      const dateKey = startDate.toISOString().split("T")[0];
      const hours = startDate.getUTCHours();
      const period: "am" | "pm" = hours < 12 ? "am" : "pm";

      if (!grouped[dateKey]) {
        grouped[dateKey] = { am: [], pm: [] };
      }

      grouped[dateKey][period].push(ticket);
    });

    return Object.entries(grouped)
      .map(([date, { am, pm }]) => ({
        date,
        am: am.sort(
          (a, b) =>
            new Date(a.startdatetime).getTime() -
            new Date(b.startdatetime).getTime()
        ),
        pm: pm.sort(
          (a, b) =>
            new Date(a.startdatetime).getTime() -
            new Date(b.startdatetime).getTime()
        ),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  const handleTicketClick = (ticketId: number) => {
    router.push(`/funcircle/ticket?id=${ticketId}`);
  };

  const handleDateChange = (date: string) => {
    setActiveDate(date);
    const selectedDateEvents = groupedTickets.find(
      (group) => group.date === date
    );
    if (selectedDateEvents && activeVenue) {
      const venueAMTickets = selectedDateEvents.am.filter(
        (ticket) => ticket.venueid.id === activeVenue
      );
      const venuePMTickets = selectedDateEvents.pm.filter(
        (ticket) => ticket.venueid.id === activeVenue
      );
      if (venueAMTickets.length === 0 && venuePMTickets.length > 0) {
        setIsMorning(false);
      } else if (venueAMTickets.length > 0) {
        setIsMorning(true);
      }
    }
  };

  const handleVenueChange = (venueId: number) => {
    setActiveVenue(venueId);
    const selectedDateEvents = groupedTickets.find(
      (group) => group.date === activeDate
    );
    if (selectedDateEvents) {
      const venueAMTickets = selectedDateEvents.am.filter(
        (ticket) => ticket.venueid.id === venueId
      );
      const venuePMTickets = selectedDateEvents.pm.filter(
        (ticket) => ticket.venueid.id === venueId
      );
      if (venueAMTickets.length === 0 && venuePMTickets.length > 0) {
        setIsMorning(false);
      } else if (venueAMTickets.length > 0) {
        setIsMorning(true);
      }
    }
  };

  useEffect(() => {
    if (!eventTickets || eventTickets.length === 0) return;

    const uniqueVenuesMap = new Map();
    eventTickets.forEach((ticket) => {
      const venue = ticket.venueid;
      uniqueVenuesMap.set(venue.id, venue);
    });
    const uniqueVenues = Array.from(uniqueVenuesMap.values());
    setVenueTabs(uniqueVenues);
  }, [eventTickets]);

  useEffect(() => {
    if (
      !venueTabs.length ||
      hasSetInitialVenue ||
      venueIdFromQuery ||
      activeVenue ||
      isCalculatingDistance
    ) {
      return;
    }

    const setFallbackVenue = () => {
      if (venueTabs.length > 0) {
        setActiveVenue(venueTabs[0].id);
        setHasSetInitialVenue(true);
      }
    };

    const findAndSetNearestVenue = async (coordinates: Coordinates) => {
      setIsCalculatingDistance(true);
      try {
        const nearestVenue = await findNearestVenueAPI(
          coordinates.latitude,
          coordinates.longitude,
          venueTabs
        );
        if (nearestVenue) {
          setActiveVenue(nearestVenue.id);
        } else {
          setFallbackVenue();
        }
      } catch (error) {
        console.error("Error finding nearest venue:", error);
        setFallbackVenue();
      } finally {
        setIsCalculatingDistance(false);
        setHasSetInitialVenue(true);
      }
    };

    // If we have URL coordinates, use them immediately
    if (urlCoordinates) {
      findAndSetNearestVenue(urlCoordinates);
    }

    // If no URL coordinates, fall back to geolocation logic
    else if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      findAndSetNearestVenue({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
    // If geolocation is not available or disabled, use fallback
    else if (!isGeolocationAvailable || !isGeolocationEnabled) {
      setFallbackVenue();
    }
    // If geolocation is available but we don't have coords yet, wait
  }, [
    venueTabs,
    urlCoordinates,
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    hasSetInitialVenue,
    venueIdFromQuery,
    activeVenue,
    isCalculatingDistance,
  ]);

  // Handle grouped tickets and time switching logic
  useEffect(() => {
    if (!eventTickets) return;
    const sortedData = groupTicketsByDateWithAMPM(eventTickets);
    setGroupedTickets(sortedData);

    if (sortedData.length > 0) {
      if (!activeDate) {
        setActiveDate(sortedData[0].date);
      }
      const selectedDateData = sortedData.find(
        (item) => item.date === (activeDate || sortedData[0].date)
      );
      if (!selectedDateData) return;

      if (activeVenue) {
        const venueAMTickets = selectedDateData.am.filter(
          (ticket) => ticket.venueid.id === activeVenue
        );
        const venuePMTickets = selectedDateData.pm.filter(
          (ticket) => ticket.venueid.id === activeVenue
        );
        if (venueAMTickets.length === 0 && venuePMTickets.length > 0) {
          setIsMorning(false);
        } else {
          setIsMorning(true);
        }
      } else {
        const hasAM = selectedDateData.am.length > 0;
        const hasPM = selectedDateData.pm.length > 0;
        if (!hasAM && hasPM) {
          setIsMorning(false);
        } else {
          setIsMorning(true);
        }
      }
    }
  }, [eventTickets, activeVenue, activeDate]);

  if (isLoading) {
    return <EventTicketSkeleton />;
  }

  // Show venue selection screen
  if (isSelectingVenue) {
    return (
      <VenueClient
        isSelecting={true}
        activeVenueId={activeVenue ?? 0}
        venues={[...venueTabs]}
        onVenueChange={handleVenueChange}
        onToggleSelection={setIsSelectingVenue}
      />
    );
  }

  const activeTickets = groupedTickets.find(
    (group) => group.date === activeDate
  );
  const displayTickets =
    activeTickets && activeVenue
      ? (isMorning ? activeTickets.am : activeTickets.pm).filter(
          (ticket) => ticket.venueid.id === activeVenue
        )
      : [];

  return (
    <main className={`${archivo.className}`}>
      <div className="min-h-screen bg-black bg-opacity-60 backdrop-blur-4xl">
        {/* Show loading indicator when calculating distance */}
        {isCalculatingDistance && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-white/10">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500" />
              <span className="text-sm font-medium">
                Finding nearest venue...
              </span>
            </div>
          </div>
        )}

        <VenueClient
          isSelecting={false}
          activeVenueId={activeVenue ?? 0}
          venues={[...venueTabs]}
          onVenueChange={handleVenueChange}
          onToggleSelection={setIsSelectingVenue}
        />

        <DateTabs
          onDateChange={handleDateChange}
          activeDate={activeDate}
          groupedTickets={groupedTickets}
        />
        <TimeSwitch isMorning={isMorning} onTimeChange={setIsMorning} />
        <TicketsList
          activeVenue={activeVenue ?? 0}
          activeDate={activeDate}
          isMorning={isMorning}
          displayTicketsData={displayTickets}
          onTicketClick={handleTicketClick}
        />
        <KnowYourLevel fixed={true} />
      </div>
    </main>
  );
}
