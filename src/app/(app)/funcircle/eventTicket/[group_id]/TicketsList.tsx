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
  console.log(displayTickets);

  return (
    <div className="px-4 py-2">
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
                        {/* Number indicator styled like the reference image */}
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
