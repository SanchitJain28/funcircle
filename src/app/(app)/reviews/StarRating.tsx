"use client";

import React, { useState } from "react";
import { Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  isSubmittingReview?: boolean;
}

export function StarRating({
  initialRating = 0,
  onRatingChange,
  readonly = false,
  size = "md",
  loading = false,
  isSubmittingReview = false,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [pendingRating, setPendingRating] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (value: number) => {
    if (readonly) return;
    setPendingRating(value);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setRating(pendingRating);
    onRatingChange?.(pendingRating);
    setShowConfirm(false);
    setPendingRating(0);
  };

  const handleCancel = () => {
    setPendingRating(0);
    setShowConfirm(false);
    setHoverRating(0);
  };

  const handleMouseEnter = (value: number) => {
    if (readonly) return;
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    if (!showConfirm) {
      setHoverRating(0);
    }
  };

  const displayRating = showConfirm ? pendingRating : hoverRating || rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {loading && <div className="loader" />}
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          return (
            <button
              key={star}
              type="button"
              className={cn(
                "transition-colors duration-200",
                !readonly && "hover:scale-110 cursor-pointer",
                readonly && "cursor-default"
              )}
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly || showConfirm}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors duration-200",
                  isFilled
                    ? "fill-[#8A36EB] text-[#8A36EB]"
                    : "fill-none text-gray-300 hover:text-[#8A36EB]"
                )}
              />
            </button>
          );
        })}
      </div>

      {showConfirm && !readonly && (
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={handleConfirm}
            className="p-1 rounded-full bg-[#8A36EB] text-white hover:bg-[#7A2DD8] transition-colors duration-200"
            title="Confirm rating"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 rounded-full bg-gray-300 text-gray-600 hover:bg-gray-400 transition-colors duration-200"
            title="Cancel"
          >
            <span className="w-3 h-3 flex items-center justify-center text-xs font-bold">
              ×
            </span>
          </button>
        </div>
      )}

      {isSubmittingReview && (
        <div className="text-sm text-gray-500 italic">Submitting...</div>
      )}
    </div>
  );
}
