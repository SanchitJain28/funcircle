import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BlurredChatBackground() {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Blurred Chat Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1A1A1A] to-black">
        {/* Mock chat interface elements */}
        <div className="absolute inset-0 blur-sm opacity-40">
          {/* Header */}
          <div className="bg-[#1A1A1A] h-16 border-b border-[#2A2A2A] flex items-center px-4">
            <div className="w-10 h-10 bg-[#8A36EB]/40 rounded-full"></div>
            <div className="ml-3">
              <div className="w-24 h-4 bg-[#8A36EB]/30 rounded mb-1"></div>
              <div className="w-16 h-3 bg-[#FFD580]/40 rounded"></div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="p-4 space-y-4">
            {/* Received message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#8A36EB]/40 rounded-full flex-shrink-0"></div>
              <div className="bg-[#1A1A1A] rounded-2xl rounded-tl-md p-3 max-w-xs border border-[#2A2A2A]">
                <div className="w-32 h-3 bg-[#8A36EB]/30 rounded mb-2"></div>
                <div className="w-24 h-3 bg-[#B58CF4]/40 rounded"></div>
              </div>
            </div>

            {/* Sent message */}
            <div className="flex justify-end">
              <div className="bg-[#F26610] rounded-2xl rounded-tr-md p-3 max-w-xs text-white">
                <div className="w-28 h-3 bg-[#FFD580]/40 rounded mb-2"></div>
                <div className="w-20 h-3 bg-[#FFD580]/30 rounded"></div>
              </div>
            </div>

            {/* Another received message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#8A36EB]/40 rounded-full flex-shrink-0"></div>
              <div className="bg-[#1A1A1A] rounded-2xl rounded-tl-md p-3 max-w-xs border border-[#2A2A2A]">
                <div className="w-40 h-3 bg-[#8A36EB]/30 rounded mb-2"></div>
                <div className="w-32 h-3 bg-[#B58CF4]/40 rounded mb-2"></div>
                <div className="w-16 h-3 bg-[#FFD580]/40 rounded"></div>
              </div>
            </div>

            {/* Sent message */}
            <div className="flex justify-end">
              <div className="bg-[#F26610] rounded-2xl rounded-tr-md p-3 max-w-xs text-white">
                <div className="w-36 h-3 bg-[#FFD580]/40 rounded"></div>
              </div>
            </div>

            {/* More messages */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#8A36EB]/40 rounded-full flex-shrink-0"></div>
              <div className="bg-[#1A1A1A] rounded-2xl rounded-tl-md p-3 max-w-xs border border-[#2A2A2A]">
                <div className="w-24 h-3 bg-[#B58CF4]/40 rounded"></div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-[#F26610] rounded-2xl rounded-tr-md p-3 max-w-xs text-white">
                <div className="w-44 h-3 bg-[#FFD580]/40 rounded mb-2"></div>
                <div className="w-28 h-3 bg-[#FFD580]/30 rounded"></div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#8A36EB]/40 rounded-full flex-shrink-0"></div>
              <div className="bg-[#1A1A1A] rounded-2xl rounded-tl-md p-3 max-w-xs border border-[#2A2A2A]">
                <div className="w-38 h-3 bg-[#B58CF4]/40 rounded mb-2"></div>
                <div className="w-20 h-3 bg-[#FFD580]/40 rounded"></div>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-[#2A2A2A] p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full h-12"></div>
              <div className="w-12 h-12 bg-[#F26610] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Sign in modal */}
      <div className="relative z-10 bg-[#1A1A1A] rounded-2xl shadow-xl p-8 max-w-sm w-full text-center mx-4 border border-[#2A2A2A]">
        <h2 className="text-2xl font-bold mb-3 text-[#F9F9F9]">Sign in required</h2>
        <p className="text-white mb-6">
          You need to sign in to access the chat room.
        </p>
        <Link href="/sign-up">
          <button className="w-full flex items-center justify-center gap-2 bg-[#F26610] hover:bg-[#F26610]/90 text-white py-3 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8A36EB]">
            <LogIn className="h-5 w-5" />
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
}
