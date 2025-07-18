import EventTimeSwitch from "@/components/funcircle-events/EventTimeSwitch";
import { Clock } from "lucide-react";
import React from "react";

export default function TimeSwitch({
  isMorning,
  onTimeChange,
}: {
  isMorning: boolean;
  onTimeChange: (isMorning: boolean) => void;
}) {
  return (
    <div>
      <div className="border-t border-b border-zinc-800/50 mt-6 py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-medium">
              Time of Day : {isMorning ? "Morning" : "Evening"}
            </h3>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <p className="text-white text-sm  mb-2">Click to change</p>
              <EventTimeSwitch
                value={isMorning}
                defaultStatus={isMorning}
                onChange={(e) => {
                  onTimeChange(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
