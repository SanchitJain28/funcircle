"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock } from "lucide-react";
import React from "react";
import FixedBottomBar from "./FixedBottomBar";
import { motion } from "motion/react";
import Link from "next/link";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 pt-8 pb-24">
        <div className="mb-6 lg:hidden">
          <motion.div
            className="relative rounded-2xl p-[2px] overflow-hidden"
            style={{
              background:
                "linear-gradient(45deg, #7c3aed, #000000, #a855f7, #1a1a1a, #7c3aed)",
              backgroundSize: "300% 300%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-black">
              <video autoPlay muted loop playsInline width="100%">
                <source src="SubscriptionBanner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>

        {/* Popular Section */}

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-6 text-purple-400">
            POPULAR
          </h2>

          {/* Featured Badminton Card */}
          <Link href="/funcircle/eventTicket/90">
            <Card className="bg-purple-900/30 border-purple-500/50 mb-6 hover:bg-purple-900/40 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      BADMINTON
                    </h3>
                    <p className="text-purple-200 mb-4">
                      Premium courts available for booking
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-purple-300 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Multiple Locations
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />6 AM - 11 PM
                      </div>
                    </div>
                    <div className="text-purple-200 text-sm mb-4">
                      Starting from{" "}
                      <span className="text-purple-400 text-2xl font-semibold">
                        ₹179
                      </span>
                    </div>
                    <Button className="bg-purple-600 w-full hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                      Book Slots Now
                    </Button>
                  </div>
                  {/* <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-purple-400">₹500</div>
                  <div className="text-sm text-purple-300">per hour</div>
                </div> */}
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Football and Box Cricket Row */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <Link href="/funcircle/eventTicket/82">
              <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    FOOTBALL
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Full-size pitches available
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      11v11
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/funcircle/eventTicket/88">
              <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    BOX CRICKET
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Best Indoor cricket experience
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      6v6
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>


        {/* Table Tennis and Tennis Row */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Link href="/funcircle/eventTicket/83">
              <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    TABLE TENNIS
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Professional tables available
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      Singles/Doubles
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/funcircle/eventTicket/86">
              <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">TENNIS</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Clay and hard courts
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      Singles/Doubles
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <FixedBottomBar />
    </div>
  );
}
