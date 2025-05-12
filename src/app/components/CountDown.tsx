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
          className="relative flex w-full items-center justify-center rounded-md bg-[#9333EA] py- px-5 font-medium text-white transition-all hover:bg-[#7E22CE] focus:outline-none focus:ring-2 focus:ring-[#9333EA] focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Resend OTP"
        >
          <span className="flex items-center justify-center gap-2">
            <Send className="h-5 w-5" />
            <span>Resend OTP</span>
          </span>
        </button>
      )
    }

    const totalSeconds = minutes * 60 + seconds
    const maxSeconds = 60
    const progress = (totalSeconds / maxSeconds) * 100

    return (
      <div className="relative w-full overflow-hidden rounded-md bg-black/40 border border-[#9333EA]/30 shadow-sm">
        <div
          className="absolute left-0 top-0 h-full bg-[#9333EA]/30"
          style={{ width: `${progress}%`, transition: "width 1s linear" }}
        />
        <div className="relative flex items-center justify-center gap-2 px-5 py-[7px]">
          <Clock className="h-5 w-5 text-[#9333EA]" />
          <p className="font-medium text-gray-200">
            Resend OTP in{" "}
            <span className="font-bold text-[#9333EA]">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>
        </div>
      </div>
    )
  }

  return <div className="w-full">{targetDate && <Countdown date={targetDate} renderer={renderer} />}</div>
}
