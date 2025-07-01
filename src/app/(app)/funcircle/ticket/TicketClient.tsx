"use client";

import React from "react";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { TicketType } from "@/app/types";
import { ChevronRight, Clock, MapPin, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appContext } from "@/app/Contexts/AppContext";
import AuthPopup from "@/components/Funcircle-signup/Authpopup";
import { useAuth, useCheckRedirection } from "@/hooks/useAuth";
import TermsAndConditions from "./TermsAndConditions";
import TicketLoadingSkeleton from "./LoadingSkeletonForTicket";

// Memoized components for better performance
const MemoizedCard = React.memo(Card);
MemoizedCard.displayName = 'MemoizedCard';

const MemoizedCardHeader = React.memo(CardHeader);
MemoizedCardHeader.displayName = 'MemoizedCardHeader';

const MemoizedCardContent = React.memo(CardContent);
MemoizedCardContent.displayName = 'MemoizedCardContent';

const MemoizedCardTitle = React.memo(CardTitle);
MemoizedCardTitle.displayName = 'MemoizedCardTitle';

// Memoized venue component
const VenueDetails = React.memo(({ ticket }: { ticket: TicketType }) => {
  if (!ticket?.venueid) {
    return (
      <div className="mx-6 mb-6 p-4 bg-[#1D1D1F] rounded-xl border border-zinc-700/50">
        <p className="text-zinc-300 text-center">No venue details available</p>
      </div>
    );
  }

  return (
    <div
      id="venue"
      className="mx-6 mb-6 rounded-xl p-5 bg-[#1D1D1F] border border-zinc-700/50 shadow-md"
    >
      <p className="text-white text-lg font-semibold mb-4">Venue details</p>
      <div className="flex items-center">
        <img
          src={ticket.venueid.images[0] || "/placeholder.svg"}
          className="w-20 h-20 rounded-full object-cover border-2"
          alt="Venue"
          loading="lazy" // Lazy load images
        />
        <div className="flex flex-col ml-4">
          <p className="mb-1 font-sans text-white font-semibold text-lg">
            {ticket.venueid.venue_name}
          </p>
          <p className="font-sans text-zinc-300 mb-2">
            {ticket.venueid.location}
          </p>
          <div className="flex">
            <a
              href={ticket.venueid.maps_link}
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
VenueDetails.displayName = 'VenueDetails';

// Memoized level requirements component
const LevelRequirements = React.memo(({ title }: { title: string }) => {
  const upperTitle = title.toUpperCase();
  
  if (upperTitle.includes("INTERMEDIATE")) {
    return (
      <div className="mx-6 mb-6">
        <MemoizedCard className="bg-[#1D1D1F] border border-zinc-800 shadow-lg mb-6">
          <MemoizedCardHeader>
            <MemoizedCardTitle className="text-lg text-white">
              Who Can Join
            </MemoizedCardTitle>
          </MemoizedCardHeader>
          <MemoizedCardContent>
            <ul className="text-sm text-white space-y-2 list-none">
              <li>✅ You can consistently rally (6–10+ shots)</li>
              <li>✅ You know the game rules and positioning</li>
              <li>✅ You have played regularly and enjoy competitive doubles</li>
              <li>✅ You can serve, smash, and defend under pressure</li>
              <li>❌ Not for new players or those still learning the basics</li>
              <li>❌ You may be moved to Beginner+ if your level does not match</li>
            </ul>
          </MemoizedCardContent>
        </MemoizedCard>
      </div>
    );
  }

  if (upperTitle.includes("BEGINNER")) {
    return (
      <div className="mx-6 mb-6">
        <MemoizedCard className="bg-[#1D1D1F] border border-zinc-800 shadow-lg mb-6">
          <MemoizedCardHeader>
            <MemoizedCardTitle className="text-lg text-white">
              Who Can Join
            </MemoizedCardTitle>
          </MemoizedCardHeader>
          <MemoizedCardContent>
            <ul className="text-sm text-white space-y-2 list-none">
              <li>✅ You have recently started playing</li>
              <li>✅ You can do short rallies (3–5 shots)</li>
              <li>✅ You are here to improve and have fun – no pressure!</li>
              <li>✅ You are still learning positioning and scoring</li>
              <li>❌ Not for absolute first-timers (who have never held a racquet)</li>
              <li>❌ Not suitable if you play fast-paced games regularly</li>
            </ul>
          </MemoizedCardContent>
        </MemoizedCard>
      </div>
    );
  }

  return null;
});
LevelRequirements.displayName = 'LevelRequirements';

export default function TicketClient() {
  const appCtx = useContext(appContext);
  if (!appCtx) {
    throw new Error("appContext is null. Ensure the provider is set up correctly.");
  }
  const { setOrder } = appCtx;

  // URL HANDLING
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("id");

  // STATE
  const [count, setCount] = useState<number>(1);
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [ticket, setTicket] = useState<TicketType>({} as TicketType);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  // AUTH
  const router = useRouter();
  const { user, authLoading } = useAuth();
  const { data: redirection } = useCheckRedirection({
    user_id: user?.uid ?? "",
    enabled: !!user,
  });

  // MEMOIZED VALUES
  const total = useMemo(() => count * ticketPrice, [count, ticketPrice]);
  
  const maxTickets = useMemo(() => {
    return ticket?.capacity ? ticket.capacity - ticket.bookedtickets : 0;
  }, [ticket?.capacity, ticket?.bookedtickets]);

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

  // MEMOIZED CALLBACKS
  const handleTicket = useCallback(async () => {
    if (!ticketId) return;
    
    setLoading(true);
    try {
      const { data: { ticket } } = await axios.get(`/api/FetchIndividualTicket?id=${ticketId}`);
      setTicket(ticket);
      if (ticket.bookedtickets >= ticket.capacity) {
        setCount(0);
      }
      setTicketPrice(Number(ticket.price));
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  const createTicketOrder = useCallback(() => {
    const newTicketOrder = {
      ticket: ticket,
      quantity: count,
      total: total,
    };
    setOrder(newTicketOrder);
    // Using sessionStorage instead of localStorage for better performance
    sessionStorage.setItem("ORDER", JSON.stringify(newTicketOrder));
  }, [ticket, count, total, setOrder]);

  const handleSubmit = useCallback(() => {
    createTicketOrder();
    if (!user) {
      return setIsAuthPopupOpen(true);
    }
    
    if (redirection) {
      router.push(
        redirection + `?redirect=${encodeURIComponent(pathname + `?id=${ticketId}`)}`
      );
      return;
    }
    
    router.push(`/TicketCheckout`);
  }, [createTicketOrder, user, redirection, router, pathname, ticketId]);

  const handleDecrease = useCallback(() => {
    if (count > 1) {
      setCount(prev => prev - 1);
    }
  }, [count]);

  const handleIncrease = useCallback(() => {
    if (ticket && count < maxTickets) {
      setCount(prev => prev + 1);
    }
  }, [ticket, count, maxTickets]);

  // EFFECTS
  useEffect(() => {
    handleTicket();
  }, [handleTicket]);

  if (loading || authLoading) {
    return <TicketLoadingSkeleton />;
  }

  return (
    <div className="bg-gradient-to-b from-[#131315] to-[#1a1a1c] min-h-screen">
      <div className="overflow-hidden pb-24">
        <p className="text-3xl font-sans mx-6 pt-6 mb-4 font-bold text-white">
          Tickets
        </p>
        
        <div className="my-4">
          {/* TICKET INFO */}
          <div className="flex flex-col bg-[#1D1D1F] rounded-xl mx-6 border border-zinc-700/50 p-6 shadow-lg">
            <p className="text-2xl font-sans text-white font-bold mb-1">
              {ticket?.title}
            </p>
            <p className="text-4xl font-sans font-bold mb-4 text-[#8338EC]">
              ₹{ticket?.price}
            </p>

            {/* TICKET COUNT AND TOTAL PRICE */}
            <div className="flex justify-between -mt-4 items-center">
              <p className="text-lg font-sans text-zinc-300">
                Total spots:{" "}
                <span className="text-white font-semibold">
                  {ticket?.capacity}
                </span>
              </p>
              <div className="flex items-center border border-zinc-600 p-2 rounded-lg justify-center gap-2 bg-[#252529]">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecrease}
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
                  onClick={handleIncrease}
                  disabled={count >= maxTickets}
                  aria-label="Increase ticket count"
                  className="h-10 w-10 bg-[#1D1D1F] border-zinc-600 hover:bg-zinc-800 hover:text-white"
                >
                  <Plus className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </div>

          {/* DATE AND TIME SECTION */}
          <div className="mx-6 my-6">
            <div className="bg-[#1D1D1F] rounded-xl p-4 border border-zinc-700/50 shadow-md">
              <div className="flex rounded-lg items-center p-2 mb-2">
                <Clock className="text-[#8338EC] h-5 w-5" />
                <p className="font-sans rounded-lg text-white p-2">
                  <span className="text-zinc-400">From:</span>{" "}
                  <span className="font-medium">
                    {ticket?.startdatetime ? formatDate(ticket.startdatetime) : "N/A"}
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

          <LevelRequirements title={ticket?.title || ""} />

          {/* IMPORTANT INFORMATION */}
          <div className="mx-6 mb-6">
            <MemoizedCard className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
              <MemoizedCardHeader>
                <MemoizedCardTitle className="text-lg text-white">
                  Important Information
                </MemoizedCardTitle>
              </MemoizedCardHeader>
              <MemoizedCardContent>
                <div className="whitespace-pre-line text-white text-sm">
                  {ticket.description}
                </div>
              </MemoizedCardContent>
            </MemoizedCard>
          </div>

          {/* WARNING */}
          <div className="mx-6 mb-6">
            <MemoizedCard className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
              <MemoizedCardHeader>
                <MemoizedCardTitle className="text-lg text-white">⚠ WARNING</MemoizedCardTitle>
              </MemoizedCardHeader>
              <MemoizedCardContent>
                <div className="whitespace-pre-line text-yellow-400 text">
                  ⚠ Important: Please book only if you match the level listed
                  above. Incorrect bookings affect game quality for everyone. If
                  your level does not match, we may ask you to switch slots.
                </div>
              </MemoizedCardContent>
            </MemoizedCard>
          </div>

          <VenueDetails ticket={ticket} />
          <TermsAndConditions />

          {/* BOTTOM BAR */}
          <div className="flex bg-[#131315]/95 backdrop-blur-md items-center border-t border-zinc-700 text-white w-full justify-between px-6 py-4 fixed bottom-0 shadow-lg z-10">
            <div className="flex flex-col">
              <p className="font-sans text-2xl font-bold text-white">₹{total}</p>
              <p className="font-sans text-sm text-zinc-400">Total amount</p>
            </div>
            {count > 0 && (
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