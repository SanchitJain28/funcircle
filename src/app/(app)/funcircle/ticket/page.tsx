import React from "react";
import { Suspense } from "react";
import { Metadata } from "next";
import TicketClient from "./TicketClient";
import axios from "axios";
import TicketLoadingSkeleton from "./Loading/LoadingSkeletonForTicket";

export interface TicketType {
  id: number;
  bookedtickets: number;
  capacity: number;
  ticketstatus: string;
  type: string;
  title: string;
  location: string;
  price: string;
  availablecapacity: number;
  description: string;
  enddatetime: Date;
  startdatetime: Date;
  group_id: number;
  servicecharge:string
  venueid: {
    images: string[];
    info: string;
    location: string;
    maps_link: string;
    venue_name: string;
  };
}

interface TicketPageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
  colorScheme: "light",
};

// Generate metadata for SEO
export async function generateMetadata({
  searchParams,
}: TicketPageProps): Promise<Metadata> {
  const { id } = await searchParams;

  if (!id) {
    return {
      title: "Ticket Not Found",
      description: "The requested ticket could not be found.",
      robots: "noindex, nofollow",
    };
  }

  try {
    const {
      data: { ticket },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/FetchIndividualTicket?id=${id}`
    );

    const startDate = new Date(ticket.startdatetime);
    // const endDate = new Date(ticket.enddatetime);
    const formattedStartDate = startDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const availabilityText = "Available Now";

    const title = `${ticket.title} - ${formattedStartDate} | ${availabilityText}`;
    const description = `${ticket.description.substring(0, 150)}... Join us at ${ticket.venueid.venue_name} in ${ticket.location}. ${ticket.availablecapacity} tickets available starting at ${ticket.price}.`;

    return {
      title,
      description,
      keywords: [
        ticket.title,
        ticket.type,
        ticket.location,
        ticket.venueid.venue_name,
        "event tickets",
        "buy tickets",
        formattedStartDate,
        ticket.ticketstatus,
      ].join(", "),
      authors: [{ name: "Event Organizer" }],
      category: "Events",
      openGraph: {
        title,
        description,
        type: "website",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets?id=${id}`,
        images: ticket.venueid.images.map((image: string) => ({
          url: image,
          width: 1200,
          height: 630,
          alt: `${ticket.title} at ${ticket.venueid.venue_name}`,
        })),
        siteName: "EventTickets",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ticket.venueid.images,
        creator: "@EventTickets",
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets?id=${id}`,
        languages: {
          "en-US": `${process.env.NEXT_PUBLIC_BASE_URL}/tickets?id=${id}`,
          "x-default": `${process.env.NEXT_PUBLIC_BASE_URL}/tickets?id=${id}`,
        },
      },
      icons: {
        icon: [
          { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
          { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [
          { url: "/apple-icon-180.png", sizes: "180x180", type: "image/png" },
        ],
        other: [
          { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
        ],
      },
      manifest: "/site.webmanifest",
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
      other: {
        "event:start_time": ticket.startdatetime,
        "event:end_time": ticket.enddatetime,
        "event:location": `${ticket.venueid.venue_name}, ${ticket.location}`,
        "product:price:amount": ticket.price.replace(/[^\d.]/g, ""),
        "product:price:currency": "USD",
        "product:availability": "in stock",
        // Additional meta links and tags
        "msapplication-TileColor": "#da532c",
        "msapplication-config": "/browserconfig.xml",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "default",
        "apple-mobile-web-app-title": "EventTickets",
        "mobile-web-app-capable": "yes",
        "format-detection": "telephone=no",
        referrer: "origin-when-cross-origin",
        "dns-prefetch": "https://fonts.googleapis.com",
        preconnect: "https://fonts.gstatic.com",
        preload: JSON.stringify([
          {
            href: "/fonts/main.woff2",
            as: "font",
            type: "font/woff2",
            crossorigin: "anonymous",
          },
          { href: ticket.venueid.images[0], as: "image" },
        ]),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Event Ticket",
      description: "View event details and purchase tickets",
      robots: "noindex, nofollow",
    };
  }
}

// Generate JSON-LD structured data
function generateStructuredData(ticket: TicketType) {
  const startDate = new Date(ticket.startdatetime);
  const endDate = new Date(ticket.enddatetime);

  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ticket.title,
    description: ticket.description,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: ticket.venueid.venue_name,
      address: {
        "@type": "PostalAddress",
        addressLocality: ticket.location,
        addressCountry: "US",
      },
      url: ticket.venueid.maps_link,
      additionalProperty: {
        "@type": "PropertyValue",
        name: "venue_info",
        value: ticket.venueid.info,
      },
    },
    image: ticket.venueid.images,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets?id=${ticket.id}`,
      price: ticket.price.replace(/[^\d.]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
      validThrough: endDate.toISOString(),
      seller: {
        "@type": "Organization",
        name: "EventTickets",
      },
      inventoryLevel: {
        "@type": "QuantitativeValue",
        value: ticket.availablecapacity,
      },
    },
    performer: {
      "@type": "Organization",
      name: "Event Organizer",
    },
    organizer: {
      "@type": "Organization",
      name: "Event Organizer",
    },
    maximumAttendeeCapacity: ticket.capacity,
    remainingAttendeeCapacity: ticket.availablecapacity,
    typicalAgeRange: "18+",
    isAccessibleForFree: false,
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Events",
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/events`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ticket.title,
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets?id=${ticket.id}`,
      },
    ],
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EventTickets",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/EventTickets",
      "https://facebook.com/EventTickets",
      "https://instagram.com/EventTickets",
    ],
  };

  return {
    event: eventStructuredData,
    breadcrumb: breadcrumbStructuredData,
    organization: organizationStructuredData,
  };
}

