import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "@/components/ui/sonner"
import AppContext from "./Contexts/AppContext";
import BackgroundChanger from "./components/BackgroundChanger";
import { Analytics } from "@vercel/analytics/react"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "favicon.ico"
  },
  title: "Fun circle",
  description: "An app for events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const pathname = usePathname();

  // useEffect(() => {
  //   // Set background color based on route
  //   document.body.style.backgroundColor = pathname === "/" ? "white" : "#131315";
  // }, [pathname]); // Runs when route changes
  
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContext>
        <BackgroundChanger />
          {children}
          <Analytics />

          <Toaster />
        </AppContext>
      </body>
    </html>
  );
}
