import React from "react";
// import { Ticket } from "../(app)/funcircle/eventTicket/[group_id]/page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function LiveTickets() {
  const router = useRouter();
  // const [liveTickets, setLiveTickets] = useState<[] | Ticket[]>([]);
  // const fetchLiveTickets = async () => {
  //   try {
  //     const response = await axios.post("/api/FetchLiveTickets");
  //     setLiveTickets(response.data.data);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchLiveTickets();
  // }, []);
  return (
    <div className=" mb-4 px-[14px]">
      <Swiper spaceBetween={12} className="" slidesPerView={1.0}>
        {[1].map((ticket) => {
          return (
            <SwiperSlide key={ticket} className="">
              <motion.div
                className="border flex items-center border-red-400 px-4 py-4 rounded-lg"
                onClick={() => {
                  router.push(`/funcircle/eventTicket/${90}`);
                }}
                animate={{
                  borderColor: ["#ff0000", "#ffffff", "#ff0000"], // red → white → red
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="badminton"
                  className="w-8 stroke-white mr-4 "
                >
                  <path d="M20.49,10.61l-.65-.21a1.46,1.46,0,0,1-1-1.39V7A1.86,1.86,0,0,0,17,5.16H15a1.46,1.46,0,0,1-1.39-1l-.21-.65A1.86,1.86,0,0,0,10,3.27l-5,10L3.47,14.77a4.07,4.07,0,0,0,2.88,7,4.09,4.09,0,0,0,2.88-1.19l1.48-1.48,10-5a1.86,1.86,0,0,0-.24-3.43ZM17,6.66a.36.36,0,0,1,.36.36V9a3,3,0,0,0,.2,1l-6.36,3.54-.77-.77L14,6.46a3,3,0,0,0,1,.2ZM10.41,17.52,6.48,13.59l.86-1.72,4.79,4.79ZM11.3,3.94a.37.37,0,0,1,.35-.2A.35.35,0,0,1,12,4l.22.65a2.87,2.87,0,0,0,.54,1L9.31,11.72,8,10.46ZM4.53,19.47a2.58,2.58,0,0,1,0-3.64l1-1L9.2,18.43l-1,1A2.58,2.58,0,0,1,4.53,19.47ZM20.06,12.7,13.54,16l-1.26-1.27,6.14-3.41a2.87,2.87,0,0,0,.95.54L20,12a.35.35,0,0,1,.24.31A.34.34,0,0,1,20.06,12.7Z"></path>
                </svg>
                <p className="text-white">See badminton slots</p>
              </motion.div>
              {/* <div
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
              </div> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
