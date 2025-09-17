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
          <article className="bg-white  shadow-lg overflow-hidden">
            {/* Header Image */}
            <div className="relative h-64 w-full">
              <Image
                src="/blog-1-image-1.png"
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
                Book Courts Easily with FunCircle – Play Without the Hassle
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
                  Ever opened a booking app only to find every slot taken? Or
                  had urgent plans to play but couldn’t find a court anywhere?
                  We know the struggle. That’s why FunCircle makes booking
                  courts simple, fast, and reliable. With our platform, members
                  get exclusive access to courts so they and their friends can
                  play without the stress of last-minute cancellations or fully
                  booked venues.
                </p>
                <p>
                  No matter where you are—Gurgaon, Delhi NCR, Noida, Ghaziabad,
                  or Faridabad—FunCircle has you covered. If you’re searching
                  for badminton courts near me, trying to book tennis courts in
                  Gurgaon, or urgently need a turf football ground in Noida,
                  we’ve got it ready.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Courts Available on FunCircle
                </h2>
                <p>Currently, you can book courts for:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Badminton</li>
                  <li>Pickleball</li>
                  <li>Padel</li>
                  <li>Tennis</li>
                  <li>Box Cricket</li>
                  <li>Turf Football</li>
                </ul>

                <div className="bg-amber-50 border-l-4 border-amber-400  px-8 py-4 -mx-8 my-4">
                  <h3 className="text-xl font-semibold text-amber-800">
                    Why Choose FunCircle for Court Booking?
                  </h3>
                  <ul className="list-none mt-4 space-y-2 text-amber-700">
                    <li className="flex items-start">
                      <Icon className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Last-minute bookings available</strong> –
                        Perfect for sudden plans.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Icon className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Wide coverage</strong> – Multiple venues across
                        Delhi NCR.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Icon className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Member-first access</strong> – Reserved slots
                        for FunCircle members.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Icon className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                      <span>
                        <strong>All sports, one app</strong> – No more juggling
                        multiple platforms.
                      </span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Badminton Court Bookings
                </h3>
                <p>
                  Stop worrying about packed venues. Whether you want to book
                  badminton courts in Gurgaon, Delhi, or Noida, FunCircle makes
                  it smooth. We also cover badminton courts in Ghaziabad and
                  Faridabad. From casual games to urgent bookings, you’ll always
                  find a spot.
                </p>

                <h3 className="text-xl font-bold text-gray-900">
                  Pickleball Court Bookings
                </h3>
                <p>
                  Pickleball is booming in India, and finding courts can be
                  tough. With FunCircle, you can book pickleball courts in
                  Gurgaon, Noida, or Delhi NCR. Even if you need urgent
                  pickleball courts in Ghaziabad, our platform makes sure you’re
                  covered.
                </p>

                <h3 className="text-xl font-bold text-gray-900">
                  Padel Court Bookings
                </h3>
                <p>
                  Looking for padel courts in Gurgaon or padel courts near me?
                  Whether you’re booking in Delhi NCR, Noida, or Ghaziabad,
                  FunCircle has available slots for you. Beginners and pros
                  alike can book padel courts in no time.
                </p>

                <h3 className="text-xl font-bold text-gray-900">
                  Tennis Court Bookings
                </h3>
                <p>
                  From early morning practice to weekend matches, finding tennis
                  courts doesn’t have to be a headache. You can book tennis
                  courts in Gurgaon, Noida, Delhi, and Ghaziabad instantly
                  through FunCircle. Need an urgent tennis court? We’ve got you.
                </p>

                <h3 className="text-xl font-bold text-gray-900">
                  Box Cricket Court Bookings
                </h3>
                <p>
                  Want to plan a fun match with friends? Book box cricket courts
                  in Gurgaon or Delhi NCR directly through our platform. Courts
                  are also available in Noida and Ghaziabad, with slots ready
                  for urgent box cricket bookings too.
                </p>

                <h3 className="text-xl font-bold text-gray-900">
                  Turf Football Bookings
                </h3>
                <p>
                  Football lovers, you’re covered too. With FunCircle, you can
                  book turf football in Gurgaon, Noida, Delhi NCR, and
                  Ghaziabad. Whether you’re organizing a casual 5-a-side or need
                  urgent turf football bookings near me, our app makes it
                  effortless.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Play Without Worry
                </h2>
                <p>
                  Finding courts is no longer a struggle. Whether it’s
                  badminton, pickleball, padel, tennis, box cricket, or turf
                  football, FunCircle ensures that courts are ready when you
                  are. Don’t let packed schedules or last-minute plans stop your
                  game.
                </p>
                <p>
                  Join FunCircle today – and never miss out on your favorite
                  sport again. Court bookings, daily games, and active groups,
                  all in one app.
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
