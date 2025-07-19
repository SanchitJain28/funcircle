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
      setActiveDate(sortedData[0].date);

      // Set default time of day based on first venue's availability
      if (activeVenue) {
        const firstDateTickets = sortedData[0];
        const venueAMTickets = firstDateTickets.am.filter(
          (ticket) => ticket.venueid.id === activeVenue
        );
        const venuePMTickets = firstDateTickets.pm.filter(
          (ticket) => ticket.venueid.id === activeVenue
        );

        if (venueAMTickets.length === 0 && venuePMTickets.length > 0) {
          setIsMorning(false);
        } else {
          setIsMorning(true);
        }
      } else {
        // Fallback to original logic if no active venue yet
        const hasAM = sortedData[0].am.length > 0;
        const hasPM = sortedData[0].pm.length > 0;

        if (!hasAM && hasPM) {
          setIsMorning(false);
        } else {
          setIsMorning(true);
        }
      }
    }
  }, [eventTickets, activeVenue]);

  useEffect(() => {
    //EXTRACT THE VENUES FROM THE DATA
    const uniqueVenuesMap = new Map();

    eventTickets.forEach((ticket) => {
      const venue = ticket.venueid;
      uniqueVenuesMap.set(venue.id, venue); // Use ID as key, venue object as value
    });

    const uniqueVenues = Array.from(uniqueVenuesMap.values());

    setVenueTabs(uniqueVenues);

    if (uniqueVenues.length > 0) {
      setActiveVenue(uniqueVenues[0].id);
    }
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
    <div className="min-h-screen bg-[#0f0f11]">
      {/* Date Tabs */}
      <DateTabs
        onDateChange={handleDateChange}
        activeDate={activeDate}
        groupedTickets={groupedTickets}
      />

      {/* Time Switch */}
      <TimeSwitch isMorning={isMorning} onTimeChange={setIsMorning} />

      <VenueTabsList
        VenueTabs={VenueTabs}
        activeTabId={activeVenue ?? 9}
        onChange={handleVenueChange}
      />

      {/* Tickets List */}
      <TicketsList
        activeVenue={activeVenue ?? 9}
        activeDate={activeDate}
        isMorning={isMorning}
        displayTickets={displayTickets}
        onTicketClick={handleTicketClick}
      />
    </div>
  );
}
