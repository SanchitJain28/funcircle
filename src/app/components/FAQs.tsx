import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/app/components/ui/accordion"
export default function FAQs() {
  return (
    <div>
         {/* // FAQS */}
      <div className="2xl:px-80 lg:px-40 px-4 py-8 lg:py-20 bg-[#F4F4F5]">
        <div className="flex text-4xl font-bold font-sans my-4">
          <p>FAQs</p>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className=" bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg">
            <AccordionTrigger className="text-xl  font-sans font-bold">What is Fun Circle?</AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              Fun Circle is a platform for interest based clubs where club members, club leaders and venues come together to form healthy thriving communities. FunCircle provides a platform for people to join, create, sustain and grow clubs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg">
            <AccordionTrigger className="text-xl font-sans font-bold">What is a Club?</AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              A club is a community based around a social hobby like board gaming, hiking, sports etc whose members meet regularly in meetups to engage in their hobby.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg">
            <AccordionTrigger className="text-xl font-sans font-bold">What is a meetup?</AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              A meetup is an informal social event, hosted weekly by each club. For a music club, the meetup is a jam session, for football club it is a football match and so on.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg">
            <AccordionTrigger className="text-xl text-left font-sans font-bold">Where do these meetups happen?</AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              These meetups happen in various cafes, dance studios, Jampads, turf ground etc depending on the hobby on which the club is based.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="bg-white  text-black border border-[#BF37F7] my-2 px-4 py-2 rounded-lg">
            <AccordionTrigger className="text-xl font-sans font-bold">How do I join?</AccordionTrigger>
            <AccordionContent className="text-lg font-sans font-bold ">
              Download the Fun Circle app below, explore and join the clubs of your choice. Each club has weekly listed meetups that you can register for.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
