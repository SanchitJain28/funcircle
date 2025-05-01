import Footer from "@/app/components/footer";
import React from "react";
import { Card } from "@/components/ui/card";
import FAQs from "@/app/components/FAQs";
import Navbar from "@/app/components/Navbar";
export default function ContactUs() {
  return (
    <div className="">
      <Navbar />
      <Card className="bg-black text-white lg:px-40 lg:py-20 lg:mx-20 lg:mt-28 mt-8 mx-4">
        <div className="flex-col basis-1/2 p-2 m-8">
          <p className="text-xl my-4 text-zinc-200">funcircleapp@gmail.com</p>
        </div>
      </Card>
      <FAQs />
      <Footer />
    </div>
  );
}
