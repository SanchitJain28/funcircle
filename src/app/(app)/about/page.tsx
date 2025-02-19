"use client"
import React from 'react'
import Footer from '../../components/footer'
import FAQs from '@/app/components/FAQs'
import Navbar from '@/app/components/Navbar'

export default function About() {
  return (
    <div>
      <Navbar />

      <div className="lg:flex justify-between items-center 2xl:mx-80 lg:m-8 lg:mt-40 mt-24 m-4 rounded-lg bg-purple-600 ">
        <img src='Check_your_interests_from_outdoor_to_indoor-removebg-preview.png' className='w-92 aspect-3/2' />
        <div className="flex-col basis-1/2 p-8 m-8">
          <p className='text-sm my-4 text-white'>At Fun circle, our mission is to bring people together offline by connecting those with shared interests. We believe that genuine, face-to-face interactions are the cornerstone of meaningful relationships and thriving communities. Whether you are passionate about art, music, sports, technology, or any niche interest, our platform is your gateway to discovering local events, forging new friendships, and creating memorable experiences.

          </p>
          <p className='text-sm my-4 text-white'>In today&apos;s digital world, it&apos;s easy to feel disconnected. That&apos;s why we&apos;ve created YourFuncircle—a dynamic space where every local meetup is a chance to build real-world connections and find your tribe. Our intuitive, user-friendly platform makes it simple to browse events, join groups, and start conversations that lead to lasting bonds. We&apos;re here to transform digital interactions into vibrant, in-person experiences that enrich lives and empower communities.
          </p>
          <p className='text-sm my-4 text-white'>We are driven by a vision of inclusivity and genuine connection. Every event, every group, and every conversation on YourFuncircle is designed to celebrate the unique interests and talents that make our community diverse and inspiring. Join us as we redefine how people connect in the real world—because your community is waiting to come to life.
          </p>
          <p className='text-lg my-4 text-white'>Welcome to Fun circle — where your world meets, connects, and thrives.

          </p>
          <p className='text-lg my-4 text-zinc-200'>support@funcircleapp.com


          </p>
          {/* Download buttons */}
          <div className=" flex items-center -my-12">
            <a href='https://play.google.com/store/apps/details?id=faceout.social&pcampaignid=web_share'>
              <img src='google-play-badge-logo-svgrepo-com (1).svg' className='lg:w-48 w-40 mr-4' />
            </a>
            <a href='https://apps.apple.com/in/app/faceout-go-out-date-social/id6479629031'>
              <img src='download-on-the-app-store-apple-logo-svgrepo-com.svg' className='lg:w-48 w-40 mr-4' />
            </a>
          </div>
        </div>
      </div>
      <FAQs />
      <Footer />
    </div>
  )
}
