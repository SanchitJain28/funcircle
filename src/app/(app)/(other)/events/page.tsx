"use client";
import Navbar from "@/app/components/Navbar";
import React, { useEffect } from "react";
import { Montserrat } from "next/font/google";
import "swiper/css/pagination";
import Head from "next/head";
import Script from "next/script";
// import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import Slider from "@/app/components/swiper";
import Footer from "@/app/components/footer";
import Link from "next/link";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});
export default function EventPage() {
  useEffect(() => {
    // Add structured data for rich results
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      name: "Funcircle: Find Sports Groups Near You in Gurgaon, Delhi NCR",
      description:
        "Join sports groups for Cricket, Football, Volleyball, Badminton & more in Gurgaon. Find sports partners and biking groups near me instantly with Funcircle app.",
      url: "https://funcircle.com",
      audience: {
        "@type": "Audience",
        audienceType: "Sports enthusiasts in Gurgaon and Delhi NCR",
      },
      potentialAction: {
        "@type": "DownloadAction",
        target: "https://funcircleapp.com/",
        name: "Download Funcircle App",
      },
      sameAs: [
        "https://www.instagram.com/funcircleapp",
        "https://www.facebook.com/funcircleapp",
        "https://twitter.com/funcircleapp",
      ],
      location: {
        "@type": "Place",
        name: "Gurgaon, Delhi NCR",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurgaon",
          addressRegion: "Haryana",
          addressCountry: "India",
        },
      },
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  const sportsList = [
    { name: "Cricket", emoji: "🏏" },
    { name: "Football", emoji: "⚽" },
    { name: "Volleyball", emoji: "🏐" },
    { name: "Badminton", emoji: "🏸" },
    { name: "Tennis", emoji: "🎾" },
    { name: "Basketball", emoji: "🏀" },
    { name: "Snooker", emoji: "🎱" },
    { name: "Box Cricket", emoji: "🏏" },
    { name: "Pickleball", emoji: "🏓" },
    { name: "Table Tennis", emoji: "🏓" },
  ];
  const adventureList = [
    { name: "Biking Trails", emoji: "🚴‍♂️" },
    { name: "Hiking Groups", emoji: "🥾" },
    { name: "Laser Tag", emoji: "🔫" },
    { name: "Paintball", emoji: "🎯" },
    { name: "Camping", emoji: "⛺" },
    { name: "Board Games", emoji: "🎲" },
    { name: "Quizzes", emoji: "❓" },
    { name: "Mystery Rooms", emoji: "🔍" },
  ];

  return (
    <>
      <Head>
        <title>
          Funcircle: Find Sports Groups & Activities in Gurgaon | Play Cricket
          Nearby, Football, Hiking Groups
        </title>
        <meta
          name="description"
          content="Join sports groups for Cricket, Football, Volleyball & Badminton in Gurgaon. Find biking groups near me, hiking groups in Gurgaon & play cricket nearby with Funcircle app."
        />
        <meta property="og:updated_time" content={new Date().toISOString()} />

        <meta
          name="keywords"
          content="play cricket nearby, sports groups in Gurgaon, football games Gurgaon, badminton groups, hiking groups in Gurgaon, biking groups near me, Delhi NCR sports, Bangalore sports groups, Mumbai sports groups, Hyderabad sports groups, box cricket, tennis, basketball, snooker, pickleball, table tennis, adventure groups, social meetups"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://funcircleapp.com/" />
        <meta
          property="og:title"
          content="Find Sports Groups in Gurgaon | Play Cricket Nearby | Biking Groups Near Me"
        />
        <meta
          property="og:description"
          content="Join Cricket, Football, Volleyball, Badminton sports groups in Gurgaon & Delhi NCR. Find hiking groups in Gurgaon and biking groups near me. Play cricket nearby!"
        />
        <meta property="og:image" content="https://funcircleapp.com" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://funcircleapp.com/" />
        <meta
          property="twitter:title"
          content="Find Sports Groups in Gurgaon | Play Cricket Nearby | Funcircle App"
        />
        <meta
          property="twitter:description"
          content="Join Cricket, Football, Volleyball & more sports groups in Gurgaon. Find hiking groups in Gurgaon and play cricket nearby with Funcircle!"
        />
        <meta property="twitter:image" content="https://funcircleapp.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://funcircleapp.com/" />
      </Head>
      <div className="">
        <Navbar />
        <section
          className={`${montserrat.className} xl:px-24 px-8 text-zinc-200 min-h-screen bg-black`}
        >
          {/* INTRO : FIRST 3 */}
          <div className="pt-24 ">
            <h1
              id="main-heading"
              className="lg:text-4xl text-3xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]"
            >
              Funcircle: Find Sports Groups & Play Cricket Nearby in Gurgaon and
              Delhi NCR
            </h1>
            <h2 className="lg:text-2xl text-lg py-4">
              Join Cricket, Football, Volleyball, Badminton Groups & More in
              Gurgaon, Delhi NCR! 🏏⚽🏀
            </h2>
            <p className="lg:text-2xl text-lg">
              Tired of searching &quot;<strong>play cricket nearby</strong>
              &quot;, &quot;<strong>biking groups near me</strong>&quot;, or
              &quot;<strong>hiking groups in Gurgaon</strong>&quot;?
            </p>
            <p className="lg:text-2xl text-lg py-4">
              Funcircle is your go-to app to join <strong>sports groups</strong>
              , <strong>adventure meetups</strong>, and{" "}
              <strong>social activities</strong> in <strong>Gurgaon</strong> and{" "}
              <strong>Delhi NCR</strong> instantly!
            </p>
          </div>

          {/* Whether you want to play: */}
          <section className="my-6">
            <h2
              id="sports-heading"
              className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]"
            >
              Sports Groups in Gurgaon and delhi NCR:
            </h2>
            <p className="py-2">Whether you want to play:</p>
            <ul className="grid lg:grid-cols-4 grid-cols-1 my-2">
              {sportsList.map((sport, index) => (
                <li key={index} className="py-2">
                  <Link
                    href={`/funcircle`}
                    className=" decoration-zinc-500 decoration-2 "
                  >
                    {sport.emoji} {sport.name} |<strong> Gurgaon</strong> |
                    Delhi NCR
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Or explore: */}
          <section className="my-8">
            <h2
              id="adventures-heading"
              className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]"
            >
              Adventure Activities in Gurgaon & Delhi NCR
            </h2>
            <p className="py-2">Or explore:</p>
            <ul className="grid lg:grid-cols-4 grid-cols-2 my-2">
              {adventureList.map((activity, index) => (
                <li key={index} className="py-1">
                  <Link
                    href={`/funcircle`}
                    className=" decoration-zinc-500 decoration-2 font-bold"
                  >
                    {activity.emoji} {activity.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Slider
              loop={true}
              className="my-16"
              spaceBetween={20}
              slidesPerView={1.3}
              data={[
                { imageData: {imageLink:"badminton.jpeg",altText:"Two players playing badminton indoors in Delhi NCR"}, label: "Badminton" },
                { imageData: {imageLink:"basketball.jpeg",altText:"Player shooting a basketball into the hoop in Delhi NCR"}, label: "Basketball" },
                { imageData: {imageLink:"football.jpeg",altText:"Football match in action on a green field in Delhi NCR"}, label: "Football" },
                { imageData: {imageLink:"boxCricket.jpeg",altText:"Box cricket game being played in a netted enclosure in Delhi NCR"}, label: "Box Cricket" },
                { imageData: {imageLink:"pickelball.jpeg",altText:"Player serving during a pickleball game in Delhi NCR"}, label: "Pickelball" },
                { imageData: {imageLink:"snooker.jpeg",altText:"Snooker table with colorful balls arranged for a game in Delhi NCR"}, label: "Snooker" },
                { imageData: {imageLink:"golf.jpeg",altText:"Golfer swinging a club on a sunny golf course in Delhi NCR"}, label: "Golf" },
                { imageData: {imageLink:"volleyball.jpeg",altText:"Volleyball players jumping to hit the ball over the net in Delhi NCR"}, label: "Volleyball" },
              ]}
            />
            <p className="">We’ve got your squad ready!</p>
          </section>

          {/* Why Funcircle Works for YOU: */}
          <section className="my-6">
            <h2
              id="why-works-for-you"
              className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]"
            >
              Why Funcircle Works for Sports Enthusiasts in Gurgaon:
            </h2>
            <div className="my-6">
              <h3 className="py-2">
                ✅ Play Sports Instantly – Find partners for:
              </h3>
              <ul className="grid grid-cols-1">
                <li className="text font-bold py-1">
                  🏏 Cricket Matches Near You
                </li>
                <li className="text font-bold py-1">
                  ⚽ Football Games in Gurgaon
                </li>
                <li className="text font-bold py-1">
                  🏐 Volleyball Tournaments in Delhi NCR
                </li>
                <li className="text font-bold py-1">
                  🏸 Badminton Rallies Nearby
                </li>
                <li className="text font-bold py-1">
                  🎾 Tennis Sessions in Gurgaon
                </li>
                <li className="text font-bold py-1">🏀 Basketball Showdowns</li>
                <li className="text font-bold py-1">🎱 Snooker Nights</li>
                <li className="text font-bold py-1">🏏 Box Cricket Leagues</li>
                <li className="text font-bold py-1">🏓 Pickleball Duels</li>
                <li className="text font-bold py-1">🏓 Table Tennis Battles</li>
              </ul>

              <div className="my-3 ">
                <h3 className="text-2xl py-2 font-semibold">
                  ✅ Adventure & Socialize in Delhi NCR – Join:
                </h3>
                <ul className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <li className="text font-bold py-1">
                    🥾 Hiking Groups in Gurgaon
                  </li>
                  <li className="text font-bold py-1">
                    🚴‍♂️ Biking Groups Near Me
                  </li>
                  <li className="text font-bold py-1">
                    🏃 Running & Cycling Clubs in Delhi NCR
                  </li>
                  <li className="text font-bold py-1">
                    🤝 Volunteering Events
                  </li>
                  <li className="text font-bold py-1">
                    🎲 Board Games, Quizzes & Mystery Rooms
                  </li>
                  <li className="text font-bold py-1">
                    ⛺ Camping Trips from Gurgaon
                  </li>
                  <li className="text font-bold py-1">
                    🔫 Laser Tag Adventures
                  </li>
                  <li className="text font-bold py-1">
                    🎯 Paintball Battles in Delhi NCR
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ✅ Beginner-Friendly Fun */}
          <section className="my-6">
            <h2 className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
              Beginner-Friendly Fun{" "}
            </h2>
            <p className="py-4 text-zinc-200">
              No skills? No problem! Relive childhood joy with casual games like
              <strong> Box Cricket</strong>, <strong>Badminton</strong>,{" "}
              <strong>Volleyball</strong> & <strong>Pickleball</strong> in
              Gurgaon! Perfect for beginners looking to play cricket nearby or
              join sports groups in Delhi NCR.
            </p>
          </section>
          {/* ✅ Affordable & Flexible */}
          <section className="my-6">
            <h2 className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
              Affordable Pay-Per-Meetup Sports in Gurgaon and Delhi NCR
            </h2>
            <p className="py-4 text-zinc-200">
              Pay per meetup – perfect for weekend <strong>Cricket</strong>,{" "}
              <strong>Football</strong>, or <strong>Hiking Adventures</strong>{" "}
              in <strong>Gurgaon</strong> and <strong>Delhi NCR</strong>! No
              memberships or long-term commitments required to play sports near
              you.
            </p>
            <Slider
              spaceBetween={40}
              className="my-12"
              data={[
                { imageData: {imageLink:"event_info.jpeg",altText:"Details about an upcoming event displayed on a screen"}, label: "Event info" },
                { imageData: {imageLink:"ticket.jpeg",altText:"User booking a ticket online for an event"}, label: "Book your ticket" },
                { imageData: {imageLink:"confirm_ticket.jpeg",altText:"Excited friends celebrating with confirmed event tickets"}, label: "Fun" },
              ]}
            />
          </section>
          {/* Coming Soon */}
          <section className="my-6">
            <h2 className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
              Sports Groups Coming Soon in Other Cities
            </h2>
            <p className="py-4 text-zinc-200">
              Expanding beyond Gurgaon to Delhi NCR, <strong>Bangalore</strong>,{" "}
              <strong>Mumbai</strong>, <strong>Hyderabad</strong>! Soon
              you&lsquo;ll be able to find sports partners across major Indian
              cities.
            </p>
          </section>
          {/* How It Works: */}
          <section className="mt-6">
            <h2 className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
              How It Works
            </h2>
            <div className="my-4">
              <h3 className="py-2 text-zinc-200 text-xl font-semibold">
                1️⃣ Search:
              </h3>
              <p className="py-1 text-zinc-200">
                Type &quot;<strong>play cricket nearby</strong>&quot;, &quot;
                <strong>hiking groups in Gurgaon</strong>&quot;, or &quot;
                <strong>biking groups near me</strong>&quot; to find activities
                in Gurgaon and Delhi NCR
              </p>
            </div>
            <div className="my-4">
              <h3 className="py-2 text-zinc-200 text-xl font-semibold">
                2️⃣ Book:
              </h3>
              <p className="py-1 text-zinc-200">
                Reserve your spot via the app for sports groups in Gurgaon –
                hassle-free booking for cricket, football, badminton and more!
              </p>
            </div>
            <div className="my-4">
              <h3 className="py-2 text-zinc-200 text-xl font-semibold">
                3️⃣ Play & Connect:
              </h3>
              <p className="py-1 text-zinc-200">
                Show up, enjoy <strong>football</strong>,{" "}
                <strong>cricket</strong>, <strong>badminton</strong>,
                <strong> hiking</strong> in <strong>Gurgaon</strong> – and meet
                like-minded people in <strong>Delhi NCR</strong>!
              </p>
            </div>
          </section>

          {/* How It Works: Carousel*/}
          <section className=" pb-2">
            <h2 className="lg:text-3xl text-xl font-bold my-4">
              Join Sports & Adventure Activities in Gurgaon
            </h2>
            <Slider
              className="my-20"
              spaceBetween={40}
              data={[
                { imageData: {imageLink:"social3.jpeg",altText:"People enjoying a lively community event with music and lights in Delhi NCR"}, label: "Events" },
                { imageData: {imageLink:"social1.jpeg",altText:"Group of friends playing outdoor sports together in Delhi NCR"}, label: "Sports" },
                { imageData: {imageLink:"social4.jpeg",altText:"Person engaged in an extreme adventure activity like ziplining or rock climbing in Delhi NCR"}, label: "Extreme adventures" },
                { imageData: {imageLink:"social2.jpeg",altText:"People socializing and laughing at a casual outdoor gathering in Delhi NCR"}, label: "Social" },
              ]}
            />
          </section>
          {/* Funcircle Solves Your Problems: */}
          <section className="">
            <h2 className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
              Funcircle Solves Your Problems:
            </h2>
            <section className="my-4">
              <h4 className="py-2 text-zinc-200">
                ❌ &quot;No one to play Cricket, Football, or Badminton with in
                Gurgaon!&quot;
              </h4>
              <p className="py-1 text-zinc-200">
                ✔ Find instant sports groups for Box Cricket, Volleyball,
                Tennis, Basketball, Pickleball & Table Tennis in Delhi NCR!
              </p>
            </section>
            <div className="w-1/2  border border-zinc-700 mx-auto"></div>
            <section className="my-4">
              <h4 className="py-2 text-zinc-200">
                ❌ &apos;Can&apos;t find biking groups near me or hiking groups
                in Gurgaon!&apos;
              </h4>
              <p className="py-2 text-zinc-200">
                ✔ Connect with adventure enthusiasts for biking trails, hiking
                expeditions, camping trips, and more near Delhi NCR!
              </p>
            </section>
            <div className="w-1/2  border border-zinc-700 mx-auto"></div>

            <section className="my-4">
              <h4 className="py-2 text-zinc-200">
                ❌ &quot;No social activities or meetups near me&quot;
              </h4>
              <p className="py-2 text-zinc-200">
                ✔ Join board game nights, quizzes, mystery rooms, and social
                events with like-minded people in Gurgaon and Delhi NCR!
              </p>
            </section>
          </section>

          {/* What’s Next? */}
          <section className="my-6">
            <h2 className="lg:text-4xl text-2xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
              The Future of Sports Groups in Gurgaon
            </h2>
            <p className="py-2 text-zinc-200">
              📍 <strong>Cafes & Clubs</strong>: Group hangouts in{" "}
              <strong>Gurgaon</strong>, <strong>Delhi NCR</strong>,{" "}
              <strong>Bangalore</strong>, <strong>Mumbai</strong>,{" "}
              <strong>Hyderabad</strong>!
            </p>
            <p className="py-2 text-zinc-200">
              🏆 <strong>Advanced Leagues</strong>: Competitive{" "}
              <strong>Cricket</strong>, <strong>Football</strong>,{" "}
              <strong>Badminton</strong> & <strong>Tennis</strong> for pros in{" "}
              <strong>Gurgaon</strong>!
            </p>
          </section>

          {/* Join 5000+ Gurgaon Users Who Play, Socialize & Explore! */}
          <section className="">
            <h2 className="lg:text-4xl text-xl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501]">
              Join 5000+ Gurgaon Users Who Play, Socialize & Explore!
            </h2>
            <h3 className="lg:text-4xl textlgl font-bold text-black bg-clip-text text-transparent bg-gradient-to-r from-[#263CDE] via-[#C119B7]  to-[#FF9501] my-4">
              📲 Download Funcircle Now For Sports Groups in Gurgaon and Delhi
              NCR!
            </h3>
            <ul>
              <li className="py-1 text-white font-bold">
                🏏 Your next Cricket Match in Gurgaon
              </li>
              <li className="py-1 text-white font-bold">
                🥾 Your next Hiking Trip with hiking groups in Gurgaon
              </li>
              <li className="py-1 text-white font-bold">
                🎲 Your next Board Game Night in Delhi NCR
              </li>
            </ul>
            <div className="mt-6 mb-6">
              <Link
                href="/"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg "
              >
                Download App
              </Link>
            </div>
            <p className="text-zinc-400">… is just one click away!</p>
          </section>

          <div className="">
            <Footer />
          </div>
        </section>
      </div>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What sports can I play with Funcircle in Gurgaon?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Funcircle offers groups for Cricket, Football, Volleyball, Badminton, Tennis, Basketball, Snooker, Box Cricket, Pickleball, and Table Tennis in Gurgaon and Delhi NCR. You can easily find sports groups near you and play cricket nearby.",
                },
              },
              {
                "@type": "Question",
                name: "How do I find biking groups near me in Gurgaon?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "With Funcircle, you can easily search for 'biking groups near me' and connect with cycling enthusiasts in Gurgaon and Delhi NCR. The app helps you discover biking trails and join biking events with like-minded people.",
                },
              },
              {
                "@type": "Question",
                name: "Are there hiking groups in Gurgaon I can join?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Funcircle offers numerous hiking groups in Gurgaon and Delhi NCR. You can join weekend hiking trips, trekking adventures, and nature walks with fellow hiking enthusiasts in the region.",
                },
              },
              {
                "@type": "Question",
                name: "How does Funcircle work for finding sports groups?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Search for activities like 'play cricket nearby' or 'sports groups in Gurgaon', book your spot via the app, then show up to play and connect with like-minded people in Gurgaon and Delhi NCR.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to be experienced to join Funcircle sports activities in Gurgaon?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, Funcircle is beginner-friendly. No skills needed - you can enjoy casual games like Box Cricket, Badminton, Volleyball & Pickleball in Gurgaon regardless of your experience level.",
                },
              },
              {
                "@type": "Question",
                name: "How much does it cost to join sports groups on Funcircle in Delhi NCR?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Funcircle offers affordable pay-per-meetup options, making it perfect for weekend Cricket, Football, or Hiking Adventures in Gurgaon and Delhi NCR without long-term commitments.",
                },
              },
              {
                "@type": "Question",
                name: "Which cities does Funcircle operate in beyond Gurgaon?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Currently focused on Gurgaon and Delhi NCR, Funcircle is expanding to Bangalore, Mumbai, and Hyderabad soon, bringing sports groups and social activities to more cities across India.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
