"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Bell,
  X,
} from "lucide-react";
import Link from "next/link";

type AlertVariant = "success" | "warning" | "danger" | "info" | "default";

interface AlertProps {
  variant: AlertVariant;
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-800",
    messageColor: "text-green-700",
    closeColor: "text-green-600 hover:text-green-800",
    progressColor: "bg-green-500",
    shadowColor: "shadow-green-100",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-800",
    messageColor: "text-yellow-700",
    closeColor: "text-yellow-600 hover:text-yellow-800",
    progressColor: "bg-yellow-500",
    shadowColor: "shadow-yellow-100",
  },
  danger: {
    icon: XCircle,
    bgColor: "bg-gradient-to-r from-red-50 to-rose-50 border-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-800",
    messageColor: "text-red-700",
    closeColor: "text-red-600 hover:text-red-800",
    progressColor: "bg-red-500",
    shadowColor: "shadow-red-100",
  },
  info: {
    icon: Info,
    bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-800",
    messageColor: "text-blue-700",
    closeColor: "text-blue-600 hover:text-blue-800",
    progressColor: "bg-blue-500",
    shadowColor: "shadow-blue-100",
  },
  default: {
    icon: Bell,
    bgColor: "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200",
    iconColor: "text-gray-600",
    titleColor: "text-gray-800",
    messageColor: "text-gray-700",
    closeColor: "text-gray-600 hover:text-gray-800",
    progressColor: "bg-gray-500",
    shadowColor: "shadow-gray-100",
  },
};

const positionClasses = {
  "top-right": "fixed top-4 right-4 z-50",
  "top-left": "fixed top-4 left-4 z-50",
  "bottom-right": "fixed bottom-4 right-4 z-50",
  "bottom-left": "fixed bottom-4 left-4 z-50",
  "top-center": "fixed top-4 left-1/2 transform -translate-x-1/2 z-50",
  "bottom-center": "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50",
};

export function CustomAlert({
  variant,
  title,
  message,
  isVisible,
  onClose,
  autoClose = false,
  autoCloseDelay = 3000,
  position = "top-right",
}: AlertProps) {
  const config = alertConfig[variant];
  const IconComponent = config.icon;
  const progressRef = useRef<HTMLDivElement>(null);

  // Auto close functionality
  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible, onClose, autoCloseDelay]);

  // Animation variants for different positions
  const getAnimationVariants = () => {
    const isTop = position.includes("top");
    const isRight = position.includes("right");
    const isLeft = position.includes("left");
    const isCenter = position.includes("center");

    let initialX = 0;
    const initialY = isTop ? -100 : 100;

    if (isRight) initialX = 100;
    if (isLeft) initialX = -100;
    if (isCenter) initialX = 0;

    return {
      initial: {
        opacity: 0,
        x: initialX,
        y: initialY,
        scale: 0.8,
        rotate: isRight ? 10 : isLeft ? -10 : 0,
      },
      animate: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 300,
          duration: 0.6,
        },
      },
      exit: {
        opacity: 0,
        x: initialX * 0.5,
        y: initialY * 0.3,
        scale: 0.8,
        rotate: isRight ? 5 : isLeft ? -5 : 0,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      },
    };
  };

  const variants = getAnimationVariants();

  return (
    <Link href="/funcircle/eventTicket/90">
      <div className={positionClasses[position]}>
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`relative rounded-xl border backdrop-blur-sm p-5 shadow-xl ${config.bgColor} ${config.shadowColor} max-w-sm w-full overflow-hidden`}
              style={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent" />
              </div>

              <div className="relative flex items-start space-x-4">
                {/* Animated Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      damping: 12,
                      stiffness: 400,
                      delay: 0.1,
                    },
                  }}
                  className="flex-shrink-0"
                >
                  <div
                    className={`p-2 rounded-full bg-white/50 backdrop-blur-sm shadow-sm`}
                  >
                    <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2, duration: 0.4 },
                    }}
                    className={`text-sm font-semibold ${config.titleColor} leading-tight`}
                  >
                    {title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.3, duration: 0.4 },
                    }}
                    className={`mt-1 text-sm ${config.messageColor} leading-relaxed`}
                  >
                    {message}
                  </motion.p>
                </div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.4, duration: 0.3 },
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`${config.closeColor} transition-all duration-200 flex-shrink-0 p-1.5 rounded-full hover:bg-white/20 backdrop-blur-sm`}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Enhanced Progress bar for auto-close */}
              {autoClose && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 overflow-hidden">
                  <motion.div
                    ref={progressRef}
                    initial={{ scaleX: 1, opacity: 0.8 }}
                    animate={{
                      scaleX: 0,
                      transition: {
                        duration: autoCloseDelay / 1000,
                        ease: "linear",
                      },
                    }}
                    className={`h-full ${config.progressColor} origin-left shadow-sm`}
                    style={{
                      boxShadow: `0 0 10px ${config.progressColor.replace("bg-", "rgba(").replace("-500", ", 0.5)")}`,
                    }}
                  />
                </div>
              )}

              {/* Subtle shine effect */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{
                  x: "100%",
                  opacity: [0, 0.3, 0],
                  transition: {
                    duration: 1.5,
                    delay: 0.5,
                    ease: "easeInOut",
                  },
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}
