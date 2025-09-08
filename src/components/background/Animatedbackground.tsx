"use client"

import type * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimatedGradientBackgroundProps = {
  className?: string
  children?: React.ReactNode
  intensity?: number // 0..1 multiplier for blob opacity
  speed?: number // base duration in seconds for animations
}

/**
 * AnimatedGradientBackground
 * - GTA V–style drifting blurred color blobs
 * - Uses Framer Motion for smooth, infinite animations
 * - Respects prefers-reduced-motion
 *
 * Colors (max 5 total):
 * • Primary: Teal (#14b8a6)
 * • Accent 1: Pink (#ec4899)
 * • Accent 2: Amber (#f59e0b)
 * • Neutrals: Near-black background (#0b0f14) and white for content
 */
export function AnimatedGradientBackground({
  className,
  children,
  intensity = 1,
  speed = 26,
}: AnimatedGradientBackgroundProps) {
  const reduce = useReducedMotion()

  // Helper to compute opacity with intensity, clamped
  const opa = (v: number) => Math.max(0, Math.min(1, v * intensity))

  // Shared transition for looping keyframes
  const loop = (duration: number) => ({
    duration,
    ease: "easeInOut" as const,
    repeat: Number.POSITIVE_INFINITY ,
    repeatType: "mirror" as const,
  })

  // If reduced motion is requested, render static blobs (no animation)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animateOrStatic = (value: any) => (reduce ? undefined : value)

  return (
    <div className={cn("relative isolate min-h-dvh w-full overflow-hidden", "bg-[#0b0f14]", className)}>
      {/* Background vignette to frame content */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 50% 100%, rgba(0,0,0,0.45), transparent 60%), radial-gradient(1000px 600px at 0% 0%, rgba(0,0,0,0.35), transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Blob Layer: Teal (Primary) */}
      <motion.div
        className="pointer-events-none absolute z-0"
        style={{
          width: "60vw",
          height: "60vw",
          minWidth: 520,
          minHeight: 520,
          top: "-10vh",
          left: "-10vw",
          borderRadius: "50%",
          backgroundColor: "#14b8a6",
          filter: "blur(70px)",
          opacity: opa(0.35),
          mixBlendMode: "screen",
        }}
        animate={animateOrStatic({
          x: ["0vw", "14vw", "8vw", "18vw", "6vw"],
          y: ["0vh", "10vh", "22vh", "8vh", "0vh"],
          rotate: [0, 25, -10, 15, 0],
        })}
        transition={loop(speed)}
        aria-hidden="true"
      />

      {/* Blob Layer: Pink (Accent 1) */}
      <motion.div
        className="pointer-events-none absolute z-0"
        style={{
          width: "55vw",
          height: "55vw",
          minWidth: 460,
          minHeight: 460,
          top: "20vh",
          right: "-15vw",
          borderRadius: "50%",
          backgroundColor: "#ec4899",
          filter: "blur(80px)",
          opacity: opa(0.28),
          mixBlendMode: "screen",
        }}
        animate={animateOrStatic({
          x: ["0vw", "-8vw", "-16vw", "-6vw", "0vw"],
          y: ["0vh", "6vh", "-4vh", "10vh", "0vh"],
          rotate: [0, -15, 10, -20, 0],
        })}
        transition={loop(speed * 1.15)}
        aria-hidden="true"
      />

      {/* Blob Layer: Amber (Accent 2) */}
      <motion.div
        className="pointer-events-none absolute z-0"
        style={{
          width: "70vw",
          height: "70vw",
          minWidth: 560,
          minHeight: 560,
          bottom: "-20vh",
          left: "10vw",
          borderRadius: "50%",
          backgroundColor: "#f59e0b",
          filter: "blur(90px)",
          opacity: opa(0.22),
          mixBlendMode: "screen",
        }}
        animate={animateOrStatic({
          x: ["0vw", "10vw", "0vw", "-6vw", "0vw"],
          y: ["0vh", "-8vh", "6vh", "-4vh", "0vh"],
          rotate: [0, 12, -8, 6, 0],
        })}
        transition={loop(speed * 0.9)}
        aria-hidden="true"
      />

      {/* Optional subtle noise for texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url(/placeholder.svg?height=800&width=1200&query=subtle%20noise%20texture)",
          backgroundSize: "cover",
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />

      {/* Foreground content container */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default AnimatedGradientBackground
