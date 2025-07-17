import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, MapPin, Calendar, Clock, Users } from "lucide-react";
import React from "react";
import { createClient } from "@/app/utils/supabase/server";
import BadmintonHeader from "@/components/header-footers/BadmintonHeader";
import Footer from "@/components/header-footers/footer";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default async function VenuePage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const supabase = await createClient();
  const { location } = await params;
  const venue_id = Number(location);

  if (isNaN(venue_id)) {
    notFound();
  }

  const { data: venue, error } = await supabase
    .from("venues")
    .select("*")
    .eq("id", venue_id)
    .single();

  if (error || !venue) {
    return (
      <div className="min-h-screen bg-white">
        <BadmintonHeader />

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Badminton Venue Not Found in Gurgaon
            </h1>
            <p className="text-gray-600 mb-8">
              The badminton venue you are looking for does not exist or there
              was an error loading it. Find other badminton courts in Gurgaon
              and Delhi NCR.
            </p>
            <Link
              href="/venues"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Browse All Badminton Venues
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(venue.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Extract location-specific keywords
  const isGurgaon =
    venue.location.toLowerCase().includes("gurgaon") ||
    venue.location.toLowerCase().includes("gurugram");
  const isDelhi = venue.location.toLowerCase().includes("delhi");
  const locationKeywords = isGurgaon
    ? "Gurgaon, Gurugram, Delhi NCR"
    : isDelhi
      ? "Delhi, Delhi NCR, Gurgaon"
      : "Delhi NCR";

  return (
    <main className={archivo.className + " bg-white min-h-screen "}>
      <BadmintonHeader />

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsActivityLocation",
            name: venue.venue_name,
            description: `Play badminton at ${venue.venue_name} in ${venue.location}. Premium badminton courts for weekend games, tournaments, and players of all skill levels in ${locationKeywords}.`,
            address: {
              "@type": "PostalAddress",
              addressLocality: venue.location,
              addressRegion: "Haryana",
              addressCountry: "IN",
            },
            sport: "Badminton",
            url: venue.maps_link,
            image: venue.images,
            priceRange: "$$",
            openingHours: "Mo-Su 06:00-22:00",
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Header with SEO-optimized content */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {venue.venue_name} - Premium Badminton Courts in {venue.location}
            </h1>

            {/* SEO-rich subtitle */}
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Play badminton in {locationKeywords} at our premium courts.
              Perfect for weekend games, tournaments, and finding players of
              similar skill levels. Book your court now!
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{venue.location}, Delhi NCR</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Added {formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Open 6 AM - 10 PM</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>All Skill Levels Welcome</span>
              </div>
            </div>

            {venue.maps_link && (
              <Link
                href={venue.maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                <MapPin className="w-4 h-4" />
                View on Maps
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </header>

          {/* Images with SEO-friendly alt text */}
          {venue.images && venue.images.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Badminton Court Photos - {venue.venue_name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {venue.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Badminton court at ${venue.venue_name} in ${venue.location} - Professional badminton courts for weekend games and tournaments`}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SEO-optimized description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose {venue.venue_name} for Badminton in {venue.location}?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
                {venue.description}
              </p>

              {/* Additional SEO content */}
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Perfect for Weekend Badminton Games
                </h3>
                <p className="text-gray-700 mb-3">
                  Looking to play badminton on weekends in {locationKeywords}?
                  Our courts are available for booking throughout the week, with
                  special weekend slots for recreational players, competitive
                  matches, and tournaments.
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • Premium wooden/synthetic courts suitable for all playing
                    styles
                  </li>
                  <li>• Weekend availability from 6 AM to 10 PM</li>
                  <li>
                    • Find and connect with players of similar skill levels
                  </li>
                  <li>• Professional lighting and ventilation systems</li>
                  <li>• Easy booking and flexible timing options</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Connect with Badminton Players in {locationKeywords}
                </h3>
                <p className="text-gray-700">
                  Join our community of badminton enthusiasts in{" "}
                  {venue.location}. Whether you&apos;re a beginner looking to
                  learn or an advanced player seeking competitive matches,
                  you&apos;ll find players of similar skill levels here. Perfect
                  for regular weekend games, coaching sessions, and tournament
                  preparation.
                </p>
              </div>
            </div>
          </section>

          {/* Enhanced Venue Details */}
          <section className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Badminton Court Details - {venue.venue_name}
            </h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-gray-900">Court Type</dt>
                <dd className="text-gray-700">Professional Badminton Courts</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Location</dt>
                <dd className="text-gray-700">{venue.location}, Delhi NCR</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Best For</dt>
                <dd className="text-gray-700">
                  Weekend Games, Tournaments, All Skill Levels
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Operating Hours</dt>
                <dd className="text-gray-700">6:00 AM - 10:00 PM (All Days)</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Facilities</dt>
                <dd className="text-gray-700">
                  Parking, Changing Rooms, Equipment Rental
                </dd>
              </div>
              {venue.maps_link && (
                <div>
                  <dt className="font-medium text-gray-900">Directions</dt>
                  <dd>
                    <Link
                      href={venue.maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                    >
                      Get Directions to Badminton Court
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {/* FAQ Section for SEO */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I play badminton on weekends at {venue.venue_name}?
                </h3>
                <p className="text-gray-700">
                  Yes! We&apos;re open 6 AM to 10 PM on weekends. Perfect for
                  weekend badminton games with friends or finding new players of
                  similar skill levels.
                </p>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I find players of similar skill levels?
                </h3>
                <p className="text-gray-700">
                  Our venue regularly hosts players of all levels. You can
                  connect with other players during peak hours or join our
                  community groups for organized games in {locationKeywords}.
                </p>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is this venue suitable for tournaments?
                </h3>
                <p className="text-gray-700">
                  Absolutely! Our professional courts meet tournament standards
                  and regularly host competitive matches and tournaments in{" "}
                  {venue.location}.
                </p>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <nav className="border-t pt-6">
            <Link
              href="/venues"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to All Badminton Venues in Delhi NCR
            </Link>
          </nav>
        </article>
      </div>

      <Footer />
    </main>
  );
}

// Enhanced SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const venue_id = Number(location);

  if (isNaN(venue_id)) {
    return {
      title: "Badminton Venue Not Found - Play Badminton in Gurgaon Delhi NCR",
      description:
        "Find the best badminton courts in Gurgaon and Delhi NCR for weekend games and tournaments.",
    };
  }

  const supabase = await createClient();
  const { data: venue } = await supabase
    .from("venues")
    .select("venue_name, description, location")
    .eq("id", venue_id)
    .single();

  if (!venue) {
    return {
      title: "Badminton Venue Not Found - Play Badminton in Gurgaon Delhi NCR",
      description:
        "Find the best badminton courts in Gurgaon and Delhi NCR for weekend games and tournaments.",
    };
  }

  const isGurgaon =
    venue.location.toLowerCase().includes("gurgaon") ||
    venue.location.toLowerCase().includes("gurugram");
  const isDelhi = venue.location.toLowerCase().includes("delhi");
  const locationKeywords = isGurgaon
    ? "Gurgaon Gurugram Delhi NCR"
    : isDelhi
      ? "Delhi NCR Gurgaon"
      : "Delhi NCR";

  const title = `${venue.venue_name} - Play Badminton in ${locationKeywords} | Weekend Courts`;
  const description = `Play badminton at ${venue.venue_name} in ${venue.location}. Premium courts for weekend games, tournaments & players of all skill levels. Book now in ${locationKeywords}! ${venue.description.slice(0, 100)}...`;

  return {
    title,
    description,
    keywords: [
      "play badminton in gurgaon",
      "play badminton in delhi ncr",
      "badminton courts gurgaon",
      "weekend badminton games",
      "badminton players similar level",
      "badminton tournament",
      venue.location.toLowerCase(),
      "book badminton court",
      "badminton club",
      "professional badminton courts",
    ].join(", "),
    openGraph: {
      title: `${venue.venue_name} - Premium Badminton Courts in ${venue.location}`,
      description: `Play badminton in ${locationKeywords} at our premium courts. Perfect for weekend games, tournaments, and finding players of similar skill levels.`,
      type: "website",
      locale: "en_IN",
      siteName: "Badminton Courts Delhi NCR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${venue.venue_name} - Play Badminton in ${locationKeywords}`,
      description: `Premium badminton courts for weekend games and tournaments in ${venue.location}. Find players of similar skill levels!`,
    },
    alternates: {
      canonical: `https://yourwebsite.com/venues/${venue_id}`,
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
  };
}
