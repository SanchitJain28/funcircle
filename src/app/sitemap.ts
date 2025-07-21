// app/sitemap.ts
import { MetadataRoute } from "next";
import axios from "axios";

interface TicketType {
  id: number;
  title: string;
  location: string;
  startdatetime: Date;
  enddatetime: Date;
  ticketstatus: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://funcircleapp.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/funcircle`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    // Add more static pages as needed
  ];

  try {
    // Fetch all active tickets for dynamic pages
    const { data: tickets } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-all-tickets`
    );

    // Generate ticket pages
    const ticketPages = tickets
      .filter((ticket: TicketType) => ticket.ticketstatus === "active")
      .map((ticket: TicketType) => ({
        url: `${baseUrl}/tickets?id=${ticket.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    return [...staticPages, ...ticketPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static pages only if API fails
    return staticPages;
  }
}
