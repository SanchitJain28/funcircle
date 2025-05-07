"use client";
import React from "react";
import { FormatDateTime } from "@/app/utils/Formating/DateFormat";
import axios, { type AxiosError } from "axios";
import {
  Calendar,
  Clock,
  Loader2,
  MapPin,
  Ticket,
  UserRound,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { motion, AnimatePresence } from "framer-motion";
import EventTimeSwitch from "@/app/components/EventTimeSwitch";

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

export default function EventTicket() {
  const { group_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [isMorning, setIsMorning] = useState<boolean>(true);
  const [groupedTickets, setGroupedTickets] = useState<GroupedTickets[]>([]);
  const [activeDate, setActiveDate] = useState<string>("");

  // Fetch tickets from API
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post("/api/FetchTickets", { group_id });
      const sortedData = groupTicketsByDateWithAMPM(data);
      setGroupedTickets(sortedData);

      if (sortedData.length > 0) {
        setActiveDate(sortedData[0].date);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast("Sorry, an unexpected error occurred", {
        description:
          (axiosError.response?.data as { message: string })?.message ||
          "Failed to load tickets",
      });
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
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
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            {/* Location Section */}
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-lg">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">Location</p>
                <p className="text-white font-bold text-lg">Gurgaon</p>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-white/70 text-sm font-medium text-right">
                  Welcome
                </p>
                <p className="text-white font-bold text-lg text-right">
                  Guest User
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-lg">
                <UserRound className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
              const hasEvents =
                (isMorning ? group.am.length : group.pm.length) > 0;

              return (
                <button
                  key={group.date}
                  onClick={() => setActiveDate(group.date)}
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
            {/* <Label
              htmlFor="time-switch"
              className={`text-sm font-medium ${!isMorning ? "text-white" : "text-zinc-500"}`}
            >
              Evening
            </Label> */}
            {/* <Switch
              id="time-switch"
              checked={isMorning}
              onCheckedChange={setIsMorning}
              className="data-[state=checked]:bg-purple-600"
            />
            <Label
              htmlFor="time-switch"
              className={`text-sm font-medium ${isMorning ? "text-white" : "text-zinc-500"}`}
            >
              Morning
            </Label> */}
            <p className="text-white font-bold">
              {isMorning ? "Morning" : "Evening"}
            </p>

            <EventTimeSwitch
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

                      {/* <div className="w-full bg-zinc-800/50 rounded-full h-1.5 mt-2">
                        <div
                          className={`h-1.5 rounded-full ${
                            isLowAvailability ? "bg-red-500" : "bg-purple-500"
                          }`}
                          style={{ width: `${100 - availabilityPercentage}%` }}
                        />
                      </div> */}

                      {/* <div className="flex justify-between items-center mt-2 text-xs">
                        <span className="text-zinc-500">
                          {event.bookedtickets} booked
                        </span>
                        <span
                          className={
                            isLowAvailability
                              ? "text-red-400"
                              : "text-purple-400"
                          }
                        >
                          {event.availablecapacity} seats left
                        </span>
                      </div> */}
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
    </div>
  );
}
