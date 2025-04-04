"use client"
import Link from 'next/link'
import React from 'react'
export default function Footer() {
  return (
    <div>
      {/* // PART 6 FOOTER */}
      <div className="lg:flex justify-between lg:px-20 lg:py-20 py-8 bg-black text-white">
        <div className="flex flex-col">
          <p className="text-4xl font-bold text-left text-white my-4">Explore your hobbies, find your tribe</p>
          {/* Download buttons */}
          <div className=" flex  items-center -my-12 ">
            <a href='https://play.google.com/store/apps/details?id=faceout.social&pcampaignid=web_share'>
              <img alt='' src='google-play-badge-logo-svgrepo-com (1).svg' className='lg:w-48 w-40 mr-4' />
            </a>
            <a href='https://apps.apple.com/in/app/faceout-go-out-date-social/id6479629031'>
              <img alt='' src='download-on-the-app-store-apple-logo-svgrepo-com.svg' className='lg:w-48 w-40' />
            </a>
          </div>
          <div className="">
            <p className="text-2xl font-light font-sans text-left text-white my-4">Follow us on</p>
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram mr-4 "><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube mx-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin mx-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </div>

            <p className="text-2xl font-light font-sans text-left text-white my-4">©
              Copyright 2025 Fun Circle app
            </p>

          </div>
        </div>
        <div id="navLinks" className="flex-col flex basis-1/3">
          <Link href='venuePartners ' className="text-white font-bold text-lg my-2 font-sans ">Venue partners</Link>
          <Link href='about' className="text-white font-bold text-lg my-2 font-sans ">About us</Link>
          <Link href='contactUs ' className="text-white font-bold text-lg my-2 font-sans ">Contact us</Link>
          <Link href='termsandservice' className="text-white font-bold text-lg my-2 font-sans ">Terms and conditions</Link>
          <Link href='privacyPolicy ' className="text-white font-bold text-lg my-2 font-sans ">Privacy policy</Link>
        </div>
      </div>
    </div>
  )
}
