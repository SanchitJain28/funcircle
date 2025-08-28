"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEventTickets } from "@/hooks/useEvents";
import { TicketType } from "@/app/types";
import DateTabs from "./DateTabs";
import TimeSwitch from "./TimeSwitch";
import TicketsList from "./TicketsList";
import EventTicketSkeleton from "./EventTicketSkelation";
import VenueTabsList from "./VenueTabs";
import KnowYourLevel from "./KnowYourLevel";
import { Archivo } from "next/font/google";
import { findNearestVenue } from "@/utils/DistanceCalulator";

type GroupedTickets = {
  date: string;
  am: TicketType[];
  pm: TicketType[];
};

export interface Venue {
  id: number;
  created_at: string; // or Date if you want to parse it
  venue_name: string;
  images: string[];
  maps_link: string;
  description: string;
  location: string;
}

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function EventTicketClient({
  group_id,
  data,
}: {
  group_id: string;
  data: TicketType[];
}) {
  const router = useRouter();
  const [isMorning, setIsMorning] = useState<boolean>(true);
  const [groupedTickets, setGroupedTickets] = useState<GroupedTickets[]>([]);
  const [activeVenue, setActiveVenue] = useState<number | null>(null);
  const [VenueTabs, setVenueTabs] = useState<Venue[] | []>([]);

  const [activeDate, setActiveDate] = useState<string>("");

  const { data: eventTickets, isLoading } = useEventTickets({
    group_id,
    initialData: data,
  });

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

  // Handle date change to set appropriate default time of day
  const handleDateChange = (date: string) => {
    setActiveDate(date);

    // Find the selected date's events for the active venue
    const selectedDateEvents = groupedTickets.find(
      (group) => group.date === date
    );

    if (selectedDateEvents && activeVenue) {
      // Filter tickets by active venue
      const venueAMTickets = selectedDateEvents.am.filter(
        (ticket) => ticket.venueid.id === activeVenue
      );
      const venuePMTickets = selectedDateEvents.pm.filter(
        (ticket) => ticket.venueid.id === activeVenue
      );

      // If no morning events but evening events exist for this venue, switch to evening
      if (venueAMTickets.length === 0 && venuePMTickets.length > 0) {
        setIsMorning(false);
      }
      // If there are morning events for this venue, switch to morning
      else if (venueAMTickets.length > 0) {
        setIsMorning(true);
      }
      // Otherwise maintain current selection
    }
  };

  // Handle venue change to set appropriate default time of day
  const handleVenueChange = (venueId: number) => {
    setActiveVenue(venueId);

    // Find the selected date's events for the new venue
    const selectedDateEvents = groupedTickets.find(
      (group) => group.date === activeDate
    );

    if (selectedDateEvents) {
      // Filter tickets by new venue
      const venueAMTickets = selectedDateEvents.am.filter(
        (ticket) => ticket.venueid.id === venueId
      );
      const venuePMTickets = selectedDateEvents.pm.filter(
        (ticket) => ticket.venueid.id === venueId
      );

      // If no morning events but evening events exist for this venue, switch to evening
      if (venueAMTickets.length === 0 && venuePMTickets.length > 0) {
        setIsMorning(false);
      }
      // If there are morning events for this venue, switch to morning
      else if (venueAMTickets.length > 0) {
        setIsMorning(true);
      }
      // Otherwise maintain current selection
    }
  };

  useEffect(() => {
    if (!eventTickets) return;

    const sortedData = groupTicketsByDateWithAMPM(eventTickets);
    setGroupedTickets(sortedData);

    if (sortedData.length > 0) {
      if (!activeDate) {
        setActiveDate(sortedData[0].date);
      }

      // Find the data for the selected (active) date
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
        // Fallback to checking AM/PM availability without venue
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

  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    const uniqueVenuesMap = new Map();
    eventTickets.forEach((ticket) => {
      const venue = ticket.venueid;
      uniqueVenuesMap.set(venue.id, venue);
    });

    const uniqueVenues = Array.from(uniqueVenuesMap.values());
    setVenueTabs(uniqueVenues);

    if (uniqueVenues.length === 0) return;

    const setFallbackVenue = () => {
      setActiveVenue(uniqueVenues[0].id);
      console.log("Using fallback venue:", uniqueVenues[0].venue_name);
      setLoadingLocation(false);
    };

    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      setFallbackVenue();
      return;
    }

    // Step 1: Quick location (cached, may be older)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        console.log("Fast cached location:", userLat, userLng);

        const nearestVenue = findNearestVenue(userLat, userLng, uniqueVenues);
        if (nearestVenue) {
          setActiveVenue(nearestVenue.id);
          console.log("Nearest (cached):", nearestVenue.venue_name);
        } else {
          setFallbackVenue();
        }

        // Step 2: Request fresh high-accuracy location
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLat = pos.coords.latitude;
            const userLng = pos.coords.longitude;

            console.log("Refined accurate location:", userLat, userLng);

            const nearestVenue = findNearestVenue(
              userLat,
              userLng,
              uniqueVenues
            );
            if (nearestVenue) {
              setActiveVenue(nearestVenue.id);
              console.log("Nearest (accurate):", nearestVenue.venue_name);
            }
            setLoadingLocation(false);
          },
          (err) => {
            console.warn("Accurate geolocation error:", err.message);
            setLoadingLocation(false);
          },
          { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
        );
      },
      (err) => {
        console.warn("Fast geolocation error:", err.message);
        setFallbackVenue();
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity } // fast first
    );
  }, [eventTickets]);

  if (isLoading) {
    return <EventTicketSkeleton />;
  }

  const activeTickets = groupedTickets.find(
    (group) => group.date === activeDate
  );

  // Filter tickets by active venue and time period
  const displayTickets =
    activeTickets && activeVenue
      ? (isMorning ? activeTickets.am : activeTickets.pm).filter(
          (ticket) => ticket.venueid.id === activeVenue
        )
      : [];

  return (
    <main className={`${archivo.className}`}>
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1d] via-[#0f0f11] to-[#1a1a1d] bg-opacity-60 backdrop-blur-4xl">
        {/* Date Tabs */}
        <div className="mx-4 mt-4 mb-4">
          <VenueTabsList
            VenueTabs={VenueTabs}
            activeTabId={activeVenue ?? 9}
            onChange={handleVenueChange}
          />
          {loadingLocation ? (
            <p className="text-gray-400 italic">Loading your location...</p>
          ) : (
            <p className="text-green-500"></p>
          )}
        </div>

        <DateTabs
          onDateChange={handleDateChange}
          activeDate={activeDate}
          groupedTickets={groupedTickets}
        />

        {/* Time Switch */}
        <TimeSwitch isMorning={isMorning} onTimeChange={setIsMorning} />

        {/* Tickets List */}
        <TicketsList
          activeVenue={activeVenue ?? 9}
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
