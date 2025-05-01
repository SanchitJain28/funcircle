import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="border-b bg-black backdrop-blur-md w-full h-32 -mt-8 text-white">
      <div className="flex items-center justify-between px-6 py-4 lg:py-6">
        {/* Logo */}
        <img
          src="funCircle_white_svg.svg"
          alt="FunCircle logo"
          className="max-h-32 lg:max-h-28 object-contain stroke-black
"
        />

        {/* Desktop Links */}
        <nav className="hidden lg:flex gap-6 text-lg font-light">
          <Link href="/">Home</Link>
          <Link href="/about">About us</Link>
          <Link href="/contactUs">Contact us</Link>
          <Link href="/privacyPolicy">Privacy policy</Link>
          <Link href="/termsandservice">Terms and conditions</Link>
        </nav>

        {/* Mobile Dropdown */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about">About us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/contactUs">Contact us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/privacyPolicy">Privacy policy</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/termsandservice">Terms and conditions</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
