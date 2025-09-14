import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import AppContext from "./Contexts/AppContext";
import BackgroundChanger from "../components/other-utils/BackgroundChanger";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./Contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "./ReactQueryProvider";
import { AlertProvider } from "./Contexts/AlertContext";
import { ToastProvider } from "./Contexts/ToastContext";
import { ModalProvider, ModalContainer } from "./Contexts/ModalContext";
import { PersistentParamsProvider } from "./Contexts/PersistentParamsContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://funcircleapp.com";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(BASE_URL),
  title: "FunCircle | Find Sports & Social Meetups in Gurgaon and Delhi NCR",
  description:
    "Join local sports & activity groups in Gurgaon, Delhi NCR, Mumbai & more. Cricket, hiking, cycling, social meetups & pay-per-meetup options.",
  keywords:
    "sports groups, cricket near me, football, volleyball, badminton, tennis, hiking groups in Gurgaon, Delhi NCR sports, Bangalore meetups, social activities, beginner-friendly sports",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: BASE_URL,
    title: "FunCircle | Sports & Social Meetups in Gurgaon & Delhi NCR",
    description:
      "Join local sports groups for cricket, football & more activities. Find beginner-friendly sports communities in Gurgaon, Delhi NCR, Bangalore & other cities.",
    siteName: "FunCircle",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "FunCircle - Sports & Social Meetups",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FunCircle | Find Sports & Social Meetups Nearby",
    description:
      "Join cricket, football, volleyball groups & more. Discover hiking, cycling & adventure activities in Delhi NCR, Gurgaon, Bangalore & other cities.",
    images: [`${BASE_URL}/twitter-image.jpg`],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const updatedTime = new Date().toISOString();
  return (
    <html lang="en">
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta property="og:updated_time" content={updatedTime} />
        <meta
          name="google-site-verification"
          content="UQGaRYA5fPhC96DhH3-yVDl9NOWZkeD2FmBednt2LWs"
        />

        {/* Schema.org structured data for sports organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              name: "FunCircle",
              url: BASE_URL,
              logo: `${BASE_URL}/logo.png`,
              description:
                "Platform for sports and social meetups including cricket, football, volleyball, badminton and more in Gurgaon, Delhi NCR, Bangalore, Mumbai and Hyderabad.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/funcircleapp",
                "https://www.instagram.com/funcircleapp",
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${BASE_URL}/`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContext>
          <BackgroundChanger />
          <ReactQueryProvider>
            <AuthProvider>
              <AlertProvider maxAlerts={5}>
                <ToastProvider>
                  <ModalProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                      <PersistentParamsProvider>
                        {children}
                      </PersistentParamsProvider>
                    </Suspense>
                    <ModalContainer />
                  </ModalProvider>
                </ToastProvider>
              </AlertProvider>
            </AuthProvider>
          </ReactQueryProvider>
          <Analytics />
          <ToastContainer autoClose={2000} />
          <Toaster />
        </AppContext>
      </body>
    </html>
  );
}
