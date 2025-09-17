import CustomHeader from "@/components/header-footers/CustomHeader";
import Footer from "@/components/header-footers/footer";
import type { NextPage } from "next";
import Image from "next/image";
import React from "react";

// Helper component for icons
const Icon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const BlogPost: NextPage = () => {
  return (
    <>
      <CustomHeader />
      <div className="bg-slate-50 min-h-screen font-sans text-gray-800">
        <main className="max-w-4xl mx-auto sm:px-6 lg:px-8 ">
          <article className="bg-white shadow-lg overflow-hidden">
            {/* Header Image */}
            <div className="relative h-64 w-full">
              <Image
                src="/blog-5-image-1.jpeg"
                alt="Group of people playing sports"
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            <div className="p-8 md:p-12">
              {/* Blog Title */}
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Play Every Day – FunCircle Organizes Games for You
              </h1>

              {/* Author/Date Info */}
              <div className="flex items-center text-gray-500 text-sm mb-8">
                <p>Published on September 17, 2025</p>
                <span className="mx-2">•</span>
                <p>By FunCircle Team</p>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="lead text-xl">
                  Are you tired of your partners backing out at the last moment?
                  Or maybe someone is out of town, and you’re left wondering, “I
                  am alone, where to play badminton nearby?” Don’t worry. With
                  FunCircle, you never have to miss a day of playing your
                  favorite sport again.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Daily Organized Games – Just Show Up
                </h2>
                <p>
                  FunCircle takes away all the hassle by organizing daily games
                  in Gurgaon for badminton, pickleball, tennis, and padel. No
                  need to call ten people and hope someone shows up. Our venue
                  managers ensure everything is set. You just arrive at the
                  venue, join the game at your level, and enjoy.
                </p>

                <div className="bg-indigo-50 border-l-4 border-indigo-400 px-8 py-4 -mx-8 my-4">
                  <h3 className="text-xl font-semibold text-indigo-800">
                    Levels for Every Player
                  </h3>
                  <p className="text-indigo-700 mt-2">
                    We understand not everyone plays at the same skill level.
                    That’s why our games are divided into levels:
                  </p>
                  <ol className="list-decimal pl-5 mt-4 space-y-1 text-indigo-700">
                    <li>
                      <strong>Level 1:</strong> Beginner
                    </li>
                    <li>
                      <strong>Level 2:</strong> Beginner–Intermediate
                    </li>
                    <li>
                      <strong>Level 3:</strong> Intermediate
                    </li>
                    <li>
                      <strong>Level 4:</strong> Advanced
                    </li>
                    <li>
                      <strong>Level 5:</strong> Professional
                    </li>
                  </ol>
                  <p className="text-indigo-700 mt-3">
                    So whether you’re looking for intermediate badminton players
                    in Gurgaon, advanced pickleball games in Noida, or just a
                    beginner-friendly tennis match in Delhi NCR, FunCircle has a
                    slot for you.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Where We Organize Games
                </h2>
                <p>
                  Currently, we organize games daily across 8–10 venues in
                  Gurgaon, covering all four sports: badminton, pickleball,
                  padel, and tennis. And soon, we’ll be expanding across Delhi
                  NCR, Noida, Ghaziabad, and Faridabad. No matter where you are,
                  you’ll find organized games near you.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Sports We Cover
                </h2>
                <ul className="list-none pl-0 space-y-4">
                  <li>
                    <strong>Badminton:</strong> Want to play badminton in
                    Gurgaon? Or maybe you’re searching for badminton groups in
                    Noida or intermediate badminton players in Delhi NCR?
                    FunCircle has daily matches waiting for you.
                  </li>
                  <li>
                    <strong>Pickleball:</strong> If you’re wondering, “I am
                    alone, where to play pickleball nearby?”, we’ve got your
                    answer. You can play pickleball in Gurgaon, Noida,
                    Ghaziabad, or connect with intermediate pickleball players
                    in Faridabad.
                  </li>
                  <li>
                    <strong>Padel:</strong> A fast-growing sport in India! Join
                    us to play padel in Gurgaon, Noida, or Delhi NCR. Whether
                    you’re a beginner or looking for intermediate padel players
                    in Gurgaon, we’ll get you a game.
                  </li>
                  <li>
                    <strong>Tennis:</strong> From playing tennis in Ghaziabad to
                    joining intermediate tennis players in Delhi NCR, our
                    organized daily games make sure you never skip a match.
                  </li>
                </ul>

                <div className="bg-gray-100 p-8 rounded-xl px-8 py-8 -mx-8 my-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Why Choose FunCircle?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-start space-x-3">
                      <Icon className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" />
                      <p>No last-minute cancellations or backouts.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" />
                      <p>Daily games across multiple venues.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" />
                      <p>Verified level-based matches for fair play.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" />
                      <p>Venue managers on-site to coordinate everything.</p>
                    </div>
                    <div className="flex items-start space-x-3 md:col-span-2">
                      <Icon className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" />
                      <p>All you need to do is show up.</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Never Miss a Day of Sports
                </h2>
                <p>
                  Life gets busy, partners back out, but your game doesn’t have
                  to stop. With FunCircle, you’ll always find people to play
                  with, no matter your level or location. Whether you want to
                  play badminton in Delhi NCR, pickleball in Gurgaon, padel in
                  Noida, or tennis in Faridabad, FunCircle makes it
                  possible—every single day.
                </p>
                <p>
                  Join FunCircle and keep your passion alive. Show up, play, and
                  let us take care of the rest.
                </p>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
