import React from "react";
import { Metadata } from "next";
import CustomHeader from "@/components/header-footers/CustomHeader";
import FunCircleClient from "./FunCircleClient";

// SEO Metadata
export const metadata: Metadata = {
  title: "Book Sports Events in Gurgaon & Delhi NCR - Play Badminton, Football, Tennis | FunCircle",
  description: "Book badminton, football, tennis, box cricket & pickleball games in Gurgaon. Play with same level players. Unlimited games pass available. Areas: Sector 52, 57, 62, 65, 48, 23, Wazirabad, Palam Vihar.",
  keywords: "play badminton gurgaon, play football gurgaon, play pickleball gurgaon, book badminton pass, unlimited games gurgaon, cheap badminton games, badminton games near me, play with same level, sports booking gurgaon, tennis booking delhi ncr, box cricket gurgaon, sector 52 badminton, sector 57 sports, sector 62 games, sector 65 badminton, sector 48 sports, sector 23 games, wazirabad sports, palam vihar badminton",
  authors: [{ name: "FunCircle" }],
  creator: "FunCircle",
  publisher: "FunCircle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Book Sports Events in Gurgaon & Delhi NCR - Play Badminton, Football, Tennis",
    description: "Book badminton, football, tennis, box cricket & pickleball games in Gurgaon. Play with same level players. Unlimited games pass available.",
    url: "https://funcircle.com/sports-booking-gurgaon",
    siteName: "FunCircle",
    images: [
      {
        url: "https://funcircle.com/images/sports-booking-gurgaon.jpg",
        width: 1200,
        height: 630,
        alt: "Sports booking in Gurgaon - Badminton, Football, Tennis",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Sports Events in Gurgaon & Delhi NCR - Play Badminton, Football, Tennis",
    description: "Book badminton, football, tennis, box cricket & pickleball games in Gurgaon. Play with same level players.",
    images: ["https://funcircle.com/images/sports-booking-gurgaon.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://funcircle.com/sports-booking-gurgaon",
  },
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FunCircle - Sports Booking Gurgaon",
  description: "Book badminton, football, tennis, box cricket and pickleball games in Gurgaon and Delhi NCR. Play with same level players.",
  url: "https://funcircle.com",
  telephone: "+91-XXXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gurgaon",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    postalCode: "122001",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.4595,
    longitude: 77.0266
  },
  openingHours: "Mo-Su 06:00-23:00",
  priceRange: "₹₹",
  servesCuisine: "Sports Services",
  areaServed: [
    "Gurgaon",
    "Delhi NCR", 
    "Sector 52 Gurgaon",
    "Sector 57 Gurgaon",
    "Sector 62 Gurgaon", 
    "Sector 65 Gurgaon",
    "Sector 48 Gurgaon",
    "Sector 23 Gurgaon",
    "Wazirabad Gurgaon",
    "Palam Vihar Gurgaon"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sports Booking Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Badminton Court Booking",
          description: "Book badminton courts in Gurgaon. Play with same level players."
        }
      },
      {
        "@type": "Offer", 
        itemOffered: {
          "@type": "Service",
          name: "Football Ground Booking",
          description: "Book football grounds in Gurgaon and Delhi NCR."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service", 
          name: "Tennis Court Booking",
          description: "Book tennis courts in Gurgaon sectors."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pickleball Court Booking", 
          description: "Play pickleball in Gurgaon with unlimited games pass."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Box Cricket Booking",
          description: "Book box cricket venues in Gurgaon and Delhi NCR."
        }
      }
    ]
  }
};

export default async function FunCircle() {
  try {
    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        <div className="bg-[#131315] min-h-screen overflow-hidden">
          {/* Hidden SEO Content - Critical for rankings */}
          <div className="sr-only">
            <h1>Book Sports Events in Gurgaon & Delhi NCR - Play Badminton, Football, Tennis, Pickleball</h1>
            <p>FunCircle offers sports booking services in Gurgaon including badminton court booking, football ground booking, tennis court booking, pickleball court booking, and box cricket venue booking. Play with same level players in areas like Sector 52, Sector 57, Sector 62, Sector 65, Sector 48, Sector 23, Wazirabad, and Palam Vihar.</p>
            
            <h2>Sports Available for Booking</h2>
            <ul>
              <li>Play badminton in Gurgaon - Book badminton courts with unlimited games pass</li>
              <li>Play football in Gurgaon - Book football grounds in Delhi NCR</li>
              <li>Play tennis in Gurgaon - Tennis court booking in all sectors</li>
              <li>Play pickleball in Gurgaon - Cheap pickleball games near me</li>
              <li>Play box cricket in Gurgaon - Box cricket venue booking</li>
            </ul>
            
            <h2>Areas We Serve in Gurgaon</h2>
            <ul>
              <li>Badminton games in Sector 52 Gurgaon</li>
              <li>Football booking in Sector 57 Gurgaon</li>
              <li>Tennis courts in Sector 62 Gurgaon</li>
              <li>Sports booking in Sector 65 Gurgaon</li>
              <li>Play badminton in Sector 48 Gurgaon</li>
              <li>Sports events in Sector 23 Gurgaon</li>
              <li>Play football in Wazirabad Gurgaon</li>
              <li>Badminton courts in Palam Vihar Gurgaon</li>
            </ul>
            
            <h2>Why Choose FunCircle?</h2>
            <p>Unlimited games pass available. Play with same level players. Cheap badminton games. Sports booking near me. Best rates for badminton pass booking in Gurgaon and Delhi NCR.</p>
          </div>
          
          <CustomHeader />
          <FunCircleClient />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return (
      <div className="bg-[#131315] min-h-screen overflow-hidden text-white p-8">
        <CustomHeader />
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sports Booking in Gurgaon - FunCircle</h1>
          <p className="text-red-500 mb-4">Something went wrong loading sports events 😢</p>
          <p className="text-gray-300">
            We are working to fix this issue. Meanwhile, you can still book badminton, football, tennis, 
            pickleball, and box cricket games in Gurgaon areas like Sector 52, Sector 57, Sector 62, 
            Sector 65, Sector 48, Sector 23, Wazirabad, and Palam Vihar.
          </p>
        </div>
      </div>
    );
  }
}