"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import { CreditCard, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import TicketDetails from "@/components/singleTicket/TicketDetails";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import { RedirectPopup } from "@/components/other-utils/RedirectingPopup";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { TicketType } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import { useCreateOrder } from "./functions/useCreateOrder";
interface OrderProps {
  quantity: number;
  ticket: TicketType;
  total: number;
  type: "subscription" | "normal";
}

const supabase = createClient();

export default function CheckoutPage() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  const [isCheckingAvailability, setCheckingAvailability] = useState(false);
  // VERIFICATION STATES

  const { user, authLoading } = useAuth();

  //loading
  const Loading = loading || authLoading;

  //ORDER DETAULS
  const [order, setOrder] = useState<OrderProps | null>(null);

  useEffect(() => {
    setLoading(true);
    const storedOrder = localStorage.getItem("ORDER");

    try {
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        setOrder(parsedOrder);
        console.log(parsedOrder);
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

  const {
    createOrder,
    isSubmitting,
    isShowRedirectPopup,
    isLoadingPaymentWindow,
    isRedirecting,
    createSubscriptionOrder,
  } = useCreateOrder({ order });

  // const handleSubmit = () => createOrder();
  const handleSubmit = async () => {
    setCheckingAvailability(true);
    // CHECK FOR THE AVAILABLE TICKETS
    try {
      const { data, error } = await supabase
        .from("tickets")
        .select("capacity, bookedtickets")
        .eq("id", order?.ticket.id)
        .single(); // Use single() to get one record instead of an array

      if (error) {
        console.log("Database error:", error);
        toast("Unexpected error occurred while checking ticket availability!");
        return;
      }

      // Check if ticket data exists
      if (!data) {
        toast("Ticket not found!");
        return;
      }

      // Calculate available tickets
      const availableTickets = data.capacity - data.bookedtickets;

      // Check if tickets are available
      if (availableTickets <= 0) {
        toast("Sorry, tickets are out of stock!");
        return;
      }

      // Optional: Check if requested quantity is available (if you have a quantity field)
      const requestedQuantity = order?.quantity || 1;
      if (availableTickets < requestedQuantity) {
        toast(`Sorry, only ${availableTickets} tickets available!`);
        return;
      }

      // Proceed with order creation if tickets are available
      if (order?.type === "subscription") {
        createSubscriptionOrder();
        return;
      }

      if (!user?.uid) {
        toast("Please login !!!");
        return;
      }

      createOrder();
    } catch (error) {
      console.log("Unexpected error:", error);
      toast("An unexpected error occurred. Please try again!");
    } finally {
      setCheckingAvailability(false);
    }
  };

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
  if (!order) {
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
          {isSubmitting || isCheckingAvailability ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : order.type === "subscription" ? (
            "Confirm Order"
          ) : (
            "Continue payment"
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
              ) : order.type === "subscription" ? (
                "Confirm Order"
              ) : (
                "Continue payment"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Loading Overlays */}
      <LoadingOverlay isVisible={isLoadingPaymentWindow} />
      <LoadingOverlay
        isVisible={!!isRedirecting}
        message="Confirming your order"
      />

      {/* Toast Container */}
      <ToastContainer />

      {/* Redirect Popup */}
      <RedirectPopup
        isOpen={isShowRedirectPopup}
        onOpenChange={() => {}}
        ticketUrl={""}
      />
    </div>
  );
}
