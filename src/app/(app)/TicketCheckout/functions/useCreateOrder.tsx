import { TicketType } from "@/app/types";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { RecaptchaVerifier } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface OrderProps {
  quantity: number;
  ticket: TicketType;
  total: number;
  type: "subscription" | "normal";
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Extend window interface for Razorpay
declare global {
  interface Window {
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
    prefill: {
      name: string;
      email: string;
      contact: string;
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

export function useCreateOrder({ order }: { order: OrderProps | null }) {
  const [isLoadingPaymentWindow, setIsLoadingPaymentWindow] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState<string | boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowRedirectPopup, setIsShowRedirectPopup] = useState(false);

  const router = useRouter();
  const { user, profile } = useAuth();

  // Validation function
  const validateOrder = useCallback(() => {
    if (!order) {
      toast.error("Order details not provided");
      return false;
    }

    if (
      !order.ticket ||
      !order.ticket.id ||
      !order.ticket.price ||
      !order.ticket.title
    ) {
      toast.error("Order details not provided");
      return false;
    }

    if (!order.quantity) {
      toast.error("Order details not provided");
      return false;
    }

    if (!user) {
      toast.error("Not authenticated!");
      router.replace("/sign-up");
      return false;
    }

    if (!profile?.profile) {
      toast.error("Please complete your profile first!");
      router.replace("/complete-profile");
      return false;
    }

    if (!profile.profile.email) {
      toast.error("Please complete your profile first!");
      router.replace("/update-profile");
      return false;
    }

    if (!profile.profile.first_name) {
      toast.error("Please complete your profile first!");
      router.replace("/update-profile");
      return false;
    }

    return true;
  }, [order, user, profile, router]);

  // Load external script utility
  const loadScript = useCallback((src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  // Handle successful payment and redirect
  const handleSuccessfulOrder = useCallback(
    (orderId: string, quantity: number) => {
      if (!order) return;

      const redirectURL = `/success?ticket-id=${order.ticket.id}&order-id=${orderId}&quantity=${quantity}`;
      setIsRedirecting(redirectURL);

      // Store successful order info
      try {
        localStorage.setItem(
          "lastSuccessfulOrder",
          JSON.stringify({
            redirectURL,
            orderId,
            timestamp: new Date().toISOString(),
          })
        );
        localStorage.removeItem("ORDER");
      } catch (error) {
        console.warn("Failed to update localStorage:", error);
      }

      // Attempt redirect
      try {
        router.push(redirectURL);

        // Fallback: show popup if redirect doesn't work
        const redirectTimer = setTimeout(() => {
          setIsShowRedirectPopup(true);
        }, 2000);

        return () => clearTimeout(redirectTimer);
      } catch (error) {
        console.error("Redirect failed:", error);
        setIsShowRedirectPopup(true);
      }
    },
    [order, router]
  );

  const createOrder = useCallback(async () => {
    if (!validateOrder() || !order) return;

    setIsLoadingPaymentWindow(true);
    setIsSubmitting(true);

    try {
      // Load Razorpay SDK
      const scriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!scriptLoaded) {
        toast.error(
          "Payment system failed to load. Please check your internet connection."
        );
        return;
      }

      if (!order.total || order.total <= 0) {
        toast.error("Invalid order amount");
        return;
      }

      if (!user?.uid) {
        toast.error("User not found");
        return;
      }

      if (!order.ticket.id) {
        toast.error(
          "Ticket Data not available , Please go back and try again !!"
        );
        return;
      }

      if (!user.uid) {
        toast.error("User not found ,Please login");
        router.push("sign-up");
        return;
      }

      // Create server-side order
      const { data } = await axios.post("/api/create-order", {
        amount: Math.round(order.total * 100), // Ensure integer paise value
        receipt: `receipt-${Date.now()}-${user?.uid}`,
        notes: {
          ticketId: order.ticket.id,
          userId: user.uid,
          quantity: order.quantity,
        },
      });

      if (!data?.order?.id) {
        throw new Error("Invalid order response from server");
      }

      // Configure Razorpay checkout
      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_Kz3EmkP4EWRTam",
        amount: Math.round(order.total * 100),
        currency: "INR",
        name: "Fun Circle",
        description: `Payment for ${order.ticket.title}`,
        order_id: data.order.id,
        prefill: {
          name: profile?.profile?.first_name || "",
          email: profile?.profile?.email || "",
          contact: user?.phoneNumber || "",
        },
        theme: {
          color: "#8737EC",
        },
        handler: async function (response: RazorpayResponse) {
          console.log("Payment successful", response);
          setIsRedirecting(true);

          if (!response.razorpay_payment_id) {
            toast("Payment failed");
            return;
          }

          try {
            // Save order to database
            const { data: orderData } = await axios.post(
              "/api/create-supa-order",
              {
                user_id: user?.uid,
                total_price: order.total,
                status: "confirmed",
                paymentid: response.razorpay_payment_id,
                ticket_name: order.ticket.title,
                ticket_id: order.ticket.id,
                ticket_quantity: order.quantity,
                ticket_price: order.ticket.price,
                email: profile?.profile?.email,
                phoneNumber: user?.phoneNumber,
                name: profile?.profile?.first_name,
                location: order.ticket.venueid?.location,
                map_link: order.ticket.venueid?.maps_link,
              }
            );

            const { orderId, quantity } = orderData;

            if (!orderId) {
              throw new Error("Failed to create order record");
            }

            toast.success("Payment successful!");
            handleSuccessfulOrder(orderId, quantity);
          } catch (error) {
            console.error("Error creating order in database:", error);
            toast.error(
              "Payment successful but order processing failed. Please contact support."
            );
          } finally {
            setIsRedirecting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoadingPaymentWindow(false);
            setIsSubmitting(false);
          },
        },
      };

      // Initialize and open Razorpay
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        toast.error(
          `Payment failed: ${response.error?.description || "Please try again"}`
        );
        console.error("Payment failed:", response);
      });

      rzp.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Payment processing failed"
        : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoadingPaymentWindow(false);
      setIsSubmitting(false);
    }
  }, [validateOrder, order, loadScript, user, profile, handleSuccessfulOrder]);

  const createSubscriptionOrder = useCallback(async () => {
    if (!validateOrder() || !order) return;

    setIsSubmitting(true);
    setIsRedirecting(true);

    try {
      const { data } = await axios.post("/api/create-subscription-order", {
        user_id: user?.uid,
        total_price: order.total,
        status: "confirmed",
        paymentid: profile?.subject?.subscription?.id,
        ticket_name: order.ticket.title,
        ticket_id: order.ticket.id,
        ticket_quantity: order.quantity,
        ticket_price: order.ticket.price,
        email: profile?.profile.email,
        name: profile?.profile.first_name,
        phoneNumber: user?.phoneNumber,
        location: order.ticket.venueid?.location,
        map_link: order.ticket.venueid?.maps_link,
        type: order.type,
      });

      const { orderId, quantity } = data;

      if (!orderId) {
        throw new Error("Failed to create subscription order");
      }

      toast.success("Subscription order created successfully!");
      handleSuccessfulOrder(orderId, quantity);
    } catch (error) {
      console.error("Error creating subscription order:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to create subscription order"
        : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsRedirecting(false);
      setIsSubmitting(false);
    }
  }, [validateOrder, order, user, profile, handleSuccessfulOrder]);

  // Cleanup effect for any pending timers

  return {
    isLoadingPaymentWindow,
    createOrder,
    isRedirecting,
    isSubmitting,
    isShowRedirectPopup,
    createSubscriptionOrder,
    setIsShowRedirectPopup, // Export this in case parent needs to control it
  };
}
