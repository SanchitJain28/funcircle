"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BackgroundChanger() {
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
        case '/':document.body.style.backgroundColor = "#F4F4F5"; break;
        case '/funcircle': document.body.style.backgroundColor = "#131315"; break;
        case '/events':document.body.style.backgroundColor="black";break
        case '/funcircle/ticket': document.body.style.backgroundColor = "#131315"; break;
        case '/funcircle/eventTicket': document.body.style.backgroundColor = "#131315"; break;

    }
  }, [pathname]);

  return null; // This component only updates background color
}