import { TicketType } from "@/app/types";
import { FormatDateTime } from "@/app/utils/Formating/DateFormat";
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
    <div className="px-4 w-full">
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2">
          {groupedTickets.map((group) => {
            const formattedDate = FormatDateTime(group.date);
            const isActive = activeDate === group.date;
            const hasAMEvents = group.am.length > 0;
            const hasPMEvents = group.pm.length > 0;
            const hasEvents = hasAMEvents || hasPMEvents;
            console.log(hasEvents);

            return (
              <button
                key={group.date}
                onClick={() => onDateChange(group.date)}
                className={`flex flex-col items-center px-5 py-2 rounded-xl transition-all duration-200 min-w-[92px] ${
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
                {/* {hasEvents && (
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-1 ${
                      isActive ? "bg-white" : "bg-purple-500"
                    }`}
                  />
                )} */}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
