"use client";

import type React from "react";
import { Check } from "lucide-react";

const weekdays = [
  { full: "Monday", short: "Mon" },
  { full: "Tuesday", short: "Tue" },
  { full: "Wednesday", short: "Wed" },
  { full: "Thursday", short: "Thu" },
  { full: "Friday", short: "Fri" },
  { full: "Saturday", short: "Sat" },
  { full: "Sunday", short: "Sun" },
];

type Props = {
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
};

const WeekdaySelector: React.FC<Props> = ({
  selectedDays,
  setSelectedDays,
}) => {
  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto p-3 bg-black rounded-xl">
      <h3 className="text-white text-lg font-medium mb-3 text-center">
        Select Days
      </h3>

      {/* Compact grid layout */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {weekdays.map((day) => (
          <button
            key={day.full}
            onClick={() => toggleDay(day.full)}
            className={`
              relative py-3 px-3 rounded-lg font-medium text-sm
              transition-all duration-200 ease-in-out
              border border-opacity-50 active:scale-95
              flex items-center justify-between
              min-h-[48px]
              ${
                selectedDays.includes(day.full)
                  ? "bg-white text-black border-white"
                  : "bg-gray-900 text-white border-gray-600 active:bg-gray-800"
              }
            `}
          >
            <span className="text-left">{day.short}</span>
            {selectedDays.includes(day.full) && (
              <Check className="w-4 h-4 flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Compact summary */}
      {selectedDays.length > 0 && (
        <div className="mb-3 p-2 bg-gray-900 rounded-lg border border-gray-700 text-center">
          <span className="text-white text-sm">
            {selectedDays.length} day{selectedDays.length !== 1 ? "s" : ""}{" "}
            selected
          </span>
        </div>
      )}

      {/* Compact quick actions */}
      <div className="flex gap-1 text-xs">
        <button
          onClick={() =>
            setSelectedDays(weekdays.slice(0, 5).map((d) => d.full))
          }
          className="flex-1 py-2 px-2 bg-gray-800 text-white rounded border border-gray-600 active:bg-gray-700"
        >
          Weekdays
        </button>
        <button
          onClick={() => setSelectedDays(weekdays.slice(5).map((d) => d.full))}
          className="flex-1 py-2 px-2 bg-gray-800 text-white rounded border border-gray-600 active:bg-gray-700"
        >
          Weekend
        </button>
        <button
          onClick={() => setSelectedDays([])}
          className="flex-1 py-2 px-2 bg-gray-800 text-white rounded border border-gray-600 active:bg-gray-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default WeekdaySelector;
