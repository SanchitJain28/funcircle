"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LEVELS = ["Level 1", "Level 2", "Level 3", "Level 4"]

export function JoinGroupsSheet() {
  const [selected, setSelected] = React.useState<string | null>(null)

  const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 bg-[#F26610] hover:bg-[#d9590e] transition-colors text-white font-bold py-3 px-6 rounded-lg w-full md:w-auto">
          <UsersIcon className="w-5 h-5" />
          <span>Find Groups</span>
        </button>
      </SheetTrigger>

      <SheetContent side="bottom" className="p-6 bg-black text-white border-t border-gray-800">
        <SheetHeader className="text-left">
          <SheetTitle className="text-balance text-white">Choose Level</SheetTitle>
          <SheetDescription className="text-gray-400">
            Select your join group level to continue.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {LEVELS.map((level) => {
            const isSelected = selected === level
            return (
              <button
                key={level}
                type="button"
                onClick={() => setSelected(level)}
                className={cn(
                  "rounded-md border px-4 py-3 text-sm font-medium",
                  "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  isSelected
                    ? "border-[#D9590E] bg-[#1a1a1a] text-[#D9590E] focus-visible:ring-[#D9590E]"
                    : "border-gray-700 bg-[#111] text-gray-300 hover:bg-[#1a1a1a] focus-visible:ring-[#8A36EB]",
                )}
              >
                {level}
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <SheetClose asChild>
            <Button variant="ghost" className="font-medium text-gray-300 hover:text-white hover:bg-[#1a1a1a]">
              Cancel
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              className={cn(
                "font-medium text-white",
                "bg-[#D9590E] hover:bg-[#c24f0d]",
                "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[#D9590E]",
              )}
              disabled={!selected}
              onClick={() => {
                if (selected) {
                  console.log("[v0] Join level selected:", selected)
                }
              }}
              aria-disabled={!selected}
            >
              Confirm
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
