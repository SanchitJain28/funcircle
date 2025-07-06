"use client";

import { useAuth, useProfile } from "@/hooks/useAuth";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  MapPin,
  User,
  ExternalLink,
  Mail,
  Edit3,
} from "lucide-react";
import { format } from "date-fns";
import { useAppContext } from "@/app/Contexts/AppContext";
import CustomHeader from "@/components/header-footers/CustomHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/sign-up/authModal";
import { PaymentProcessingModal } from "../paymentProcessing";

export default function OnBoardingClient() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuth();
  const { subscription: venueData } = useAppContext();

  if (!user) {
    return <AuthModal redirectUrl="/new-subscription/onboarding" />;
  }

  const { data: profile } = useProfile({
    id: user.uid,
    enabled: !!user.uid,
  });

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

  // Venue data from the provided JSON
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [emptyDetails, setEmptyDetails] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    location: "",
    selectedDate: undefined as Date | undefined,
    selectedTime: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkForEmptyDetails = () => {
    const emptyFields: string[] = [];

    if (!profile?.first_name || profile.first_name.trim() === "") {
      emptyFields.push("first_name");
    }

    if (!profile?.email || profile.email.trim() === "") {
      emptyFields.push("email");
    }

    if (!profile?.location || profile.location.trim() === "") {
      emptyFields.push("location");
    }

    setEmptyDetails(emptyFields);
  };

  useEffect(() => {
    console.log("Profile", profile);
    if (profile) {
      console.log("profile is here", profile);
      checkForEmptyDetails();
      setFormData((prev) => ({
        ...prev,
        firstName: profile.first_name || "",
        location: profile.location || "",
        email: profile.email || "",
      }));
      return;
    }
    setEmptyDetails(["first_name", "location", "email"]);
  }, [profile]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   // Simulate API call

  //   try {
  //     const { data } = await axios.post("/api/onboarding", {
  //       user_data: {
  //         email: formData.email,
  //         first_name: formData.firstName,
  //         location: formData.location,
  //         user_id: user?.uid,
  //       },
  //     });
  //     queryClient.invalidateQueries({ queryKey: ["profile", user?.uid] }); // boom! 🔥

  //     // createOrder()
  //     toast("Profile updates succesfully");
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   console.log("Subscription data:", formData);
  //   setIsSubmitting(false);
  // };

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];

  if (!venueData) {
    setTimeout(() => {
      router.push("/new-subscription");
    }, 500);
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call

    try {
      await axios.post("/api/onboarding", {
        user_data: {
          email: formData.email,
          first_name: formData.firstName,
          location: formData.location,
          user_id: user.uid,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["profile", user.uid] }); // boom! 🔥

      createOrder();
    } catch (error) {
      console.log(error);
      toast.error("Error updating your profile");
    } finally {
      console.log("Subscription data:", formData);
    }
  };

  const createOrder = async () => {
    setIsSubmitting(true);
    try {
      // Load Razorpay SDK
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      const { price: total } = venueData.subscription_model;

      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      if (!venueData || !venueData.subscription_model.price) {
        toast.error("Order details are missing");
        return;
      }

      // Create server-side order
      const { data } = await axios.post("/api/create-order", {
        amount: total * 100, // Convert to paise
        receipt: `receipt-${Date.now()}`,
        notes: {},
      });

      // Configure Razorpay checkout
      const options = {
        key: "rzp_live_Kz3EmkP4EWRTam",
        amount: total * 100,
        currency: "INR",
        name: "Fun Circle",
        description: venueData.subscription_model.title
          ? `Payment for Funcricle Subscription`
          : "Payment",
        order_id: data.order.id,
        prefill: {
          name: formData.firstName, //TODO
          email: formData.email, //TODO
          contact: user?.phoneNumber ?? undefined, // Ensure no null is passed
        },
        theme: {
          color: "#8737EC",
        },
        handler: async function (response: RazorpayResponse) {
          console.log("Payment successful", response);
          // setIsRedirecting(true);

          setShowPaymentModal(true);

          try {
            // Save order to database
            const {
              data: { data },
            } = await axios.post("/api/create-subscription", {
              user_id: user.uid,
              venue_id: venueData.id,
              playing_date_and_time: formData.selectedDate
                ? new Date(formData.selectedDate).toISOString()
                : "",
              type: venueData.subscription_model.title,
              email: formData.email,
              venue_name: venueData.venue_name,
              venue_address: venueData.location,
              first_name: formData.firstName,
            });

            console.log(data);
            // Handle redirection
            const redirectURL = `${process.env.NEXT_PUBLIC_BASE_URL}/new-subscription/success?id=${data.id}`;
            // setRedirectUrl(redirectURL);

            // Store successful order info
            // localStorage.setItem(
            //   "lastSuccessfulOrder",
            //   JSON.stringify({
            //     redirectURL,
            //     orderId,
            //     timestamp: new Date().toISOString(),
            //   })
            // );

            // Clear the ORDER from localStorage
            // localStorage.removeItem("ORDER");
            try {
              router.push(redirectURL);

              // Show redirection popup after a delay if we're still on the same page
              const redirectTimer = setTimeout(() => {
                // setIsShowRedirectPopup(true);
              }, 1500);

              // Clear timer if component unmounts (redirect worked)
              return () => clearTimeout(redirectTimer);
            } catch (error) {
              console.error("Redirect failed:", error);
              // setIsShowRedirectPopup(true);
            }
          } catch (error) {
            console.error("Error creating order in database:", error);
            toast.error(
              "Payment successful but order processing failed. Please contact support."
            );
          } finally {
            setIsSubmitting(false);

            // setIsRedirecting(false);
          }
        },
      };

      // Initialize and open Razorpay
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
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[linear-gradient(135deg,_#000000_0%,_#000000_30%,_#000000_0%,_#8324FF_60%,_#FFD700_100%)]
 pb-24"
    >
      <CustomHeader />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          {/* <div className="mb-8">
            <h1 className="text-xl font-semibold text-white mb-2 flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              Event Subscription Details
            </h1>
            <p className="text-gray-400 text-sm ml-5">
              Please provide the required information to complete your booking
            </p>
          </div> */}

          <div className="space-y-6">
            {/* Venue Information */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                Venue Location
              </Label>
              <div className="bg-black border border-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={venueData.image || "/placeholder.svg"}
                    alt={venueData.venue_name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm mb-1">
                      {venueData.venue_name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-2">
                      {venueData.location}
                    </p>
                    <a
                      href={venueData.maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-yellow-400 text-xs hover:text-yellow-300"
                    >
                      View on Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Name Field - Show input if empty, show details if filled */}
            {emptyDetails.includes("first_name") ? (
              <div className="space-y-3">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-300 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-yellow-400" />
                  Full Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className="h-12 bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 rounded-lg"
                  required
                />
              </div>
            ) : (
              <div className="group">
                <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-400" />
                  Full Name{" "}
                </Label>
                <div className="h-12 bg-black border border-gray-700 rounded-lg flex items-center px-3">
                  <span className="text-white text-base font-medium flex-1">
                    {profile?.first_name}
                  </span>
                  <button
                    onClick={() => {
                      setEmptyDetails([...emptyDetails, "first_name"]);
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors duration-200 group"
                  >
                    <Edit3 className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300" />
                  </button>
                </div>
              </div>
            )}

            {/* Location Field - Show input if empty, show details if filled */}
            {emptyDetails.includes("location") ? (
              <div className="space-y-3">
                <Label
                  htmlFor="location"
                  className="text-sm font-medium text-gray-300 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  Your Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="h-12 bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 rounded-lg"
                  required
                />
              </div>
            ) : (
              <div className="group">
                <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  Location
                </Label>
                <div className="h-12 bg-black border border-gray-700 rounded-lg flex items-center px-3">
                  <span className="text-white text-base font-medium flex-1">
                    {profile?.location}
                  </span>
                  <button
                    onClick={() => {
                      setEmptyDetails([...emptyDetails, "location"]);
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors duration-200 group"
                  >
                    <Edit3 className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300" />
                  </button>
                </div>
              </div>
            )}

            {emptyDetails.includes("email") ? (
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-yellow-400" />
                  Your Location
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="h-12 bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 rounded-lg"
                  required
                />
              </div>
            ) : (
              <div className="group">
                <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-yellow-400" />
                  Email{" "}
                </Label>
                <div className="h-12 bg-black border border-gray-700 rounded-lg flex items-center px-3">
                  <span className="text-white text-base font-medium flex-1">
                    {profile?.email}
                  </span>
                  <button
                    onClick={() => {
                      setEmptyDetails([...emptyDetails, "email"]);
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors duration-200 group"
                  >
                    <Edit3 className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300" />
                  </button>
                </div>
              </div>
            )}

            {/* Date and Time Selection - Combined Row */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-yellow-400" />
                Your playing date and time
              </Label>
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* Date Selection */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start text-left font-normal bg-black border-gray-700 text-white hover:bg-gray-800 hover:border-yellow-400 rounded-lg"
                    >
                      <CalendarDays className="mr-2 h-4 w-4 text-yellow-400" />
                      {formData.selectedDate ? (
                        format(formData.selectedDate, "MMMM do, yyyy")
                      ) : (
                        <span className="text-gray-500">Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-black border-gray-700 rounded-lg"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={formData.selectedDate}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, selectedDate: date }))
                      }
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="text-white bg-black rounded-lg [&_.rdp-day]:text-white [&_.rdp-day_button]:text-white [&_.rdp-day_button:hover]:bg-gray-800 [&_.rdp-day_selected]:bg-yellow-400 [&_.rdp-day_selected]:text-black [&_.rdp-head_cell]:text-gray-400 [&_.rdp-nav_button]:text-white [&_.rdp-nav_button:hover]:bg-gray-800"
                    />
                  </PopoverContent>
                </Popover>

                {/* Time Selection */}
                <Select
                  value={formData.selectedTime}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, selectedTime: value }))
                  }
                >
                  <SelectTrigger className="w-full h-12 bg-black border-gray-700 text-white focus:border-yellow-400 focus:ring-1 py-[23px] focus:ring-yellow-400 rounded-lg">
                    <SelectValue placeholder="Choose time" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {timeSlots.map((time) => (
                      <SelectItem
                        key={time}
                        value={time}
                        className="text-white hover:bg-gray-800 focus:bg-gray-800"
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-black">
              By completing this booking, you agree to our{" "}
              <span className="">terms of service</span> and{" "}
              <span className="">privacy policy</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Payment Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 p-4 z-50">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">
                {venueData.subscription_model.title}
              </h3>
              <p className="text-gray-400 text-xs">
                {venueData.subscription_model.billing}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-yellow-400 font-bold text-lg">
                  ₹{venueData.subscription_model.price}
                </p>
                <p className="text-gray-400 text-xs">per month</p>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !formData.selectedDate ||
                  !formData.selectedTime ||
                  (emptyDetails.includes("first_name") &&
                    (!formData.firstName ||
                      formData.firstName.trim() === "")) ||
                  (emptyDetails.includes("location") &&
                    (!formData.location || formData.location.trim() === "")) ||
                  (emptyDetails.includes("email") &&
                    (!formData.email || formData.email.trim() === ""))
                }
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    Processing...
                  </div>
                ) : (
                  "Continue Payment"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PaymentProcessingModal
        isOpen={showPaymentModal}
        onOpenChange={setShowPaymentModal}
      />
    </div>
  );
}
