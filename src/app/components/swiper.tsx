"use client";
import React from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Montserrat } from "next/font/google";
interface slide {
  imageLink: string;
  label: string;
}
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
});
export default function Slider({
  data,
  className,
  spaceBetween,
  slidesPerView,
  imagestyle,
  loop,
}: {
  data: slide[];
  className?: string;
  spaceBetween?: number;
  slidesPerView?: number;
  imagestyle?: string;
  loop?: boolean;
}) {
  return (
    <div className={className + " " + montserrat.className}>
      <Swiper
        loop={loop ? loop : false}
        centeredSlides={true}
        freeMode={true}
        className="my-8 relative"
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        spaceBetween={spaceBetween ? spaceBetween : 10}
        slidesPerView={slidesPerView ? slidesPerView : 1.5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <div className="">
          {data.map((slide: slide, index) => {
            return (
              <SwiperSlide className=" h-60  rounded-xl" key={index}>
                {({ isActive }) => (
                  <motion.div
                    className={`flex flex-col justify-center items-center ${isActive?"z-10":"z-0"}`}
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      rotate: isActive ? 0 : 5,
                      scale: isActive ? 1.2 : 1,
                    }}
                  >
                    <motion.img
                      src={slide.imageLink}
                      alt=""
                      className={`${
                        isActive
                          ? "bg-gradient-to-r from-[#263CDE] via-[#C119B7] to-[#FF9501] border-zinc-400 p-[0.8px]"
                          : ""
                      } rounded-xl  ${imagestyle}`}
                    />
                    <p className="text-white text-lg my-2 ">
                      {isActive ? slide.label : ""}
                    </p>
                  </motion.div>
                )}
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
}
