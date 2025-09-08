"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Phone, ArrowLeft, CheckCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountDown from "@/components/Funcircle-signup/CountDown";
import { VerifyOTP } from "@/components/Funcircle-signup/VerifyOtp";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const supabase = createClient();

export default function SignUpComponent() {
  const { user } = useAuth();
  const searchparams = useSearchParams();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const redirectLink = searchparams.get("redirect")
    ? encodeURIComponent(String(searchparams.get("redirect")))
    : "/play";

  const [formData, setFormData] = useState({
    phone: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
  });

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    } else {
      newErrors.phone = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOTPChange = (otp: string) => {
    setOtp(otp);
  };

  // SETUP RECAPTCHA
  const setupRecaptcha = () => {
    // Create new recaptcha instance
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          setIsDialogOpen(true);
        },
      }
    );
    window.recaptchaVerifier.render(); // This is needed when using "invisible"
  };

  // SEND OTP
  const sendOTP = async () => {
    if (otpSent) {
      setIsDialogOpen(true);
      return;
    }
    console.log(window.recaptchaVerifier);

    if (!window.recaptchaVerifier) {
      setupRecaptcha();
    }

    setIsSendingOtp(true);

    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("reCAPTCHA not initialized");
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        "+91" + formData.phone,
        appVerifier
      );

      setConfirmationResult(confirmation);
      setIsDialogOpen(true);

      toast.success("OTP sent to your phone", {
        autoClose: 2000,
        position: "bottom-center",
        className: "bg-green-600 text-white",
      });

      setOtpSent(true);
    } catch (err) {
      console.error("Error sending SMS:", err);
      toast.error("Error sending OTP. Please try again.", {
        autoClose: 2000,
        position: "bottom-center",
        className: "bg-red-600 text-white",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  // VERIFY OTP
  const verifyOTP = async () => {
    if (!confirmationResult || !otp) {
      toast.error("Please enter the OTP", {
        position: "bottom-center",
      });
      return false;
    }

    try {
      setIsVerifying(true);
      const { user } = await confirmationResult.confirm(otp);

      if (searchparams.get("cp") === "false") {
        router.replace(redirectLink);
        return true;
      }

      const redirection = await CheckForRedirection(user.uid);

      if (redirection) {
        router.replace(redirection + `?redirect=${redirectLink}`);
        setVerified(true);
        setIsDialogOpen(false);
        return true;
      }

      router.replace(redirectLink);
      return true;
    } catch (err) {
      toast.error("Invalid OTP. Please try again.", {
        position: "bottom-center",
      });
      console.error("OTP verification error:", err);
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        console.log("TRIGGERED");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const CheckForRedirection = async (user_id: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("usersetlevel")
        .eq("user_id", user_id)
        .single();

      if (error) {
        console.log(error);
        return "/complete-profile";
      }
      //PROFILE EXISTS
      if (data) {
        //LEVEL ALSO EXISTS
        if (data.usersetlevel) {
          //NO REDIRECTION
          return false;
        }

        //LEVEL DON'T EXIST
        return "/assign-level";
      }

      //PROFILE DOES NOT EXIST WITH THE USER ID
      return "/complete-profile";
    } catch (error) {
      console.log(error);
      // throw error;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (user) {
    router.push("/play");
    return;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="h-8 w-8 text-white" />
          </div>
          {/* <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1> */}
          <p className="text-gray-400">
            Join Fun Circle and start booking events
          </p>
        </div>
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center mb-2">
              <CardTitle className="text-white text-lg font-semibold">
                Your Information
              </CardTitle>
              <Separator className="flex-1 ml-4 bg-gray-700" />
            </div>
            <CardDescription className="text-gray-400">
              We will send you a verification code to confirm your number
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-6"
            >
              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 flex items-center">
                    <span className="text-gray-400 text-sm">+91</span>
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-600 text-white pl-12 h-12 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="Enter your 10-digit phone number"
                    disabled={verified}
                  />
                  {verified && (
                    <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone}</p>
                )}
              </div>

              <div id="recaptcha-container" className="invisible" />

              {/* Submit Button */}
              <div className="">
                <Button
                  type="submit"
                  onClick={() => {
                    if (validateForm()) {
                      sendOTP();
                    }
                  }}
                  disabled={verified}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-3"
                >
                  {verified
                    ? "Verified"
                    : otpSent
                      ? isVerifying
                        ? "Verifying OTP..."
                        : "Verify OTP"
                      : isSendingOtp
                        ? "Sending OTP..."
                        : "Send OTP"}
                </Button>
                {!verified && (
                  <CountDown
                    onStatusChange={(e) => {
                      console.log(e);
                      setOtpSent(e);
                    }}
                    start={otpSent}
                    onEnd={(e) => {
                      setOtpSent(e);
                    }}
                  />
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <VerifyOTP
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onOTPChange={handleOTPChange}
        onVerify={verifyOTP}
        isVerifying={isVerifying}
      />
    </div>
  );
}
