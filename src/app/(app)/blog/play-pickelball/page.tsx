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
                src="/blog-4-image-1.webp"
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
                Play Pickleball Near You – Join the Fun with FunCircle
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
                  Pickleball is one of the fastest-growing sports in India. If
                  you’ve ever enjoyed badminton or tennis, you’ll love the mix
                  of both in this exciting, easy-to-learn game. Whether you’re
                  looking for pickleball courts in Gurgaon, pickleball groups in
                  Noida, or just want to know where to play pickleball near me,
                  FunCircle makes it all possible.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Why Play Pickleball?
                </h2>
                <p>
                  Pickleball is fun, social, and perfect for all ages. It
                  combines the agility of badminton with the strategy of tennis,
                  making it both competitive and beginner-friendly. It’s also a
                  fantastic way to stay fit while enjoying yourself. Many
                  players who start playing once quickly find themselves hooked.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Find Pickleball Courts Easily
                </h2>
                <p>
                  One of the biggest challenges for new players is finding
                  courts. With FunCircle, you can instantly book pickleball
                  courts in Gurgaon, Noida, Faridabad, and across Delhi NCR. No
                  more searching endlessly or facing fully booked venues—we’ve
                  got slots ready for you.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Pickleball courts in Gurgaon</strong> – Conveniently
                    located, perfect for quick evening matches.
                  </li>
                  <li>
                    <strong>Pickleball courts in Noida</strong> – Modern venues
                    for both casual and competitive games.
                  </li>
                  <li>
                    <strong>Pickleball courts in Delhi NCR</strong> – Covering
                    multiple neighborhoods so you can always find one near you.
                  </li>
                  <li>
                    <strong>Pickleball courts in Faridabad</strong> – Expanding
                    access so players in every city can enjoy the sport.
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Join Pickleball Groups
                </h2>
                <p>
                  Sports are better when shared, and pickleball is no exception.
                  Through FunCircle, you can join active pickleball groups in
                  Gurgaon, pickleball groups in Noida, and even across Delhi NCR
                  and Faridabad. These groups are organized by skill level, so
                  whether you’re a beginner or an experienced player, you’ll
                  always find the right match.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Pickleball groups in Gurgaon</strong> – Meet
                    intermediate and advanced players.
                  </li>
                  <li>
                    <strong>Pickleball groups in Noida</strong> – Great for
                    building a regular playing schedule.
                  </li>
                  <li>
                    <strong>Pickleball groups in Delhi NCR</strong> – Wide
                    variety of skill levels and venues.
                  </li>
                  <li>
                    <strong>Pickleball groups in Faridabad</strong> – Growing
                    community with daily organized games.
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Organized Games – Just Show Up
                </h2>
                <p>
                  Don’t have a partner or group? No problem. FunCircle organizes
                  daily pickleball games at multiple venues. Simply show up at
                  the scheduled time, and you’ll be matched with players of your
                  level. It’s the easiest way to ensure you never miss out on
                  the fun.
                </p>

                <div className="bg-emerald-50 border-l-4 border-emerald-400  px-8 py-8 -mx-8 my-4">
                  <h3 className="text-xl font-semibold text-emerald-800">
                    Why Choose FunCircle for Pickleball?
                  </h3>
                  <ul className="list-none mt-4 space-y-2 text-emerald-700">
                    <li className="flex items-start">
                      <Icon className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0" />
                      <span>Easy court booking across Delhi NCR.</span>
                    </li>
                    <li className="flex items-start">
                      <Icon className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0" />
                      <span>Active groups at every location.</span>
                    </li>
                    <li className="flex items-start">
                      <Icon className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0" />
                      <span>
                        Level-based games to ensure fair and fun play.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Icon className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0" />
                      <span>
                        Daily organized matches so you can just show up and
                        enjoy.
                      </span>
                    </li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Start Playing Today
                </h2>
                <p>
                  Whether you’re looking to play pickleball in Gurgaon, join a
                  pickleball group in Noida, or just searching for pickleball
                  courts near me, FunCircle has everything you need in one app.
                  Pickleball is more than just a sport—it’s a community waiting
                  for you to join.
                </p>
                <p>
                  So grab your paddle, book your court, and start playing
                  pickleball today. With FunCircle, the game is always on.
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
