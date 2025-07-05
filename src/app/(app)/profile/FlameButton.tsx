"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

export default function FlameButton({ onRequest }: { onRequest: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full">
      <motion.div
        className="relative w-full inline-block"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Enhanced outer glow with solid orange */}
        <motion.div
          className="absolute w-full inset-0 rounded-xl bg-orange-500"
          style={{
            filter: "blur(3px)",
            margin: "-3px",
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0.4,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Main button with solid dark background */}
        <motion.button
          onClick={() => onRequest()}
          className="relative w-full px-8 py-4 bg-slate-900 text-white font-bold rounded-xl border border-orange-500/40 overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          animate={{
            boxShadow: isHovered
              ? "0 0 20px rgba(249, 115, 22, 0.5), 0 0 40px rgba(255, 193, 7, 0.3), inset 0 0 20px rgba(249, 115, 22, 0.1)"
              : "0 0 10px rgba(249, 115, 22, 0.3), 0 0 20px rgba(255, 193, 7, 0.1)",
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Enhanced flame sweep effect with solid orange */}
          <motion.div
            className="absolute inset-0 opacity-30 bg-orange-500"
            style={{
              width: "300%",
              left: "-200%",
            }}
            animate={
              isHovered
                ? {
                    left: ["200%", "-200%"],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced inner flame particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${4 + (i % 2)}px`,
                height: `${4 + (i % 2)}px`,
                background: i % 2 === 0 ? "#f97316" : "#fbbf24",
                left: `${15 + i * 12}%`,
                bottom: "25%",
                filter: "blur(0.5px)",
              }}
              animate={
                isHovered
                  ? {
                      y: [0, -12, 0],
                      opacity: [0.4, 1, 0.4],
                      scale: [0.6, 1.2, 0.6],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 1.2 + i * 0.1,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Additional floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 2 === 0 ? "#fb923c" : "#fcd34d",
                left: `${10 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
                filter: "blur(0.5px)",
              }}
              animate={
                isHovered
                  ? {
                      x: [0, Math.random() > 0.5 ? 8 : -8, 0],
                      y: [0, -6, 0],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1, 0.5],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 1.5 + i * 0.1,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Enhanced button text with dynamic glow */}
          <motion.span
            className="relative z-10 text-lg font-bold tracking-wide"
            animate={{
              textShadow: isHovered
                ? "0 0 10px rgba(249, 115, 22, 0.8), 0 0 20px rgba(255, 193, 7, 0.6)"
                : "0 0 5px rgba(249, 115, 22, 0.4)",
              color: isHovered ? "#fef3c7" : "#fed7aa",
            }}
            transition={{ duration: 0.4 }}
          >
            Make a duo
          </motion.span>

          {/* Enhanced top flame edge effect */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-orange-400 rounded-full"
            animate={{
              opacity: isHovered ? [0.5, 1, 0.5] : 0,
              scaleX: isHovered ? [0.8, 1.4, 0.8] : 0.8,
              backgroundColor: isHovered
                ? ["#fb923c", "#fbbf24", "#fb923c"]
                : "#fb923c",
            }}
            transition={{
              duration: 1.8,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            }}
          />

          {/* Enhanced bottom flame edge effect */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-yellow-400 rounded-full"
            animate={{
              opacity: isHovered ? [0.4, 0.8, 0.4] : 0,
              scaleX: isHovered ? [1, 1.5, 1] : 1,
              backgroundColor: isHovered
                ? ["#fbbf24", "#f59e0b", "#fbbf24"]
                : "#fbbf24",
            }}
            transition={{
              duration: 2.2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              delay: 0.4,
            }}
          />

          {/* Side flame effects */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-400 rounded-full"
            animate={{
              opacity: isHovered ? [0.3, 0.7, 0.3] : 0,
              scaleY: isHovered ? [0.8, 1.3, 0.8] : 0.8,
            }}
            transition={{
              duration: 1.6,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              delay: 0.2,
            }}
          />

          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-full"
            animate={{
              opacity: isHovered ? [0.3, 0.7, 0.3] : 0,
              scaleY: isHovered ? [0.8, 1.3, 0.8] : 0.8,
            }}
            transition={{
              duration: 1.6,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              delay: 0.6,
            }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
