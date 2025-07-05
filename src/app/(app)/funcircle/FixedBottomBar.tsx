import Link from "next/link";
import React from "react";

export default function FixedBottomBar() {
  return (
    <div className="fixed bottom-0 flex items-center justify-center py-4 px-2 backdrop-blur-md bg-white/9 w-full">
      <Link
        href="/funcircle/eventTicket/90"
        className="bg-white text-black px-4 py-2 rounded-xl ml-4 mr-2 font-medium hover:bg-gray-100 transition-colors"
      >
        Book a slot
      </Link>
      <Link
        href="/new-subscription"
        className="bg-white text-black px-4 py-2 rounded-xl mx-2 font-medium hover:bg-gray-100 transition-colors"
      >
        Monthly pass
      </Link>
    </div>
  );
}
