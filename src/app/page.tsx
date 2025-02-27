"use client"
import React from 'react';
import Footer from "./components/footer";
import FAQs from "./components/FAQs";
import Navbar from "./components/Navbar";
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {
  return (
    <div className="">
      <Navbar />
      {/* //PART 1 */}
      <div className="flex flex-col bg-black">
        {/* //APP HEADLINE */}
        <div className="flex justify-center lg:mt-28 mt-24">
          <button className="text-white px-4 py-[10px] custom-color1 font-bold border border-[#5d0c75] text-sm bg-zinc-800 font-bold rounded-xl font-sans "><Link href="funcircle" >FUN LOCAL MEETUPS</Link>
          </button>
        </div>

        {/* //PARA1 */}
        <div className="flex justify-center my-8">
          <p className="text-center font-sans lg:text-6xl text-4xl font-black">
            <span className="bg-gradient-to-r from-white to-[#BF37F7] bg-clip-text text-transparent">Meet New People</span>
            <br /><span className="text-white "> Based on Interests</span> <br />
            <span className="font-light text-white "> & Location with</span>
            <br />
            <span className="bg-gradient-to-r from-white to-[#BF37F7] bg-clip-text text-transparent">Fun Circle! </span></p>
        </div>

        {/* Download buttons */}
        <div className=" flex  justify-center items-center -mt-12">
          <a href='https://play.google.com/store/apps/details?id=faceout.social&pcampaignid=web_share'>
            <img src='google-play-badge-logo-svgrepo-com (1).svg' className='lg:w-48 w-40 mr-4' />
          </a>
          <a href='https://apps.apple.com/in/app/faceout-go-out-date-social/id6479629031'>
            <img src='download-on-the-app-store-apple-logo-svgrepo-com.svg' className='lg:w-48 w-40' />
          </a>
        </div>
        {/* //Moving banner */}
        <div className="w-full overflow-hidden bg-[#243EE2] py-2">
          <div className="animate-marquee whitespace-nowrap text-sm">
            <span className="text-white  font-bold mx-4">✨ Welcome to Our Website! ✨</span>
            <span className="text-white  font-bold mx-4">🚀 Explore Our Amazing Features! 🚀</span>
            <span className="text-white  font-bold mx-4">🎉 Join Us Today! 🎉</span>
          </div>
        </div>

      </div>


      {/* //PART 2 */}
      {/* //WHAT IS FUN CIRCLE */}
      <div className="flex flex-col px-12 text-black lg:px-40 lg:py-12 2xl:px-80 bg-zinc-100 ">
        <p className=" py-2 border border-[#BF37F7]  mt-8 bg-black text-white text-sm w-40 rounded-lg font-bold px-4">IN REAL LIFE</p>
        <div className="lg:flex lg:flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-2xl lg:text-4xl mt-4 font-sans font-extrabold font-bold ">What is fun circle ?</p>
            <p className=" my-4 font-sans text-lg lg:text-2xl ">Join meetups based on interests ,sports etc. Meet people in social interactions and have fun</p>
            {/* Download buttons */}
            <div className=" lg:flex  hidden  items-center  pb-12">
              <img src='google-play-badge-logo-svgrepo-com (1).svg' className='w-48 mr-4' />
              <img src='download-on-the-app-store-apple-logo-svgrepo-com.svg' className='w-48' />
            </div>
          </div>
          <img className=" mr-12  rounded-lg lg:w-60 lg:h-80" src="https://www.wikihow.com/images/thumb/7/79/13675348-2.jpg/v4-460px-13675348-2.jpg.webp" />
        </div>


      </div>

      {/* //How it works */}
      <div className="lg:flex flex-col lg:flex-row px-12 lg:justify-center text-black mt-8 lg:px-32  2xl:px-40 ">
        <div className="flex flex-col basis-1/3 lg:my-4 lg:mx-8">
          <p className="px-4 py-2 border border-[#BF37F7] bg-black text-white w-40 rounded-lg font-bold">How it works ?</p>
          <p className="text-2xl lg:text-4xl mt-4 font-[__sharpGrotesk_34461d] font-bold my-2">Explore our app <br /> and see how it works ? </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-3">
          <div id="card " className=" lg:mx-4 ">
            <img src="1.png" className="my-4  rounded-lg aspect-3/2 w-80
" />
            <p className="text-2xl mt-4 font-[__sharpGrotesk_34461d] font-bold">Check your interests!!
            </p>
            <p className=" text-zinc-500 -mt-1 font-[__sharpGrotesk_34461d] w-80 my-2">Turn on your availability, and set<br /> your mood and what you feel like<br /> doing – from grabbing a bite to<br /> exploring the city.
            </p>
          </div>
          <div id="card " className=" lg:mx-4 ">
            <img src="2.png" className="my-4 rounded-lg aspect-3/2 w-80" />
            <p className="text-2xl mt-4 font-[__sharpGrotesk_34461d] font-bold">Book an event!
            </p>
            <p className=" text-zinc-500 -mt-1 font-[__sharpGrotesk_34461d] w-80 my-2">Turn on your availability, and set <br />your mood and what you feel like<br /> doing – from grabbing a bite to<br /> exploring the city.
            </p>
          </div>
          <div id="card " className=" lg:mx-4 ">
            <img src="3.png" className="my-4  rounded-lg aspect-3/2 w-80" />
            <p className="text-2xl mt-4 font-[__sharpGrotesk_34461d] font-bold">Set All events!!
            </p>
            <p className=" text-zinc-500 -mt-1 font-[__sharpGrotesk_34461d] w-80 my-2">Turn on your availability, and set<br /> your mood and what you feel like<br /> doing – from grabbing a bite to<br /> exploring the city.
            </p>
          </div>
        </div>


      </div>


      {/* //PART3 */}
      <div id="cities" className="lg:flex flex-col lg:flex-row lg:justify-between pb-8 text-white px-4 lg:px-32 2xl:px-80 mt-8 bg-zinc-950">
        <div className="flex flex-col mx-4">
          <p className="px-4 py-2 border border-[#BF37F7] mt-12 w-40 rounded-lg font-bold">In your city ?</p>
          <p className="text-2xl lg:text-4xl mt-4  font-sans">Popular cities on Fun circle</p>
          <p className="text-xl lg:text-xl mt-4 font-sans">Looking for fun things to do near you?<br /> See what Meetup organizers are planning in cities around the country.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-3 lg:my-12 my-4 ">
          <div className="flex flex-col items-center my-2 lg:mx-4" id="cityCard">
            <Image 
            src="/faceout_bangalore_correct.jpg" 
            alt="Bangalore" 
            width={100}
            height={100}
            className="w-24 lg:w-48 rounded-full aspect-3/2" />
            <p className="text-zinc-400 text-lg mt-2 ">Bangalore</p>
          </div>
          <div className="flex flex-col items-center my-2 " id="cityCard">
          <Image 
            src="/faceout_delhi_correct.jpg" 
            alt="Bangalore" 
            width={100}
            height={100}
            className="w-24 lg:w-48 rounded-full aspect-3/2" />
            <p className="text-zinc-400 text-lg mt-2 ">Delhi</p>
          </div>
          <div className="flex flex-col items-center my-2 " id="cityCard">
          <Image 
            src="/faceout_hyderabad.jpg" 
            alt="Bangalore" 
            width={100}
            height={100}
            className="w-24 lg:w-48 rounded-full aspect-3/2" />
            <p className="text-zinc-400 text-lg mt-2 ">Hyderabad</p>
          </div>
          <div className="flex flex-col items-center  my-2 " id="cityCard">
          <Image 
            src="/faceout_mumbai_correct.png" 
            alt="Bangalore" 
            width={100}
            height={100}
            className="w-24 lg:w-48 rounded-full aspect-3/2" />
            <p className="text-zinc-400 text-lg mt-2 ">Mumbai</p>
          </div>
          <div className="flex flex-col items-center my-2 " id="cityCard">
          <Image 
            src="/faceout_gurgaon_correct.png" 
            alt="Bangalore" 
            width={100}
            height={100}
            className="w-24 lg:w-48 rounded-full aspect-3/2" />
            <p className="text-zinc-400 text-lg mt-2 ">Gurgaon</p>
          </div>
        </div>
      </div>

      {/* PART 4 */}
      <div id="features" className=" flex-col items-center pb-8 text-white px-4 lg:px-32 2xl:px-80 mt-8 ">
        {/* HEADER FOR PART 4 */}
        <p className="px-4 py-2 text-center border-2 border-[#BF37F7] mt-4 w-40 rounded-lg font-bold bg-black">Features?</p>
        <p className=" py-2  lg:text-5xl text-2xl text-black mt-4  rounded-lg font-bold ">Discover our best features</p>
        {/* //FOR MOBILE */}
        <div className="flex flex-col my-8 lg:hidden">
          {/* FEATURE 1 */}
          <div className="flex justify-start lg:justify-center my-4">
            <div className="flex flex-col">
              <p className="text-xl text-black text-right font-bold mx-2 border-t-2  border-red-700">Easy Joining </p>
              <p className="text-lg w-40 text-black text-right mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
          {/* FEATURE 2 */}

          <div className="flex justify-end -my-4">
            <div className="flex flex-col">
              <p className="text-xl text-black text-left font-bold mx-2 border-t-2  border-red-700">add people to <br />connections </p>
              <p className="text-lg w-40 text-black text-left mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
          {/* IMAGE */}

          <div className="flex justify-center my-4">
            <img src="Check your interests from outdoor to indoor.png" className="rounded-lg lg:mx-20 w-[500px]" />
          </div>
          {/* FEATURE 3 */}

          <div className="flex justify-start my-4">
            <div className="flex flex-col">
              <p className="text-xl text-black text-right font-bold mx-2 border-t-2  border-red-700">On venue<br /> payment</p>
              <p className="text-lg w-40 text-black text-right mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
          {/* FEATURE 4 */}

          <div className="flex justify-end -my-4">
            <div className="flex flex-col">
              <p className="text-xl text-black text-left font-bold mx-2 border-t-2  border-red-700">Chat functionality </p>
              <p className="text-lg w-40 text-black text-left mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
        </div>
        {/* FOR PC */}
        <div className="lg:flex justify-center hidden">
          {/* FEATURE 1 */}
          <div className="flex flex-col my-4">
            <div className="flex flex-col my-12">
              <p className="text-xl text-black text-right font-bold mx-2 border-t-2  border-red-700">Easy Joining </p>
              <p className="text-lg w-40 text-black text-right mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-black text-right font-bold mx-2 border-t-2  border-red-700">add people to <br />connections </p>
              <p className="text-lg w-40 text-black text-right mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>


          {/* IMAGE */}

          <div className="flex justify-center my-4">
            <img src="Check your interests from outdoor to indoor.png" className="rounded-lg  w-[500px]" />
          </div>
          {/* FEATURE 3 */}
          {/* FEATURE 1 */}
          <div className="flex flex-col my-20">
            <div className="flex flex-col my-12">
              <p className="text-xl text-black text-left font-bold mx-2 border-t-2  border-red-700">On venue<br /> payment </p>
              <p className="text-lg w-40 text-black text-left  mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-black text-left  font-bold mx-2 border-t-2  border-red-700">Chat functionality </p>
              <p className="text-lg w-40 text-black text-left mx-2 text-sm">Join the events easily by going through the events on fun circle</p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 5 */}

      <FAQs />
      <Footer />
    </div>

  );
}
