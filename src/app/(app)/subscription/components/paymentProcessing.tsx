"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { CreditCard } from "lucide-react";
interface PaymentProcessingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentProcessingModal({
  isOpen,
  onOpenChange,
}: PaymentProcessingModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-center justify-center">
            <CreditCard className="h-6 w-6 text-blue-600" />
            Processing Payment
          </DialogTitle>
          <DialogDescription className="text-center">
            Please wait while we process your payment securely.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <div className="relative">
              <Progress value={progress} className="h-2 bg-gray-200" />
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #3b82f6, #1d4ed8, #2563eb)",
                  boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                }}
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Processing...</span>
              <span className="font-medium text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
