import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function FAQs() {
  return (
    <div>
      {/* // FAQS */}
      <div className="2xl:px-80 lg:px-40 px-4 py-8 lg:py-20 bg-[#F4F4F5]">
        <div className="flex text-4xl font-bold font-sans my-4">
          <p>FAQs</p>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-1"
            className=" bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg"
          >
            <AccordionTrigger className="text-xl  font-sans font-bold">
              1. What is Fun Circle?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              Fun Circle is your go-to app to find people to play sports
              with—whether it’s cricket, football, badminton, or hiking—we’ve
              got your weekend game sorted!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg"
          >
            <AccordionTrigger className="text-xl font-sans font-bold">
              2. What is a Sports Club?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              A Sports Club is a local group of players who regularly meet to
              play a specific sport like cricket, football, or table tennis.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg"
          >
            <AccordionTrigger className="text-xl font-sans font-bold">
              3. What’s a Sports Meetup?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              A sports meetup is a scheduled match or game—like a Saturday
              evening football game or a Sunday morning badminton session.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg"
          >
            <AccordionTrigger className="text-xl text-left font-sans font-bold">
              4. Where do matches or games happen?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              Games and events happen at local playgrounds, sports complexes,
              and popular hangout spots in your city.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-5"
            className="bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg"
          >
            <AccordionTrigger className="text-xl font-sans font-bold">
              5. How do I get in the game?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              Download the app, choose a game you like, book your spot—and just
              show up to play!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
