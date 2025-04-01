import axios from "axios";
import React, { useEffect, useState } from "react";
import { Ticket } from "../(app)/funcircle/eventTicket/[group_id]/page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Radio } from "lucide-react";
import { motion } from "motion/react";
import { FormatDateTime } from "../utils/Formating/DateFormat";
import { useRouter } from "next/navigation";

export default function LiveTickets() {
  const router = useRouter();
  const [liveTickets, setLiveTickets] = useState<[] | Ticket[]>([]);
  const fetchLiveTickets = async () => {
    try {
      const response = await axios.post("/api/FetchLiveTickets");
      setLiveTickets(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLiveTickets();
  }, []);
  return (
    <div className=" mb-4 px-[14px]">
      <Swiper spaceBetween={12} className="" slidesPerView={1.1}>
        {liveTickets.map((ticket: Ticket, index: number) => {
          const dateInfo = FormatDateTime(new Date(ticket.startdatetime));
          const infoString =
            ticket.capacity +
            " spots | " +
            dateInfo.day +
            " | " +
            ticket.venueid.location;
          return (
            <SwiperSlide key={index} className="">
              <div
                onClick={() => {
                  router.push(`/funcircle/eventTicket/${ticket.group_id}`);
                }}
                className="border border-zinc-600 px-4 py-2 rounded-lg "
                key={index}
              >
                <motion.div
                  className="flex items-center"
                  animate={{ scale: [1, 1.005, 1], opacity: [1, 0.4, 1] }} // Pulsing effect
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Radio size={20} color="#f56565" />
                  <p className="text-zinc-400 text-xs ml-1 ">
                    Live, Book ticket now
                  </p>
                </motion.div>
                <p className="text-white text-sm overflow-hidden">
                  {ticket.title.length >= 60
                    ? ticket.title.slice(0, 60) + "..."
                    : ticket.title}
                </p>

                <p className="text-zinc-400 text-sm">
                  {infoString.length > 40
                    ? infoString.slice(0, 40) + "..more"
                    : infoString}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
