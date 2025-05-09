"use client";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";

interface EventTimeSwitchProps {
  onChange?: (isMorning: boolean) => void;
  className?: string;
}

export default function EventTimeSwitch({
  onChange,
}: EventTimeSwitchProps) {
  const [isMorning, setIsMorning] = useState(true);
  const toggleSwitch = () => {
    const newValue = !isMorning;
    setIsMorning(newValue);
    onChange?.(newValue);
  };
  return (
    <div className="">
      <div className={cn("flex flex-col items-center gap-2")}>
        <button
          onClick={toggleSwitch}
          className={cn(
            "relative flex h-8 w-20 cursor-pointer items-center rounded-full p-1 transition-colors",
            isMorning
              ? "bg-gradient-to-r from-amber-300 to-yellow-500"
              : "bg-gradient-to-r from-indigo-900 to-purple-900"
          )}
          aria-label={
            isMorning ? "Switch to night events" : "Switch to morning events"
          }
        >
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            initial={false}
          >
            {isMorning ? (
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1 right-1 h-3 w-3 rounded-full bg-yellow-200 blur-sm" />
                <div className="absolute top-2 right-6 h-2 w-2 rounded-full bg-yellow-200 blur-sm" />
                <div className="absolute top-6 right-3 h-1 w-1 rounded-full bg-yellow-200 blur-sm" />
              </div>
            ) : (
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1 right-2 h-1 w-1 rounded-full bg-white blur-[0.5px]" />
                <div className="absolute top-3 right-8 h-1 w-1 rounded-full bg-white blur-[0.5px]" />
                <div className="absolute top-5 right-4 h-1 w-1 rounded-full bg-white blur-[0.5px]" />
                <div className="absolute top-8 right-10 h-1 w-1 rounded-full bg-white blur-[0.5px]" />
                <div className="absolute top-2 right-14 h-1 w-1 rounded-full bg-white blur-[0.5px]" />
              </div>
            )}
          </motion.div>

          <motion.div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              isMorning ? "bg-yellow-400" : "bg-indigo-800"
            )}
            layout
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
          >
            {isMorning ? (
              <Sun className="h-3.5 w-3.5 text-black " />
            ) : (
              <Moon className="h-3.5 w-3.5 text-black" />
            )}
          </motion.div>
        </button>
      </div>
    </div>
  );
}
