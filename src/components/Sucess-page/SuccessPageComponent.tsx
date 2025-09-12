"use client";
import React, { useEffect } from "react";
import {
  Clock,
  MapPin,
  Calendar,
  Check,
  Send,
  Loader2,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QRCodeSVG } from "qrcode.react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import type { TicketType } from "@/app/types";
import CustomHeader from "../header-footers/CustomHeader";
import { useRef } from "react";

import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
import confetti from "canvas-confetti";

interface OrderType {
  created_at: string;
  status: string;
}

export default function TicketConfirmationPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const [ticket, setTicket] = useState<TicketType | null>(null);
  const [order, setOrder] = useState<OrderType>();
  const [downloading, setDownloading] = useState<boolean>(false);
  const confettiRef = useRef<ConfettiRef>(null);

  console.log(order);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/success-fetch-details?ticket-id=${searchParams.get("ticket-id")}&order-id=${searchParams.get("order-id")}`
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

  const handleClick = () => {
    const scalar = 2;
    const triangle = confetti.shapeFromPath({
      path: "M0 10 L5 0 L10 10z",
    });
    const square = confetti.shapeFromPath({
      path: "M0 0 L10 0 L10 10 L0 10 Z",
    });
    const coin = confetti.shapeFromPath({
      path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
    });
    const tree = confetti.shapeFromPath({
      path: "M5 0 L10 10 L0 10 Z",
    });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [triangle, square, coin, tree],
      scalar,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  const downloadTicket = async () => {
    setDownloading(true);
    try {
      const response = await axios.post(
        "/api/download-ticket",
        {
          ticketData: {
            eventName: ticket?.title,
            date: ticket?.startdatetime
              ? new Date(ticket.startdatetime).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A",
            venueName: ticket?.venueid?.venue_name || "Venue Name",
            location: ticket?.venueid?.location || "Venue Location",
            price: ticket?.price || 0,
            quantity: searchParams.get("quantity") || 1,
            ticketId: ticket?.id || "N/A",
            mapsLink: ticket?.venueid?.maps_link || "",
            description: ticket?.description || "No description available",
            startTime: ticket?.startdatetime
              ? new Date(ticket.startdatetime).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "N/A",
            endTime: ticket?.enddatetime
              ? new Date(ticket.enddatetime).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "N/A",
            orderId: "FC" + ticket?.id + searchParams.get("order-id"),
            createdAt: order?.created_at
              ? new Date(order.created_at).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A",
            createdAtTime: order?.created_at
              ? new Date(order.created_at).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "N/A",
            ticketType: ticket?.type || "General",
          },
        },
        {
          responseType: "blob", // Important: tells axios to expect binary data
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `ticket-${ticket?.title || "event"}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading ticket:", error);
      // Handle error (show toast, alert, etc.)
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    if (!loading && ticket) {
      handleClick();
    }
  }, [loading, ticket]);

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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center">
        <div className="bg-zinc-900 p-8 rounded-2xl flex flex-col items-center max-w-xs w-full shadow-2xl border border-orange-500/30">
          <Loader2 className="h-12 w-12 text-orange-500 animate-spin mb-4" />
          <p className="text-white text-center font-medium text-lg">
            Loading Your Ticket
          </p>
          <p className="text-zinc-400 text-center text-sm mt-2">
            Please wait while we prepare your confirmation
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomHeader />
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        onMouseEnter={() => {}}
      />

      <motion.div className="min-h-screen bg-black text-white p-4 md:p-6 max-w-3xl mx-auto relative">
        {/* Header with enhanced styling */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl py-3 px-6 mb-3 border border-orange-400/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-full">
                <Check className="h-6 w-6 text-white" />
              </div>
              <p className="text-white text-xl font-bold">Order Confirmed!</p>
            </div>
            <p className="text-orange-100 text-lg">
              {formatDate(String(order?.created_at)) +
                " " +
                formatTime(String(order?.created_at))}
            </p>
          </div>
        </motion.div>

        {/* Confirmation Status with enhanced animation */}
        <motion.div className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="flex justify-center items-center mx-6 mb-4">
                <motion.div className="bg-orange-500/20 p-4 rounded-full mb-4 mx-2 border border-orange-500/30">
                  <Check className="h-10 w-10 text-orange-500" />
                </motion.div>
                <h2 className="text-3xl text-start font-bold mb-2 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                  Your Ticket is Confirmed!
                </h2>
              </div>

              <p className="text-zinc-400 mb-3 text-lg">
                Ticket ID:{" "}
                <span className="font-mono text-orange-400 bg-zinc-800 px-3 py-1 rounded-lg">
                  {"FC" + ticket?.id + searchParams.get("order-id")}
                </span>
              </p>

              {/* Enhanced QR Code Section */}
              <div className="flex flex-col items-center text-center mt-4">
                <p className="text-sm text-zinc-400 mb-4 font-medium">
                  Scan QR Code for Venue Location
                </p>
                <motion.div className="bg-white p-4 rounded-xl shadow-lg border-4 border-orange-500/20">
                  <QRCodeSVG
                    value={ticket?.venueid?.maps_link || ""}
                    size={160}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={false}
                  />
                </motion.div>
              </div>
            </div>

            <Separator className="my-6 bg-zinc-700" />

            <div className="flex justify-between items-center">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Event</p>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {ticket?.title} X {searchParams.get("quantity")}
                </h3>
                <Badge
                  variant="outline"
                  className="bg-orange-500/20 text-orange-400 border-orange-500/40 font-semibold"
                >
                  {ticket?.type}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-zinc-400 text-sm font-medium">Price</p>
                <p className="text-3xl font-bold text-orange-500">
                  ₹{ticket?.price}{" "}
                  <span className="text-sm text-zinc-500 font-normal">
                    Per ticket
                  </span>
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={downloadTicket}
            className="text-white my-4 border border-orange-600 p-4 rounded-lg w-full"
          >
            {downloading ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              "Download Ticket"
            )}
          </button>
        </motion.div>

        {/* WhatsApp Group with enhanced styling */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800 shadow-xl"
        >
          <div className="text-center">
            <p className="text-white mb-3 text-lg">
              Have questions? Join our{" "}
              <a
                href="https://chat.whatsapp.com/Ka9UfFtJHIaH9tSJwjpavS?source_surface=21&fbclid=PAQ0xDSwLm4X5leHRuA2FlbQIxMAABp83n-vAwL3oOVxv5HMv4nZD24xKCFZEt5ES51m-lY7xSrtMP-cJjFeJDhpRC_aem_ocUBlOy0GELVUg4hPe651g"
                className="text-orange-500 font-bold hover:text-orange-400 transition-colors"
              >
                WhatsApp Community
              </a>
            </p>
            <a
              href={
                "https://chat.whatsapp.com/Ka9UfFtJHIaH9tSJwjpavS?source_surface=21&fbclid=PAQ0xDSwLm4X5leHRuA2FlbQIxMAABp83n-vAwL3oOVxv5HMv4nZD24xKCFZEt5ES51m-lY7xSrtMP-cJjFeJDhpRC_aem_ocUBlOy0GELVUg4hPe651g"
              }
              className="w-full"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                🚀 Join WhatsApp Group
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Date & Time with enhanced design */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-zinc-900 border-zinc-800 shadow-xl mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-500" />
                </div>
                <p className="text-white">Event Schedule</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Clock className="text-orange-500 h-5 w-5" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-medium">
                    Event Starts
                  </p>
                  <p className="font-semibold text-white text-lg">
                    {ticket?.startdatetime
                      ? formatDate(String(ticket.startdatetime))
                      : "N/A"}
                  </p>
                  <p className="text-orange-400 font-bold text-xl">
                    {ticket?.startdatetime
                      ? formatTime(String(ticket.startdatetime))
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Clock className="text-orange-500 h-5 w-5" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-medium">
                    Event Ends
                  </p>
                  <p className="font-semibold text-white text-lg">
                    {ticket?.enddatetime
                      ? formatDate(String(ticket.enddatetime))
                      : "End date not available"}
                  </p>
                  <p className="text-orange-400 font-bold text-xl">
                    {ticket?.enddatetime
                      ? formatTime(String(ticket.enddatetime))
                      : ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Venue Details with enhanced styling */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="bg-zinc-900 border-zinc-800 shadow-xl mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <MapPin className="h-6 w-6 text-orange-500" />
                </div>
                <p className="text-white">Venue Information</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={
                      ticket?.venueid.images[0] ||
                      "/placeholder.svg?height=150&width=150"
                    }
                    className="w-full md:w-40 h-40 rounded-xl object-cover border-2 border-orange-500/20 shadow-lg"
                    alt="Venue"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-bold text-2xl text-white mb-2">
                      {ticket?.venueid.venue_name}
                    </h3>
                    <p className="text-zinc-400 text-lg">
                      {ticket?.venueid.location}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                      onClick={() =>
                        window.open(ticket?.venueid.maps_link, "_blank")
                      }
                    >
                      <MapPin size={18} />
                      Open in Maps
                    </Button>
                    <Button
                      className="bg-zinc-700 hover:bg-zinc-600 text-white flex items-center gap-2 font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                      onClick={handleShare}
                    >
                      <Send size={18} />
                      Share Ticket
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Important Info with enhanced styling */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-zinc-900 border-zinc-800 shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Trophy className="h-6 w-6 text-orange-500" />
                </div>
                Important Event Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-white text-base leading-relaxed bg-zinc-800/30 p-4 rounded-lg border border-zinc-700/50">
                {ticket?.description}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center py-8"
        >
          <p className="text-zinc-400 text-lg">
            🎉 Get ready for an amazing experience! 🎉
          </p>
          <p className="text-orange-500 font-semibold mt-2">
            See you at the event!
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}
