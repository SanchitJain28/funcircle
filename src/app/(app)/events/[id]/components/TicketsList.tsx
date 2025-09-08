"use client";

import type { TicketType } from "@/app/types";
import { FormatDateTime } from "@/app/utils/Formating/DateFormat";
import { Ticket } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";

export default function TicketsList({
  activeDate,
  onTicketClick,
  isMorning,
  displayTicketsData,
}: {
  activeVenue: number;
  activeDate: string;
  isMorning: boolean;
  displayTicketsData: TicketType[];
  onTicketClick: (ticketId: number) => void;
}) {
  const [activeTabs, setActiveTabs] = React.useState<string | null>(null);

  // Use useMemo for level tabs calculation to avoid unnecessary recalculations
  const levelTabs = useMemo(() => {
    const possibleTabs = [
      "level 1",
      "level 2",
      "level 3",
      "level 4",
      "level 5",
    ];

    const activeTabs = possibleTabs.filter((tab) =>
      displayTicketsData.some((ticket) =>
        ticket.title.toLowerCase().includes(tab)
      )
    );

    return activeTabs;
  }, [displayTicketsData]);

  // Calculate filtered tickets based on active tab
  const displayTickets = useMemo(() => {
    if (!activeTabs) {
      return displayTicketsData;
    }

    return displayTicketsData.filter((ticket) =>
      ticket.title.toLowerCase().includes(activeTabs.toLowerCase())
    );
  }, [displayTicketsData, activeTabs]);

  const handleTabChange = (tab: string) => {
    if (activeTabs === tab) {
      // If the tab is already active, reset to show all tickets
      setActiveTabs(null);
    } else {
      // Set the new active tab
      setActiveTabs(tab);
    }
  };

  // Reset active tab when displayTicketsData changes
  useEffect(() => {
    setActiveTabs(null);
  }, [displayTicketsData]);

  return (
    <div className="px-4 py-2">
      {/* Render the level tabs if available */}
      {levelTabs.length > 0 && (
        <div className="flex space-x-2 mb-4">
          {levelTabs.map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTabs === tab
                  ? "bg-purple-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {displayTickets.length > 0 ? (
          <motion.div
            key={`${activeDate}-${isMorning ? "am" : "pm"}-${activeTabs || "all"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {displayTickets.map((event) => {
              const formattedDate = FormatDateTime(String(event.startdatetime));
              const availableTickets = event.capacity - event.bookedtickets;
              const isLowAvailability =
                availableTickets <= 2 && availableTickets > 0;
              const isSoldOut = availableTickets <= 0;

              return (
                <Link key={event.id} href={`/funcircle/ticket?id=${event.id}`}>
                  <div className="flex items-center gap-3 my-2">
                    {/* Time on the left */}
                    <div className="text-white text-lg font-bold min-w-[80px] flex flex-col justify-center items-center">
                      {formattedDate.time}
                      {(isLowAvailability || isSoldOut) && (
                        <div
                          className={`
                            w-8 h-8 rounded-full flex items-center justify-center
                            bg-zinc-600/80 border border-zinc-500/30
                            ${isSoldOut ? "text-red-300" : "text-white"}
                          `}
                        >
                          <span className="font-semibold text-xl px-2 ">
                            {isSoldOut ? "0" : availableTickets}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Event card on the right */}
                    <motion.div
                      className={`
                        bg-[#1a1a1c] rounded-xl overflow-hidden cursor-pointer flex-1 relative
                        transition-all duration-200
                        ${
                          isSoldOut
                            ? "opacity-50 border border-red-500/30"
                            : isLowAvailability
                              ? "border border-yellow-500/30 hover:border-yellow-500/50"
                              : "border border-transparent hover:border-purple-500/30"
                        }
                      `}
                      onClick={() => onTicketClick(event.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="py-3 px-4 flex items-center gap-3">
                        {/* Embedded border badge */}
                        {(isLowAvailability || isSoldOut) && (
                          <div className="absolute -bottom-0 right-3 z-10">
                            <div
                              className={`
                                px-2 py-1 rounded text-xs font-semibold
                                ${isSoldOut ? "bg-red-500/90 text-white" : "bg-yellow-500/90 text-black"}
                              `}
                            >
                              {isSoldOut ? "SOLD OUT" : "FILLING FAST"}
                            </div>
                          </div>
                        )}
                        <h3 className="text-white font-semibold text-base">
                          {event.title.toLowerCase().includes("level") ? (
                            <>
                              <span className="text-[#DA4E0D]">
                                {event.title.slice(0, 7)}
                              </span>
                              {event.title.slice(7)}
                            </>
                          ) : (
                            event.title
                          )}
                        </h3>
                      </div>
                    </motion.div>
                  </div>
                </Link>
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
              {activeTabs
                ? `No ${activeTabs} events available for this ${isMorning ? "morning" : "evening"}.`
                : `There are no ${isMorning ? "morning" : "evening"} events scheduled for this date.`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
