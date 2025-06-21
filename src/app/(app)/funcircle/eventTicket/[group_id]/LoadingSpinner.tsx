import { Loader2 } from 'lucide-react'
import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
      <div className="bg-[#1a1a1c] p-8 rounded-2xl flex flex-col items-center max-w-xs w-full shadow-lg border border-purple-500/20">
        <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
        <p className="text-white text-center font-medium text-lg">
          Loading Events
        </p>
        <p className="text-zinc-400 text-center text-sm mt-2">
          Please wait while we fetch your events
        </p>
      </div>
    </div>
  )
}
