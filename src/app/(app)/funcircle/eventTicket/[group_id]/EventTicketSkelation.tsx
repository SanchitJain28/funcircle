"use client";

import React from "react";

// Skeleton for individual date tab
function DateTabSkeleton() {
  return (
    <div className="flex flex-col items-center px-5 py-3 rounded-xl bg-[#1a1a1c] min-w-[90px] animate-pulse">
      <div className="w-6 h-6 bg-zinc-700 rounded mb-1"></div>
      <div className="w-8 h-4 bg-zinc-700 rounded mb-1"></div>
      <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></div>
    </div>
  );
}

// Skeleton for date tabs section
function DateTabsSkeleton() {
  return (
    <div className="pt-4 px-4">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-purple-400/30 rounded mr-2"></div>
        <div className="w-24 h-6 bg-zinc-700 rounded animate-pulse"></div>
      </div>
      <div className="overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <DateTabSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Skeleton for time switch section
function TimeSwitchSkeleton() {
  return (
    <div className="border-t border-b border-zinc-800/50 mt-6 py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-purple-400/30 rounded"></div>
          <div className="w-32 h-5 bg-zinc-700 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <div className="w-20 h-4 bg-zinc-700 rounded mb-2 animate-pulse"></div>
            <div className="w-12 h-6 bg-zinc-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for individual ticket card
function TicketCardSkeleton() {
  return (
    <div className="bg-[#1a1a1c] rounded-xl overflow-hidden shadow-md border border-zinc-800/50 animate-pulse">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="w-16 h-6 bg-purple-500/20 rounded"></div>
          <div className="w-20 h-6 bg-red-500/20 rounded"></div>
        </div>
        <div className="w-3/4 h-6 bg-zinc-700 rounded mb-2"></div>
        <div className="flex items-center mb-3">
          <div className="w-4 h-4 bg-zinc-600 rounded mr-1"></div>
          <div className="w-2/3 h-4 bg-zinc-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for tickets list section
function TicketsListSkeleton() {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-purple-400/30 rounded mr-2"></div>
          <div className="w-32 h-6 bg-zinc-700 rounded animate-pulse"></div>
        </div>
        <div className="w-16 h-6 bg-purple-500/10 border border-purple-500/30 rounded animate-pulse"></div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <TicketCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

// Main skeleton component
export default function EventTicketSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f0f11]">
      {/* Date Tabs Skeleton */}
      <DateTabsSkeleton />

      {/* Time Switch Skeleton */}
      <TimeSwitchSkeleton />

      {/* Tickets List Skeleton */}
      <TicketsListSkeleton />
    </div>
  );
}
