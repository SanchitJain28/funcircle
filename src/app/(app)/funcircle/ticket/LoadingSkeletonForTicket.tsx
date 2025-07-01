"use client"
import React from "react";
import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TicketLoadingSkeleton() {
  return (
    <div className="bg-gradient-to-b from-[#131315] to-[#1a1a1c] min-h-screen">
      <div className="overflow-hidden pb-24">
        {/* Header */}
        <div className="mx-6 pt-6 mb-4">
          <div className="h-9 w-24 bg-zinc-700/50 rounded-lg animate-pulse"></div>
        </div>

        <div className="my-4">
          {/* Main Ticket Card */}
          <div className="flex flex-col bg-[#1D1D1F] rounded-xl mx-6 border border-zinc-700/50 p-6 shadow-lg">
            {/* Ticket Title */}
            <div className="h-8 w-3/4 bg-zinc-700/50 rounded-lg mb-1 animate-pulse"></div>

            {/* Price */}
            <div className="h-10 w-20 bg-zinc-700/50 rounded-lg mb-4 animate-pulse"></div>

            {/* Total spots and counter */}
            <div className="flex justify-between -mt-4 items-center">
              <div className="h-6 w-32 bg-zinc-700/50 rounded-lg animate-pulse"></div>

              <div className="flex items-center border border-zinc-600 p-2 rounded-lg justify-center gap-2 bg-[#252529]">
                <div className="h-10 w-10 bg-zinc-700/50 rounded-md animate-pulse"></div>
                <div className="h-6 w-8 bg-zinc-700/50 rounded animate-pulse"></div>
                <div className="h-10 w-10 bg-zinc-700/50 rounded-md animate-pulse"></div>
              </div>
            </div>

            {/* Shuttle Option */}
            <div className="flex justify-between items-center my-6">
              <div className="flex-1 mr-4">
                <div className="h-5 w-48 bg-zinc-700/50 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-16 bg-zinc-700/50 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-zinc-700/50 rounded-md animate-pulse"></div>
                <div className="h-4 w-8 bg-zinc-700/50 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Date and Time Section */}
          <div className="mx-6 my-6">
            <div className="bg-[#1D1D1F] rounded-xl p-4 border border-zinc-700/50 shadow-md">
              <div className="flex rounded-lg items-center p-2 mb-2">
                <Clock className="text-zinc-700 h-5 w-5" />
                <div className="ml-2 flex-1">
                  <div className="h-4 w-16 bg-zinc-700/50 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-40 bg-zinc-700/50 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex rounded-lg items-center p-2">
                <Clock className="text-zinc-700 h-5 w-5" />
                <div className="ml-2 flex-1">
                  <div className="h-4 w-12 bg-zinc-700/50 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-36 bg-zinc-700/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Level Requirements Card */}
          <div className="mx-6 mb-6">
            <Card className="bg-[#1D1D1F] border border-zinc-800 shadow-lg mb-6">
              <CardHeader>
                <div className="h-6 w-32 bg-zinc-700/50 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-4 w-full bg-zinc-700/50 rounded animate-pulse"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Information Card */}
          <div className="mx-6 mb-6">
            <Card className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
              <CardHeader>
                <div className="h-6 w-44 bg-zinc-700/50 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-4 w-full bg-zinc-700/50 rounded animate-pulse"></div>
                  ))}
                  <div className="h-4 w-3/4 bg-zinc-700/50 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warning Card */}
          <div className="mx-6 mb-6">
            <Card className="bg-[#1D1D1F] border-zinc-800 shadow-lg mb-6">
              <CardHeader>
                <div className="h-6 w-24 bg-zinc-700/50 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="h-4 w-full bg-zinc-700/50 rounded animate-pulse"></div>
                  ))}
                  <div className="h-4 w-2/3 bg-zinc-700/50 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Venue Details */}
          <div className="mx-6 mb-6 rounded-xl p-5 bg-[#1D1D1F] border border-zinc-700/50 shadow-md">
            <div className="h-6 w-28 bg-zinc-700/50 rounded animate-pulse mb-4"></div>

            <div className="flex items-center">
              <div className="w-20 h-20 bg-zinc-700/50 rounded-full animate-pulse"></div>
              <div className="flex flex-col ml-4 flex-1">
                <div className="h-6 w-32 bg-zinc-700/50 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-40 bg-zinc-700/50 rounded animate-pulse mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-10 w-24 bg-zinc-700/50 rounded-lg animate-pulse"></div>
                  <div className="h-10 w-28 bg-zinc-700/50 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mx-6 mb-6">
            <Card className="bg-[#1D1D1F] border-zinc-800 shadow-lg">
              <CardHeader>
                <div className="h-6 w-40 bg-zinc-700/50 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2].map((item) => (
                    <div key={item} className="h-4 w-full bg-zinc-700/50 rounded animate-pulse"></div>
                  ))}
                  <div className="h-4 w-1/2 bg-zinc-700/50 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fixed Bottom Bar */}
          <div className="flex bg-[#131315]/95 backdrop-blur-md items-center border-t border-zinc-700 text-white w-full justify-between px-6 py-4 fixed bottom-0 shadow-lg z-10">
            <div className="flex flex-col">
              <div className="h-8 w-16 bg-zinc-700/50 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-20 bg-zinc-700/50 rounded animate-pulse"></div>
            </div>

            <div className="h-12 w-36 bg-zinc-700/50 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
