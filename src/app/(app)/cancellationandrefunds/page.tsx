import Navbar from "@/app/components/Navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="px-4 py-8 lg:px-40">
        <p className="text-2xl font-bold lg:text-4xl">
          🔁 Cancellation & Refund Policy – Fun Circle Last Updated: May 1, 2025
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
          We aim to make your Fun Circle experience smooth and stress-free.
          Here&lsquo;s how cancellations and refunds work:
        </p>

        <p className="lg:text-2xl text-lg font-sans my-4">
          <span className="text-xl font-bold">
            1. Order Cancellations (Physical Products)
          </span>{" "}
          <br />
          You can cancel your order within 6 hours of placing it or until it is
          shipped, whichever is earlier.
          <br />
          To cancel, contact us at support@funcircle.in or via in-app support
          chat.
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
          <span className="text-xl font-bold">
            2. Event Bookings (Digital Products)
          </span>
          <br /> Orders are processed within 1-2 business days.
          <br />
          Event bookings are non-refundable unless:
          <br />
          The event is canceled by us
          <br />
          There is a change in event date/time and you&apos;re unable to attend
          <br />
          If eligible, refunds will be processed within 7-10 working days.
          <br />
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
          <span className="text-xl font-bold">
            3. Refunds for Physical Products
          </span>
          <br /> Standard shipping: ₹49 flat rate
          <br />
          If you receive a damaged or incorrect item, contact us within 48 hours
          of delivery with photo proof.
          <br />
          Once approved, we will offer a replacement or issue a full refund.
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
          <span className="text-xl font-bold">4. Refund Method</span>
          <br /> All refunds will be credited to your original payment method
          (UPI, card, wallet, etc.)
        </p>
        <p className="lg:text-2xl text-lg font-sans my-4">
          <span className="text-xl font-bold">5. Non-Refundable Items</span>
          <br />
          Custom merchandise or personalized kits
          <br />
          Event passes once redeemed
        </p>
      </div>
    </div>
  );
}
