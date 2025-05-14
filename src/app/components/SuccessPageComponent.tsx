"use client";

import React, { useEffect } from "react";
import { Clock, MapPin, Calendar, Check, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QRCodeSVG } from "qrcode.react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { TicketType } from "../(app)/funcircle/eventTicket/[group_id]/page";
interface OrderType {
  created_at: Date;
  status: string;
}

export default function TicketConfirmationPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const [ticket, setTicket] = useState<TicketType | null>(null);
  const [order, setOrder] = useState<OrderType>();
  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/success-fetch-details?ticket-id=${searchParams.get(
          "ticket-id"
        )}&order-id=${searchParams.get("order-id")}`
      );
      const {
        data: { order, ticket },
      } = response;
      setOrder(order);
      setTicket(ticket);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1c] p-8 rounded-2xl flex flex-col items-center max-w-xs w-full shadow-lg border border-purple-500/20">
          <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
          <p className="text-white text-center font-medium text-lg">
            Loading Events
          </p>
          <p className="text-zinc-400 text-center text-sm mt-2">
            Please wait while we fetch your events
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  


  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket for ${ticket?.title}`,
          text: `I've booked a ticket for ${ticket?.title} at ${ticket?.venueid.venue_name}. Join me!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4 md:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#8338EC] rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="#8338EC"
              />
              <path
                d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                fill="#8338EC"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-lg">Fun Circle</h1>
            <p className="text-xs opacity-80">Gurgaon</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-80">Welcome</p>
          <p className="font-medium">Guest User</p>
        </div>
      </div>
      <div className="bg-green-600 rounded-xl p-6 mb-4 border flex flex-col border-zinc-800 shadow-lg">
        <p className="text-white text-xl font-bold">Order Confirmed</p>
        <p className="">
          {formatDate(String(order?.created_at)) +
            " " +
            formatTime(String(order?.created_at))}
        </p>
      </div>
      {/* Confirmation Status */}
      <div className="bg-[#1D1D1F] rounded-xl p-6 mb-6 border border-zinc-800 shadow-lg">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="bg-[#8338EC]/20 p-3 rounded-full mb-4">
            <Check className="h-8 w-8 text-[#8338EC]" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Your ticket is confirmed</h2>
          <p className="text-zinc-400 mb-4">
            Ticket ID: <span className="font-mono text-white">{"FC"+ticket?.id+searchParams.get("order-id")}</span>
          </p>

          {/* QR Code Section - Moved to top */}
          <div className="flex flex-col items-center text-center mt-2">
            <p className="text-sm text-zinc-400 mb-3">
              Scan to open venue location
            </p>
            <div className="bg-white p-3 rounded-lg">
              <QRCodeSVG
                value={ticket?.venueid?.maps_link || ""}
                size={150}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                includeMargin={false}
              />
            </div>
          </div>
        </div>

        <Separator className="my-4 bg-zinc-800" />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-zinc-400 text-sm">Event</p>
            <h3 className="text-xl font-bold">{ticket?.title} X {searchParams.get("quantity")}</h3>
            <Badge
              variant="outline"
              className="mt-1 bg-[#8338EC]/20 text-[#8338EC] border-[#8338EC]/30"
            >
              {ticket?.type}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-zinc-400 text-sm">Price</p>
            <p className="text-2xl font-bold">₹{ticket?.price} <span className="text-sm text-zinc-500">Per ticket</span></p>
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <Card className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#8338EC]" />
            <p className="text-white">Date & Time</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#252529]">
            <Clock className="text-[#8338EC] h-5 w-5 mt-0.5" />
            <div>
              <p className="text-zinc-400 text-sm">From</p>
              <p className="font-medium text-white">
                {ticket?.startdatetime
                  ? formatDate(String(ticket.startdatetime))
                  : "N/A"}
              </p>
              <p className="text-white font-bold">
                {ticket?.startdatetime
                  ? formatTime(String(ticket.startdatetime))
                  : ""}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#252529]">
            <Clock className="text-[#8338EC] h-5 w-5 mt-0.5" />
            <div>
              <p className="text-zinc-400 text-sm">To</p>
              <p className="font-medium text-white">
                {ticket?.enddatetime
                  ? formatDate(String(ticket.enddatetime))
                  : "End date not available"}
              </p>
              <p className="text-white font-bold">
                {ticket?.enddatetime
                  ? formatTime(String(ticket.enddatetime))
                  : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Venue Details */}
      <Card className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#8338EC]" />
            <p className="text-white">Venue Details</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <img
                src={
                  ticket?.venueid.images[0] ||
                  "/placeholder.svg?height=120&width=120"
                }
                className="w-full md:w-32 h-32 rounded-lg object-cover border-2 border-zinc-700"
                alt="Venue"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-bold text-lg text-white">
                  {ticket?.venueid.venue_name}
                </h3>
                <p className="text-zinc-400">{ticket?.venueid.location}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="bg-[#8338EC] hover:bg-[#6a2ec0] text-white flex items-center gap-2"
                  onClick={() =>
                    window.open(ticket?.venueid.maps_link, "_blank")
                  }
                >
                  <MapPin size={16} />
                  View on Maps
                </Button>

                <Button
                  className="bg-[#8338EC] hover:bg-[#6a2ec0] text-white flex items-center gap-2"
                  onClick={handleShare}
                >
                  <Send size={16} />
                  Send on email
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Info */}
      <Card className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-white">
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line text-white text-sm">
            {ticket?.description}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
