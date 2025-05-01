import Navbar from "@/app/components/Navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="px-4 py-8 lg:px-40">
        <p className="text-2xl font-bold lg:text-4xl">
          📦 Shipping Policy – Fun Circle Last Updated: May 1, 2025
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
          Thank you for shopping with Fun Circle! Here&apos;s what you need to
          know about our shipping process:
        </p>

        <p className="lg:text-2xl text-lg font-sans my-4">
         <span className="text-xl font-bold">1. Shipping Coverage</span>  <br />We currently ship to major cities and towns
          across India. Please check availability in your area before placing
          your order.
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
          <span className="text-xl font-bold">2. Shipping Timeframes</span><br /> Orders are processed within 1-2 business days.
          <br />
          Estimated delivery time: 4-7 business days after dispatch, depending
          on your location.
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
        <span className="text-xl font-bold">3. Shipping Charges </span><br /> Standard shipping: ₹49 flat rate
          <br />
          Free shipping on orders above ₹499
          <br />
          Charges for express delivery may apply and will be shown during
          checkout.
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
        <span className="text-xl font-bold">4. Order Tracking </span><br /> Once your order is shipped, you&apos;ll receive a
          tracking ID via email/SMS to follow your package.
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
        <span className="text-xl font-bold">5. Delays </span><br />Delays  may occur due to unforeseen circumstances like
          weather conditions, regional holidays, or courier issues. We&apos;ll
          keep you informed in such cases.
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
        <span className="text-xl font-bold">6. Failed Delivery</span><br /> If delivery fails due to an incorrect address or
          non-availability, re-shipping may incur additional charges.
        </p>
      </div>
    </div>
  );
}
