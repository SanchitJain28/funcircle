import { TicketType } from "@/app/types";
import { FormatDateTime } from "@/app/utils/Formating/DateFormat";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

import React from "react";
export default function TicketsList({
  activeDate,
  onTicketClick,
  isMorning,
  displayTickets,
}: {
  activeDate: string;
  isMorning: boolean;
  displayTickets: TicketType[];
  onTicketClick: (ticketId: number) => void;
}) {
  return (
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
              const formattedDate = FormatDateTime(String(event.startdatetime));
              const availabilityPercentage = Math.round(
                (event.availablecapacity / event.capacity) * 100
              );
              const isLowAvailability = availabilityPercentage < 20;

              return (
                <Link key={event.id} href={`/funcircle/ticket?id=${event.id}`}>
                  <motion.div
                    className="bg-[#1a1a1c] rounded-xl my-3 overflow-hidden shadow-md border border-zinc-800/50 cursor-pointer"
                    onClick={() => onTicketClick(event.id)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-purple-500/20 text-purple-300 border-none">
                          {formattedDate.time}
                        </Badge>
                        {isLowAvailability && (
                          <Badge className="bg-red-500/20 text-red-300 border-none">
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
