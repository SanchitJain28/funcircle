import CustomHeader from "@/components/header-footers/CustomHeader";
import React from "react";
import EventTicketClient from "./EventTicketClient";
import { createClient } from "@/app/utils/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TicketType } from "@/app/types";

// Use the provided TicketType interface

interface EventTicketPageProps {
  params: Promise<{
    group_id: string;
  }>;
}

// Enhanced error types
class TicketError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "TicketError";
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: EventTicketPageProps): Promise<Metadata> {
  const { group_id } = await params;

  try {
    const supabase = await createClient();
    const { data: tickets, error } = await supabase
      .from("tickets")
      .select(`*,venueid(*)`)
      .eq("group_id", group_id)
      .eq("ticketstatus", "live");

    if (error || !tickets || tickets.length === 0) {
      return {
        title: "Event Tickets - Not Found",
        description: "The requested event tickets could not be found.",
        robots: "noindex, nofollow",
      };
    }

    const firstTicket = tickets[0] as TicketType;
    const venue = firstTicket.venueid;
    const eventDate = new Date(firstTicket.startdatetime);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const title = `${firstTicket.title} - Event Tickets`;
    const description = firstTicket.description
      ? `${firstTicket.description.substring(0, 150)}...`
      : `Get tickets for ${firstTicket.title} on ${formattedDate} at ${venue.venue_name}. Starting from ${firstTicket.price}.`;

    return {
      title,
      description,
      keywords: [
        firstTicket.title,
        "event tickets",
        "buy tickets",
        venue.venue_name,
        venue.location,
        firstTicket.type,
      ]
        .filter(Boolean)
        .join(", "),
      openGraph: {
        title,
        description,
        type: "website",
        images:
          venue.images && venue.images.length > 0
            ? [
                {
                  url: venue.images[0],
                  width: 1200,
                  height: 630,
                  alt: firstTicket.title,
                },
              ]
            : undefined,
        locale: "en_US",
        siteName: "Event Tickets",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          venue.images && venue.images.length > 0
            ? [venue.images[0]]
            : undefined,
      },
      alternates: {
        canonical: `/events/${group_id}/tickets`,
      },
      other: {
        "event:start_time": firstTicket.startdatetime.toISOString(),
        "event:end_time": firstTicket.enddatetime.toISOString(),
        "event:location": `${venue.venue_name}, ${venue.location}`,
        "product:price:amount": firstTicket.price,
        "product:price:currency": "USD",
        "product:availability":
          firstTicket.availablecapacity > 0 ? "in stock" : "out of stock",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Event Tickets",
      description: "Find and purchase event tickets",
      robots: "noindex, nofollow",
    };
  }
}

export default async function EventTicketPage({
  params,
}: EventTicketPageProps) {
  const { group_id } = await params;

  // Validate group_id format
  if (!group_id || group_id.trim() === "") {
    throw new TicketError("Invalid group ID provided", "INVALID_GROUP_ID", 400);
  }

  // Convert group_id to number for database query
  const groupIdNumber = parseInt(group_id, 10);
  if (isNaN(groupIdNumber)) {
    throw new TicketError(
      "Invalid group ID format",
      "INVALID_GROUP_ID_FORMAT",
      400
    );
  }

  const supabase = await createClient();

  try {
    // Enhanced query with better error handling
    const { data, error } = await supabase
      .from("tickets")
      .select(`*,venueid(*)`)
      .eq("group_id", group_id)
      .eq("ticketstatus", "live");
    // Handle Supabase specific errors
    if (error) {
      console.error("Supabase error:", error);

      if (error.code === "PGRST116") {
        throw new TicketError("Event group not found", "GROUP_NOT_FOUND", 404);
      }

      if (error.code === "PGRST301") {
        throw new TicketError(
          "Database connection failed",
          "DB_CONNECTION_ERROR",
          503
        );
      }

      throw new TicketError(
        "Failed to fetch tickets from database",
        "DB_FETCH_ERROR",
        500
      );
    }

    // Handle no tickets found
    if (!data || data.length === 0) {
      return (
        <>
          <CustomHeader />;
          <EventTicketClient group_id={group_id} data={[]} />
        </>
      );
    }

    // Type the data properly
    const typedData: TicketType[] = data as TicketType[];

    // Validate data integrity
    const validTickets = typedData.filter((ticket) => {
      return ticket.id && ticket.title && ticket.price && ticket.venueid;
    });

    if (validTickets.length === 0) {
      throw new TicketError("No valid tickets found", "NO_VALID_TICKETS", 404);
    }

    // Generate JSON-LD structured data for SEO
    const firstTicket = validTickets[0];
    const venue = firstTicket.venueid;
    const eventStartDate = new Date(firstTicket.startdatetime);
    const eventEndDate = new Date(firstTicket.enddatetime);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: firstTicket.title,
      description: firstTicket.description,
      startDate: eventStartDate.toISOString(),
      endDate: eventEndDate.toISOString(),
      location: {
        "@type": "Place",
        name: venue.venue_name,
        address: venue.location,
      },
      offers: validTickets.map((ticket) => ({
        "@type": "Offer",
        name: ticket.title,
        description: ticket.description,
        price: ticket.price,
        priceCurrency: "USD",
        availability:
          ticket.availablecapacity > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        url: `/events/${group_id}/tickets/${ticket.id}`,
      })),
      organizer: {
        "@type": "Organization",
        name: "Event Tickets Platform",
      },
      image: venue.images && venue.images.length > 0 ? venue.images : undefined,
    };

    return (
      <>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <div className="min-h-screen bg-[#0f0f11]">
          <CustomHeader />
          <EventTicketClient group_id={group_id} data={validTickets} />
        </div>
      </>
    );
  } catch (error) {
    console.error("EventTicketPage error:", error);

    // Handle different error types
    if (error instanceof TicketError) {
      if (error.statusCode === 404) {
        notFound();
      }

      return (
        <div className="min-h-screen bg-[#0f0f11]">
          <CustomHeader />
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <div className="max-w-md w-full bg-red-900/20 border border-red-800 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-red-400 mb-2">
                {error.statusCode === 503
                  ? "Service Unavailable"
                  : "Error Loading Tickets"}
              </h2>
              <p className="text-red-300 mb-4">{error.message}</p>
            </div>
          </div>
        </div>
      );
    }

    // Generic error fallback
    return (
      <div className="min-h-screen bg-[#0f0f11]">
        <CustomHeader />
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <div className="max-w-md w-full bg-red-900/20 border border-red-800 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-400 mb-2">
              Unexpected Error
            </h2>
            <p className="text-red-300 mb-4">
              Something went wrong while loading tickets. Please try again
              later.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
