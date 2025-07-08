"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
import { Loader2, Flame } from "lucide-react";
import axios, { type AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

// Alternative version with subtle dark theme
export default function FlameButton({
  id,
  children = "Make a duo",
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  if (!user) return null;

  const handleDuoRequest = async () => {
    setLoading(true);
    try {
      await axios.post("/api/handleDuoRequest", {
        user_id: user.uid,
        id,
      });
      toast.success("Request sent successfully");
    } catch (error) {
      const errorMessage = error as AxiosError<{ message: string }>;
      toast.error(
        "Error sending the request" +
          (errorMessage.response?.data.message
            ? `: ${errorMessage.response.data.message}`
            : "")
      );
    }
    setLoading(false);
  };

  return (
    <motion.button
      onClick={() => handleDuoRequest()}
      disabled={loading}
      className="relative w-full h-10 bg-gray-800/80 backdrop-blur border border-[#F9761C]/50 text-[#F9761C] font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed group hover:bg-[#F9761C] hover:text-black"
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Button content */}
      <motion.div
        className="relative z-10 flex items-center justify-center gap-2 h-full px-4"
        animate={{
          opacity: loading ? 0.9 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Loader2 className="w-4 h-4" />
          </motion.div>
        ) : (
          <Flame className="w-4 h-4" />
        )}

        <span className="font-bold tracking-wide">
          {loading ? "Sending..." : children}
        </span>
      </motion.div>

      {/* Loading pulse */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-[#F9761C]/20 rounded-xl"
          animate={{
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-[#F9761C]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          boxShadow: loading
            ? "0 0 20px rgba(249, 118, 28, 0.3)"
            : "0 0 0px rgba(249, 118, 28, 0)",
        }}
      />
    </motion.button>
  );
}
