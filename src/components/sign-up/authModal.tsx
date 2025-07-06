"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone } from "lucide-react";
import React from "react";

interface AuthModalProps {
  redirectUrl?: string;
}

export default function AuthModal({ redirectUrl = "/" }: AuthModalProps) {
  const handleSignUp = () => {
    const signUpUrl = `/sign-up?redirect=${encodeURIComponent(redirectUrl)}`;
    window.location.href = signUpUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />

      {/* Modal content */}
      <Card className="relative w-full max-w-md mx-4 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>Please sign in to continue</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button onClick={handleSignUp} className="w-full" size="lg">
            Sign in with Phone Number
          </Button>

          <div className="text-xs text-gray-500 text-center mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
