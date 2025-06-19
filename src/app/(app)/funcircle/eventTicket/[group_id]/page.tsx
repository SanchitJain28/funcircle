"use client";
import React from "react";
import { FormatDateTime } from "@/app/utils/Formating/DateFormat";
import axios from "axios";
import { Calendar, Clock, Loader2, MapPin, Ticket } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

import { motion, AnimatePresence } from "framer-motion";
import EventTimeSwitch from "@/components/funcircle-events/EventTimeSwitch";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { useAuth } from "@/hooks/useAuth";
import AuthPopup from "@/components/Funcircle-signup/Authpopup";
import { createClient } from "@/app/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export interface TicketType {
  id: number;
  bookedtickets: number;
  capacity: number;
  ticketstatus: string;
  type: string;
  title: string;
  location: string;
  price: string;
  availablecapacity: number;
  description: string;
  enddatetime: Date;
  startdatetime: Date;
  group_id: number;
  venueid: {
    images: string[];
    info: string;
    location: string;
    maps_link: string;
    venue_name: string;
  };
}

type GroupedTickets = {
  date: string;
  am: TicketType[];
  pm: TicketType[];
};

async function fetchTicketsByGroupId(group_id: string) {
  const {
    data: { data },
  } = await axios.post("/api/FetchTickets", { group_id });

  return data;
}

export default function EventTicket() {
  const supabase = createClient();
  const { group_id } = useParams();
  const router = useRouter();
  const [isMorning, setIsMorning] = useState<boolean>(true);
  const [groupedTickets, setGroupedTickets] = useState<GroupedTickets[]>([]);

  const [activeDate, setActiveDate] = useState<string>("");
  //FOR AUTHENTICATION
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const { user, authLoading } = useAuth();
  const [redirectionToAssignLevel, setRedirectionToAssignLevel] =
    useState(false);
  // Fetch tickets from API

  const { data: eventTickets, isLoading } = useQuery({
    queryKey: ["eventTickets", group_id],
    queryFn: () => fetchTicketsByGroupId(group_id as string),
  });
  // const fetchTickets = async () => {
  //   setLoading(true);
  //   try {
  //     const {
  //       data: { data },
  //     } = await axios.post("/api/FetchTickets", { group_id });
  //     const sortedData = groupTicketsByDateWithAMPM(data);
  //     setGroupedTickets(sortedData);

  //     if (sortedData.length > 0) {
  //       setActiveDate(sortedData[0].date);

  //       // Set default time of day based on availability
  //       if (sortedData[0].am.length === 0 && sortedData[0].pm.length > 0) {
  //         // If no morning events but evening events exist, default to evening
  //         setIsMorning(false);
  //       } else {
  //         // Otherwise default to morning (this includes when both exist or only morning exists)
  //         setIsMorning(true);
  //       }
  //     }
  //   } catch (error) {
  //     const axiosError = error as AxiosError;
  //     toast("Sorry, an unexpected error occurred", {
  //       description:
  //         (axiosError.response?.data as { message: string })?.message ||
  //         "Failed to load tickets",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    console.log(redirectionToAssignLevel);
    router.push(
      redirectionToAssignLevel
        ? `/assign-level?rq=${ticketId}`
        : `/funcircle/ticket?id=${ticketId}`
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

  const IsSupabaseUserLevelSet = async () => {
    try {
      const { data } = await supabase
        .from("users")
        .select("usersetlevel")
        .eq("user_id", user?.uid)
        .single();
      if (!data?.usersetlevel) setRedirectionToAssignLevel(true);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    IsSupabaseUserLevelSet();
  }, []);

  const Loading = isLoading || authLoading;

  if (Loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1c] p-8 rounded-2xl flex flex-col items-center max-w-xs w-full shadow-lg border border-purple-500/20">
          <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
          <p className="text-white text-center font-medium text-lg">
            Loading Events
          </p>
          <p className="text-zinc-400 text-center text-sm mt-2">
            Please wait while we fetch your events
          </p>
        </div>
      </div>
    );
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
      {/* Header */}
      <CustomHeader />

      {/* Date Tabs */}
      <div className="mt-6 px-4">
        <h2 className="text-white text-xl font-bold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-400" />
          Select Date
        </h2>
        <div className="overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex space-x-2">
            {groupedTickets.map((group) => {
              const formattedDate = FormatDateTime(group.date);
              const isActive = activeDate === group.date;
              const hasAMEvents = group.am.length > 0;
              const hasPMEvents = group.pm.length > 0;
              const hasEvents = hasAMEvents || hasPMEvents;

              return (
                <button
                  key={group.date}
                  onClick={() => handleDateChange(group.date)}
                  className={`flex flex-col items-center px-5 py-3 rounded-xl transition-all duration-200 min-w-[90px] ${
                    isActive
                      ? "bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg"
                      : "bg-[#1a1a1c] hover:bg-[#252528]"
                  }`}
                >
                  <p
                    className={`font-bold text-lg ${
                      isActive ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {formattedDate.date}
                  </p>
                  <p
                    className={`font-medium ${
                      isActive ? "text-white/80" : "text-zinc-500"
                    }`}
                  >
                    {formattedDate.day.slice(0, 3)}
                  </p>
                  {hasEvents && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${
                        isActive ? "bg-white" : "bg-purple-500"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time Switch */}
      <div className="border-t border-b border-zinc-800/50 mt-6 py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-medium">Time of Day</h3>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-white font-bold">
              {isMorning ? "Morning" : "Evening"}
            </p>

            <EventTimeSwitch
              value={isMorning}
              defaultStatus={isMorning}
              onChange={(e) => {
                setIsMorning(e);
              }}
            />
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold flex items-center">
            <Ticket className="w-5 h-5 mr-2 text-purple-400" />
            Available Events
          </h2>
          <Badge
            variant="outline"
            className="bg-purple-500/10 text-purple-300 border-purple-500/30"
          >
            {displayTickets.length} Events
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          {displayTickets.length > 0 ? (
            <motion.div
              key={`${activeDate}-${isMorning ? "am" : "pm"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {displayTickets.map((event) => {
                const formattedDate = FormatDateTime(
                  String(event.startdatetime)
                );
                const availabilityPercentage = Math.round(
                  (event.availablecapacity / event.capacity) * 100
                );
                const isLowAvailability = availabilityPercentage < 20;

                return (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#1a1a1c] rounded-xl overflow-hidden shadow-md border border-zinc-800/50 cursor-pointer"
                    onClick={() => handleTicketClick(event.id)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-purple-500/20 text-purple-300 border-none">
                          {formattedDate.time}
                        </Badge>
                        {isLowAvailability && (
                          <Badge
                            variant="destructive"
                            className="bg-red-500/20 text-red-300 border-none"
                          >
                            Almost Full
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-white font-bold text-lg mb-2">
                        {event.title}
                      </h3>

                      <div className="flex items-center text-zinc-400 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">
                          {event.venueid.venue_name}, {event.venueid.location}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="bg-zinc-800/30 p-6 rounded-full mb-4">
                <Ticket className="w-10 h-10 text-zinc-500" />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">
                No Events Available
              </h3>
              <p className="text-zinc-500 max-w-xs">
                There are no {isMorning ? "morning" : "evening"} events
                scheduled for this date.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AuthPopup
        isOpen={isAuthPopupOpen}
        onClose={() => setIsAuthPopupOpen(false)}
        eventTitle="testing ticket"
      />
    </div>
  );
}
