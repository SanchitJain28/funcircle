"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEventTickets } from "@/hooks/useEvents";
import { TicketType, Venue } from "@/app/types";
import DateTabs from "./DateTabs";
import TimeSwitch from "./TimeSwitch";
import TicketsList from "./TicketsList";
import EventTicketSkeleton from "./EventTicketSkelation";
import KnowYourLevel from "./KnowYourLevel";
import { Archivo } from "next/font/google";
import { findNearestVenue } from "@/utils/DistanceCalulator";
import VenueClient from "./VenueClient";

type GroupedTickets = {
  date: string;
  am: TicketType[];
  pm: TicketType[];
};

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

  // States
  const [isMorning, setIsMorning] = useState<boolean>(true);
  const [groupedTickets, setGroupedTickets] = useState<GroupedTickets[]>([]);
  const [activeVenue, setActiveVenue] = useState<number | null>(null);
  const [venueTabs, setVenueTabs] = useState<Venue[] | []>([]);
  const [activeDate, setActiveDate] = useState<string>("");
  const [isSelectingVenue, setIsSelectingVenue] = useState(false); // Single source of truth

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

  const [, setLoadingLocation] = useState(true);
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
      setLoadingLocation(false);
    };
    if (!navigator.geolocation) {
      setFallbackVenue();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const nearestVenue = findNearestVenue(userLat, userLng, uniqueVenues);
        if (nearestVenue) {
          setActiveVenue(nearestVenue.id);
        } else {
          setFallbackVenue();
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLat = pos.coords.latitude;
            const userLng = pos.coords.longitude;
            const nearestVenue = findNearestVenue(
              userLat,
              userLng,
              uniqueVenues
            );
            if (nearestVenue) {
              setActiveVenue(nearestVenue.id);
            }
            setLoadingLocation(false);
          },
          (err) => {
            console.log(err)
            setLoadingLocation(false);
          },
          { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
        );
      },
      (err) => {
        console.log(err);
        setFallbackVenue();
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity }
    );
  }, [eventTickets]);
  
  if (isLoading) {
    return <EventTicketSkeleton />;
  }

  // UPDATED RENDER LOGIC
  if (isSelectingVenue) {
    return (
      <VenueClient
        isSelecting={true} // Tell component to show the VenueScreen
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
        <VenueClient
          isSelecting={false} // Tell component to show the display button
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