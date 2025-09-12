"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUserBooking } from "@/hooks/useBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import React from "react";
import CustomHeader from "@/components/header-footers/CustomHeader";

export default function SingleBookingClient({
  params,
}: {
  params: { id: string };
}) {
  const { user } = useAuth();
  const { data, isPending, isError } = useUserBooking(params.id);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F26610]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-[#E74C3C] text-xl font-semibold mb-2">
            Error Loading Booking
          </div>
          <p className="text-[#F9F9F9]/70">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!data && !isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-[#F9F9F9] text-xl font-semibold mb-2">
            Booking Not Found
          </div>
          <p className="text-[#F9F9F9]/70">
            The booking you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-[#F9F9F9] text-xl font-semibold mb-2">
            Authentication Required
          </div>
          <p className="text-[#F9F9F9]/70">Please log in to see this booking</p>
        </div>
      </div>
    );
  }

  const order = data;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-[#2ECC71] text-white";
      case "pending":
        return "bg-[#F1C40F] text-black";
      case "cancelled":
        return "bg-[#E74C3C] text-white";
      default:
        return "bg-[#8A36EB] text-white";
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const startDateTime = formatDateTime(order.ticket.startdatetime);
  const endDateTime = formatDateTime(order.ticket.enddatetime);

  return (
    <>
      <CustomHeader />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Booking Card */}
        <Card className="bg-[#000000] border-[#F9F9F9]/20">
          <CardHeader className="pb-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <CardTitle className="text-[#F9F9F9] text-2xl font-bold">
                  {order.ticket.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-[#F9F9F9]/70">
                  <span className="text-[#8A36EB] font-medium">
                    Order #{order.order_id}
                  </span>
                  <span>•</span>
                  <span>Ticket ID: {order.ticket_id}</span>
                </div>
              </div>
              <Badge
                className={`${getStatusColor(order.status)} font-semibold text-sm px-3 py-1`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Event & Venue Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-6 w-6 text-[#F26610]" />
                      <div>
                        <div className="text-[#F9F9F9] font-semibold text-lg">
                          Event Start
                        </div>
                        <div className="text-[#F9F9F9]/80">
                          {startDateTime.date}
                        </div>
                        <div className="text-[#F26610] font-medium">
                          {startDateTime.time}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-6 w-6 text-[#8A36EB]" />
                      <div>
                        <div className="text-[#F9F9F9] font-semibold text-lg">
                          Event End
                        </div>
                        <div className="text-[#F9F9F9]/80">
                          {endDateTime.date}
                        </div>
                        <div className="text-[#8A36EB] font-medium">
                          {endDateTime.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-[#F26610] mt-1" />
                  <div>
                    <div className="text-[#F9F9F9] font-semibold text-lg">
                      {order.ticket.venue.venue_name}
                    </div>
                    <div className="text-[#F9F9F9]/80">
                      {order.ticket.venue.location}
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-[#8A36EB]" />
                  <div>
                    <div className="text-[#F9F9F9] font-semibold text-lg">
                      {order.quantity}{" "}
                      {order.quantity === 1 ? "Ticket" : "Tickets"}
                    </div>
                    <div className="text-[#F9F9F9]/80">General Admission</div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-[#F9F9F9]/5 rounded-lg border border-[#F9F9F9]/10">
                <div className="text-[#F9F9F9] font-semibold text-center">
                  Entry QR Code
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG
                    value={order.order_id.toString()}
                    size={160}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={false}
                  />
                </div>
                <div className="text-[#F9F9F9]/70 text-sm text-center">
                  Show this code at the venue entrance
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t border-[#F9F9F9]/10 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-[#F26610]">
                      ₹{order.sub_price}
                    </div>
                    <div className="text-[#F9F9F9]/70">per ticket</div>
                  </div>
                  {order.used_premium_discount && (
                    <Badge className="bg-[#FFD580] text-black font-medium">
                      Premium Discount Applied
                    </Badge>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-[#F9F9F9]/70 text-sm">Total Amount</div>
                  <div className="text-[#F9F9F9] text-2xl font-bold">
                    ₹
                    {(
                      Number.parseFloat(order.sub_price) * order.quantity
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
