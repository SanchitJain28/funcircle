"use client";

import type { TicketType } from "@/app/types";
import { FormatDateTime } from "@/app/utils/Formating/DateFormat";
import { Ticket } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import React from "react";

export default function TicketsList({
  activeDate,
  onTicketClick,
  isMorning,
  displayTickets,
}: {
  activeVenue: number;
  activeDate: string;
  isMorning: boolean;
  displayTickets: TicketType[];
  onTicketClick: (ticketId: number) => void;
}) {
  return (
    <div className="px-4 py-2">
      {/* <div className="flex items-center justify-between mb-4">
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
      </div> */}

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
              const formattedDate = FormatDateTime(String(event.startdatetime));
              // const availableTickets = event.capacity - event.bookedtickets;
              // const availabilityPercentage = Math.round((availableTickets / event.capacity) * 100)
              // const isLowAvailability = availabilityPercentage < 20
              // const isFillingFast =
              //   availableTickets <= 2 && availableTickets > 0;
              // const isSoldOut = availableTickets <= 0;

              return (
                <Link key={event.id} href={`/funcircle/ticket?id=${event.id}`}>
                  <div className="flex items-start gap-2 my-3">
                    {/* Time on the left */}
                    <div className="text-white text-xl font-bold min-w-[80px] pt-4 flex flex-col">
                      {formattedDate.time}
                      {/* {isFillingFast && !isSoldOut && (
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/40 border flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Filling Fast
                          </Badge>
                        </motion.div>
                      )} */}
                    </div>

                    {/* Event card on the right */}
                    <motion.div
                      className="bg-[#1a1a1c] rounded-xl overflow-hidden shadow-md border border-zinc-800/50 cursor-pointer hover:border-purple-500/30 transition-all duration-200 flex-1"
                      onClick={() => onTicketClick(event.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="py-2 px-4">
                        <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                          <div className="flex gap-2"></div>
                        </div>
                        <h3 className="text-white font-bold text mb-1">
                          {event.title}
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
              There are no {isMorning ? "morning" : "evening"} events scheduled
              for this date.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
