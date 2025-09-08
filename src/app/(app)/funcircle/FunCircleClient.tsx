"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock, Star, ArrowRight } from "lucide-react";
import FixedBottomBar from "./FixedBottomBar";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 pt-2 pb-24">
        {/* Video Banner */}
        <div className="mb-6 lg:hidden">
          <motion.div
            className="relative rounded-3xl p-[2px] overflow-hidden shadow-2xl"
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
            <div className="relative rounded-3xl overflow-hidden bg-black">
              <video
                autoPlay
                muted
                loop
                playsInline
                width="100%"
                className="aspect-video object-cover"
              >
                <source src="SubscriptionBanner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Popular Section */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full" />
            <h2 className="text-2xl font-bold text-purple-400 tracking-wide">
              POPULAR
            </h2>
            <Star className="w-5 h-5 text-purple-400 fill-purple-400" />
          </div>

          {/* Featured Badminton Card */}
          <Link href="/events/90">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 border-purple-500/30 mb-4 hover:border-purple-400/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-purple-500/20 backdrop-blur-sm">
                <CardContent className="py-6 px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-4xl font-black text-white tracking-tight">
                          BADMINTON
                        </h3>
                        <div className="px-3 py-1 bg-purple-500/20 rounded-full">
                          <span className="text-xs font-semibold text-purple-300">
                            FEATURED
                          </span>
                        </div>
                      </div>
                      <p className="text-purple-100 mb-3 text-lg">
                        Premium courts available for booking
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-purple-200 mb-3">
                        <div className="flex items-center bg-white/5 px-3 py-2 rounded-lg">
                          <MapPin className="w-4 h-4 mr-2" />
                          Multiple Locations
                        </div>
                        <div className="flex items-center bg-white/5 px-3 py-2 rounded-lg">
                          <Clock className="w-4 h-4 mr-2" />6 AM - 11 PM
                        </div>
                      </div>
                      <div className="text-purple-100 text-lg mb-3 flex items-baseline gap-2">
                        Starting from{" "}
                        <span className="text-purple-300 text-3xl font-bold">
                          ₹179
                        </span>
                        <span className="text-purple-400 text-sm">/hour</span>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-purple-700 w-full hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-purple-500/25 group">
                        Book Slots Now
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          {/* Football and Box Cricket Row */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mb-6">
            <Link href="/events/82">
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer h-full shadow-lg hover:shadow-xl backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-white">FOOTBALL</h3>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      Full-size pitches available
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-lg">
                        <Users className="w-4 h-4 mr-2" />
                        11v11
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link href="/events/88">
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer h-full shadow-lg hover:shadow-xl backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-lg font-bold text-white">
                        BOX CRICKET
                      </h3>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                    </div>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      Best Indoor cricket experience
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-lg">
                        <Users className="w-4 h-4 mr-2" />
                        6v6
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </div>
        </section>

        {/* Other Sports Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-white/60 to-white/30 rounded-full" />
            <h2 className="text-xl font-semibold text-white/80 tracking-wide">
              MORE SPORTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Link href="/events/83">
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer h-full shadow-lg hover:shadow-xl backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-white">
                        TABLE TENNIS
                      </h3>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    </div>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      Professional tables available
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-lg">
                        <Users className="w-4 h-4 mr-2" />
                        Singles/Doubles
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link href="/events/86">
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer h-full shadow-lg hover:shadow-xl backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-white">TENNIS</h3>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    </div>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      Clay and hard courts
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-lg">
                        <Users className="w-4 h-4 mr-2" />
                        Singles/Doubles
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </div>

          <Link href="/events/86">
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold text-white">
                          PICKLEBALL
                        </h3>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                      </div>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        Clay and hard courts
                      </p>
                      <div className="flex items-center text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-lg w-fit">
                        <Users className="w-4 h-4 mr-2" />
                        Singles/Doubles
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 ml-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <FixedBottomBar />
    </div>
  );
}
