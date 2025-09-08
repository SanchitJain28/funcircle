import { useVenueGames } from "@/hooks/useVenueInfo";
import Link from "next/link";
import React, { forwardRef, HTMLAttributes } from "react";

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-black border border-gray-800 rounded-lg text-white shadow-md overflow-hidden ${className}`}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-3 ${className}`} {...props} />
  )
);
CardContent.displayName = "CardContent";

interface VenueGamesProps {
  params: { id: string };
  group_id?: number;
}

export default function VenueGames({ params ,group_id }: VenueGamesProps) {
  const { data: venueGamesData, isPending } = useVenueGames(params.id);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "soldout":
        return {
          badge: "bg-red-500/20 text-red-400 border-red-500/30",
          button: "bg-gray-700 text-gray-400 cursor-not-allowed",
          buttonText: "Sold Out",
        };
      case "closed":
        return {
          badge: "bg-gray-500/20 text-gray-400 border-gray-500/30",
          button: "bg-gray-800 text-gray-500 cursor-not-allowed",
          buttonText: "Closed",
        };
      default: // 'live'
        return {
          badge: "bg-green-500/20 text-green-400 border-green-500/30",
          button: "bg-[#8A36EB] hover:bg-[#7828d1] transition-colors",
          buttonText: "Book Now",
        };
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-[#8A36EB] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isPending && venueGamesData?.length == 0) {
    return;
  }

  return (
    <div className="bg-[#000000] antialiased text-gray-300 p-4 sm:p-6 border border-gray-800 py-4 rounded-lg my-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Now Playing</h1>
        <p className="text-gray-400 mb-6">
          Check out the latest games and events happening at our venue.
        </p>

        <div className="relative">
          <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 ml-2">
            <div className="flex gap-4 pb-4 px-12">
              {venueGamesData?.map((game) => {
                const status = getStatusStyles(game.ticketstatus);
                return (
                  <div
                    key={game.id}
                    className="snap-start shrink-0 w-[80%] sm:w-[50%] md:w-[30%] lg:w-[22%]"
                  >
                    <Card className="w-full h-full flex flex-col group transition-all duration-300 hover:border-[#8A36EB]/50 hover:shadow-xl hover:shadow-[#8A36EB]/10">
                      <div className="relative">
                        <div className="absolute top-2 right-2"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </div>

                      <CardContent className="flex flex-col flex-grow">
                        <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#F26610] transition-colors truncate">
                          {game.title}
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{formatDate(game.startdatetime)}</span>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <p className="text-lg font-semibold text-white">
                            ₹{parseFloat(game.price).toFixed(2)}
                          </p>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${status.badge}`}
                          >
                            {game.ticketstatus.charAt(0).toUpperCase() +
                              game.ticketstatus.slice(1)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
            <Link href={`/events/${group_id}?venue_id=${params.id}`}>
            <button className="mx-12 border border-zinc-500 px-4 py-2 rounded-xl">See all games</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
