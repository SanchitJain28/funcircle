import React from "react";
import { Crown, Zap } from "lucide-react";

interface SubscriptionOptionProps {
  option: {
    play: number;
    price: number;
    name: string;
    popular: boolean;
  };
}

export default function SubscriptionOption({
  option,
}: SubscriptionOptionProps) {
  return (
    <div
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
        option.popular
          ? "border-purple-500 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
          : "border-gray-700 bg-gray-800/30 hover:border-purple-500/50"
      }`}
    >
      {/* Popular Badge */}
      {option.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
            <Crown className="w-3 h-3 mr-1" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center">
        {/* Plan Name */}
        <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-center">
          <Zap className="w-5 h-5 mr-2 text-purple-400" />
          {option.name}
        </h4>

        {/* Play Count */}
        <div className="mb-4">
          <p className="text-gray-300 text-sm">Play up to</p>
          <p className="text-3xl font-bold text-purple-400">{option.play}</p>
          <p className="text-gray-400 text-sm">times per month</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-400 mr-1">₹</span>
            <span className="text-4xl font-bold text-white">
              {option.price}
            </span>
          </div>
          <p className="text-gray-400 text-sm">per month</p>
        </div>

        {/* Buy Button */}
        <a href={`https://wa.me/919561079271?text=I%20want%20to%20buy%20this%20subscription%20plan%20:%20${option.name}%20of%20price%20${option.price}`}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
            option.popular
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25"
              : "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600 hover:border-purple-500"
          }`}
        >
          {option.popular ? "Get Started" : "Choose Plan"}
        </a>

        {/* Benefits */}
        <div className="mt-4 text-xs text-gray-400">
          <p>• Play with similar-level players</p>
          <p>• Easy and flexible slot booking</p>
          <p>• Updates & coordination on WhatsApp</p>
        </div>
      </div>
    </div>
  );
}
