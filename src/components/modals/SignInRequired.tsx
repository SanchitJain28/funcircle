"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone } from "lucide-react";
import React, { useEffect } from "react";
export default function SignInRequired({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}) {
  useEffect(() => {}, []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-black border-orange-500 border-2 rounded-2xl p-6 sm:p-8">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center text-2xl sm:text-3xl font-bold text-white">
            Please Sign In
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-8 py-4">
          <div className="flex items-center justify-center space-x-3 text-orange-400">
            <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="text-lg sm:text-xl font-medium">
              Sign in with phone number
            </span>
          </div>

          <Link href="/sign-up" className="w-full">
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-black font-bold py-4 sm:py-5 text-lg sm:text-xl rounded-xl transition-all duration-200 touch-manipulation"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
