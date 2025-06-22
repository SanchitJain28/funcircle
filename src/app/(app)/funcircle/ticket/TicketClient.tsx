"use client";

import React from "react";
import { useContext, useEffect, useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { TicketType } from "@/app/types";
import {
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appContext } from "@/app/Contexts/AppContext";
import AuthPopup from "@/components/Funcircle-signup/Authpopup";
import { useAuth, useCheckRedirection } from "@/hooks/useAuth";

// Skeleton components for better loading experience
const TicketSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-700 rounded w-32 mx-6 mb-4"></div>
    <div className="bg-[#1D1D1F] rounded-xl mx-6 border border-zinc-700/50 p-6">
      <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-10 bg-gray-700 rounded w-24 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-700 rounded w-32"></div>
        <div className="h-12 bg-gray-700 rounded w-32"></div>
      </div>
    </div>
  </div>
);

const VenueSkeleton = () => (
  <div className="mx-6 mb-6 rounded-xl p-5 bg-[#1D1D1F] border border-zinc-700/50 animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
    <div className="flex items-center">
      <div className="w-20 h-20 bg-gray-700 rounded-full"></div>
      <div className="ml-4 flex-1">
        <div className="h-6 bg-gray-700 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-700 rounded w-24"></div>
          <div className="h-10 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  </div>
);

// Memoized components to prevent unnecessary re-renders
const TicketCounter = React.memo(
  ({
    count,
    setCount,
    ticket,
    setTotal,
  }: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    ticket: TicketType;
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
  }) => (
    <div className="flex items-center border border-zinc-600 p-2 rounded-lg justify-center gap-2 bg-[#252529]">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            setTotal(Number(ticket.price) * newCount);
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
            setCount(newCount);
            setTotal(Number(ticket.price) * newCount);
          }
        }}
        disabled={count >= ticket.capacity}
        aria-label="Increase ticket count"
        className="h-10 w-10 bg-[#1D1D1F] border-zinc-600 hover:bg-zinc-800 hover:text-white"
      >
        <Plus className="h-4 w-4 text-white" />
      </Button>
    </div>
  )
);
TicketCounter.displayName = "TicketCounter";

