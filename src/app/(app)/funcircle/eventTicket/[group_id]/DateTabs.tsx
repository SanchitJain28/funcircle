import { TicketType } from "@/app/types";
import { FormatDateTime } from "@/app/utils/Formating/DateFormat";
import { Calendar } from "lucide-react";
import React from "react";

type GroupedTickets = {
  date: string;
  am: TicketType[];
  pm: TicketType[];
};

interface DateTabsProps {
  groupedTickets: GroupedTickets[];
  activeDate: string;
  onDateChange: (date: string) => void;
}

export default function DateTabs({
  onDateChange,
  activeDate,
  groupedTickets,
}: DateTabsProps) {
  return (
    <div className="pt-4 px-4">
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
                onClick={() => onDateChange(group.date)}
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
  );
}
