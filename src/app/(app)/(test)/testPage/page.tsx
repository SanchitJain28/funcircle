"use client"

import { RedirectPopup } from "@/components/other-utils/RedirectingPopup";
import React, { useEffect, useState } from "react";

export default function test() {
    const [InstaOpen,setInstaOpen]=useState<boolean>(false)
    const [normalOpen,setNormalOpen]=useState<boolean>(false)
  const isInAppBrowser = () => {
    const ua = navigator.userAgent || navigator.vendor;
    return /Instagram|FBAN|FBAV/.test(ua);
  };
  useEffect(() => {
    if (isInAppBrowser()) {
      setInstaOpen(true)
      return;
    }
    setNormalOpen(true)
  }, []);

  return <div>
    {InstaOpen && <p className="text-4xl text-black font-bold">You are on Insta</p>}
    {!InstaOpen && <p className="text-4xl text-black font-bold">You are on Not on insta broswe</p>}
    <RedirectPopup ticketUrl="amazon.com" isOpen={InstaOpen} onOpenChange={setInstaOpen} title="you are on Insta"/>
    <RedirectPopup ticketUrl="amazon.com" isOpen={normalOpen} onOpenChange={setNormalOpen} title="you are on not ON Insta"/>
  </div>;
}
