"use client"

import React from "react"
import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
}

export default function LoadingOverlay({ isVisible, message = "Loading..." }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="bg-[#1a1a1c] p-6 rounded-xl flex flex-col items-center max-w-xs w-full">
        <Loader2 className="h-10 w-10 text-white animate-spin mb-4" />
        <p className="text-white text-center font-medium">{message}</p>
      </div>
    </div>
  )
}
