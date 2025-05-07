"use client";
import EventTimeSwitch from "@/app/components/EventTimeSwitch";
import { FormatDateTime } from "@/app/utils/Formating/DateFormat";
import axios, { AxiosError } from "axios";
import { Loader2, MapPin, Ticket, UserRound } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
export interface Ticket {
  id: number;
  bookedtickets: number;
  capacity: number;
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
type GroupedTickets = {
  date: string;
  am: Ticket[];
  pm: Ticket[];
};

interface Tabs {
  active: boolean;
  am: Ticket[];
  date: string;
  pm: Ticket[];
}

export default function EventTicket() {
  const { group_id } = useParams();
  const router=useRouter()
  const [loading, setLoading] = useState<boolean>(true);
  const [isMorning, setIsMorning] = useState<boolean>(true);
  const [tabs, setTabs] = useState<Tabs[]>([]);
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
  // const formatDateParts = (isoString?: Date) => {
  //   if (!isoString) {
  //     return {
  //       hour: "Invalid",
  //       day: "Invalid",
  //       year: "Invalid",
  //       weekday: "Invalid",
  //     };
  //   }

  //   const date = new Date(isoString);

  //   const options: Intl.DateTimeFormatOptions = {
  //     timeZone: "Asia/Kolkata",
  //     hour: "numeric",
  //     hour12: true,
  //     day: "numeric",
  //     year: "numeric",
  //     weekday: "long",
  //   };

  //   const formatter = new Intl.DateTimeFormat("en-IN", options);
  //   const parts = formatter.formatToParts(date);

  //   const result: { [key: string]: string } = {};
  //   parts.forEach(({ type, value }) => {
  //     if (["hour", "day", "year", "dayPeriod", "weekday"].includes(type)) {
  //       result[type] = (result[type] || "") + value;
  //     }
  //   });

  //   return {
  //     hour: (result.hour || "") + (result.dayPeriod || ""),
  //     day: result.day || "Invalid",
  //     year: result.year || "Invalid",
  //     weekday: result.weekday || "Invalid",
  //   };
  // };
  const handleTabs = (tabIndex: number) => {
    const updatedTabs = tabs.map((e, index: number) => {
      if (tabIndex === index) {
        return { ...e, active: true };
      }
      return { ...e, active: false };
    });
    setTabs(updatedTabs);
  };

  // Fetch tickets from API
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post("/api/FetchTickets", { group_id });
      const sortedData = groupTicketsByDateWithAMPM(data);
      console.log(sortedData);
      setTabs(() => {
        const filteredTabs = sortedData.map((e, index) => {
          if (index === 0) {
            return { active: true, ...e };
          }
          return { active: false, ...e };
        });
        return filteredTabs;
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      toast("Sorry, an unexpected error occurred", {
        description: (axiosError.response?.data as { message: string }).message,
      });
    } finally {
      setLoading(false);
    }
  };

  function groupTicketsByDateWithAMPM(tickets: Ticket[]): GroupedTickets[] {
    const grouped: Record<string, { am: Ticket[]; pm: Ticket[] }> = {};

    tickets.forEach((ticket) => {
      const startDate = new Date(ticket.startdatetime);
      const dateKey = startDate.toISOString().split("T")[0];
      const hours = startDate.getUTCHours(); // or getHours() if local time is needed

      const period: "am" | "pm" = hours < 12 ? "am" : "pm";

      if (!grouped[dateKey]) {
        grouped[dateKey] = { am: [], pm: [] };
      }

      grouped[dateKey][period].push(ticket);
    });

    return Object.entries(grouped)
      .map(([date, { am, pm }]) => ({
        date,
        am: am.sort(
          (a, b) =>
            new Date(a.startdatetime).getTime() -
            new Date(b.startdatetime).getTime()
        ),
        pm: pm.sort(
          (a, b) =>
            new Date(a.startdatetime).getTime() -
            new Date(b.startdatetime).getTime()
        ),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  // const useDeviceType = () => {
  //   const [device, setDevice] = useState("");

  //   useEffect(() => {
  //     const userAgent = navigator.userAgent || navigator.vendor;

  //     if (/android/i.test(userAgent)) {
  //       setDevice("Android");
  //     } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
  //       setDevice("iOS");
  //     } else {
  //       setDevice("Other");
  //     }
  //   }, []);

  //   return device;
  // };

  useEffect(() => {
    fetchTickets();
  }, []);
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1c] p-6 rounded-xl flex flex-col items-center max-w-xs w-full">
          <Loader2 className="h-10 w-10 text-white animate-spin mb-4" />
          <p className="text-white text-center font-medium">Loading Events</p>
        </div>
      </div>
    );
  }
  // const deviceType = useDeviceType();
  return (
    <div className="min-h-screen bg-[#131315]">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Location Section */}
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <MapPin className="text-indigo-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-medium opacity-75">
                  Location
                </p>
                <p className="text-white font-bold">Gurgaon</p>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-2">
              <div>
                <p className="text-white text-sm font-medium text-right opacity-75">
                  Welcome
                </p>
                <p className="text-white font-bold text-right">Guest User</p>
              </div>
              <div className="bg-white rounded-full p-2 shadow-lg">
                <UserRound className="text-indigo-600 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //SWITCH FOR MORNING AND NIGHT */}
      <div className="border-b border-zinc-800 flex justify-between px-8 py-6 items-center">
        <div className="flex">
          {tabs.map((e, index: number) => {
            const formatedDate = FormatDateTime(e.date);
            return (
              <div
                className={`flex flex-col items-center px-4 py-2 ${
                  e.active ? "bg-[#303030]" : ""
                }  mr-2 rounded-xl`}
                key={index}
                onClick={() => {
                  handleTabs(index);
                  console.log(tabs);
                }}
              >
                <p className="text-white font-bold ">{formatedDate.date}</p>
                <p className="text-white font-bold">
                  {formatedDate.day.slice(0, 3)}
                </p>
              </div>
            );
          })}
        </div>
        <EventTimeSwitch
          onChange={(e) => {
            setIsMorning(e);
          }}
        />
      </div>

      {/* //HERE ARE THE TICKETS */}
      <div className="">
        {tabs.map((e, index) => {
          const allEventsIncludingAmandPm = isMorning ? e.am : e.pm;
          if (e.active) {
            return (
              <div key={index}>
                {allEventsIncludingAmandPm.map((event, i) => {
                  console.log(event.startdatetime);
                  const formatedDate = FormatDateTime(
                    String(event.startdatetime)
                  );
                  console.log(formatedDate);
                  return (
                    <div key={i} className="flex items-start mx-4 my-2"
                    onClick={()=>{
                      router.push(`/funcircle/ticket?id=${event.id}`)
                    }}>
                      <div className="">
                        <p className="text-white mr-2 font-bold">
                          {formatedDate.time}
                        </p>
                      </div>
                      <div className="flex flex-col w-9/12">
                        <p className="text-zinc-500 font-semibold ">
                          {event.venueid.location}
                        </p>
                        <p className="text-white text-lg rounded-xl p-2 bg-[#303030] font-bold">
                          {event.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
