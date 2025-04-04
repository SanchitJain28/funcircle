"use client";
import Navbar from "@/app/components/Navbar";
import React, { useEffect } from "react";
import { Montserrat } from "next/font/google";
import { motion } from "motion/react";
import "swiper/css/pagination";
// import Head from "next/head";
// import Script from "next/script";
// import Link from "next/link";
// import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import Slider from "@/app/components/swiper";
import Footer from "@/app/components/footer";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
});
export default function EventPage() {
  useEffect(() => {
    // Add structured data for rich results
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "name": "Funcircle: Find Sports Groups Near You in Gurgaon",
      "description": "Join sports groups for Cricket, Football, Volleyball, Badminton & more in Gurgaon. Find sports partners instantly with Funcircle app.",
      "url": "https://funcircle.com",
      "audience": {
        "@type": "Audience",
        "audienceType": "Sports enthusiasts in Gurgaon"
      },
      "potentialAction": {
        "@type": "DownloadAction",
        "target": "https://funcircle.com/download",
        "name": "Download Funcircle App"
      },
      "sameAs": [
        "https://www.instagram.com/funcircle",
        "https://www.facebook.com/funcircle",
        "https://twitter.com/funcircle"
      ]
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <motion.div className="">
      <Navbar />
      <div
        className={`${montserrat.className} xl:px-24 px-8 text-zinc-200 min-h-screen bg-black`}
      >
        {/* INTRO : FIRST 3 */}
        <div className="pt-24 ">
          <p className="lg:text-4xl text-3xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            Funcircle: Find Sports Groups Near You!
          </p>
          <p className="lg:text-2xl text-lg py-4">
            Play Cricket, Football, Volleyball, Badminton & More in Gurgaon!
            🏏⚽🏀
          </p>
          <p className="lg:text-2xl text-lg">
            Tired of searching “play cricket nearby”, “biking groups near me”,
            or “hiking groups in Gurgaon”?
          </p>
          <p className="lg:text-2xl text-lg py-4">
            Funcircle is your go-to app to join sports groups, adventure
            meetups, and social activities instantly!
          </p>
        </div>

        {/* Whether you want to play: */}
        <div className="my-6">
          <p className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            Whether you want to play
          </p>
          <div className="grid lg:grid-cols-4 grid-cols-2 my-2">
            <p className="py-1 underline  decoration-zinc-500 decoration-2 font-bold">
              🏏 Cricket{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              ⚽ Football{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🏐 Volleyball{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🏸 Badminton{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🎾 Tennis{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🏀 Basketball{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🎱 Snooker{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🏏 Box Cricket{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🏓 Pickleball{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🏓 Table Tennis
            </p>
          </div>
        </div>

        {/* Or explore: */}
        <div className="my-6">
          <p className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            Or explore
          </p>
          <div className="grid lg:grid-cols-4 grid-cols-2 my-2">
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🚴‍♂️ Biking Trails{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🥾 Hiking Groups{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🔫 Laser Tag
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🎯 Paintball{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              ⛺ Camping{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🎲 Board Games{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              ❓ Quizzes{" "}
            </p>
            <p className="py-1 underline decoration-zinc-500 decoration-2 font-bold">
              🔍 Mystery Rooms
            </p>
          </div>
          <Slider
          loop={true}
            className="my-8"
            spaceBetween={20}
            slidesPerView={1.3}
            data={[
              { imageLink: "badminton.jpeg", label: "Badminton" },
              { imageLink: "basketball.jpeg", label: "Basketball" },
              { imageLink: "football.jpeg", label: "Football" },
              { imageLink: "boxCricket.jpeg", label: "Box Cricket" },
              { imageLink: "pickelball.jpeg", label: "Pickelball" },
              { imageLink: "snooker.jpeg", label: "Snooker" },
              { imageLink: "golf.jpeg", label: "Golf" },

              { imageLink: "volleyball.jpeg", label: "Volleyball" },
            ]}
          />
          <p className="">We’ve got your squad ready!</p>
        </div>

        {/* Why Funcircle Works for YOU: */}
        <div className="my-6">
          <p className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            Why Funcircle Works for YOU:
          </p>
          <p className="py-2">✅ Play Sports Instantly – Find partners for:</p>
          <div className="grid grid-cols-1">
            <p className="text font-bold py-1">🏏 Cricket Matches</p>
            <p className="text font-bold py-1">⚽ Football Games</p>
            <p className="text font-bold py-1">🏐 Volleyball Tournaments</p>
            <p className="text font-bold py-1">🏸 Badminton Rallies</p>
            <p className="text font-bold py-1">🎾 Tennis Sessions</p>
            <p className="text font-bold py-1">🏀 Basketball Showdowns</p>
            <p className="text font-bold py-1">🎱 Snooker Nights</p>
            <p className="text font-bold py-1">🏏 Box Cricket Leagues</p>
            <p className="text font-bold py-1">🏓 Pickleball Duels</p>
            <p className="text font-bold py-1">🏓 Table Tennis Battles</p>
            <p className="text font-bold py-1">
              ✅ Adventure & Socialize – Join:
            </p>
            <p className="text font-bold py-1">🥾 Hiking Groups in Gurgaon</p>
            <p className="text font-bold py-1">🚴‍♂️ Biking Groups Near You</p>
            <p className="text font-bold py-1">🏃 Running & Cycling Clubs</p>
            <p className="text font-bold py-1">🤝 Volunteering Events</p>
            <p className="text font-bold py-1">
              🎲 Board Games, Quizzes, Camping & Laser Tag!
            </p>
          </div>
        </div>

        {/* ✅ Beginner-Friendly Fun */}
        <div className="my-6">
          <p className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            Beginner-Friendly Fun{" "}
          </p>
          <p className="py-4 text-zinc-200">
            No skills? No problem! Relive childhood joy with casual games like
            Box Cricket, Badminton, Volleyball & Pickleball!
          </p>
        </div>
        {/* ✅ Affordable & Flexible */}
        <div className="my-6">
          <p className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            Affordable & Flexible
          </p>
          <p className="py-4 text-zinc-200">
            Pay per meetup – perfect for weekend Cricket, Football, or Hiking
            Adventures!
          </p>
          <Slider
            className="my-12"
            data={[
              { imageLink: "event_info.jpeg", label: "Event info" },
              { imageLink: "ticket.jpeg", label: "Book your ticket" },
              { imageLink: "confirm_ticket.jpeg", label: "Fun" },
            ]}
          />
        </div>
        {/* Coming Soon */}
        <div className="my-6">
          <p className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            Coming Soon
          </p>
          <p className="py-4 text-zinc-200">
            Expanding to Delhi NCR, Bangalore, Mumbai, Hyderabad!
          </p>
        </div>
        {/* How It Works: */}
        <div className="my-6">
          <p className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            How It Works
          </p>
          <p className="py-2 text-zinc-200">
            1️⃣ Search: Type “play cricket nearby”, “hiking groups in Gurgaon”,
            or “biking groups near me”
          </p>
          <p className="py-2 text-zinc-200">
            2️⃣ Book: Reserve your spot via the app – hassle-free!
          </p>
          <p className="py-2 text-zinc-200">
            3️⃣ Play & Connect: Show up, enjoy football, cricket, badminton,
            hiking – and meet like-minded people!
          </p>
        </div>

        {/* How It Works: Carousel*/}
        <div className="pt-4 pb-8">
          <Slider
            data={[
              { imageLink: "social3.jpeg", label: "Events" },
              { imageLink: "social1.jpeg", label: "Sports" },
              { imageLink: "social4.jpeg", label: "Extreme adventures" },
              { imageLink: "social2.jpeg", label: "Social" },
            ]}
          />
        </div>
        {/* Funcircle Solves Your Problems: */}
        <div className="">
          <p className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            Funcircle Solves Your Problems:
          </p>
          <div className="my-4">
            <p className="py-2 text-zinc-200">
              ❌ “No one to play Cricket, Football, or Badminton with!”
            </p>
            <p className="py-1 text-zinc-200">
              ✔ Find instant groups for Box Cricket, Volleyball, Tennis,
              Basketball, Pickleball & Table Tennis!
            </p>
          </div>
          <div className="w-1/2  border border-zinc-700 mx-auto"></div>
          <div className="my-4">
            <p className="py-2 text-zinc-200">
              ❌ “No one to play Cricket, Football, or Badminton with!”
            </p>
            <p className="py-2 text-zinc-200">
              ✔ Find instant groups for Box Cricket, Volleyball, Tennis,
              Basketball, Pickleball & Table Tennis!
            </p>
          </div>
          <div className="w-1/2  border border-zinc-700 mx-auto"></div>

          <div className="my-4">
            <p className="py-2 text-zinc-200">
              ❌ “No one to play Cricket, Football, or Badminton with!”
            </p>
            <p className="py-2 text-zinc-200">
              ✔ Find instant groups for Box Cricket, Volleyball, Tennis,
              Basketball, Pickleball & Table Tennis!
            </p>
          </div>
        </div>
        {/* What’s Next? */}
        <div className="my-6">
          <p className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            What’s Next?
          </p>
          <p className="py-2 text-zinc-200">
            📍 Cafes & Clubs: Group hangouts in Gurgaon, Delhi NCR, Bangalore,
            Mumbai, Hyderabad!
          </p>
          <p className="py-2 text-zinc-200">
            🏆 Advanced Leagues: Competitive Cricket, Football, Badminton &
            Tennis for pros!{" "}
          </p>
        </div>

        {/* Join 5000+ Gurgaon Users Who Play, Socialize & Explore! */}
        <div className="">
          <p className="lg:text-4xl text-xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
            Join 5000+ Gurgaon Users Who Play, Socialize & Explore!
          </p>
          <p className="lg:text-4xl textlgl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501] my-4">
            📲 Download Funcircle Now!
          </p>
          <p className="py-1 text-white font-bold">
            🏏 Your next Cricket Match
          </p>
          <p className="py-1 text-white font-bold">🥾 Your next Hiking Trip</p>
          <p className="py-1 text-white font-bold">
            🎲 Your next Board Game Night
          </p>
          <p className="text-zinc-400">… is just one click away!</p>
        </div>

        <div className="">
          <Footer />
        </div>
      </div>
    </motion.div>
  );
}
