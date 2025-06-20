"use client"

import { useAuth } from "@/hooks/useAuth";
import { MapPin, UserRound } from "lucide-react";
import React from "react";

export default function CustomHeader() {
  const { user, authLoading } = useAuth();
  if(authLoading){return}
  return (
    <header className="bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Location Section */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-lg">
              <MapPin className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-white text-xl font-bold ">Fun Circle</p>
              <p className="text-white/70 font-bold text">Gurgaon</p>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-3">
            <div>
              <p className="text-white/70 text-sm font-medium text-right">
                Welcome
              </p>
              {user ? (
                <p className="text-white font-bold text-lg text-right">
                  {user.phoneNumber}
                </p>
              ) : (
                <p className="text-white font-bold text-lg text-right">
                  Guest User
                </p>
              )}
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-lg">
              <UserRound className="text-white w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
