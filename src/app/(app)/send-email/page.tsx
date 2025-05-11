"use client"
import axios from "axios";
import React from "react";

export default function page() {
    const sendEmail =async()=>{
        console.log("RUN")
        const {data}=await axios.post('/api/send-email')
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
