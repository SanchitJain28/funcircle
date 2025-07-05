import React from "react";

import CustomHeader from "@/components/header-footers/CustomHeader";
import FunCircleClient from "./FunCircleClient";
import axios from "axios";

export default async function FunCircle() {
  const {
    data: { data },
  } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/FetchEvents`, {
    group_type: "Outdoor",
  });

  return (
    <div className="bg-[#131315] min-h-screen overflow-hidden ">
      {/* Server-rendered header */}
      <CustomHeader />

      {/* Client component for interactive parts */}
      <FunCircleClient data={data} />
    </div>
  );
}
