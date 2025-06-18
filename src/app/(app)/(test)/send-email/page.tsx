"use client"
import axios from "axios";
import React from "react";

export default function page() {
    const sendEmail =async()=>{
        console.log("RUN")
        const {data}=await axios.post('/api/send-email',{
          name:"sanchit jain",
          phoneNumber:"+919890781204",
          email:"sanchitjain00028@gmail.com",
          orderId:"123456",
          ticket_quantity:"987654321",
          location:"Jaa na bhadwe ,tujhe kyu batayu",
          map_link:"https://maps.app.goo.gl/9TY88L91jEbvysE79?g_st=com.google.maps.preview.copy"
        })
        console.log(data)
    }
  return (
    <div>
      <button onClick={sendEmail} className="bg-black text-white text-xl rounded-xl p-4 mx-auto my-2 flex justify-center items-center">
        Send email
      </button>
    </div>
  );
}
