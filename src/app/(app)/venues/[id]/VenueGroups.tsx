"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVenueChatRooms } from "@/hooks/useVenueInfo";
import { useRouter } from "next/navigation";

const LEVELS = ["Level 2", "Level 4", "Level 6", "Level 8"];

interface VenueChatRoom {
  id: string;
  name: string;
  description: string;
  type: "group";
  sport_type: string | null;
  avatar_url: string | null;
  max_members: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  meta_data: {
    venue_name: string;
    group_level: number;
    venue_maplink: string;
    venue_location: string;
  };
  venue_id: number;
}

export function VenueChatRooms({ params }: { params: { id: string } }) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [showGroups, setShowGroups] = React.useState(false);
  const { data, isPending, isError } = useVenueChatRooms(params.id);

  const levelFormatter=(level:string)=>{
    if(level==="Level 2"){
      return "Level 1"
    }
    else if(level==="Level 4"){
      return "Level 2"
    }
    else if(level==="Level 6"){
      return "Level 3"
    }
    else if(level==="Level 8"){
      return "Level 4"
    }
    else{
      return level
    }
  }

  const venue_groups = data?.venue_groups;
  const venue_members_count = data?.members_count;

  const router = useRouter();

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
  );

  const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );

  const handleLevelConfirm = () => {
    if (selected) {
      console.log("[v0] Join level selected:", selected);
      setShowGroups(true);
    }
  };

  const handleBackToLevels = () => {
    setShowGroups(false);
  };

  const handleJoinGroup = (group: VenueChatRoom) => {
    router.push(`/chat/${group.id}`);
    console.log(
      "[v0] Joining group:",
      group.name,
      "Level:",
      group.meta_data.group_level
    );
    // Add your join group logic here
  };

  const filteredGroups = React.useMemo(() => {
    if (!data || !selected) return [];
    const selectedLevel = Number.parseInt(selected.split(" ")[1]);
    return (venue_groups as VenueChatRoom[]).filter(
      (group) =>
        group.meta_data.group_level === selectedLevel && group.is_active
    );
  }, [data, selected]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex flex-col items-center gap-2">
          <button className="flex w-full items-center justify-center gap-2 bg-[#F26610] hover:bg-[#d9590e] transition-colors text-white font-semibold py-4 px-6 rounded-lg text-sm">
            <UsersIcon className="w-5 h-5" />
            <span>Join Groups</span>
          </button>

          <div className="mt-4 text-center">
            <p className="text-white text-lg font-medium tracking-wide">
              Total Venue Members
            </p>
            <p className="text-white text-2xl font-bold mt-1">
              {venue_members_count}
            </p>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="p-4 bg-black text-white border-t border-gray-800"
      >
        {!showGroups ? (
          // Level Selection View
          <>
            <SheetHeader className="text-left mb-4">
              <SheetTitle className="text-lg text-white">
                Choose Level
              </SheetTitle>
              <SheetDescription className="text-sm text-gray-400">
                Select your join group level to continue.
              </SheetDescription>
            </SheetHeader>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {LEVELS.map((level) => {
                const isSelected = selected === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelected(level)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm font-medium",
                      "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      isSelected
                        ? "border-[#D9590E] bg-[#1a1a1a] text-[#D9590E] focus-visible:ring-[#D9590E]"
                        : "border-gray-700 bg-[#111] text-gray-300 hover:bg-[#1a1a1a] focus-visible:ring-[#8A36EB]"
                    )}
                  >
                    {levelFormatter(level)}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
                >
                  Cancel
                </Button>
              </SheetClose>
              <Button
                size="sm"
                className={cn(
                  "font-medium text-white",
                  "bg-[#D9590E] hover:bg-[#c24f0d]",
                  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[#D9590E]"
                )}
                disabled={!selected}
                onClick={handleLevelConfirm}
                aria-disabled={!selected}
              >
                Confirm
              </Button>
            </div>
          </>
        ) : (
          // Groups List View
          <>
            <SheetHeader className="text-left mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBackToLevels}
                  className="p-1 hover:bg-[#1a1a1a] rounded-md transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 text-gray-400" />
                </button>
                <div>
                  <SheetTitle className="text-lg text-white">
                    {selected} Groups
                  </SheetTitle>
                  <SheetDescription className="text-sm text-gray-400">
                    Join available groups for {selected}.
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto mb-4">
              {isPending ? (
                <div className="flex items-center justify-center py-6">
                  <div className="text-sm text-gray-400">Loading groups...</div>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center py-6">
                  <div className="text-sm text-red-400">
                    Failed to load groups
                  </div>
                </div>
              ) : filteredGroups.length === 0 ? (
                <div className="flex items-center justify-center py-6">
                  <div className="text-sm text-gray-400">
                    No groups available for {selected}
                  </div>
                </div>
              ) : (
                filteredGroups.map((group, index) => (
                  /* Much more compact group cards */
                  <div
                    className="flex items-center justify-between bg-gray-900 p-3 rounded-lg"
                    key={index}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm truncate mb-1">
                        {group.name}
                      </h3>
                      <span className="inline-block text-xs bg-[#D9590E] text-white px-2 py-0.5 rounded-full">
                        Level {group.meta_data.group_level}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleJoinGroup(group)}
                      size="sm"
                      className="bg-[#D9590E] hover:bg-[#c24f0d] text-white ml-3 flex-shrink-0"
                    >
                      Join
                    </Button>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-end">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
                >
                  Close
                </Button>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
