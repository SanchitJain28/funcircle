import React from "react";

import CustomHeader from "@/components/header-footers/CustomHeader";
import { fetchEventsByCategory } from "@/lib/api/events";
import FunCircleClient from "./FunCircleClient";

export default async function FunCircle() {
  const initialEvents = await fetchEventsByCategory("Outdoor");

  return (
     <div className="bg-[#131315] min-h-screen overflow-hidden">
      {/* Server-rendered header */}
      <CustomHeader />
      
      {/* Client component for interactive parts */}
      <FunCircleClient initialEvents={initialEvents} />
    </div>
  );
}
