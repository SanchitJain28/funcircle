import React from "react";
import CustomHeader from "@/components/header-footers/CustomHeader";
import FunCircleClient from "./FunCircleClient";

export default async function FunCircle() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/FetchEvents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group_type: "Outdoor" }),
        cache: "no-store", // optional: disables caching
      }
    );

    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const { data } = await res.json();

    return (
      <div className="bg-[#131315] min-h-screen overflow-hidden">
        <CustomHeader />
        <FunCircleClient data={data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return (
      <div className="bg-[#131315] min-h-screen overflow-hidden text-white p-8">
        <CustomHeader />
        <p className="text-red-500">Something went wrong loading events 😢</p>
      </div>
    );
  }
}
