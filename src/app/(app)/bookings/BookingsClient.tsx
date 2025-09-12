"use client";

import { useAuth } from "@/hooks/useAuth";
import { Order, useUserBookings } from "@/hooks/useBookings";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users } from "lucide-react";
import React from "react";
import CustomHeader from "@/components/header-footers/CustomHeader";
import Link from "next/link";

export default function BookingClient() {
  const { user, authLoading } = useAuth();
  const { data, isError, isPending } = useUserBookings(user?.uid);

  if (isPending || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div
          className="w-12 h-12 border-4 border-t-[#F26610] border-r-[#8A36EB] border-b-[#B58CF4] border-l-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="text-[#E74C3C] text-lg font-semibold mb-2">
            Error Loading Bookings
          </div>
          <p className="text-[#F9F9F9]/70">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <CustomHeader />
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="text-[#F9F9F9] text-lg font-semibold mb-2">
              Authentication Required
            </div>
            <p className="text-[#F9F9F9]/70">
              Please log in to see your bookings
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!isPending && !data) {
    return (
      <>
        <CustomHeader />

        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="text-[#F9F9F9] text-lg font-semibold mb-2">
              No Bookings Found
            </div>
            <p className="text-[#F9F9F9]/70">
              You haven&apos;t made any bookings yet
            </p>
          </div>
        </div>
      </>
    );
  }

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

  return (
    <>
      <CustomHeader />
      <div className="space-y-6">
        {data?.map((order: Order) => {
          return (
            <Link key={order.order_id} href={`/bookings/${order.order_id}`}>
              <div
                key={order.order_id}
                className="bg-[#000000] border-zinc-600 border-b hover:border-[#F26610]/50 transition-colors"
              >
                <CardHeader className="">
                  <div className="flex items-start justify-between">
                    <div className="">
                      <CardTitle className="text-[#F9F9F9] text-xl font-bold">
                        {order.ticket.title}
                      </CardTitle>
                    </div>
                    <Badge
                      className={`${getStatusColor(order.status)} font-semibold`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Event Details */}
                  <div className="grid md:grid-cols-2 mb-2">
                    <div className="">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-[#F26610]" />
                        <div>
                          <div className="text-[#F9F9F9] font-medium">
                            {order.ticket.venue.venue_name}
                          </div>
                          <div className="text-[#F9F9F9]/70 text-sm">
                            {order.ticket.venue.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-[#8A36EB]" />
                        <div>
                          <div className="text-[#F9F9F9] font-medium">
                            Quantity: {order.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price and Discount Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F9F9F9]/10">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-[#F26610]">
                        ₹{order.sub_price}
                      </div>
                      {order.used_premium_discount && (
                        <Badge className="bg-[#FFD580] text-black font-medium">
                          Premium Discount Applied
                        </Badge>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-[#F9F9F9]/70 text-sm">
                        Total Price
                      </div>
                      <div className="text-[#F9F9F9] font-medium">
                        ₹
                        {(
                          Number.parseFloat(order.sub_price) * order.quantity
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
