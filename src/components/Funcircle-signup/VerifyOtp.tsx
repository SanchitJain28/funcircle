"use client";

import React from "react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

interface VerifyOTPProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOTPChange: (otp: string) => void;
  onVerify?: (otp: string) => Promise<boolean>;
  isVerifying: boolean;
}

export function VerifyOTP({
  isOpen,
  onOpenChange,
  onOTPChange,
  onVerify,
  isVerifying,
}: VerifyOTPProps) {
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Track OTP value and call onOTPChange when it changes
  const otpValue = form.watch("pin");

  useEffect(() => {
    onOTPChange(otpValue);
  }, [otpValue, onOTPChange]);

  // Reset verification state when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsVerificationComplete(false);
    }
  }, [isOpen]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (onVerify) {
      const isCorrect = await onVerify(data.pin);
      // Set verification complete after onVerify is called
      if (isCorrect) {
        setIsVerificationComplete(true);
        // Auto close after showing success for 2 seconds
        setTimeout(() => {
          onOpenChange(false);
        }, 1500);
        return
      }
      
    } else {
      onOpenChange(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-black border border-gray-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            {isVerificationComplete ? "Verification Complete" : "Verify OTP"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            {isVerificationComplete
              ? "Your identity has been successfully verified."
              : "Please enter the one-time password sent to your phone."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isVerificationComplete ? (
          <div className="flex flex-col items-center justify-center py-6">
            <CheckCircle className="w-16 h-16 text-purple-500 mb-4" />
            <p className="text-white text-center">Verification successful!</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field} className="gap-2">
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                          <InputOTPSlot
                            index={1}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                          <InputOTPSlot
                            index={2}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                          <InputOTPSlot
                            index={3}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                          <InputOTPSlot
                            index={4}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                          <InputOTPSlot
                            index={5}
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                  disabled={isVerifying}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isVerifying || otpValue.length < 6}
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
