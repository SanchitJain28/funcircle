"use client";
import EventCard from "@/components/funcircle-events/EventCard";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import { SkeletonCard } from "@/components/loading/SkelatonCard";
import { useFetchEvents } from "@/hooks/useEvents";
import { useDebounce } from "@uidotdev/usehooks";
import { AxiosError } from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import FixedBottomBar from "./FixedBottomBar";

export interface Event {
  name: string;
  profile_image: string;
  location: string;
  interests: string[];
  group_id: number;
}

interface Tab {
  active: boolean;
  value: string;
  label?: string;
  activeImage?: string;
  inactiveImage?: string;
  activeColor?: string;
  inactiveColor?: string;
  activeBorderColor?: string;
}

export default function FunCircleClient({ data }: { data: Event[] }) {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("Outdoor");
  const debouncedSearchTerm = useDebounce(search, 300);

  const {
    data: allEvents,
    isLoading,
    error,
    refetch,
  } = useFetchEvents({ activeCategory, initialData: data });

  const [tabs, setTabs] = useState<Tab[]>([
    {
      active: false,
      value: "Events",
      label: "Events",
      activeImage: "guitar_white.svg",
      inactiveImage: "guitar.svg",
      activeColor: "#2D187D",
      activeBorderColor: "#A496E3",
    },
    {
      active: true,
      value: "Outdoor",
      label: "Outdoor",
      activeImage: "cricket_white.svg",
      inactiveImage: "cricket_correct.svg",
      activeColor: "#0B4076",
      activeBorderColor: "#627CA1",
    },
    {
      active: false,
      value: "Meetup",
      label: "Meetup",
      activeImage: "compass_white.svg",
      inactiveImage: "compass_correct.svg",
      activeColor: "#645C14",
      activeBorderColor: "#B1AC72",
    },
    {
      active: false,
      value: "Party",
      label: "Party",
      activeImage: "disco-ball_white.svg",
      inactiveImage: "disco-ball.svg",
      activeColor: "#710E2A",
      activeBorderColor: "#DA869E",
    },
  ]);

  const handleRefresh = () => {
    refetch();
  };
  const handleTabChange = (index: number) => {
    const newTabs = tabs.map((tab, i) => ({
      ...tab,
      active: i === index,
    }));

    setTabs(newTabs);
    setActiveCategory(tabs[index].value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const renderSkeletons = () => (
    <div className="px-4 rounded-lg bg-[#131315]">
      <div className=" rounded-lg bg-[#131315]">
        <SkeletonCard className="my-4" />
        <SkeletonCard className="my-4" />
        <SkeletonCard className="my-4" />
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col">
      <p className="text-zinc-600 text-3xl font-sans text-center mt-20 mb-4">
        No events currently
      </p>
      <p className="text-zinc-600 text-xl font-sans text-center underline">
        Events coming soon
      </p>
      {error && (
        <button
          onClick={handleRefresh}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg mx-auto hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );

  const renderEvents = () => (
    <div className="lg:grid lg:grid-cols-3 lg:mx-4">
      {filteredEvents?.map((event, index) => (
        <div
          className={`lg:mx-4 my-4 ${
            index == filteredEvents.length - 1 ? "mb-16" : ""
          }`}
          key={index}
        >
          <EventCard card_data={event} />
        </div>
      ))}
    </div>
  );

  const filteredEvents = React.useMemo(() => {
    if (!debouncedSearchTerm) {
      return allEvents;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    return allEvents?.filter(
      (event) =>
        event.name.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
    );
  }, [debouncedSearchTerm, allEvents]);

  useEffect(() => {
    if (error) {
      const axiosError = error as AxiosError;
      toast("Sorry, events cannot be fetched", {
        description: `An unexpected error occurred: ${
          axiosError.response?.data || axiosError.message
        }`,
      });
    }
  }, [error]);

  const isLoadingState = isLoading;

  return (
    <div>
      <div className="bg-[#131315] min-h-screen overflow-hidden">
        {/* HEADER */}

        {/* Search Bar */}
        <div className="flex flex-row px-[4px] py-[14px]">
          <div className="flex w-full bg-[#303030] py-2 px-2 mx-2 rounded-lg">
            <input
              value={search}
              type="text"
              className="w-full focus:outline-none bg-[#303030] text-white placeholder:text-gray-400"
              placeholder="Search for events or city..."
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search events"
            />
            {debouncedSearchTerm && (
              <button
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex px-4 overflow-hidden scrollbar-hide">
          {tabs.map((tab, index) => (
            <div
              className={`flex flex-col align-center justify-center items-center mx-1 px-4 py-2 rounded-xl cursor-pointer transition-colors `}
              key={index}
              onClick={() => handleTabChange(index)}
              style={{
                backgroundColor: tab.active ? tab.activeColor : "transparent",
                border: tab.active ? `1px solid ${tab.activeBorderColor}` : "",
              }}
              role="tab"
              aria-selected={tab.active}
              tabIndex={0}
            >
              <img
                src={tab.active ? tab.activeImage : tab.inactiveImage}
                className="w-10 font-bold"
                alt={`${tab.value} icon`}
              />
              <span className="text-zinc-200 text-lg">{tab.value}</span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div>
          {isLoadingState ? (
            renderSkeletons()
          ) : (
            <div className="px-[14px] overflow-hidden bg-[#131315] min-h-screen">
              {filteredEvents?.length === 0
                ? renderEmptyState()
                : renderEvents()}
            </div>
          )}
        </div>

        {/* Fixed Bottom Bar */}
        <FixedBottomBar />

        {isLoadingState && (
          <LoadingOverlay
            isVisible={isLoading}
            message="Loading upcoming meets..."
          />
        )}
      </div>
    </div>
  );
}
