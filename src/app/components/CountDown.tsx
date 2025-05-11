"use client"

import React, { useRef, useState, useEffect } from "react"
import Countdown from "react-countdown"
import Cookies from "js-cookie"
import { Clock, Send } from "lucide-react"

interface CountdownProps {
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

export default function CountDown({
  onEnd,
  onStatusChange,
  start,
}: {
  onEnd: (result: boolean) => void
  onStatusChange?: (isActive: boolean) => void
  start: boolean
}) {
  const hasEnded = useRef(false)
  const [targetDate, setTargetDate] = useState<number | null>(null)

  const setInStorage = (date: number) => {
    Cookies.set("ResendOTPCountdown", JSON.stringify(date), { expires: 7 })
  }

  useEffect(() => {
    const cookieValue = Cookies.get("ResendOTPCountdown")
    const savedDate = cookieValue ? JSON.parse(cookieValue) : null

    if (savedDate && savedDate > Date.now()) {
      setTargetDate(savedDate)
      onStatusChange?.(true)
    } else if (start) {
      const newDate = Date.now() + 60000
      setInStorage(newDate)
      setTargetDate(newDate)
      hasEnded.current = false
      onStatusChange?.(true)
    } else {
      setTargetDate(null)
      onStatusChange?.(false)
    }
  }, [start])

  const renderer = ({ minutes, seconds, completed }: CountdownProps) => {
    if (completed) {
      if (!hasEnded.current) {
        hasEnded.current = true
        onEnd(true)
        onStatusChange?.(false)
        Cookies.remove("ResendOTPCountdown")
      }

      return (
        <button
          className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium text-white hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
          aria-label="Send OTP"
        >
          <span className="relative flex w-full items-center justify-center gap-2 rounded-md bg-white px-5 py-3 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            <Send className="h-5 w-5 text-blue-600 group-hover:text-white" />
            <span className="text-blue-600 group-hover:text-white">Send OTP</span>
          </span>
        </button>
      )
    }

    const totalSeconds = minutes * 60 + seconds
    const maxSeconds = 60
    const progress = (totalSeconds / maxSeconds) * 100

    return (
      <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div
          className="absolute left-0 top-0 h-full bg-gray-100 dark:bg-gray-700"
          style={{ width: `${progress}%`, transition: "width 1s linear" }}
        />
        <div className="relative flex items-center justify-center gap-2 px-5 py-3">
          <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <p className="font-medium text-gray-700 dark:text-gray-300">
            Resend OTP in{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      {targetDate && <Countdown date={targetDate} renderer={renderer} />}
    </div>
  )
}
