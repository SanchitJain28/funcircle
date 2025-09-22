import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Award,
  Video,
  Utensils,
} from "lucide-react";
import React from "react";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { Funnel_Display } from "next/font/google";
import Link from "next/link";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function TournamentPage() {
  return (
    <>
      <CustomHeader />
      <div
        className={`min-h-screen bg-black text-[#F9F9F9] relative overflow-hidden ${funnelDisplay.className} `}
      >
        <div className="fixed inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#F26610] to-[#8A36EB] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#8A36EB] to-[#F26610] rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#FFD580] to-[#B58CF4] rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Hero Section */}
        <section className="relative pb-12 pt-6 px-4  text-center bg-gradient-to-br from-black via-gray-900/50 to-black backdrop-blur-sm">
          <div className="max-w-6xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance drop-shadow-2xl">
              <span className="text-[#F26610] drop-shadow-lg">Funcircle</span>{" "}
              Badminton Festival{" "}
              <span className="text-[#8A36EB] drop-shadow-lg">2025</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-12 text-[#FFD580] font-medium drop-shadow-lg">
              Celebrate Badminton, Celebrate Fun
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-4 rounded-lg border border-[#F26610]/20 shadow-xl">
                <MapPin className="text-[#F26610] w-6 h-6" />
                <span className="text-lg">Khelkund, Sector 62, Gurgaon</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-4 rounded-lg border border-[#8A36EB]/20 shadow-xl">
                <Calendar className="text-[#8A36EB] w-6 h-6" />
                <span className="text-lg">11th & 12th October 2025</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-4 rounded-lg border border-[#FFD580]/20 shadow-xl">
                <Clock className="text-[#FFD580] w-6 h-6" />
                <span className="text-lg">8 AM – 3 PM</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <div className="text-center bg-gradient-to-br from-[#2ECC71]/20 to-[#2ECC71]/10 backdrop-blur-sm p-6 rounded-xl border border-[#2ECC71]/30">
                <div className="text-4xl font-bold text-[#2ECC71] mb-2 drop-shadow-lg">
                  ₹51,000
                </div>
                <div className="text-lg text-gray-300">Total Prize Pool</div>
              </div>
              <div className="text-center bg-gradient-to-br from-[#FFD580]/20 to-[#FFD580]/10 backdrop-blur-sm p-6 rounded-xl border border-[#FFD580]/30">
                <div className="text-2xl font-bold text-[#FFD580] mb-2 drop-shadow-lg">
                  ₹1099 / ₹2199
                </div>
                <div className="text-lg text-gray-300">
                  Entry Fee (Singles/Doubles)
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Badge
                variant="destructive"
                className="bg-gradient-to-r from-[#E74C3C] to-[#E74C3C]/80 text-white px-4 py-2 text-base shadow-xl animate-pulse"
              >
                Registration closes this month!
              </Badge>
            </div>
          </div>
        </section>

        {/* Tournament Categories Section */}
        <section className="pt-6 px-4 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold text-center my-4 text-[#8A36EB] drop-shadow-2xl">
              Tournament Categories
            </h2>
            <h2 className="text-2xl font-bold text-center mb-8 text-[#F26610] drop-shadow-xl">
              10 Teams per Category
            </h2>

            <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-gray-700/50 overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#8A36EB] to-[#8A36EB]/80 text-white">
                        <th className="text-left p-4 font-semibold text-lg">
                          Category
                        </th>
                        <th className="text-center p-4 font-semibold text-lg">
                          Prize Money
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[#F9F9F9]">
                      {/* Doubles Section */}
                      <tr className="bg-gradient-to-r from-[#B58CF4]/30 to-[#B58CF4]/20 backdrop-blur-sm">
                        <td
                          colSpan={2}
                          className="p-4 font-bold text-xl text-[#B58CF4] text-center drop-shadow-lg"
                        >
                          DOUBLES
                        </td>
                      </tr>

                      <Link
                        href="/funcircle/ticket?id=498"
                        className="table-row border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 text-lg">
                          Men&apos;s Doubles (20–30)
                        </td>
                        <td className="p-4 text-center text-[#2ECC71] font-bold text-lg">
                          ₹10,000
                        </td>
                      </Link>

                      <Link
                        href="/funcircle/ticket?id=500"
                        className="table-row border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 text-lg">Mixed Doubles (20–30)</td>
                        <td className="p-4 text-center text-[#2ECC71] font-bold text-lg">
                          ₹10,000
                        </td>
                      </Link>

                      <Link
                        href="/funcircle/ticket?id=499"
                        className="table-row border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 text-lg">
                          Men&apos;s Doubles (30–40)
                        </td>
                        <td className="p-4 text-center text-[#2ECC71] font-bold text-lg">
                          ₹10,000
                        </td>
                      </Link>

                      <Link
                        href="/funcircle/ticket?id=502"
                        className="table-row border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 text-lg">
                          Women&apos;s Doubles (20–30)
                        </td>
                        <td className="p-4 text-center text-[#2ECC71] font-bold text-lg">
                          ₹5,000
                        </td>
                      </Link>

                      <Link
                        href="/funcircle/ticket?id=503"
                        className="table-row border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 text-lg">Youth Doubles (&lt;19)</td>
                        <td className="p-4 text-center text-[#2ECC71] font-bold text-lg">
                          ₹5,000
                        </td>
                      </Link>

                      <Link
                        href="/funcircle/ticket?id=501"
                        className="table-row border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 text-lg">Mixed Doubles (30–40)</td>
                        <td className="p-4 text-center text-[#2ECC71] font-bold text-lg">
                          ₹5,000
                        </td>
                      </Link>

                      {/* Singles Section */}
                      <tr className="bg-gradient-to-r from-[#B58CF4]/30 to-[#B58CF4]/20 backdrop-blur-sm">
                        <td
                          colSpan={2}
                          className="p-4 font-bold text-xl text-[#B58CF4] text-center drop-shadow-lg"
                        >
                          SINGLES
                        </td>
                      </tr>

                      <Link
                        href="/funcircle/ticket?id=505"
                        className="table-row border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 text-lg">
                          Men&apos;s Singles (30–40)
                        </td>
                        <td className="p-4 text-center text-[#2ECC71] font-bold text-lg">
                          ₹3,000
                        </td>
                      </Link>

                      <Link
                        href="/funcircle/ticket?id=504"
                        className="table-row border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4 text-lg">
                          Men&apos;s Singles (20–30)
                        </td>
                        <td className="p-4 text-center text-[#2ECC71] font-bold text-lg">
                          ₹3,000
                        </td>
                      </Link>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-5xl font-bold text-center mb-4 text-[#F26610] drop-shadow-2xl">
              Why Join This Festival?
            </h2>
            <p className="text-xl text-center text-gray-300 mb-12">
              Experience the ultimate badminton tournament with premium
              facilities and exciting rewards!
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Award,
                  text: "Awards & Certificates for Winners & Runners-up",
                  color: "#F26610",
                },
                {
                  icon: Users,
                  text: "Live Scoring + Leaderboard via Funcircle App",
                  color: "#8A36EB",
                },
                { icon: MapPin, text: "Brand New Courts", color: "#2ECC71" },
                { icon: Users, text: "Official Referees", color: "#FFD580" },
                {
                  icon: Trophy,
                  text: "Yonex Mavis 350 Shuttles",
                  color: "#F26610",
                },
                { icon: Star, text: "Welcome Kits", color: "#8A36EB" },
                {
                  icon: Video,
                  text: "Game Video Recordings",
                  color: "#2ECC71",
                },
                {
                  icon: Utensils,
                  text: "Food & Refreshment Stalls",
                  color: "#FFD580",
                },
                { icon: Badge, text: "Custom Team Badges", color: "#B58CF4" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-[#F26610]/50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 group-hover:from-[${item.color}]/20 group-hover:to-[${item.color}]/10 transition-all duration-300`}
                    >
                      <item.icon className="w-6 h-6 text-[#8A36EB] group-hover:text-[#F26610] transition-colors duration-300" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                      {item.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tournament Format Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <Card className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm border-gray-700/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-[#F26610] flex items-center gap-3 drop-shadow-lg">
                  <Trophy className="w-8 h-8" />
                  Tournament Format
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-4 rounded-lg border border-[#8A36EB]/20">
                  <h4 className="text-xl font-semibold text-[#8A36EB] mb-3">
                    Group Stage:
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    Teams divided into groups of 5, 1 set of 21 points.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-4 rounded-lg border border-[#FFD580]/20">
                  <h4 className="text-xl font-semibold text-[#FFD580] mb-3">
                    Match Guarantee:
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    Every player/team will play at least 4 games in group stage,
                    another 1-2 games in knockouts.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-4 rounded-lg border border-[#2ECC71]/20">
                  <h4 className="text-xl font-semibold text-[#2ECC71] mb-3">
                    Knockouts:
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    Top from each group qualifies. Best of 3 sets (15 points
                    each).
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#F26610]/20 to-[#8A36EB]/20 backdrop-blur-sm p-6 rounded-lg border border-[#F26610]/30">
                  <h4 className="text-lg font-semibold text-[#FFD580] mb-2">
                    Examples:
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• 10 Teams → 2 Groups of 5 → Winners play Final</li>
                    <li>• 20 Teams → 4 Groups of 5 → Semis → Final</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-balance drop-shadow-2xl">
              Ready to Join the <span className="text-[#F26610]">Ultimate</span>{" "}
              Badminton Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Don&apos;t miss out on this incredible tournament with amazing
              prizes, professional setup, and unforgettable memories!
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#F26610] to-[#F26610]/80 hover:from-[#F26610]/90 hover:to-[#F26610]/70 text-white px-12 py-4 text-xl shadow-2xl border border-[#F26610]/50 hover:scale-105 transition-all duration-300"
            >
              Register Now - Limited Spots!
            </Button>
          </div>
        </section>

        <a
          href="https://wa.me/919818930056?text=I%20want%20to%20book%20my%20slot%20for%20________%20category
"
        >
          <div className="fixed bottom-0 w-full z-20">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-[#F26610] to-[#F26610]/80 
    hover:from-[#F26610]/90 hover:to-[#F26610]/70 
    text-white py-3 text-lg shadow-2xl border border-[#F26610]/50"
            >
              Register Now
            </Button>
          </div>
        </a>
      </div>
    </>
  );
}
