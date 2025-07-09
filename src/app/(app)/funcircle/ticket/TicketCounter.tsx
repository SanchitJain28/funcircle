import { TicketType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React from "react";

export default function TicketCounter({
  onChange,
  ticket,
  count,
}: {
  onChange: (e: number) => void;
  ticket: TicketType;
  count: number;
}) {
  return (
    <div className="flex justify-between -mt-4 items-center">
      <p className="text-lg font-sans text-zinc-300">
        Total spots: +{" "}
        <span className="text-white font-semibold">
          {ticket?.capacity && Number(ticket.capacity).toString()}
        </span>
      </p>
      <div className="flex items-center border border-zinc-600 p-2 rounded-lg justify-center gap-2 bg-[#252529]">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            if (count > 1) {
              const newCount = count - 1;
              onChange(newCount);
            }
          }}
          disabled={count <= 1}
          aria-label="Decrease ticket count"
          className="h-10 w-10 bg-[#1D1D1F] border-zinc-600 hover:bg-zinc-800 hover:text-white"
        >
          <Minus className="h-4 w-4 text-white" />
        </Button>

        <div className="flex min-w-[3rem] items-center justify-center">
          <span className="text-lg text-white font-bold">{count}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            if (ticket && count < ticket.capacity - ticket.bookedtickets) {
              const newCount = count + 1;
              onChange(newCount);
            }
          }}
          disabled={count >= ticket.capacity}
          aria-label="Increase ticket count"
          className="h-10 w-10 bg-[#1D1D1F] border-zinc-600 hover:bg-zinc-800 hover:text-white"
        >
          <Plus className="h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  );
}
