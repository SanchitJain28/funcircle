"use client";

import React from "react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  onVerify?: (otp: string) => void;
  isVerifying:boolean
}

export function VerifyOTP({
  isOpen,
  onOpenChange,
  onOTPChange,
  onVerify,
  isVerifying,
}: VerifyOTPProps) {
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (onVerify) {
      onVerify(data.pin);
    }
    
    onOpenChange(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-black border border-gray-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Verify OTP</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Please enter the one-time password sent to your phone.
          </AlertDialogDescription>
        </AlertDialogHeader>
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
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isVerifying?"Verifying":"verify"}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
