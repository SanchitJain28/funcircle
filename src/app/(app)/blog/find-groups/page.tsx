import CustomHeader from '@/components/header-footers/CustomHeader';
import Footer from '@/components/header-footers/footer';
import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

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
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BlogPost: NextPage = () => {
  return (
    <>
    <CustomHeader/>
    <div className="bg-slate-50 min-h-screen font-sans text-gray-800">
      <main className="max-w-4xl mx-auto sm:px-6 lg:px-8 ">
        <article className="bg-white  shadow-lg overflow-hidden">
          {/* Header Image */}
          <div className="relative h-64 w-full">
             <Image
                src="/blog-3-image-1.jpg"
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
              Find Sports Groups Near You – Play Without Hassle
            </h1>

            {/* Author/Date Info */}
            <div className="flex items-center text-gray-500 text-sm mb-8">
              <p>Published on September 17, 2025</p>
              <span className="mx-2">•</span>
              <p>By Fun Circle</p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="lead text-xl">
                Are you new to the city or just getting back into your favorite sport? The first thing you need is a reliable way to find groups and find partners who share your passion. That’s exactly what our platform does for you. Whether you’re looking for badminton groups in Gurgaon, pickleball partners in Noida, or tennis groups near you in Delhi NCR, we’ve made the process simple, smooth, and stress‑free.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 pt-4">Why Finding Groups Matters</h2>
              <p>
                Sports is best when shared. But if you’ve just moved to Gurgaon, Noida, or Delhi, or you’re picking up a sport after years, finding the right people to play with can be tough. Our app makes it effortless to connect with active groups in badminton, pickleball, tennis, and padel. No endless searching, no uncertainty. Just the right partners at your level.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-400 px-8 py-4 -mx-8 my-4">
                <h3 className="text-xl font-semibold text-emerald-800">Play at Your Level</h3>
                <p className="text-emerald-700 mt-2">
                  We know how frustrating it is when skill levels don’t match. That’s why our groups are organized by level: beginner, intermediate, or advanced. Looking for an intermediate badminton group in Gurgaon? Or maybe advanced pickleball partners in Noida? You’ll find them here. Each group has a simple verification system, so beginners won’t accidentally land in advanced games and vice versa.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 pt-4">All Venues, All Covered</h2>
              <p>
                Every venue we list comes with active, verified groups. From badminton groups in Noida to tennis groups in Delhi NCR, you can join the one that fits your schedule and location. And if you don’t yet have a regular partner, don’t worry—we organize daily games at peak times in every venue. No backouts, no latecomers, no payment hassles. You just show up and play.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 pt-4">Sports We Cover</h2>
              <p>
                Currently, you can find groups and partners for:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Badminton</strong> (e.g., find badminton groups in Delhi NCR, badminton partners in Gurgaon, badminton groups near me)</li>
                <li><strong>Pickleball</strong> (e.g., pickleball groups in Noida, pickleball partners in Gurgaon)</li>
                <li><strong>Tennis</strong> (e.g., tennis group in Gurgaon, find tennis groups near me)</li>
                <li><strong>Padel</strong> (e.g., padel groups in Delhi NCR, padel partners in Noida)</li>
              </ul>

              <div className="bg-gray-100 px-8 py-8 -mx-8 my-4 rounded-xl">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-start space-x-3">
                       <Icon className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                       <p>Find groups instantly for your favorite sport.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                       <Icon className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                       <p>Join verified players at your exact skill level.</p>
                    </div>
                     <div className="flex items-start space-x-3">
                       <Icon className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                       <p>Book courts, chat, and organize without juggling multiple apps.</p>
                    </div>
                     <div className="flex items-start space-x-3">
                       <Icon className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                       <p>Play daily organized games at peak timings.</p>
                    </div>
                 </div>
              </div>


              <h2 className="text-2xl font-bold text-gray-900 pt-4">Don’t Let Busy Life Stop You</h2>
              <p>
                In today’s fast life, it’s easy to lose touch with sports. But with our app, you’ll never run out of partners or groups to play with. Whether it’s reliving your childhood fun through badminton rallies, learning the fast‑growing game of pickleball, or keeping your tennis swing sharp, we’ve got your back.
              </p>
              <p>
                Finding partners and groups has never been this smooth. Download the app, pick your sport, and get playing. Because the best memories are made on the court.
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer/>
    </div>
    </>
  );
};

export default BlogPost