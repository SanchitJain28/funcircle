"use client";

import type React from "react";
import { ConfirmationResult ,RecaptchaVerifier } from "firebase/auth";
import {  signInWithPhoneNumber } from "firebase/auth";
import { appContext } from "@/app/Contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  CreditCard,
  Loader2,
  MapPin,
  UserRound,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TicketDetails from "@/app/components/TicketDetails";
import { auth } from "@/lib/firebase";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export default function CheckoutPage() {
  // const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const context = useContext(appContext);
  console.log(auth)
  if (!context) {
    throw new Error(
      "appContext is null. Ensure the provider is wrapping the component."
    );
  }
  console.log(confirmationResult)

  const { order, setOrder } = context;
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  useEffect(() => {
    setLoading(true);
    try {
      if (!order) {
        const storedOrder = localStorage.getItem("ORDER");
        const order = storedOrder ? JSON.parse(storedOrder) : null;
        setOrder(order);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  console.log(order);

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
    }
  };

  const handleViewDetails = () => {
    toast({
      title: "Order Details",
      description: `${order?.quantity} tickets for a total of ₹${order?.total}`,
    });
  };

  

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: unknown) => {
            console.log("reCAPTCHA solved", response);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        }
      );
    }
  };

  const sendOTP = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier)
    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        "+919561079271",
        appVerifier
      );
      setConfirmationResult(confirmation);
      alert("OTP sent!");
    } catch (err) {
      console.error("Error sending SMS:", err);
    }
  };

  // const verifyOTP = async () => {
  //   if (!confirmationResult) return;

  //   try {
  //     const result = await confirmationResult.confirm(otp);
  //     const user = result.user;
  //     alert("Phone verified! User ID: " + user.uid);
  //   } catch (err) {
  //     alert("Invalid OTP");
  //     console.error("OTP verification error:", err);
  //   }
  // };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1c] p-8 rounded-2xl flex flex-col items-center max-w-xs w-full shadow-lg border border-purple-500/20">
          <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
          <p className="text-white text-center font-medium text-lg">
            Loading your Order
          </p>
          <p className="text-zinc-400 text-center text-sm mt-2">
            Please wait while we create your order
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0F11] min-h-screen pb-24">
      <div id="recaptcha-container" />

      {/* Header */}
      <header className="bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            {/* Location Section */}
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-lg">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xl font-bold ">Fun Circle</p>
                {/* <p className="text-white/70 text-sm font-medium">Fun Circle</p> */}
                <p className="text-white/70 font-bold text">Gurgaon</p>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-white/70 text-sm font-medium text-right">
                  Welcome
                </p>
                <p className="text-white font-bold text-lg text-right">
                  Guest User
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-lg">
                <UserRound className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Price Summary Card */}
        <div className="mt-6 border border-zinc-600/60 p-5 rounded-xl bg-zinc-900/30 backdrop-blur-sm shadow-lg">
          <h2 className="text-white font-bold text-sm tracking-wider mb-2">
            PRICE SUMMARY
          </h2>
          <p className="text-white text-3xl my-2 font-bold">
            ₹{order?.total || 0}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 font-medium">
              Total Tickets: {order?.quantity || 0}
            </p>
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 text-purple-400 mr-1" />
              <span className="text-purple-400 text-sm font-medium">
                Secure Payment
              </span>
            </div>
          </div>
        </div>

        {/* User Info Form */}
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <h2 className="text-white text-xl font-bold">Your Information</h2>
            <Separator className="flex-1 ml-4 bg-zinc-700" />
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-medium">
                Your name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#1A1A1C] border text-white border-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                placeholder="Enter your full name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white font-medium">
                Phone number
              </Label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-[#1A1A1C] border text-white border-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="Enter your 10-digit phone number"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    if (formData.phone && !errors.phone) {
                      sendOTP();
                    } else {
                      setErrors((prev) => ({
                        ...prev,
                        phone: formData.phone
                          ? "Please enter a valid 10-digit phone number"
                          : "Phone number is required",
                      }));
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Verify
                </Button>
              </div>
              {errors.phone && (
                <p id="phone-error" className="text-red-400 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#1A1A1C] text-white border border-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                placeholder="Enter your email address"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-[#0F0F11]/95 backdrop-blur-md p-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-white text-xl font-bold">
                ₹{order?.total || 0}
              </p>
              <button
                onClick={handleViewDetails}
                className="text-purple-400 text-sm font-medium flex items-center hover:text-purple-300 transition-colors"
              >
                <TicketDetails
                  title={order?.ticket.title || "Default Ticket"}
                  description={order?.ticket.description || "Default Ticket"}
                  price={order?.ticket.price || "Default Ticket"}
                  startdatetime={order?.ticket?.startdatetime ?? null} // Keep null if missing
                  location={order?.ticket.location || "Default Ticket"}
                  maps_link={
                    order?.ticket.venueid.maps_link || "Default Ticket"
                  }
                  venue_name={
                    order?.ticket.venueid.venue_name || "Default Ticket"
                  }
                />
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-white hover:bg-white/90 text-black font-medium px-6 py-2 rounded-full transition-all"
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
