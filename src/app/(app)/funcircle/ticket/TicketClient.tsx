"use client";

import React from "react";
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { TicketType } from "@/app/types";
import { Checkbox } from "@/components/ui/checkbox";
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
import TermsAndConditions from "./TermsAndConditions";
export default function TicketClient() {
  const appCtx = useContext(appContext);
  if (!appCtx) {
    throw new Error(
      "appContext is null. Ensure the provider is set up correctly."
    );
  }
  const { setOrder } = appCtx;

  //URL HANDLING
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //PRICING STATE

  const [count, setCount] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  //LOADING STATE
  const [loading, setLoading] = useState<boolean>(true);

  //TICKET STATE AND HANDLING
  const ticketId = searchParams.get("id");
  const [ticket, setTicket] = useState<TicketType>({} as TicketType);
  const [isShuttleIncluded, setIsShuttleIncluded] = useState<boolean>(true);

  //AUTH
  const router = useRouter();

  const { user, authLoading } = useAuth();
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  const { data: redirection } = useCheckRedirection({
    user_id: user?.uid ?? "",
    enabled: !!user,
  });

  const handleTicket = async () => {
    setLoading(true);
    try {
      const {
        data: { ticket },
      } = await axios.get(`/api/FetchIndividualTicket?id=${ticketId}`);
      setTicket(ticket);
      setTotal(Number(ticket.price));
      if (ticket.bookedtickets >= ticket.capacity) {
        setCount(0);
      }
      console.log(ticket);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (isoString: Date) => {
    return new Date(isoString).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long", // e.g., Thursday
      year: "numeric",
      month: "long", // e.g., February
      day: "numeric", // e.g., 27
      hour: "numeric",
    });
  };

  const createTicketOrder = () => {
    const newTicketOrder = {
      ticket: ticket,
      quantity: count,
      total: total,
    };
    setOrder(newTicketOrder);
    localStorage.setItem("ORDER", JSON.stringify(newTicketOrder));
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
      return;
    }
  };

  useEffect(() => {
    handleTicket();
  }, []);

  useEffect(() => {
    console.log(redirection);
  }, [redirection]);

  if (loading || authLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1c] p-8 rounded-2xl flex flex-col items-center max-w-xs w-full shadow-2xl border border-zinc-800">
          <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
          <p className="text-white text-center font-medium text-lg">
            Loading Ticket
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
        <div className="my-4 ">
          <div className="flex flex-col bg-[#1D1D1F] rounded-xl mx-6 border border-zinc-700/50 p-6 shadow-lg">
            <p className="text-2xl font-sans text-white font-bold mb-1">
              {ticket?.title}
            </p>
            <p className="text-4xl font-sans  font-bold mb-4 text-[#8338EC]">
              ₹{ticket?.price}
            </p>

            {/* // TICKET COUNT AND TOTAL PRICE */}
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
                    if (
                      ticket &&
                      count < ticket.capacity - ticket.bookedtickets
                    ) {
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
            </div>

            {/* //PRICING DETAILS */}
            <div className="flex justify-between items-center my-6">
              <div className="flex-1  mr-4">
                <p className="font-semibold text-white mb-1 leading-tight">
                  Want to bring your own shuttle?
                </p>
                <p className="text-white ">Rs30</p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shuttle-checkbox"
                  checked={isShuttleIncluded}
                  onCheckedChange={() => {
                    const isShuttle = !isShuttleIncluded
                    setIsShuttleIncluded(isShuttle);
                    setTotal((prev)=> isShuttle ? prev +30: prev - 30)
                  }}
                  className="w-6 h-6 border-2 border-slate-400/60 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 rounded-md transition-all duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent"
                />
                <label
                  htmlFor="shuttle-checkbox"
                  className="text-sm text-slate-300 cursor-pointer select-none hover:text-white transition-colors duration-200"
                >
                  {isShuttleIncluded ? "Yes" : "No"}
                </label>
              </div>
            </div>

            {/* <p className="text-sm underline font-sans text-white">{ticket.description}</p> */}
          </div>

          {/* DATE AND TIME SECTION */}
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

          {ticket.title.toUpperCase().includes("INTERMEDIATE") && (
            <div className="mx-6 mb-6">
              <Card className="bg-[#1D1D1F] border border-zinc-800 shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    Who Can Join
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-white space-y-2 list-none">
                    <li>✅ You can consistently rally (6–10+ shots)</li>
                    <li>✅ You know the game rules and positioning</li>
                    <li>
                      ✅ You’ve played regularly and enjoy competitive doubles
                    </li>
                    <li>✅ You can serve, smash, and defend under pressure</li>
                    <li>
                      ❌ Not for new players or those still learning the basics
                    </li>
                    <li>
                      ❌ You may be moved to Beginner+ if your level doesn’t
                      match
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {ticket.title.toUpperCase().includes("BEGINNER") && (
            <div className="mx-6 mb-6">
              <Card className="bg-[#1D1D1F] border border-zinc-800 shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    Who Can Join
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-white space-y-2 list-none">
                    <li>✅ You’ve recently started playing</li>
                    <li>✅ You can do short rallies (3–5 shots)</li>
                    <li>
                      ✅ You’re here to improve and have fun – no pressure!
                    </li>
                    <li>✅ You’re still learning positioning and scoring</li>
                    <li>
                      ❌ Not for absolute first-timers (who’ve never held a
                      racquet)
                    </li>
                    <li>
                      ❌ Not suitable if you play fast-paced games regularly
                      match
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {/* //ABOUT THIS MEETUP */}
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

          <div className="mx-6 mb-6">
            <Card className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-white">⚠ WARNING</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-yellow-400 text">
                  ⚠ Important: Please book only if you match the level listed
                  above. Incorrect bookings affect game quality for everyone. If
                  your level doesn’t match, we may ask you to switch slots.
                </div>
              </CardContent>
            </Card>
          </div>
          {/* CHECK */}
          {/* if there is venue or there is no venue */}
          {ticket?.venueid ? (
            <div
              id="venue"
              className="mx-6 mb-6 rounded-xl p-5 bg-[#1D1D1F] border border-zinc-700/50 shadow-md"
            >
              <p className="text-white text-lg font-semibold mb-4">
                Venue details
              </p>
              <div className="flex items-center">
                <img
                  src={ticket.venueid.images[0] || "/placeholder.svg"}
                  className="w-20 h-20 rounded-full object-cover border-2 "
                  alt="Venue"
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
                      className="flex items-center gap-1 mr-2 bg-[#8338EC]  hover:bg-emerald-600 transition-colors px-4 py-2 rounded-lg text-black font-medium w-fit"
                    >
                      <MapPin size={16} />
                      <span>Location</span>
                    </a>
                    <Link
                      href="/new-subscription"
                      className="flex items-center gap-1  bg-gradient-to-r from-[#EBC777] via-[#E2B934] to-[#EBC777] hover:bg-emerald-600 transition-colors px-4 py-2 rounded-lg text-black font-medium w-fit"
                    >
                      <span>Subscription</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-6 mb-6 p-4 bg-[#1D1D1F] rounded-xl border border-zinc-700/50">
              <p className="text-zinc-300 text-center">
                No venue details available
              </p>
            </div>
          )}
          <TermsAndConditions />
          <div className="flex bg-[#131315]/95 backdrop-blur-md items-center border-t border-zinc-700 text-white w-full justify-between px-6 py-4 fixed bottom-0 shadow-lg z-10">
            <div className="flex flex-col">
              <p className="font-sans text-2xl font-bold text-white">
                ₹{total}
              </p>
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
