"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ChevronRight } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface BottomFixedBarProps {
  count: number;
  total: number;
  onConfirm: (value: number, type: string) => void;
}

interface PriceDisplayProps {
  amount: number | string;
  subtitle: string;
  additionalInfo?: string;
}

interface ConfirmButtonProps {
  onClick: () => void;
  disabled?: boolean;
  count: number;
}

// Reusable price display component
function PriceDisplay({ amount, subtitle, additionalInfo }: PriceDisplayProps) {
  return (
    <div className="flex flex-col">
      <p className="font-sans text-xl font-bold text-white">
        {typeof amount === "number" ? `₹${amount}` : amount}
      </p>
      {additionalInfo && (
        <p className="font-sans text-sm font-medium text-yellow-400 mb-1">
          {additionalInfo}
        </p>
      )}
      <p className="font-sans text-sm text-zinc-400">{subtitle}</p>
    </div>
  );
}

// Reusable confirm button component
function ConfirmButton({
  onClick,
  disabled = false,
  count,
}: ConfirmButtonProps) {
  if (count === 0) return null;

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 bg-[#8338EC] hover:bg-[#7209b7] disabled:bg-zinc-600 disabled:cursor-not-allowed transition-all duration-200 px-6 py-3 rounded-lg text-white font-semibold text-lg h-auto"
      aria-label={`Confirm ${count} spot${count > 1 ? "s" : ""}`}
    >
      CONFIRM SPOT
      <ChevronRight className="h-5 w-5" />
    </Button>
  );
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="flex bg-[#131315]/95 backdrop-blur-md items-center border-t border-zinc-700 text-white w-full justify-between px-6 py-4 fixed bottom-0 shadow-lg z-10">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-20 bg-zinc-700/50" />
        <Skeleton className="h-4 w-24 bg-zinc-700/30" />
      </div>
      <Skeleton className="h-12 w-36 bg-zinc-700/50 rounded-lg" />
    </div>
  );
}

// Main container component
function BottomBarContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex bg-[#131315]/95 backdrop-blur-md items-center border-t border-zinc-700 text-white w-full justify-between px-6 py-4 fixed bottom-0 shadow-lg z-10"
      role="complementary"
      aria-label="Order summary and confirmation"
    >
      {children}
    </div>
  );
}

export default function BottomFixedBar({
  count,
  total,
  onConfirm,
}: BottomFixedBarProps) {
  const { profile, isProfilePending } = useAuth();

  // Move useState and useEffect to the top, before any conditional returns
  const [isSubscriptionUsed, setIsSubscriptionUsed] = useState(
    profile?.subject?.isUsed
  );

  useEffect(() => {
    setIsSubscriptionUsed(profile?.subject?.isUsed);
  }, [profile]);

  // Loading state - now placed after all hooks
  if (isProfilePending) {
    return <LoadingSkeleton />;
  }

  const hasActiveSubscription = profile?.subject?.subscription;

  // Subscription active and unused
  if (hasActiveSubscription && !isSubscriptionUsed) {
    return (
      <BottomBarContainer>
        <div className="flex flex-col">
          <PriceDisplay
            amount="₹0 - using subscription pass"
            subtitle="Total amount"
          />
          {/* <div className="flex items-center gap-2 mt-2">
            <input
              type="radio"
              id="useSubscription"
              name="paymentMethod"
              checked={!isSubscriptionUsed}
              onChange={() => setIsSubscriptionUsed(false)}
              className="w-4 h-4 text-[#8338EC] border-zinc-400 focus:ring-[#8338EC] focus:ring-2"
            />
            <label
              htmlFor="useSubscription"
              className="text-sm text-zinc-300 cursor-pointer"
            >
              Use subscription pass
            </label>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="radio"
              id="payNormal"
              name="paymentMethod"
              checked={isSubscriptionUsed}
              onChange={() => setIsSubscriptionUsed(true)}
              className="w-4 h-4 text-[#8338EC] border-zinc-400 focus:ring-[#8338EC] focus:ring-2"
            />
            <label
              htmlFor="payNormal"
              className="text-sm text-zinc-300 cursor-pointer"
            >
              Pay ₹{total} instead
            </label>
          </div> */}
        </div>

        <ConfirmButton
          onClick={() => {
            onConfirm(0, "subscription");
          }}
          count={count}
        />
      </BottomBarContainer>
    );
  }

  // Subscription active but used
  if (hasActiveSubscription && isSubscriptionUsed) {
    return (
      <BottomBarContainer>
        <PriceDisplay
          amount={total}
          subtitle="Total amount"
          additionalInfo="Daily game session used (1/1)"
        />
        <ConfirmButton
          onClick={() => {
            onConfirm(total, "normal");
          }}
          count={count}
        />
      </BottomBarContainer>
    );
  }

  // Default state - no subscription or subscription inactive
  return (
    <BottomBarContainer>
      <PriceDisplay amount={total} subtitle="Total amount" />
      <ConfirmButton onClick={() => onConfirm(total, "normal")} count={count} />
    </BottomBarContainer>
  );
}
