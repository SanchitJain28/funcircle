import React from "react";

import CustomHeader from "@/components/header-footers/CustomHeader";
import FunCircleClient from "./FunCircleClient";

export default async function FunCircle() {

  return (
     <div className="bg-[#131315] min-h-screen overflow-hidden">
      {/* Server-rendered header */}
      <CustomHeader />
      
      {/* Client component for interactive parts */}
      <FunCircleClient />
    </div>
  );
}
