"use client";
import axios, { AxiosError } from "axios";
import { ChevronRight, Loader2, MapPin, Ticket } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, {  useEffect, useState } from "react";
import { toast } from "sonner";

export interface Ticket {
  id:number
  bookedtickets: number;
  capacity: string;
  ticketstatus: string;
  type: string;
  title: string;
  location: string;
  price: string;
  availablecapacity: number;
  description: string;
  enddatetime: Date;
  startdatetime: Date;
  group_id: number;
  venueid: {
    images: string[];
    info: string;
    location: string;
    maps_link: string;
    venue_name: string;
  };
}

export default function EventTicket() {
  const { group_id } = useParams();
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  // const formatDate = (isoString?: Date) => {
  //   if (!isoString) return "Invalid date";
  //   return new Date(isoString).toLocaleDateString("en-IN", {
  //     timeZone: "Asia/Kolkata",
  //     weekday: "long", // e.g., Thursday
  //     year: "numeric",
  //     month: "long", // e.g., February
  //     day: "numeric", // e.g., 27
  //     hour: "numeric",
  //   });
  // };
  const formatDateParts = (isoString?: Date) => {
    if (!isoString) {
      return {
        hour: "Invalid",
        day: "Invalid",
        year: "Invalid",
        weekday: "Invalid",
      };
    }

    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: true,
      day: "numeric",
      year: "numeric",
      weekday: "long",
    };

    const formatter = new Intl.DateTimeFormat("en-IN", options);
    const parts = formatter.formatToParts(date);

    const result: { [key: string]: string } = {};
    parts.forEach(({ type, value }) => {
      if (["hour", "day", "year", "dayPeriod", "weekday"].includes(type)) {
        result[type] = (result[type] || "") + value;
      }
    });

    return {
      hour: (result.hour || "") + (result.dayPeriod || ""),
      day: result.day || "Invalid",
      year: result.year || "Invalid",
      weekday: result.weekday || "Invalid",
    };
  };

  // Fetch tickets from API
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post("/api/FetchTickets", { group_id });
      setTickets(data);
      setCurrentTicket(data[0]);
      console.log(data);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast("Sorry, an unexpected error occurred", {
        description: (axiosError.response?.data as { message: string }).message,
      });
    } finally {
      setLoading(false);
    }
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
  useEffect(() => {
    fetchTickets();
    
  }, []);
  const deviceType = useDeviceType();
  const router=useRouter()
  return (
    <div className="bg-[#131315] min-h-screen">
      {/* CHECK */}
      {/* if there is ticket or not */}
      {loading ? (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1c] p-6 rounded-xl flex flex-col items-center max-w-xs w-full">
          <Loader2 className="h-10 w-10 text-white animate-spin mb-4" />
          <p className="text-white text-center font-medium">Loading Events</p>
        </div>
      </div>
      ) : tickets.length === 0 ? (
        <div>
          <p className="text-zinc-600 text-3xl font-sans text-center mt-20 mb-4">
            No tickets currently
          </p>
          <p className="text-zinc-600 text-xl font-sans text-center underline">
            Events coming soon
          </p>
        </div>
      ) : (
        <div className=" overflow-hidden ">
          <p className="text-3xl font-sans mx-4 my-4 font-bold text-white">
            Tickets
          </p>
          <div className="grid grid-cols-2 ">
            {tickets.map((ticket, index) => (
              <div key={index} className=" ">
                <div onClick={()=>{
                  router.push(`/funcircle/ticket?id=${ticket.id}`)
                }}  className=" bg-[#1D1D1F] rounded-xl mx-2 my-2 border border-[#2bd0d6] p-4" >
                  <p className="text font-sans text-white font-bold">
                    {formatDateParts(ticket.startdatetime).hour +
                      " - " +
                      formatDateParts(ticket.enddatetime).hour +
                      ", " +
                      formatDateParts(ticket.startdatetime).weekday +
                      ", " +
                      formatDateParts(ticket.startdatetime).day +
                      ""}
                  </p>
                  <p className="text-xl font-sans text-white font-bold">
                    ₹{ticket.price}
                  </p>
                  <p className="text-white my-2">{ticket.venueid.location}</p>
                  <div className="flex items-center w-24 bg-white px-2 py-1 rounded-lg my-1">
                    <MapPin size={20} />
                    <a
                      className="text-black"
                      href={ticket.venueid.maps_link}
                    >
                      Maps
                    </a>
                  </div>
                  <p className="text-white font-bold my-2">
                    Slots : {ticket.capacity}
                  </p>
                  <div className=" justify-between my-2">
                    <div className="flex  flex-col">
                      <p className="text-white text-sm  font-bold">
                        {ticket.title}
                      </p>
                    </div>
                  </div>
                  {/* <p className="text-sm underline font-sans text-white">{ticket.description}</p> */}
                </div>

                {/* CHECK */}
                {/* if there is venue or there is no venue */}
              </div>
            ))}
          </div>

          <div className="mx-4">
            <p className="text-white underline my-2">About this meetup </p>
            <p className="text-white text-sm">{currentTicket?.description}</p>
          </div>

          {/* {currentTicket?.venueid ? (
            <div
              id="venue"
              className="m-4 rounded-lg px-4 py-4 my-4 bg-[#1D1D1F]"
            >
              <p className="text-white ">Venue details</p>
              <div className="flex items-center">
                <img
                  src={currentTicket?.venueid.images[0]}
                  alt={currentTicket?.venueid.venue_name || "Venue image"}
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex flex-col mx-4">
                  <p className="my-2 font-sans text-white">
                    {currentTicket?.venueid.venue_name}
                  </p>
                  <p className=" font-sans text-white">
                    {currentTicket?.venueid.location}
                  </p>
                  <div className="flex items-center w-24 bg-white px-2 py-1 rounded-lg my-1">
                    <MapPin size={20} />
                    <a
                      className="text-black"
                      href={currentTicket?.venueid.maps_link}
                    >
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
          )} */}

          <a
            href={
              deviceType === "Android"
                ? "https://play.google.com/store/apps/details?id=faceout.social&pcampaignid=web_share"
                : "https://apps.apple.com/in/app/faceout-go-out-date-social/id6479629031"
            }
            className="flex bg-[#131315] items-center border-t border-zinc-600  text-white w-full justify-between px-12 py-4 fixed bottom-0"
          >
            {/* <div className="flex flex-col">
              <p className="font-sans text-lg font-bold">
                ₹{currentTicket?.price}
              </p>
              <p className="font-sans text-sm">Total</p>
            </div> */}

            <div className="font-sans flex items-center text-center font-semibold text-lg bg-white w-full mx-auto text-black px-4 py-2 rounded-lg">
              <p className="text-center">CONFIRM SPOT</p>
              <ChevronRight color="#9F9EA3" />
            </div>
          </a>

          <div className="m-4">
            <p className="text-white underline text-lg">Terms and conditions</p>
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
              If the event is canceled by the organizer, you will receive a full
              refund or the option to reschedule.
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
              Please arrive at the event venue on time. Late arrivals may not be
              allowed entry, and refunds will not be provided in such cases.
            </p>
            <p className="text-zinc-300 text-sm my-2">Venue Rules & Conduct:</p>
            <p className="text-zinc-300 text-sm my-2">
              Participants must follow all rules and guidelines set by the
              venue.
            </p>
            <p className="text-zinc-300 text-sm my-2">
              Any disruptive behavior may result in removal from the event
              without a refund.
            </p>
            <p className="text-zinc-300 text-sm my-2">Liability Disclaimer:</p>
            <p className="text-zinc-300 text-sm my-2">
              Fun Circle is a platform that facilitates ticket bookings and is
              not responsible for event execution, injuries, lost belongings, or
              disputes at the venue.
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
              By booking a ticket, you agree to these terms. Enjoy the event! 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
