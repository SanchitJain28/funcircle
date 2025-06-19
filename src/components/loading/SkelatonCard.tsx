import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  const [shimmer, setShimmer] = useState(false);
  
  useEffect(() => {
    // Toggle shimmer effect every 2 seconds
    const interval = setInterval(() => {
      setShimmer(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={cn(
      "flex flex-col p-3 space-y-4 bg-gradient-to-br from-[#18181a] to-[#131315] rounded-xl border border-[#222224] shadow-lg",
      className
    )}>
      {/* Image placeholder with shimmer effect */}
      <div className="relative overflow-hidden rounded-lg">
        <Skeleton 
          className={cn(
            "h-[140px] w-full rounded-lg bg-gradient-to-r from-[#1a1a1c] via-[#222224] to-[#1a1a1c] transition-all duration-1000 ease-in-out",
            shimmer && "bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
          )} 
        />
        <div className="absolute top-3 right-3">
          <Skeleton className="h-7 w-7 rounded-full bg-[#2a2a2c]" />
        </div>
      </div>
      
      {/* Text content placeholders */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-[85%] rounded-md bg-[#2a2a2c]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[65%] rounded-md bg-[#252527]" />
          <Skeleton className="h-4 w-[40%] rounded-md bg-[#252527]" />
        </div>
      </div>
      
      {/* Action buttons placeholders */}
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-8 w-20 rounded-md bg-[#2a2a2c]" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8 rounded-md bg-[#2a2a2c]" />
          <Skeleton className="h-8 w-8 rounded-md bg-[#2a2a2c]" />
        </div>
      </div>
    </div>
  );
}