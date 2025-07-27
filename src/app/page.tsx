import LandingPage from "@/components/ecommerce/Home";
import React from "react";

export const metadata = {
  title:
    "Play Sports in Gurgaon - Book Badminton, Football, Tennis Courts Near Me",
  description:
    "Book badminton courts, football grounds, tennis courts in Gurgaon. Play with groups, compete on leaderboards. Find sports venues near Sector 57, 52, 48, 23, Palam Vihar.",
  keywords: [
    "play badminton in Gurgaon",
    "play football in Gurgaon",
    "play tennis in Gurgaon",
    "badminton court near me",
    "football ground near me",
    "tennis court near me",
    "sports booking Gurgaon",
    "Sector 57 badminton",
    "Sector 52 football",
    "Sector 48 tennis",
    "Palam Vihar sports",
    "Wazirabad grounds",
    "play badminton in Sector 57 Gurgaon",
    "play football in Sector 52 Gurgaon",
    "play tennis in Sector 48 Gurgaon",
    "play tennis in Sector 23 Gurgaon",
    "play tennis in Sector 62 Gurgaon",
    "play tennis in Sector 65 Gurgaon",
    "sports venues Gurgaon",
    "book sports courts Gurgaon",
  ].join(", "),
  authors: [{ name: "SportBooking" }],
  creator: "SportBooking",
  publisher: "SportBooking",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://funcircleapp.com",
    siteName: "SportBooking Gurgaon",
    title: "Play Sports in Gurgaon - Book Courts & Grounds Near Me",
    description:
      "Book badminton courts, football grounds, tennis courts in Gurgaon. Join groups, compete on leaderboards, play with same-level players near you.",
    images: [
      {
        url: "https://funcircleapp.com/funCircle_white_svg.svg",
        width: 1200,
        height: 630,
        alt: "Sports Booking in Gurgaon - Play Badminton, Football, Tennis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Play Sports in Gurgaon - Book Courts Near Me",
    description:
      "Book sports venues in Gurgaon. Badminton, football, tennis courts available across all sectors. Join groups and compete!",
  },
  alternates: {
    canonical: "https://funcircleapp.com",
    languages: {
      "en-IN": "https://funcircleapp.com",
    },
  },
  other: {
    "geo.region": "IN-HR",
    "geo.placename": "Gurgaon, Haryana",
    "geo.position": "28.4595;77.0266",
    ICBM: "28.4595, 77.0266",
    "DC.title": "Play Sports in Gurgaon - Book Courts & Grounds",
    "DC.description":
      "Premium sports booking platform for Gurgaon. Find badminton, football, tennis venues near you.",
    "DC.subject": "Sports Booking, Gurgaon Sports, Court Booking",
    "DC.coverage": "Gurgaon, Haryana, India",
    "format-detection": "telephone=yes",
    "mobile-web-app-capable": "yes",
  },
};

export default function page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where can I play badminton in Gurgaon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can play badminton in multiple locations across Gurgaon including Sector 57, Sector 48, Palam Vihar, and other areas. We have 45+ badminton courts available for booking.",
        },
      },
      {
        "@type": "Question",
        name: "How to find football grounds near me in Gurgaon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Football grounds are available in Sector 52, Sector 62, Sector 65, and Wazirabad areas of Gurgaon. Use our platform to find and book grounds near your location.",
        },
      },
      {
        "@type": "Question",
        name: "Can I play tennis in Sector 23 Gurgaon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, tennis courts are available in Sector 23, Sector 48, Sector 62, Sector 65, and Palam Vihar areas of Gurgaon. Book courts instantly through our platform.",
        },
      },
      {
        "@type": "Question",
        name: "What sports can I play in Gurgaon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can play badminton, football, tennis, pickleball, and table tennis across various locations in Gurgaon. Join groups and compete with players of your skill level.",
        },
      },
    ],
  };

  // Area-specific structured data
  const areaSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sports Venues by Area in Gurgaon",
    description:
      "Sports facilities available across different sectors in Gurgaon",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Place",
          name: "Sports Venues in Sector 57, Gurgaon",
          description: "Badminton and Pickleball courts in Sector 57",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sector 57",
            addressLocality: "Gurgaon",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Place",
          name: "Sports Venues in Sector 52, Gurgaon",
          description: "Football grounds and Table Tennis in Sector 52",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sector 52",
            addressLocality: "Gurgaon",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Place",
          name: "Sports Venues in Sector 48, Gurgaon",
          description: "Tennis and Badminton courts in Sector 48",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sector 48",
            addressLocality: "Gurgaon",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
        },
      },
    ],
  };

  // Structured Data for Sports Activities
  const sportsActivitySchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Sports Venues in Gurgaon",
    description:
      "Premium sports facilities across Gurgaon including badminton, football, tennis, pickleball and table tennis venues",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    sport: ["Badminton", "Football", "Tennis", "Pickleball", "Table Tennis"],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Group Play",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Skill-based Matching",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Leaderboards",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Online Booking",
        value: true,
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SportBooking - Play Sports in Gurgaon",
    description:
      "Book badminton courts, football grounds, tennis courts, and more in Gurgaon. Join groups, compete on leaderboards, and play with same-level players.",
    url: "https://yourwebsite.com",
    telephone: "+91-XXXXXXXXXX",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Address",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      postalCode: "122001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4595,
      longitude: 77.0266,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Gurgaon",
        containedInPlace: {
          "@type": "State",
          name: "Haryana",
        },
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 28.4595,
        longitude: 77.0266,
      },
      geoRadius: "25000",
    },
    priceRange: "₹₹",
    openingHours: "Mo-Su 06:00-23:00",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sports Booking Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Badminton Court Booking",
            description: "Book badminton courts in Gurgaon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Football Ground Booking",
            description: "Book football grounds in Gurgaon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tennis Court Booking",
            description: "Book tennis courts in Gurgaon",
          },
        },
      ],
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Structured Data - Sports Activity */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sportsActivitySchema),
        }}
      />

      {/* Structured Data - Area List */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(areaSchema),
        }}
      />

      {/* Structured Data - FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <LandingPage />
    </div>
  );
}
