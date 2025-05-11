"use client"

import { RedirectPopup } from "@/app/components/RedirectingPopup";
import React, { useEffect, useState } from "react";

export default function test() {
    const [open,setOpen]=useState<boolean>(false)
  const isInAppBrowser = () => {
    const ua = navigator.userAgent || navigator.vendor;
    return /Instagram|FBAN|FBAV/.test(ua);
  };
  useEffect(() => {
    if (isInAppBrowser()) {
      setOpen(true)
      return;
    }
  }, []);

  return <div>
    {open && <p className="text-4xl text-black font-bold">You are on Insta</p>}
    {!open && <p className="text-4xl text-black font-bold">You are on Not on insta broswe</p>}
    <RedirectPopup ticketUrl="amazon.com" isOpen={open} onOpenChange={setOpen}/>
  </div>;
}
