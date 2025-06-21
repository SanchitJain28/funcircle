"use client";

import React from "react";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
export default function SingleTicket() {
  const appCtx = useContext(appContext);
  if (!appCtx) {
    throw new Error(
      "appContext is null. Ensure the provider is set up correctly."
    );
  }
  const { setOrder } = appCtx;
  const searchParams = useSearchParams();
  const [count, setCount] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const ticketId = searchParams.get("id");
  const [ticket, setTicket] = useState<TicketType>({} as TicketType);
  const handleTicket = async () => {
    setLoading(true);
    try {
      const {
        data: { ticket },
      } = await axios.get(`/api/FetchIndividualTicket?id=${ticketId}`);
      setTicket(ticket);
      setTotal(Number(ticket.price));
      if (ticket.bookedtickets === ticket.capacity) {
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

  useEffect(() => {
    handleTicket();
  }, []);
  if (loading) {
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
          <div className="mx-6 mb-24">
            <div className="bg-[#1D1D1F] p-5 rounded-xl border border-zinc-700/50 shadow-md">
              <p className="text-zinc-200 text-sm font-medium mb-3">
                Terms & Conditions for Booking Tickets
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Ticket Confirmation: Your booking is confirmed only after
                successful payment. A confirmation message will be sent to your
                registered email or phone number.
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Refund & Cancellation Policy:
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Cancellations made at least 24 hours before the event may be
                eligible for a refund (subject to the organizer&apos; policy).
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Last-minute cancellations or no-shows may not be eligible for a
                refund.
              </p>
              <p className="text-zinc-300 text-sm my-2">
                If the event is canceled by the organizer, you will receive a
                full refund or the option to reschedule.
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Event Changes & Postponements:
              </p>
              <p className="text-zinc-300 text-sm my-2">
                The event organizer has the right to change the venue, time, or
                date. In such cases, participants will be notified in advance.
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Non-Transferable Tickets:
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Tickets are non-transferable and can only be used by the person
                who booked them. You may be required to show ID at the venue.
              </p>
              <p className="text-zinc-300 text-sm my-2">Arrival & Entry:</p>
              <p className="text-zinc-300 text-sm my-2">
                Please arrive at the event venue on time. Late arrivals may not
                be allowed entry, and refunds will not be provided in such
                cases.
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Venue Rules & Conduct:
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Participants must follow all rules and guidelines set by the
                venue.
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Any disruptive behavior may result in removal from the event
                without a refund.
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Liability Disclaimer:
              </p>
              <p className="text-zinc-300 text-sm my-2">
                Fun Circle is a platform that facilitates ticket bookings and is
                not responsible for event execution, injuries, lost belongings,
                or disputes at the venue.
              </p>

              <p className="text-zinc-300 text-sm my-2">Photography & Media:</p>
              <p className="text-zinc-300 text-sm my-2">
                Photos and videos may be taken during the event for promotional
                purposes. If you prefer not to be photographed, inform the event
                organizer in advance.
              </p>
              <p className="text-zinc-300 text-sm my-2">Payment Security:</p>
              <p className="text-zinc-300 text-sm my-2">
                All payments are securely processed. Fun Circle does not store
                your payment details.
              </p>
              <p className="text-zinc-300 text-sm my-8">
                By booking a ticket, you agree to these terms. Enjoy the event!
                🎉
              </p>
            </div>
          </div>
          <div className="flex bg-[#131315]/95 backdrop-blur-md items-center border-t border-zinc-700 text-white w-full justify-between px-6 py-4 fixed bottom-0 shadow-lg z-10">
            <div className="flex flex-col">
              <p className="font-sans text-2xl font-bold text-white">
                ₹{total}
              </p>
              <p className="font-sans text-sm text-zinc-400">Total amount</p>
            </div>
            {count > 0 && (
              <Link
                href="/TicketCheckout"
                onClick={createTicketOrder}
                className="flex items-center gap-1 bg-[#8338EC] hover:bg-emerald-600 transition-colors px-6 py-3 rounded-lg text-black font-semibold text-lg"
              >
                CONFIRM SPOT
                <ChevronRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
