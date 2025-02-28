"use client"
import { Skeleton } from "@/components/ui/skeleton"
import axios, { AxiosError } from "axios"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"


interface Ticket {
  capacity: string
  ticketstatus: string
  type: string
  title: string
  location: string
  price: string
  availablecapacity: number
  description: string
  enddatetime: Date
  startdatetime: Date
  venueid: {
    images: string[],
    info: string,
    location: string
    maps_link: string,
    venue_namee: string
  }
}

export default function EventTicket() {
  const { group_id } = useParams()

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const formatDate = (isoString: Date) => {
    return new Date(isoString).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long", // e.g., Thursday
      year: "numeric",
      month: "long", // e.g., February
      day: "numeric", // e.g., 27
    });
  };


  // Fetch tickets from API
  const fetchTickets = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/FetchTickets", { group_id })
      setTickets(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      const axiosError = error as AxiosError
      toast("Sorry, an unexpected error occurred", {
        description: (axiosError.response?.data as { message: string }).message
      })
    } finally {
      setLoading(false)
    }
  }
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
    fetchTickets()
  }, [])
  const deviceType = useDeviceType();

  return (
    <div>
      {/* CHECK */}
      {/* if there is ticket or not */}
      {loading ? (
        <div className="my-4">
          <div className="flex flex-col p-2 space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col p-2 space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
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
        <div className="m-4 overflow-hidden">
          <p className="text-3xl font-sans my-4 font-bold">Tickets</p>
          {tickets.map((ticket, index) => (
            <div key={index} className="border rounded-lg my-4 rounded-xl">
              <div className="flex flex-col bg-red-600 rounded-xl p-4">
                <p className="text-xl font-sans text-white font-bold">{ticket.title}</p>
                <p className="text-xl font-sans text-white font-bold">₹{ticket.price}</p>
                <p className="text-lg font-sans text-white">Valid for {ticket.capacity}</p>
                <p className="text-sm underline font-sans text-white">{ticket.description}</p>
              </div>
              <div id="details">
                <p className=" font-sans text-black font-bold mx-2 my-2 rounded-lg bg-zinc-200 p-2">Start : {formatDate(ticket.startdatetime)}</p>
                <p className=" font-sans text-black font-bold mx-2 my-2 rounded-lg bg-zinc-300 p-2">end : {formatDate(ticket.enddatetime)}</p>
              </div>
              {/* CHECK */}
              {/* if there is venue or there is no venue */}
              {ticket.venueid ?
                <div id="venue" className="mx-4 my-4">
                  <div className="flex items-center">
                    <img src={ticket.venueid.images[0]} className="w-20 h-20 rounded-full" />
                    <div className="flex flex-col mx-4">
                      <p className="font-bold font-sans">{ticket.venueid.venue_namee}</p>
                      <a className="border px-4 py-1 bg-black text-white rounded-lg my-1" href={ticket.venueid.maps_link}>See location</a>
                    </div>
                  </div>
                </div>
                :
                <div className="mx-4 my-4">
                  <p className="text-xl">No venue details</p>
                </div>
              }
              <div className="flex bg-black text-white w-full justify-between px-12 py-4 border-b rounded-lg">
                <p className="font-sans text-lg font-bold">₹{ticket.price}</p>
                {deviceType === "Android" ?
                  <a className="font-sans text-lg font-bold bg-black text-red-500 p-0 rounded-lg" href="https://play.google.com/store/apps/details?id=faceout.social&pcampaignid=web_share">
                    Book now
                  </a> :
                  <a className="font-sans text-lg font-bold bg-black text-red-500 p-0 rounded-lg" href="https://apps.apple.com/in/app/faceout-go-out-date-social/id6479629031">
                    Book now
                  </a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