const LevelCard = React.memo(
  ({ level, title }: { level: string; title: string }) => (
    <div className="mx-6 mb-6">
      <Card className="bg-[#1D1D1F] border border-zinc-800 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-white space-y-2 list-none">
            {level === "intermediate" ? (
              <>
                <li>✅ You can consistently rally (6–10+ shots)</li>
                <li>✅ You know the game rules and positioning</li>
                <li>
                  ✅ You have played regularly and enjoy competitive doubles
                </li>
                <li>✅ You can serve, smash, and defend under pressure</li>
                <li>
                  ❌ Not for new players or those still learning the basics
                </li>
                <li>
                  ❌ You may be moved to Beginner+ if your level does not match
                </li>
              </>
            ) : (
              <>
                <li>✅ You have recently started playing</li>
                <li>✅ You can do short rallies (3–5 shots)</li>
                <li>✅ You are here to improve and have fun – no pressure!</li>
                <li>✅ You are still learning positioning and scoring</li>
                <li>
                  ❌ Not for absolute first-timers (who haveve never held a
                  racquet)
                </li>
                <li>❌ Not suitable if you play fast-paced games regularly</li>
              </>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
);
LevelCard.displayName = "LevelCard";

type VenueType = {
  images: string[];
  info: string;
  location: string;
  maps_link: string;
  venue_name: string;
};

const VenueDetails = React.memo(({ venue }: { venue: VenueType | undefined }) => {
  if (!venue) {
    return (
      <div className="mx-6 mb-6 p-4 bg-[#1D1D1F] rounded-xl border border-zinc-700/50">
        <p className="text-zinc-300 text-center">No venue details available</p>
      </div>
    );
  }

  return (
    <div className="mx-6 mb-6 rounded-xl p-5 bg-[#1D1D1F] border border-zinc-700/50 shadow-md">
      <p className="text-white text-lg font-semibold mb-4">Venue details</p>
      <div className="flex items-center">
        <img
          src={venue.images?.[0] || "/placeholder.svg"}
          className="w-20 h-20 rounded-full object-cover border-2"
          alt="Venue"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="flex flex-col ml-4">
          <p className="mb-1 font-sans text-white font-semibold text-lg">
            {venue.venue_name}
          </p>
          <p className="font-sans text-zinc-300 mb-2">{venue.location}</p>
          <div className="flex">
            <a
              href={venue.maps_link}
              className="flex items-center gap-1 mr-2 bg-[#8338EC] hover:bg-emerald-600 transition-colors px-4 py-2 rounded-lg text-black font-medium w-fit"
            >
              <MapPin size={16} />
              <span>Location</span>
            </a>
            <Link
              href="/new-subscription"
              className="flex items-center gap-1 bg-gradient-to-r from-[#EBC777] via-[#E2B934] to-[#EBC777] hover:bg-emerald-600 transition-colors px-4 py-2 rounded-lg text-black font-medium w-fit"
            >
              <span>Subscription</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
VenueDetails.displayName = "VenueDetails";

export default function TicketClient() {
  const appCtx = useContext(appContext);
  if (!appCtx) {
    throw new Error(
      "appContext is null. Ensure the provider is set up correctly."
    );
  }

  const { setOrder } = appCtx;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // State management
  const [count, setCount] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<TicketType>({} as TicketType);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  const ticketId = searchParams.get("id");

  // Auth hooks
  const { user, authLoading } = useAuth();
  const { data: redirection } = useCheckRedirection({
    user_id: user?.uid ?? "",
    enabled: !!user,
  });

  // Memoized values
  const isTicketLoaded = useMemo(
    () => ticket && Object.keys(ticket).length > 0,
    [ticket]
  );

  const ticketLevel = useMemo(() => {
    if (!isTicketLoaded) return null;
    const title = ticket.title?.toUpperCase() || "";
    if (title.includes("INTERMEDIATE")) return "intermediate";
    if (title.includes("BEGINNER")) return "beginner";
    return null;
  }, [ticket.title, isTicketLoaded]);

  const formatDate = useMemo(() => {
    return (isoString: Date) => {
      return new Date(isoString).toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
      });
    };
  }, []);

  // Optimized API call with error handling
  const handleTicket = async () => {
    if (!ticketId) {
      setTicketError("No ticket ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setTicketError(null);

    try {
      const response = await axios.get(
        `/api/FetchIndividualTicket?id=${ticketId}`,
        {
          timeout: 10000, // 10 second timeout
        }
      );

      const { ticket: fetchedTicket } = response.data;

      if (!fetchedTicket) {
        throw new Error("Ticket not found");
      }

      setTicket(fetchedTicket);
      setTotal(Number(fetchedTicket.price));

      if (fetchedTicket.bookedtickets >= fetchedTicket.capacity) {
        setCount(0);
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setTicketError("Failed to load ticket details");
    } finally {
      setLoading(false);
    }
  };

  const createTicketOrder = () => {
    const newTicketOrder = {
      ticket: ticket,
      quantity: count,
      total: total,
    };
    setOrder(newTicketOrder);
    // Note: Removed localStorage as per artifact restrictions
  };

  const handleSubmit = () => {
    createTicketOrder();
    if (!user) {
      return setIsAuthPopupOpen(true);
    } else {
      if (redirection) {
        router.push(
          redirection +
            `?redirect=${encodeURIComponent(pathname + `?id=${searchParams.get("id")}`)}`
        );
        return;
      }
      router.push(`/TicketCheckout`);
    }
  };

  useEffect(() => {
    handleTicket();
  }, [ticketId]); // Only re-run if ticketId changes

  // Show error state
  if (ticketError) {
    return (
      <div className="bg-gradient-to-b from-[#131315] to-[#1a1a1c] min-h-screen flex items-center justify-center">
        <div className="bg-[#1a1a1c] p-8 rounded-2xl max-w-md w-full mx-4 text-center">
          <p className="text-red-400 text-lg mb-4">Error Loading Ticket</p>
          <p className="text-white mb-4">{ticketError}</p>
          <Button
            onClick={handleTicket}
            className="bg-[#8338EC] hover:bg-[#7329d3] text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show loading only for auth, not for the entire page
  if (authLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1c] p-8 rounded-2xl flex flex-col items-center max-w-xs w-full shadow-2xl border border-zinc-800">
          <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
          <p className="text-white text-center font-medium text-lg">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#131315] to-[#1a1a1c] min-h-screen">
      <div className="overflow-hidden pb-24">
        <p className="text-3xl font-sans mx-6 pt-6 mb-4 font-bold text-white">
          Tickets
        </p>

        <div className="my-4">
          {/* Main ticket info - show skeleton while loading */}
          {loading ? (
            <TicketSkeleton />
          ) : (
            <div className="flex flex-col bg-[#1D1D1F] rounded-xl mx-6 border border-zinc-700/50 p-6 shadow-lg">
              <p className="text-2xl font-sans text-white font-bold mb-1">
                {ticket?.title}
              </p>
              <p className="text-4xl font-sans font-bold mb-4 text-[#8338EC]">
                ₹{ticket?.price}
              </p>
              <div className="flex justify-between -mt-4 items-center">
                <p className="text-lg font-sans text-zinc-300">
                  Total spots:{" "}
                  <span className="text-white font-semibold">
                    {ticket?.capacity}
                  </span>
                </p>
                <TicketCounter
                  count={count}
                  setCount={setCount}
                  ticket={ticket}
                  total={total}
                  setTotal={setTotal}
                />
              </div>
            </div>
          )}

          {/* Date and time section */}
          {!loading && isTicketLoaded && (
            <div className="mx-6 my-6">
              <div className="bg-[#1D1D1F] rounded-xl p-4 border border-zinc-700/50 shadow-md">
                <div className="flex rounded-lg items-center p-2 mb-2">
                  <Clock className="text-[#8338EC] h-5 w-5" />
                  <p className="font-sans rounded-lg text-white p-2">
                    <span className="text-zinc-400">From:</span>{" "}
                    <span className="font-medium">
                      {ticket?.startdatetime
                        ? formatDate(ticket.startdatetime)
                        : "N/A"}
                    </span>
                  </p>
                </div>
                <div className="flex rounded-lg items-center p-2">
                  <Clock className="text-[#8338EC] h-5 w-5" />
                  <p className="font-sans rounded-lg text-white p-2">
                    <span className="text-zinc-400">To:</span>{" "}
                    <span className="font-medium">
                      {ticket?.enddatetime
                        ? formatDate(ticket.enddatetime)
                        : "End time not available"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Level-specific cards */}
          {!loading && ticketLevel && (
            <LevelCard level={ticketLevel} title="Who Can Join" />
          )}

          {/* Important Information */}
          {!loading && isTicketLoaded && ticket.description && (
            <div className="mx-6 mb-6">
              <Card className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-white text-sm">
                    {ticket.description}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Warning */}
          {!loading && (
            <div className="mx-6 mb-6">
              <Card className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    ⚠ WARNING
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-yellow-400 text">
                    ⚠ Important: Please book only if you match the level listed
                    above. Incorrect bookings affect game quality for everyone.
                    If your level does not match, we may ask you to switch
                    slots.
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Venue details */}
          {loading ? (
            <VenueSkeleton />
          ) : (
            <VenueDetails venue={ticket?.venueid} />
          )}

          {/* Terms and conditions */}
          {!loading && (
            <div className="mx-6 mb-24">
              <div className="bg-[#1D1D1F] p-5 rounded-xl border border-zinc-700/50 shadow-md">
                <p className="text-zinc-200 text-sm font-medium mb-3">
                  Terms & Conditions for Booking Tickets
                </p>
                <div className="space-y-2 text-zinc-300 text-sm">
                  <p>
                    <strong>Ticket Confirmation:</strong> Your booking is
                    confirmed only after successful payment. A confirmation
                    message will be sent to your registered email or phone
                    number.
                  </p>
                  <p>
                    <strong>Refund & Cancellation Policy:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>
                      Cancellations made at least 24 hours before the event may
                      be eligible for a refund
                    </li>
                    <li>
                      Last-minute cancellations or no-shows may not be eligible
                      for a refund
                    </li>
                    <li>
                      If the event is canceled by the organizer, you will
                      receive a full refund
                    </li>
                  </ul>
                  <p>
                    <strong>Event Changes:</strong> The organizer may change
                    venue, time, or date with advance notice.
                  </p>
                  <p>
                    <strong>Non-Transferable:</strong> Tickets can only be used
                    by the person who booked them.
                  </p>
                  <p>
                    <strong>Liability:</strong> Fun Circle facilitates bookings
                    but is not responsible for event execution or incidents.
                  </p>
                  <p className="mt-4">
                    By booking a ticket, you agree to these terms. Enjoy the
                    event! 🎉
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Fixed bottom bar */}
          <div className="flex bg-[#131315]/95 backdrop-blur-md items-center border-t border-zinc-700 text-white w-full justify-between px-6 py-4 fixed bottom-0 shadow-lg z-10">
            <div className="flex flex-col">
              <p className="font-sans text-2xl font-bold text-white">
                ₹{total}
              </p>
              <p className="font-sans text-sm text-zinc-400">Total amount</p>
            </div>
            {count > 0 && !loading && (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1 bg-[#8338EC] hover:bg-emerald-600 transition-colors px-6 py-3 rounded-lg text-black font-semibold text-lg"
              >
                CONFIRM SPOT
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthPopup
        isOpen={isAuthPopupOpen}
        onClose={() => setIsAuthPopupOpen(false)}
        eventTitle=""
      />
    </div>
  );
}
