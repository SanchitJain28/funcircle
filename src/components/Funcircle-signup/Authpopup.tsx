"use client";

import React from "react";
// import { useState } from "react"
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string;
}

export default function AuthPopup({ isOpen, onClose }: AuthPopupProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ID = searchParams.get("id");
  const router = useRouter();
  //   const [isLoading, setIsLoading] = useState(false)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-auto animate-in fade-in-0 zoom-in-95 duration-300">
        <Card className="border-0 shadow-2xl bg-white dark:bg-gray-900">
          <CardHeader className="relative pb-4">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <User className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">
                Join the Event
              </CardTitle>
              {/* <CardDescription className="text-sm">
                Sign in or create an account to book Ticket
              </CardDescription> */}
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <div className="space-y-4">
              {/* <Button
                onClick={() => {
                  // Redirect to sign in page
                  window.location.href = "/signin";
                  onClose();
                }}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium text-base"
              >
                Sign In
              </Button> */}

              <Button
                onClick={() => {
                  // Redirect to sign up page
                  console.log(pathname);
                  router.push(
                    ID
                      ? `/sign-up?redirect=${encodeURIComponent(pathname + `?id=${ID}`)}`
                      : `/sign-up?redirect=${encodeURIComponent(pathname)}`
                  );
                  onClose();
                }}
                variant="outline"
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium text-base"
              >
                Sign In with Phone number
              </Button>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  To continue booking your ticket
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