export default async function Page({ searchParams }: TicketPageProps) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Ticket Not Found
          </h1>
          <p className="text-gray-600">
            No ticket ID was provided. Please check your link and try again.
          </p>
        </div>
      </div>
    );
  }

  try {
    const {
      data: { ticket },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/FetchIndividualTicket?id=${id}`
    );

    const structuredData = generateStructuredData(ticket);

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.event),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.breadcrumb),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />

        {/* Additional Meta Links */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.example.com" />
        <link
          rel="prefetch"
          href={`/api/FetchRelatedEvents?location=${ticket.location}`}
        />
        <link rel="preload" href={ticket.venueid.images[0]} as="image" />

        {/* RSS/Atom Feeds */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Event Updates"
          href="/feeds/events.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Event Updates"
          href="/feeds/events.atom"
        />

        {/* Security and Privacy */}
        <link rel="author" href="/humans.txt" />
        <link rel="license" href="/license.txt" />

        {/* Performance Hints */}
        <link rel="modulepreload" href="/js/ticket-client.js" />
        <link rel="stylesheet" href="/css/critical.css" />

        {/* SEO Related Links */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="robots" href="/robots.txt" />

        {/* Social Media Verification */}
        <meta
          name="google-site-verification"
          content="your-verification-code"
        />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta
          name="yandex-verification"
          content="your-yandex-verification-code"
        />

        {/* OpenGraph Article Tags */}
        <meta
          property="article:published_time"
          content={new Date(ticket.startdatetime).toISOString()}
        />
        <meta
          property="article:modified_time"
          content={new Date().toISOString()}
        />
        <meta property="article:section" content="Events" />
        <meta property="article:tag" content={ticket.type} />

        {/* Additional OpenGraph */}
        <meta property="og:updated_time" content={new Date().toISOString()} />
        <meta
          property="og:see_also"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/events`}
        />
        <meta property="place:location:latitude" content="40.7128" />
        <meta property="place:location:longitude" content="-74.0060" />

        {/* Twitter Specific */}
        <meta
          name="twitter:domain"
          content={process.env.NEXT_PUBLIC_BASE_URL?.replace("https://", "")}
        />
        <meta
          name="twitter:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/tickets?id=${id}`}
        />
        <meta name="twitter:label1" content="Price" />
        <meta name="twitter:data1" content={ticket.price} />
        <meta name="twitter:label2" content="Available" />
        <meta name="twitter:data2" content={ticket.availablecapacity} />

        {/* Main Content */}
        <Suspense fallback={<TicketLoadingSkeleton />}>
          <TicketClient ticket={ticket} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Ticket
          </h1>
          <p className="text-gray-600">
            We could not load the ticket information. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
