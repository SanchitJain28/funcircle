import CustomHeader from "@/components/header-footers/CustomHeader";
import Footer from "@/components/header-footers/footer";
import type { NextPage } from "next";
import Image from "next/image";
import React from "react";

// Helper component for icons
const Icon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w.org/2000/svg"
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
                src="/blog-image1.jpg"
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
                Corporate Sports Day Out with FunCircle – Play, Bond, and
                Celebrate
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
                  Work can get stressful, and nothing breaks the routine better
                  than a day full of sports, fun, and team bonding. A corporate
                  sports day out is more than just a break from the office—it’s
                  a chance for colleagues to connect, recharge, and compete in a
                  friendly environment. At FunCircle, we specialize in
                  organizing corporate sports events that are seamless,
                  exciting, and unforgettable.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Why Choose a Corporate Sports Day Out?
                </h2>
                <p>
                  A well-planned sports day brings colleagues together outside
                  the office. It encourages teamwork, builds healthy
                  competition, and strengthens workplace bonds. Whether it’s
                  badminton, tennis, cricket, or football, sports allow everyone
                  to engage, relax, and enjoy.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Complete Event Management
                </h2>
                <p>
                  FunCircle isn’t just about booking courts—we are corporate
                  sports organizers in Gurgaon, Noida, Ghaziabad, and Delhi NCR.
                  We handle everything from start to finish so you and your
                  colleagues can simply enjoy the day.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 px-8 py-8 -mx-8 my-4">
                  <h3 className="text-xl font-semibold text-blue-800">
                    Our corporate sports day services include:
                  </h3>
                  <ul className="list-disc pl-5 mt-4 space-y-2 text-blue-700">
                    <li>
                      Event and fixture planning – Organizing match formats and
                      schedules.
                    </li>
                    <li>
                      Venue reservation – Securing the best courts and grounds
                      for your team.
                    </li>
                    <li>
                      Game officials – Referees and umpires to ensure fair play.
                    </li>
                    <li>
                      Food and beverages – Refreshments and meals for
                      participants.
                    </li>
                    <li>
                      Sports jerseys and trophies – Custom kits and awards for a
                      professional touch.
                    </li>
                    <li>
                      Medical services – On-site assistance to ensure safety.
                    </li>
                  </ul>
                </div>
                <p>
                  With FunCircle, everything is managed smoothly so your office
                  mates can focus on playing and having fun.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Corporate Sports Organizers You Can Trust
                </h2>
                <p>
                  Whether you’re searching for corporate sports organizers in
                  Gurgaon, Noida, Ghaziabad, or Delhi NCR, FunCircle has the
                  experience and network to deliver. We work with top venues,
                  trained officials, and professional event managers to give
                  your company a premium experience.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  What Makes FunCircle Different?
                </h2>
                <ul className="list-none space-y-3">
                  <li className="flex items-start">
                    <Icon className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                    <span>
                      <strong>End-to-end management</strong> – From planning to
                      trophies, we cover it all.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Icon className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                    <span>
                      <strong>Flexible formats</strong> – Team games, individual
                      matches, or multi-sport events.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Icon className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                    <span>
                      <strong>Employee engagement</strong> – Sports that
                      encourage teamwork and bonding.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Icon className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                    <span>
                      <strong>Discounts for members</strong> – Companies and
                      employees can enjoy premium offers when they join
                      FunCircle.
                    </span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  A Day to Remember
                </h2>
                <p>
                  Imagine your office mates playing their favorite sports,
                  cheering for each other, sharing meals, and celebrating
                  victories together. That’s what a corporate sports day out
                  with FunCircle feels like—fun, competitive, and memorable.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Get Started Today
                </h2>
                <p>
                  If your company is planning an employee engagement activity or
                  team outing, a sports day is the perfect option. Refer us to
                  your HR team, or reach out to us directly, and we’ll take care
                  of the rest. With FunCircle as your partner, you’re guaranteed
                  a smooth, professional, and fun-filled experience.
                </p>
                <p>
                  So whether you’re looking for corporate sports organizers in
                  Gurgaon, Noida, Ghaziabad, or Delhi NCR, FunCircle is here to
                  make it happen.
                </p>
                <p>
                  <strong>
                    Book your corporate sports day out with FunCircle today—and
                    turn an ordinary day into an extraordinary experience.
                  </strong>
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
