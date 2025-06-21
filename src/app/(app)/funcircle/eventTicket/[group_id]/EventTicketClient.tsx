"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth, useIsLevelSet } from "@/hooks/useAuth";
import AuthPopup from "@/components/Funcircle-signup/Authpopup";
import { useEventTickets } from "@/hooks/useEvents";
import { TicketType } from "@/app/types";
import DateTabs from "./DateTabs";
import TimeSwitch from "./TimeSwitch";
import TicketsList from "./TicketsList";
import LoadingSpinner from "./LoadingSpinner";

type GroupedTickets = {
  date: string;
  am: TicketType[];
  pm: TicketType[];
};

export default function EventTicketClient({ group_id }: { group_id: string }) {
  const router = useRouter();
  const [isMorning, setIsMorning] = useState<boolean>(true);
  const [groupedTickets, setGroupedTickets] = useState<GroupedTickets[]>([]);

  const [activeDate, setActiveDate] = useState<string>("");

  
  //FOR AUTHENTICATION
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const { user, authLoading } = useAuth();

  //DATA FETCHING

  const { data: eventTickets, isLoading } = useEventTickets({ group_id });

  const { data: isSupabaseLevelSet } = useIsLevelSet({
    user_id: user?.uid ?? "",
    enabled: !authLoading,
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
    if (!user) {
      setIsAuthPopupOpen(true);
      return;
    }
    router.push(
      isSupabaseLevelSet
        ? `/funcircle/ticket?id=${ticketId}`
        : `/assign-level?rq=${ticketId}`
    );
  };

  // Handle date change to set appropriate default time of day
  const handleDateChange = (date: string) => {
    setActiveDate(date);

    // Find the selected date's events
    const selectedDateEvents = groupedTickets.find(
      (group) => group.date === date
    );

    if (selectedDateEvents) {
      // If no morning events but evening events exist, switch to evening
      if (
        selectedDateEvents.am.length === 0 &&
        selectedDateEvents.pm.length > 0
      ) {
        setIsMorning(false);
      }
      // If there are morning events (regardless of evening events), switch to morning
      else if (selectedDateEvents.am.length > 0) {
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

      // Set default time of day
      const hasAM = sortedData[0].am.length > 0;
      const hasPM = sortedData[0].pm.length > 0;

      if (!hasAM && hasPM) {
        setIsMorning(false);
      } else {
        setIsMorning(true);
      }
    }
  }, [eventTickets]);

  const Loading = isLoading || authLoading;

  if (Loading) {
    return <LoadingSpinner/>
  }

  const activeTickets = groupedTickets.find(
    (group) => group.date === activeDate
  );
  const displayTickets = activeTickets
    ? isMorning
      ? activeTickets.am
      : activeTickets.pm
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

      {/* Tickets List */}
      <TicketsList
        activeDate={activeDate}
        isMorning={isMorning}
        displayTickets={displayTickets}
        onTicketClick={handleTicketClick}
      />

      <AuthPopup
        isOpen={isAuthPopupOpen}
        onClose={() => setIsAuthPopupOpen(false)}
        eventTitle=""
      />
    </div>
  );
}
