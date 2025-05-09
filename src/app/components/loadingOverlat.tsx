import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center transition-all duration-300 animate-in fade-in">
      <div className="relative bg-card border shadow-lg rounded-xl p-8 max-w-md w-full mx-4 flex flex-col items-center space-y-6">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-pulse"></div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Processing Payment</h2>
          <p className="text-muted-foreground text-sm">
            Please wait while we securely process your payment...
          </p>
        </div>

        <div className="w-full bg-secondary rounded-full h-1.5 mt-4">
          <div
            className="bg-primary h-1.5 rounded-full animate-[pulse_2s_ease-in-out_infinite]"
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-6">
        Your transaction is being processed securely
      </p>
    </div>
  );
}
