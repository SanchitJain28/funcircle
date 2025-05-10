"use client";

import type React from "react";
import { type ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber, onAuthStateChanged } from "firebase/auth";
import { appContext } from "@/app/Contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast, ToastContainer } from "react-toastify";

import { CreditCard, Loader2, MapPin, UserRound } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import TicketDetails from "@/app/components/TicketDetails";
import { auth } from "@/lib/firebase";
import { VerifyOTP } from "@/app/components/VerifyOtp";
import axios from "axios";
import LoadingOverlay from "@/app/components/LoadingOverlay";

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
    recaptchaVerifier?: RecaptchaVerifier;
  }

  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id?: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
      color?: string;
    };
  }

  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface RazorpayConstructor {
    new (options: RazorpayOptions): RazorpayInstance;
  }

  interface RazorpayInstance {
    open(): void;
    on(event: string, callback: (data: unknown) => void): void;
    close(): void;
  }
}

export default function CheckoutPage() {
  const [loadingPaymentWindow, setLoadingPaymentWindow] =
    useState<boolean>(false);
  const [user_id, setUser_id] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const context = useContext(appContext);
  if (!context) {
    throw new Error(
      "appContext is null. Ensure the provider is wrapping the component."
    );
  }
  const { order, setOrder } = context;
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
        if (storedOrder) {
          const parsedOrder = JSON.parse(storedOrder);
          setOrder(parsedOrder);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [order, setOrder]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    } else {
      newErrors.phone = "";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!verified) {
      toast.warning("Please Verify yourself by OTP", {
        autoClose: 2000,
        position: "bottom-center",
        className: "bg-[#8B35EB] text-white border border-yellow-700",
        data: {
          title: "Verify",
          description: "Not verified",
        },
      });
      return;
    }

    if (validateForm()) {
      setIsSubmitting(true);
      createOrder();
    }
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
            setIsDialogOpen(true)
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        }
      );
    }
  };

  const sendOTP = async () => {
    setIsVerifying(false);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        "+91" + formData.phone,
        appVerifier
      );
      setConfirmationResult(confirmation);
      toast.success("OTP SENT", {
        autoClose: 2000,
        position: "bottom-center",
        className: "bg-green-600 text-white",
      });
    } catch (err) {
      console.error("Error sending SMS:", err);
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult || !otp) {
      toast.error("Please enter the OTP", {
        position: "bottom-center",
      });
      return;
    }

    try {
      setIsVerifying(true);
      const result = await confirmationResult.confirm(otp);
      const uid = result.user.uid;
      setUser_id(uid);
      if (uid) {
        await createSupabaseUser(uid);
      }
      setVerified(true);
      setIsDialogOpen(false);
      toast.success("Phone number verified successfully", {
        position: "bottom-center",
        className: "bg-green-600 text-white",
      });
    } catch (err) {
      toast.error("Invalid OTP. Please try again.", {
        position: "bottom-center",
      });
      console.error("OTP verification error:", err);
    } finally {
      setIsVerifying(false);
    }
  };

  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const createOrder = async () => {
    setLoadingPaymentWindow(true);
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      if (!order || !order.total) {
        toast.error("Order details are missing");
        return;
      }

      // Create order by calling the server endpoint
      const { data } = await axios.post("/api/create-order", {
        amount: order.total * 100, // IN PAISE
        receipt: "receipt#1",
        notes: {},
      });

      // Open Razorpay Checkout
      const options = {
        key: "rzp_live_Kz3EmkP4EWRTam",
        amount: order.total * 100, // Amount should be in paise
        currency: "INR",
        name: "Fun circle",
        description: order.ticket
          ? `Payment for ${order.ticket.title}`
          : "Payment",
        order_id: data.order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#8737EC",
        },
        handler: async (response: RazorpayResponse) => {
          console.log("Payment successful", response);
          try {
            const {
              data: { orderId, quantity },
            } = await axios.post("/api/create-supa-order", {
              user_id: user_id,
              total_price: order.total,
              status: "confirmed",
              paymentid: response.razorpay_payment_id,
              ticket_id: order.ticket.id,
              ticket_quantity: order.quantity,
              ticket_price: order.ticket.price,
            });
            window.location.href = `https://funcircleapp.com/success?ticket-id=${order.ticket.id}&order-id=${orderId}&quantity=${quantity}`;
          } catch (error) {
            console.error("Error creating order in database:", error);
            toast.error(
              "Payment successful but order processing failed. Please contact support."
            );
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast.error("Payment failed. Please try again.");
        console.error("Payment failed:", response);
      });
      rzp.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      toast.error("Payment processing failed. Please try again later.");
    } finally {
      setLoadingPaymentWindow(false);
      setIsSubmitting(false);
    }
  };

  const createSupabaseUser = async (user_id: string) => {
    try {
      const { data } = await axios.post("/api/create-supabase-guest-user", {
        email: formData.email,
        first_name: formData.name,
        user_id: user_id,
      });
      return data;
    } catch (error) {
      console.error("Error creating user in database:", error);
      // Continue the flow even if this fails
    }
  };

  const handleOTPChange = (otp: string) => {
    setOtp(otp);
  };

  useEffect(() => {
    // Handle authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
      } else {
        console.log("No user is signed in.");
        setUser_id(null);
        setVerified(false);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

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

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
                    disabled={verified}
                  />
                </div>
                <VerifyOTP
                  isOpen={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                  onOTPChange={handleOTPChange}
                  onVerify={verifyOTP}
                  isVerifying={isVerifying}
                />
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

            <Button
              type="button"
              onClick={() => {
                if (validateForm()) {
                  sendOTP()
                }
              }}
              disabled={verified || isVerifying}
              className={`${verified ? "bg-green-600" : ""} ${isVerifying ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : verified ? (
                "You are Verified"
              ) : (
                "Verify"
              )}
            </Button>
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
              <div>
                <TicketDetails
                  title={order?.ticket?.title || "Ticket"}
                  description={order?.ticket?.description || ""}
                  price={String(order?.ticket?.price || 0)}
                  startdatetime={order?.ticket?.startdatetime ?? null}
                  location={order?.ticket?.location || ""}
                  maps_link={order?.ticket?.venueid?.maps_link || ""}
                  venue_name={order?.ticket?.venueid?.venue_name || ""}
                />
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !verified}
              className={`bg-white hover:bg-white/90 text-black font-medium px-6 py-2 rounded-full transition-all ${
                isSubmitting || !verified ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </div>

      <LoadingOverlay isVisible={loadingPaymentWindow} />
      <ToastContainer />
    </div>
  );
}
