"use client";

import type React from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { Button } from "@/components/ui/button";

import { toast, ToastContainer } from "react-toastify";

import { CreditCard, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import TicketDetails from "@/components/singleTicket/TicketDetails";
import axios from "axios";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import { RedirectPopup } from "@/components/other-utils/RedirectingPopup";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { TicketType } from "@/app/types";
interface OrderProps {
  quantity: number;
  ticket: TicketType;
  total: number;
}
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

interface UserDetails {
  first_name: string;
  email: string;
}

export default function CheckoutPage() {
  // LOADING STATES
  const pathname = usePathname();
  const [loadingPaymentWindow, setLoadingPaymentWindow] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [isShowRedirectPopup, setIsShowRedirectPopup] =
    useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetails>();
  // VERIFICATION STATES

  const { user, authLoading, getSupabaseUser } = useAuth();

  //loading
  const Loading = loading || authLoading;

  //ORDER DETAULS
  const [order, setOrder] = useState<OrderProps | null>(null);

  //auth

  // ROUTER
  const router = useRouter();

  // FORM CHANGE HANDLER

  // CHECK IF ORDER EXISTS, IF NOT, LOAD FROM LOCAL STORAGE
  useEffect(() => {
    setLoading(true);
    const storedOrder = localStorage.getItem("ORDER");

    try {
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        setOrder(parsedOrder);
        return;
      }
      router.push("/funcircle");
    } catch (error) {
      console.error("Error loading order:", error);
      toast.error("Error loading your order. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [setOrder, router]);

  // FORM VALIDATION

  // HANDLE FORM SUBMISSION
  const handleSubmit = () => createOrder();

  // LOAD RAZORPAY SCRIPT
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

  // CREATE ORDER
  const createOrder = async () => {
    setLoadingPaymentWindow(true);
    try {
      // Load Razorpay SDK
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

      // Create server-side order
      const { data } = await axios.post("/api/create-order", {
        amount: order.total * 100, // Convert to paise
        receipt: `receipt-${Date.now()}`,
        notes: {},
      });

      // Configure Razorpay checkout
      const options = {
        key: "rzp_live_Kz3EmkP4EWRTam",
        amount: order.total * 100,
        currency: "INR",
        name: "Fun Circle",
        description: order.ticket
          ? `Payment for ${order.ticket.title}`
          : "Payment",
        order_id: data.order.id,
        prefill: {
          name: userDetails?.first_name, //TODO
          email: userDetails?.email, //TODO
          contact: user?.phoneNumber ?? undefined, // Ensure no null is passed
        },
        theme: {
          color: "#8737EC",
        },
        handler: async function (response: RazorpayResponse) {
          console.log("Payment successful", response);
          setIsRedirecting(true);

          try {
            // Save order to database
            const {
              data: { orderId, quantity },
            } = await axios.post("/api/create-supa-order", {
              user_id: user?.uid,
              total_price: order.total,
              status: "confirmed",
              paymentid: response.razorpay_payment_id,
              ticket_name: order.ticket.title,
              ticket_id: order.ticket.id,
              ticket_quantity: order.quantity,
              ticket_price: order.ticket.price,
              email: userDetails?.email, //TODO
              phoneNumber: user?.phoneNumber, //TODO
              name: userDetails?.first_name, //TODO
              location: order.ticket.venueid.location,
              map_link: order.ticket.venueid.maps_link,
            });
            // Handle redirection
            const redirectURL = `https://funcircleapp.com/success?ticket-id=${order.ticket.id}&order-id=${orderId}&quantity=${quantity}`;
            setRedirectUrl(redirectURL);

            // Store successful order info
            localStorage.setItem(
              "lastSuccessfulOrder",
              JSON.stringify({
                redirectURL,
                orderId,
                timestamp: new Date().toISOString(),
              })
            );

            // Clear the ORDER from localStorage
            localStorage.removeItem("ORDER");
            try {
              router.push(
                `/success?ticket-id=${order.ticket.id}&order-id=${orderId}&quantity=${quantity}`
              );

              // Show redirection popup after a delay if we're still on the same page
              const redirectTimer = setTimeout(() => {
                setIsShowRedirectPopup(true);
              }, 1500);

              // Clear timer if component unmounts (redirect worked)
              return () => clearTimeout(redirectTimer);
            } catch (error) {
              console.error("Redirect failed:", error);
              setIsShowRedirectPopup(true);
            }
          } catch (error) {
            console.error("Error creating order in database:", error);
            toast.error(
              "Payment successful but order processing failed. Please contact support."
            );
          } finally {
            setIsRedirecting(false);
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
      setLoadingPaymentWindow(false);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (authLoading) return;

      if (!user) {
        router.push(`/sign-up?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      setLoading(true);
      try {
        const supaUser = await getSupabaseUser(user.uid);
        if (!supaUser) {
          router.push(
            `/complete-profile?redirect=${encodeURIComponent(pathname)}`
          );
          return;
        }
        setUserDetails(supaUser);
      } catch (error) {
        console.error("Error fetching Supabase user:", error);
        router.push(
          `/complete-profile?redirect=${encodeURIComponent(pathname)}`
        );
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [user, authLoading]);

  // LOADING SCREEN
  if (Loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1c] p-8 rounded-2xl flex flex-col items-center max-w-xs w-full shadow-lg border border-purple-500/20">
          <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
          <p className="text-white text-center font-medium text-lg">
            Loading your Order
          </p>
          <p className="text-zinc-400 text-center text-sm mt-2">
            Please wait while we prepare your order
          </p>
        </div>
      </div>
    );
  }

  // If no order data, show error
  if (!order || !order.ticket) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1c] p-8 rounded-2xl flex flex-col items-center max-w-xs w-full shadow-lg border border-purple-500/20">
          <p className="text-white text-center font-medium text-lg">
            No order found
          </p>
          <p className="text-zinc-400 text-center text-sm mt-2">
            Please select a ticket first
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mt-4 bg-purple-600 hover:bg-purple-700"
          >
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0F11] min-h-screen pb-24">
      {/* Header */}
      <CustomHeader />
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

          <div className="flex items-center justify-between my-2">
            <p className="text-zinc-400 font-medium">your Phone number :</p>
            <div className="flex items-center">
              <p className="text-purple-400 text-sm font-medium">
                {user?.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-2">
        <button
        onClick={handleSubmit}
          className={`bg-white w-full hover:bg-white/90 text-black font-medium text-lg px-6 py-4 rounded transition-all ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
           {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue Payment"
              )}
        </button>
      </div>

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
              disabled={isSubmitting}
              className={`bg-white hover:bg-white/90 text-black font-medium px-6 py-2 rounded-full transition-all ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue to Payment"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Loading Overlays */}
      <LoadingOverlay isVisible={loadingPaymentWindow} />
      <LoadingOverlay
        isVisible={isRedirecting}
        message="Confirming your order"
      />

      {/* Toast Container */}
      <ToastContainer />

      {/* Redirect Popup */}
      <RedirectPopup
        isOpen={isShowRedirectPopup}
        onOpenChange={setIsRedirecting}
        ticketUrl={redirectUrl}
      />
    </div>
  );
}
