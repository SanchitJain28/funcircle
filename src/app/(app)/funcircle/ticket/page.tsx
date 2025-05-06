"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Ticket } from "../eventTicket/[group_id]/page";
import { ChevronRight, Clock, Loader2, MapPin } from "lucide-react";
const searchParams = useSearchParams();

export default function page() {
  const [loading, setLoading] = useState<boolean>(true);
  const ticketId = searchParams.get("id");
  const [ticket, setTicket] = useState<Ticket|null>(null);
  const handleTicket = async () => {
    setLoading(true);
    try {
      const { data :{ticket}} = await axios.get(
        `/api/FetchIndividualTicket?id=${ticketId}`
      );
      setTicket(ticket);
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
  const useDeviceType = () => {
    const [device, setDevice] = useState("");

    useEffect(() => {
      const userAgent = navigator.userAgent || navigator.vendor;

      if (/android/i.test(userAgent)) {
        setDevice("Android");
      } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        setDevice("iOS");
      } else {
        setDevice("Other");
      }
    }, []);

    return device;
  };
 
  const deviceType = useDeviceType();

  useEffect(() => {
    handleTicket();
  }, []);
  if (loading) {
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="bg-[#1a1a1c] p-6 rounded-xl flex flex-col items-center max-w-xs w-full">
        <Loader2 className="h-10 w-10 text-white animate-spin mb-4" />
        <p className="text-white text-center font-medium">Loading Events</p>
      </div>
    </div>;
  }

  return (
    <div className="bg-[#131315] min-h-screen">
      <div className=" overflow-hidden ">
        <p className="text-3xl font-sans mx-4 my-4 font-bold text-white">
          Tickets
        </p>
          <div className="my-4 ">
            <div className="flex flex-col bg-[#1D1D1F] rounded-xl m-4 border border-[#676769] p-4">
              <p className="text-xl font-sans text-white font-bold">
                {ticket?.title}
              </p>
              <p className="text-xl font-sans text-white font-bold">
                ₹{ticket?.price}
              </p>
              <p className="text-lg font-sans text-white">
                Total spots : {ticket?.capacity}
              </p>
              {/* <p className="text-sm underline font-sans text-white">{ticket.description}</p> */}
            </div>
            <div className=" justify-between m-4">
              <div className="flex my-2  my-2">
                <p className="text-white">
                  {ticket?.bookedtickets} people joined
                </p>
              </div>
              <div className="bg-[#1D1D1F] rounded-xl px-2">
                <div className="flex rounded-lg  items-center p-2">
                  <Clock color="#9F9EA3" />
                  <p className=" font-sans  rounded-lg  text-white p-2">
                    From: {ticket?.startdatetime ? formatDate(ticket.startdatetime) : "N/A"}
                  </p>
                </div>
                <div className="flex bg-[#1D1D1F] rounded-lg items-center p-2">
                  <Clock color="#9F9EA3" />
                  <p className=" font-sans rounded-lg text-white p-2">
                    {" "}
                    To : {ticket?.enddatetime ? formatDate(ticket.enddatetime) : "End time not available"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-2 p-4">
              <p className="text-white underline my-2">About this meetup </p>
              <p className="text-white text-sm">{ticket?.description}</p>
            </div>
            {/* CHECK */}
            {/* if there is venue or there is no venue */}
            {ticket?.venueid ? (
              <div
                id="venue"
                className="m-4 rounded-lg px-4 py-4 my-4 bg-[#1D1D1F]"
              >
                <p className="text-white ">Venue details</p>
                <div className="flex items-center">
                  <img
                    src={ticket.venueid.images[0]}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex flex-col mx-4">
                    <p className="my-2 font-sans text-white">
                      {ticket.venueid.venue_name}
                    </p>
                    <p className=" font-sans text-white">
                      {ticket.venueid.location}
                    </p>
                    <div className="flex items-center w-24 bg-white px-2 py-1 rounded-lg my-1">
                      <MapPin size={20} />
                      <a className="text-black" href={ticket.venueid.maps_link}>
                        Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-4 my-4">
                <p className="text-xl">No venue details</p>
              </div>
            )}
            <div className="m-4">
              <p className="text-white underline text-lg">
                Terms and conditions
              </p>
              <p className="text-zinc-300 text-sm my-2">
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
            <a
              href={
                deviceType === "Android"
                  ? "https://play.google.com/store/apps/details?id=faceout.social&pcampaignid=web_share"
                  : "https://apps.apple.com/in/app/faceout-go-out-date-social/id6479629031"
              }
              className="flex bg-[#131315] items-center border-t border-zinc-600  text-white w-full justify-between px-12 py-4 fixed bottom-0"
            >
              <div className="flex flex-col">
                <p className="font-sans text-lg font-bold">₹{ticket?.price}</p>
                <p className="font-sans text-sm">Total</p>
              </div>

              <div className="font-sans font-semibold text-lg bg-white  text-black px-10 py-2 rounded-lg">
                <div className="flex">
                  <p>CONFIRM SPOT</p>
                  <ChevronRight color="#9F9EA3" />
                </div>
              </div>
            </a>
          </div>
      </div>
    </div>
  );
}
