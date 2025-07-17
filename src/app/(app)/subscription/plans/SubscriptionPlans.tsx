"use client";

import React, { useState } from "react";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { motion } from "motion/react";

import Link from "next/link";
import { useAppContext } from "@/app/Contexts/AppContext";
import { venues } from "../props/venue-props";
import { useAuth } from "@/hooks/useAuth";

export default function SubscriptionPlans() {
  const [currentLocation, setCurrentLocation] = useState(
    "Wazirabad, Sector 52, Gurugram, Haryana 122003, India"
  );
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [openFeatures, setOpenFeatures] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { setSubscription } = useAppContext();

  const { user } = useAuth();

  const currentVenue = venues.find(
    (venue) => venue.location === currentLocation
  );

  const handlePlanSelect = (index: number) => {
    setSelectedPlan(index);
    setOpenFeatures(index);
  };

  const handleSubscribe = async () => {
    if (currentVenue) {
      setIsLoading(true);
      // Simulate API call
      setIsLoading(false);

      const PlanSelected =
        currentVenue?.subscription_models[selectedPlan].title;

      const subscriptionPass = currentVenue?.subscription_models.find(
        (pass) => pass.title === PlanSelected
      );
      console.log(subscriptionPass);

      if (subscriptionPass) {
        setSubscription({
          ...currentVenue,
          subscription_model: subscriptionPass,
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[linear-gradient(to_bottom_right,_#000000,_#0A0A0A,_#0A0A0A,_#8324FF)]">
      {/* Header */}
      <CustomHeader />

      {/* Main Content with bottom padding for fixed button */}
      <div className="px-6 pb-32 pt-6">
        {/* Venue Selection */}
        <div className="mb-6">
          <Select value={currentLocation} onValueChange={setCurrentLocation}>
            <SelectTrigger className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm rounded-lg py-6">
              <SelectValue placeholder="Select a venue" />
            </SelectTrigger>
            <SelectContent className="bg-white border-0 shadow-xl rounded-xl">
              <SelectGroup>
                <SelectLabel className="text-gray-600 font-semibold">
                  Available Venues
                </SelectLabel>
                {venues.map((venue) => {
                  if (
                    venue.id == 1 &&
                    user?.uid !== "t1QDSuae8KaEzAh4wZJuFF4XR7n1"
                  ) {
                    return null;
                  }
                  return (
                    <SelectItem
                      key={venue.id}
                      value={venue.location}
                      className="hover:bg-purple-50 rounded-lg my-1"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={venue.image || "/placeholder.svg"}
                          alt={venue.venue_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{venue.venue_name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-48">
                            {venue.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {currentVenue && (
          <div className="mb-6 lg:hidden rounded-2xl px-2">
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <motion.video autoPlay muted loop playsInline width="100%">
                <source src="/SubscriptionBanner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </motion.video>
            </div>
          </div>
        )}

        {/* Subscription Plans */}
        {currentVenue && (
          <div className="space-y-4 mb-8">
            {currentVenue.subscription_models.map((plan, index) => (
              <motion.div
                key={index}
                className="relative p-[2px] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => handlePlanSelect(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {/* Animated Gradient Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-none"
                  style={{
                    background:
                      selectedPlan === index
                        ? "linear-gradient(45deg, #8324FF, #B95BD3, #F9CFD6, #8324FF)"
                        : "linear-gradient(45deg, rgba(131, 36, 255, 0.3), rgba(185, 91, 211, 0.3), rgba(249, 207, 214, 0.3), rgba(131, 36, 255, 0.3))",
                    backgroundSize: "300% 300%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <Card
                  className={`relative transition-all py-4 duration-300 overflow-hidden m-0 ${
                    selectedPlan === index
                      ? "bg-white shadow-2xl"
                      : "bg-white/10 backdrop-blur-md hover:bg-white/20"
                  }`}
                >
                  <div className="p-5">
                    <div className="relative">
                      {plan.popular && (
                        <div className="absolute -top-7 -right-3 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                          MOST POPULAR
                        </div>
                      )}
                      {selectedPlan === index && (
                        <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-2 shadow-lg">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      <div
                        className={`${selectedPlan === index ? "text-gray-800" : "text-white"}`}
                      >
                        <div className="flex flex-col mb-3">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-lg mb-1">
                              {plan.title}
                            </h3>
                            <p className="text-3xl font-bold">₹{plan.price}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-sm opacity-80 font-medium">
                              {plan.billing}
                            </p>
                          </div>
                        </div>
                        {/* Features Collapsible */}
                        <Collapsible
                          open={openFeatures === index}
                          onOpenChange={(open) =>
                            setOpenFeatures(open ? index : -1)
                          }
                        >
                          <CollapsibleContent className="mt-3">
                            <div className="space-y-2 border-t border-gray-200/20 pt-3">
                              {plan.features.map((feature, featureIndex) => (
                                <div
                                  key={featureIndex}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-sm opacity-90">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Navigation/Button - Compact Single Row */}
      {currentVenue && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-white/20 p-4 shadow-2xl"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Price and Security Info */}
            <div className="flex flex-col min-w-0 flex-shrink-0">
              <p className="text-lg font-bold text-gray-800">
                ₹{currentVenue.subscription_models[selectedPlan]?.price}
              </p>
            </div>

            {/* Subscribe Button */}
            <Link href="onboarding">
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-base font-semibold rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                <div className="flex justify-between gap-2">
                  {isLoading ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      <p>Subscribe Now</p>
                    </>
                  )}
                </div>
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
