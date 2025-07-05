"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

export default function FlameButton({
  onRequest,
  isLoading,
  children = "Make a duo",
}: {
  onRequest: () => void;
  isLoading: boolean;
  children?: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onRequest}
      disabled={isLoading}
      className="relative w-full px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: isLoading ? 1 : 1.02 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      animate={{
        boxShadow:
          isHovered && !isLoading
            ? "0 8px 25px rgba(249, 115, 22, 0.4)"
            : "0 4px 15px rgba(249, 115, 22, 0.2)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Subtle shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{
          width: "200%",
          left: "-100%",
        }}
        animate={isHovered && !isLoading ? { left: ["100%", "-100%"] } : {}}
        transition={{
          duration: 1.5,
          repeat: isHovered && !isLoading ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Button content */}
      <motion.div
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{
          opacity: isLoading ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {isLoading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Loader2 className="w-5 h-5" />
          </motion.div>
        )}

        <span className="text-lg font-semibold tracking-wide">{children}</span>
      </motion.div>

      {/* Loading pulse effect */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-orange-400/20 rounded-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
}
