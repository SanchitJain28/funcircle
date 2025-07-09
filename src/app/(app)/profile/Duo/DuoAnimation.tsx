"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Trophy } from "lucide-react";

interface DuoAnimationProps {
  onOpen: boolean;
  partnerName: string;
  onClose?: () => void;
}

export default function DuoAnimation({
  onOpen,
  partnerName,
  onClose,
}: DuoAnimationProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const sportsEmojis = [
    "⚽",
    "🏀",
    "🎾",
    "🏐",
    "🏈",
    "⚾",
    "🏓",
    "🏸",
    "🥎",
    "🏑",
  ];

  useEffect(() => {
    if (onOpen) {
      console.log("I am triggered now");
      setShowAnimation(true);
      console.log("TRIGGERED");
      const timer = setTimeout(() => {
        setShowAnimation(false);
        onClose?.();
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowAnimation(false);
    }
  }, [onOpen, onClose]);

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          {/* Floating Sports Emojis */}
          {sportsEmojis.map((emoji, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl"
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0.8],
                x:
                  Math.cos(
                    (((index * 360) / sportsEmojis.length) * Math.PI) / 180
                  ) * 200,
                y:
                  Math.sin(
                    (((index * 360) / sportsEmojis.length) * Math.PI) / 180
                  ) * 200,
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              {emoji}
            </motion.div>
          ))}

          {/* Main Card */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              className="relative z-10"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🎉 Duo Formed! 🎉
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                You are now a duo with
              </p>
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-2xl font-bold text-blue-600 mb-6"
              >
                {partnerName}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center space-x-4 relative z-10"
            >
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Ready to compete!
                </span>
              </div>
            </motion.div>

            {/* Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + i * 0.2,
                  repeat: 1,
                }}
              />
            ))}
          </motion.div>

          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 border-4 border-green-400 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
