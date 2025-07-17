import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

export default function BadmintonHeader() {
  const navLinks = [
    { href: "/badminton/groups", label: "Groups" },
    { href: "/badminton/courts", label: "Courts" },
    { href: "/badminton/pass", label: "Pass" },
  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-12 flex items-center justify-between h-24 border-b border-zinc-500">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center -py-2 bg-black rounded-3xl px-12"
        >
          <img
            className="-pu-4 -my-2"
            src="/finalLogofunCircleWhite.png"
            alt="Fun Circle Logo"
            width={120} // Adjust width as needed
            height={30} // Adjust height as needed
            // priority // Optimize loading for LCP
          />
          <span className="sr-only">Fun Circle Home</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-800 hover:text-purple-600 text-lg font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="w-12 h-12" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-800 hover:text-purple-600 text-lg font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
