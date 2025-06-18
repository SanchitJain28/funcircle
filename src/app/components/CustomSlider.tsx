"use client"
import React, { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface CustomSliderProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const CustomSlider = ({ value, onChange, className }: CustomSliderProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Define the discrete values - now starting from 2 with 5 levels
  const steps = [2, 4, 6, 8, 10]
  
  // Find the closest step to a given value
  const findClosestStep = (inputValue: number) => {
    return steps.reduce((prev, curr) => (Math.abs(curr - inputValue) < Math.abs(prev - inputValue) ? curr : prev))
  }

  // Ensure value is within valid range and snap to closest step
  const validValue = steps.includes(value) ? value : findClosestStep(Math.max(2, Math.min(10, value)))

  // Convert value to percentage for positioning (adjusted for new range)
  const valueToPercentage = (val: number) => ((val - 2) / 8) * 100

  // Convert mouse position to value
  const positionToValue = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return validValue

      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
      const rawValue = (percentage / 100) * 8 + 2 // Scale to 2-10 range

      return findClosestStep(rawValue)
    },
    [validValue],
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const newValue = positionToValue(e.clientX)
    onChange(newValue)
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const newValue = positionToValue(e.clientX)
      onChange(newValue)
    },
    [isDragging, positionToValue, onChange],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add global mouse events
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleStepClick = (step: number) => {
    onChange(step)
  }

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const touch = e.touches[0]
    const newValue = positionToValue(touch.clientX)
    onChange(newValue)
  }

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const touch = e.touches[0]
      const newValue = positionToValue(touch.clientX)
      onChange(newValue)
    },
    [isDragging, positionToValue, onChange],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add global touch events
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)
      return () => {
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isDragging, handleTouchMove, handleTouchEnd])

  return (
    <div className={cn("w-full px-2", className)}>
      <div className="relative">
        {/* Main slider track */}
        <div
          ref={sliderRef}
          className="relative h-3 bg-gray-700 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Active track */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${valueToPercentage(validValue)}%` }}
          />

          {/* Step markers */}
          {steps.map((step) => (
            <button
              key={step}
              className={cn(
                "absolute top-1/2 w-4 h-4 rounded-full border-2 -translate-y-1/2 -translate-x-1/2 transition-all duration-200 hover:scale-110 z-10",
                step <= validValue
                  ? "bg-white border-purple-500 shadow-lg"
                  : "bg-gray-600 border-gray-500 hover:border-gray-400 hover:bg-gray-500",
              )}
              style={{ left: `${valueToPercentage(step)}%` }}
              onClick={() => handleStepClick(step)}
            />
          ))}

          {/* Slider thumb */}
          <div
            className={cn(
              "absolute top-1/2 w-6 h-6 bg-white border-4 border-purple-500 rounded-full shadow-xl -translate-y-1/2 -translate-x-1/2 transition-all duration-300 cursor-grab z-20",
              isDragging && "cursor-grabbing scale-125 shadow-2xl border-purple-400",
            )}
            style={{ left: `${valueToPercentage(validValue)}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        </div>

        {/* Step labels */}
        <div className="flex justify-between mt-6 px-1">
          {steps.map((step) => (
            <button
              key={step}
              className={cn(
                "flex flex-col items-center space-y-1 transition-all duration-200 px-2 py-1 rounded-lg hover:bg-gray-800/50",
                step === validValue ? "text-purple-400" : "text-gray-400 hover:text-gray-300",
              )}
              onClick={() => handleStepClick(step)}
            >
              <span
                className={cn(
                  "text-sm font-bold transition-all duration-200",
                  step === validValue ? "text-purple-400 scale-110" : "text-gray-400",
                )}
              >
                {step}
              </span>
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-200",
                  step === validValue ? "text-purple-300" : "text-gray-500",
                )}
              >
                {/* {levelLabels[index]} */}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomSlider