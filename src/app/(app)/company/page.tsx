import BadmintonHeader from "@/components/header-footers/BadmintonHeader";
import Whatsapp from "@/icons/Whatsapp";
import {
  Award,
  Bike,
  Building,
  Calendar,
  ChevronDown,
  Dribbble,
  Dumbbell,
  Gamepad2,
  Instagram,
  Medal,
  Phone,
  Pin,
  ShieldCheck,
  Swords,
  Trophy,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import React from "react";

// SEO Metadata
// / Enhanced SEO Metadata
export const metadata: Metadata = {
  title:
    "Best Company Sports Tournament Organizers in Gurgaon | Cricket, Badminton, Football Events",
  description:
    "Top sport event organizers in Gurgaon specializing in company sports tournaments. Expert cricket, badminton, football, pickleball, table tennis & tennis event organizers. Premium venues across Gurgaon sectors. Book your corporate sports day now!",
  keywords: [
    "company sports tournaments",
    "sport event organizers",
    "cricket event organizers",
    "badminton event organizers",
    "football event organizers",
    "pickleball event organizers",
    "table tennis event organizers",
    "tennis event organizers",
    "corporate sports events Gurgaon",
    "team building sports activities",
    "Gurgaon Badminton Club Sector 52",
    "Sportslane Arena Sector 58",
    "Play All Sector 62",
    "La Riva Sector 65",
    "Flow Sector 48",
    "SSBA Sector 23",
    "JNS Sports Sector 51",
    "PT Sports Sector 5",
    "SmashPro Sector 102",
    "sports tournament planners",
    "corporate sports day organizers",
    "professional sports event management",
  ].join(", "),
  authors: [{ name: "Fun Circle Events" }],
  creator: "Fun Circle Events",
  publisher: "Fun Circle Events",
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
    url: "https://funcircle.com/company-sports-tournaments",
    siteName: "Fun Circle Events",
    title: "Best Company Sports Tournament Organizers in Gurgaon",
    description:
      "Expert sport event organizers in Gurgaon for cricket, badminton, football, pickleball tournaments. Premium venues, professional management, unforgettable corporate sports events.",
    images: [
      {
        url: "https://funcircle.com/images/company-sports-tournaments-gurgaon.jpg",
        width: 1200,
        height: 630,
        alt: "Company Sports Tournaments Gurgaon - Fun Circle Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Company Sports Tournament Organizers in Gurgaon",
    description:
      "Expert sport event organizers for cricket, badminton, football tournaments in Gurgaon. Premium venues, professional management.",
    images: [
      "https://funcircle.com/images/company-sports-tournaments-gurgaon.jpg",
    ],
    creator: "@funcircleapp",
  },
  alternates: {
    canonical: "https://funcircle.com/company-sports-tournaments",
  },
  other: {
    "geo.region": "IN-HR",
    "geo.placename": "Gurgaon",
    "geo.position": "28.4595;77.0266",
    ICBM: "28.4595, 77.0266",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://funcircle.com/#organization",
      name: "Fun Circle Events",
      alternateName: "Fun Circle",
      url: "https://funcircle.com",
      logo: {
        "@type": "ImageObject",
        url: "https://funcircle.com/logo.png",
        width: 200,
        height: 200,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9561079271",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gurgaon",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      sameAs: [
        "https://www.instagram.com/funcircleapp",
        "https://chat.whatsapp.com/Ka9UfFtJHIaH9tSJwjpavS",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://funcircle.com/#localbusiness",
      name: "Fun Circle Events - Sport Event Organizers",
      image:
        "https://funcircle.com/images/company-sports-tournaments-gurgaon.jpg",
      description:
        "Leading sport event organizers in Gurgaon specializing in company sports tournaments including cricket, badminton, football, pickleball, table tennis and tennis events.",
      url: "https://funcircle.com/company-sports-tournaments",
      telephone: "+91-9561079271",
      address: {
        "@type": "PostalAddress",
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
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
      priceRange: "$$",
      servesCuisine: [],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "156",
      },
    },
    {
      "@type": "Service",
      "@id": "https://funcircle.com/#services",
      name: "Company Sports Tournament Organization",
      provider: {
        "@id": "https://funcircle.com/#organization",
      },
      description:
        "Professional sport event organizers providing comprehensive company sports tournament services including cricket, badminton, football, pickleball, table tennis and tennis events in Gurgaon.",
      areaServed: {
        "@type": "City",
        name: "Gurgaon",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Sports Tournament Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cricket Event Organization",
              description:
                "Professional cricket tournament organization for companies",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Badminton Event Organization",
              description:
                "Expert badminton tournament planning and management",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Football Event Organization",
              description:
                "Professional football tournament organization services",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pickleball Event Organization",
              description:
                "Modern pickleball tournament organization for corporates",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Table Tennis Event Organization",
              description: "Professional table tennis tournament management",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Tennis Event Organization",
              description: "Expert tennis tournament planning and execution",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://funcircle.com/#website",
      url: "https://funcircle.com",
      name: "Fun Circle Events",
      description:
        "Leading sport event organizers in Gurgaon for company sports tournaments",
      publisher: {
        "@id": "https://funcircle.com/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://funcircle.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://funcircle.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://funcircle.com/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Company Sports Tournaments",
          item: "https://funcircle.com/company-sports-tournaments",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What kinds of corporate sports events does Fun Circle organize?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We organize all kinds of events! We're known as top sport event organizers for badminton, cricket, football, pickleball, table tennis, and tennis for companies all over Gurgaon and Delhi NCR.",
          },
        },
        {
          "@type": "Question",
          name: "Can Fun Circle arrange an event at specific venues in Gurgaon?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We have partnerships with premier venues including Gurgaon Badminton Club Sector 52, Sportslane Arena Sector 58, Play All Sector 62, La Riva Sector 65, Flow Sector 48, SSBA Sector 23, JNS Sports Sector 51, PT Sports Sector 5, and SmashPro Sector 102.",
          },
        },
        {
          "@type": "Question",
          name: "Do you organize events for small companies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely! We create customized sports tournaments for teams of all sizes, from small startups to large corporations, with flexible packages that fit your budget and goals.",
          },
        },
      ],
    },
  ],
};

// Helper component for service cards
const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 h-full">
    <div className="text-cyan-400 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

// Helper component for detailed sport cards
const SportDetailCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700 h-full">
    <div className="flex items-center mb-3">
      <div className="text-cyan-400 mr-4">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-slate-300">{description}</p>
  </div>
);

// Helper component for venue cards
const VenueCard = ({
  name,
  location,
  description,
}: {
  name: string;
  location: string;
  description: string;
}) => (
  <div className="bg-slate-800/60 p-5 rounded-lg border border-slate-700">
    <h4 className="text-lg font-bold text-cyan-400">{name}</h4>
    <p className="text-slate-400 flex items-center mt-1 mb-2">
      <Pin size={14} className="mr-2" />
      {location}
    </p>
    <p className="text-slate-300 text-sm">{description}</p>
  </div>
);

// Helper component for FAQs
const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <details className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 group">
    <summary className="flex justify-between items-center font-semibold text-white cursor-pointer list-none">
      {question}
      <ChevronDown
        size={20}
        className="transition-transform duration-300 group-open:rotate-180"
      />
    </summary>
    <p className="text-slate-300 mt-3">{answer}</p>
  </details>
);

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function CompanySportsPage() {
  return (
    <main className={`${archivo.className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <BadmintonHeader
        className="bg-slate-900 text-white border-white"
        logoClassName="bg-slate-900"
      />
      <div className="bg-slate-900 text-white font-sans">
        {/* Hero Section */}
        <header
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 1)), url('https://placehold.co/1920x1080/0f172a/38bdf8?text=Game+On!')",
          }}
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-32 flex flex-col justify-center items-center">
            <Trophy className="mx-auto h-16 w-16 text-cyan-400 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight text-center tracking-tight">
              Organize Company Sports Tournaments in Gurgaon That Actually Get
              People Excited
            </h1>
            <div className="flex flex-col w-full mt-6">
              <a href="https://chat.whatsapp.com/Ka9UfFtJHIaH9tSJwjpavS?source_surface=21&fbclid=PAQ0xDSwLm4X5leHRuA2FlbQIxMAABp83n-vAwL3oOVxv5HMv4nZD24xKCFZEt5ES51m-lY7xSrtMP-cJjFeJDhpRC_aem_ocUBlOy0GELVUg4hPe651g">
                <button className="p-4 rounded-xl text-black flex justify-center items-center text-xl w-full border-2 bg-[#23D366] border-black my-2">
                  <Whatsapp className="w-6 h-6 mx-2 text-black" />
                  Join WhatsApp Group
                </button>
              </a>

              <a href="https://www.instagram.com/funcircleapp?igsh=MTE1OWxwdHk1OXd5YQ==">
                <button className="w-full p-4 text-xl font-medium rounded-xl border-2 hover:border-pink-400 hover:bg-pink-50 transition-all duration-300 bg-transparent flex items-center justify-center shadow-cyan-500/30">
                  <Instagram className="w-5 h-5 mr-2 text-pink-500" />
                  Follow us on Instagram
                </button>
              </a>

              <a
                href="tel:9561079271"
                className="bg-cyan-500 my-2 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition duration-300 transform hover:scale-105 inline-block shadow-lg shadow-cyan-500/30 text-center"
              >
                Get a Free Quote Now!
              </a>
            </div>
          </div>
        </header>

        <main className="">
          {/* Breadcrumb Navigation for SEO */}
          <nav className="bg-slate-800/50 py-3 px-4" aria-label="Breadcrumb">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ol className="flex space-x-2 text-sm text-slate-400">
                <li>
                  <a href="/" className="hover:text-cyan-400">
                    Home
                  </a>
                </li>
                <li className="before:content-['/'] before:mx-2">
                  <a href="/services" className="hover:text-cyan-400">
                    Services
                  </a>
                </li>
                <li
                  className="before:content-['/'] before:mx-2 text-cyan-400"
                  aria-current="page"
                >
                  Company Sports Tournaments
                </li>
              </ol>
            </div>
          </nav>
          {/* Fun circle Handles It All Section */}
          <section className="py-6 px-4 md:py-24 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className=" max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
                  Fun circle Handles It All — You Just Show Up and Play
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  When we say we’re the ultimate sport event organizers for
                  modern companies, we mean it. From brainstorming ideas to
                  handing out the trophies, Fun circle covers every detail so
                  you can focus on playing your best (or perfecting that victory
                  dance!).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                <h3 className="text-2xl md:text-4xl font-bold text-cyan-400">
                  Here’s everything Fun circle takes care of for you:
                </h3>
                <ServiceCard
                  icon={<Building size={32} />}
                  title="Gurgaon's Best Sports Venues"
                  description="We get you access to the best and most convenient facilities in the city."
                />
                <ServiceCard
                  icon={<ShieldCheck size={32} />}
                  title="Professional Referees & Officials"
                  description="To ensure every game is fair and runs smoothly."
                />
                <ServiceCard
                  icon={<Dumbbell size={32} />}
                  title="Delicious Food & Drinks"
                  description="To keep players and fans happy and energized."
                />
                <ServiceCard
                  icon={<Award size={32} />}
                  title="Custom Team Jerseys & Gear"
                  description="We'll help you build team spirit with awesome branded merchandise."
                />
                <ServiceCard
                  icon={<Gamepad2 size={32} />}
                  title="Live Digital Leaderboards"
                  description="Everyone can follow the action with real-time scores and updates."
                />
                <ServiceCard
                  icon={<Swords size={32} />}
                  title="Smart Tournament Structures"
                  description="We design efficient leagues and playoffs that end in an epic final."
                />
                <ServiceCard
                  icon={<Trophy size={32} />}
                  title="Awesome Trophies & Cash Prizes"
                  description="Because who doesn't love winning cool stuff?"
                />
                <ServiceCard
                  icon={<Zap size={32} />}
                  title="On-the-Day Management"
                  description="We’re there to handle everything, so your event is completely stress-free."
                />
              </div>
            </div>
          </section>

          {/* Our Services Section */}
          <section className="py-2 md:py-24 px-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
                    Our Services: Designed For Every Company
                  </h2>
                  <p className="mt-4 text-lg text-slate-300">
                    At Fun circle, we design our services to be flexible, fun,
                    and a perfect fit for everyone.
                  </p>
                  <div className="mt-8 space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center">
                        Internal Company Tournaments
                      </h3>
                      <p className="mt-2 text-slate-300">
                        Fun circle can create an unforgettable company-only
                        sports tournament just for your employees. Whether you
                        want a quick one-day knockout or a full-day sports
                        festival, we’ll tailor it to your budget and team size.
                        Want to crank up the energy? We can bring in live
                        scoring, a fun emcee, and even cheering squads!
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center">
                        Multi-Company Sports Leagues
                      </h3>
                      <p className="mt-2 text-slate-300">
                        Want to see how your team stacks up against other top
                        companies in Gurgaon? Join one of Fun circle&apos;s
                        popular multi-company sports tournaments! It’s a great
                        way to network, bond with other professionals, and win
                        some serious bragging rights (plus trophies and cash
                        prizes!).
                      </p>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    src="https://placehold.co/600x400/1e293b/38bdf8?text=Team+Strategy"
                    alt="Team planning a sports strategy"
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Sports We Organize Section */}
          <section className="py-6 md:py-24 bg-slate-900 px-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className=" max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
                  Sports We Organize: Find Your Team&apos;s Perfect Game
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  Whatever your company&apos;s favorite sport is, Fun circle has
                  you covered. We&apos;re the specialized event organizers
                  you&apos;ve been looking for.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <SportDetailCard
                  icon={<Dribbble size={40} />}
                  title="Expert Cricket Tournament Organizers"
                  description="As the top cricket event organizers in Gurgaon, we handle everything from high-energy indoor matches to classic outdoor games. Fun circle provides professional umpires, top-notch equipment, and a real match-day atmosphere."
                />
                <SportDetailCard
                  icon={<Bike size={40} />}
                  title="Professional Badminton Event Organizers"
                  description="Looking for the best badminton event organizers in Gurgaon? We host awesome tournaments for singles, doubles, and mixed doubles. With our partnerships at places like the Gurgaon Badminton Club in Sector 52, your event will be world-class."
                />
                <SportDetailCard
                  icon={<Gamepad2 size={40} />}
                  title="Thrilling Football Event Organizers"
                  description="Let your team's inner champion shine with a football event organized by Fun circle. As expert football event organizers, we run exciting 5-a-side and 7-a-side competitions that are full of energy."
                />
                <SportDetailCard
                  icon={<Dumbbell size={40} />}
                  title="The Best Pickleball Event Organizers"
                  description="Jump on the trend with the hottest new corporate sport! Our pickleball event organizers at Fun circle will set up a tournament that’s easy to learn, super fun, and great for everyone."
                />
                <SportDetailCard
                  icon={<Zap size={40} />}
                  title="Dynamic Table Tennis Organizers"
                  description="For a fast and fun indoor event, a table tennis tournament is a fantastic choice. Fun circle provides professional-grade tables and a format that keeps everyone engaged."
                />
                <SportDetailCard
                  icon={<Medal size={40} />}
                  title="Premier Tennis Event Organizers"
                  description="Ready to serve up some fun? As leading tennis event organizers in Gurgaon, Fun circle puts on flawless singles and doubles tournaments at top-tier courts."
                />
              </div>
            </div>
          </section>

          {/* Premier Gurgaon Venues Section */}
          <section className="py-6 px-4 md:py-24 bg-slate-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className=" max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
                  Our Premier Gurgaon Venues: Play at the Best Spots
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  Fun circle has partnered with Gurgaon’s favorite sports venues
                  to make your event amazing.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <VenueCard
                  name="Gurgaon Badminton Club"
                  location="Sector 52"
                  description="The perfect spot for corporate badminton, with amazing courts. We're the go-to badminton event organizers for events here."
                />
                <VenueCard
                  name="Sportslane Arena"
                  location="Sector 58"
                  description="A great all-around venue for cricket, football, and multi-sport days."
                />
                <VenueCard
                  name="Play All"
                  location="Sector 62"
                  description="Famous for its great turf, making it perfect for evening football matches."
                />
                <VenueCard
                  name="La Riva"
                  location="Sector 65"
                  description="A premium venue that adds a touch of class to any sports tournament."
                />
                <VenueCard
                  name="Flow"
                  location="Sector 48"
                  description="A popular and easy-to-reach spot for all kinds of corporate sports."
                />
                <VenueCard
                  name="SSBA (Shuttle Star Badminton Academy)"
                  location="Sector 23"
                  description="Another top choice for badminton lovers."
                />
                <VenueCard
                  name="JNS Sports Academy"
                  location="Sector 51"
                  description="A well-equipped venue for bigger events."
                />
                <VenueCard
                  name="PT Sports Complex"
                  location="Sector 5"
                  description="A trusted venue in a great part of Gurgaon."
                />
                <VenueCard
                  name="SmashPro"
                  location="Sector 102"
                  description="A modern facility perfect for high-energy badminton and pickleball."
                />
              </div>
            </div>
          </section>

          {/* Flexible Formats Section */}
          <section className="py-12 px-4 md:py-24 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
                    Formats for Every Team Size—Big or Small
                  </h2>
                  <p className="mt-4 text-lg text-slate-300">
                    From small startups to huge corporations, Fun circle creates
                    tournament formats that fit your team perfectly.
                  </p>
                  <ul className="mt-6 space-y-4 text-lg">
                    <li className="flex items-start">
                      <Calendar className="text-cyan-400 h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                      <span>
                        <span className="font-bold">League play</span> to give
                        everyone plenty of game time.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Trophy className="text-cyan-400 h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                      <span>
                        <span className="font-bold">Exciting playoffs</span>{" "}
                        that lead to a grand final.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="text-cyan-400 h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                      <span>
                        <span className="font-bold">Fun one-day knockouts</span>{" "}
                        for a quick and exciting event.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Gamepad2 className="text-cyan-400 h-6 w-6 mt-1 mr-3 flex-shrink-0" />
                      <span>
                        <span className="font-bold">
                          Clear schedules and live brackets
                        </span>{" "}
                        so everyone knows what&apos;s happening.
                      </span>
                    </li>
                  </ul>
                  <p className="mt-4 text-lg text-slate-300">
                    No company sports tournament is too big or too small for Fun
                    circle!
                  </p>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    src="https://placehold.co/600x400/1e293b/38bdf8?text=Tournament+Bracket"
                    alt="Tournament bracket on a screen"
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* //LOCATION BASED SEO SECTION */}

          <section className="py-12 px-4 md:py-24 bg-slate-800/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
                  Serving Companies Across Gurgaon & Delhi NCR
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  As the premier sport event organizers in Gurgaon, Fun Circle
                  serves companies across all major business districts and
                  sectors.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">
                    Cyber City & Golf Course Road
                  </h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Serving major corporates in Gurgaon&apos;s business hub with
                    convenient access to venues like La Riva Sector 65 and Flow
                    Sector 48.
                  </p>
                  <div className="text-xs text-slate-400">
                    Popular for: Cricket, Football, Multi-sport tournaments
                  </div>
                </div>

                <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">
                    Sectors 40-70 Business District
                  </h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Perfect access to premium venues including Gurgaon Badminton
                    Club Sector 52, Sportslane Arena Sector 58, and Play All
                    Sector 62.
                  </p>
                  <div className="text-xs text-slate-400">
                    Popular for: Badminton, Cricket, Football tournaments
                  </div>
                </div>

                <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">
                    New Gurgaon & Sectors 80-110
                  </h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Growing business area with modern facilities like SmashPro
                    Sector 102, perfect for innovative sports like pickleball
                    and badminton.
                  </p>
                  <div className="text-xs text-slate-400">
                    Popular for: Pickleball, Badminton, Table Tennis tournaments
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 px-4 md:py-24 bg-slate-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className=" max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
                  Why Choose Us? — Frequently Asked Questions (FAQ)
                </h2>
              </div>
              <div className="max-w-3xl mx-auto mt-12 space-y-4">
                <FaqItem
                  question="What kinds of corporate sports events does Fun circle organize?"
                  answer="We organize all kinds of events! We’re known as top sport event organizers for badminton, cricket, football, pickleball, table tennis, and tennis for companies all over Gurgaon and Delhi NCR."
                />
                <FaqItem
                  question="Can Fun circle arrange an event at a specific venue like Sportslane Arena in Sector 58?"
                  answer="You bet! We have great relationships with all the venues listed, including Sportslane Arena Sector 58 and Gurgaon Badminton Club Sector 52. We’ll handle all the booking for you."
                />
                <FaqItem
                  question="We're a small company. Can you still help?"
                  answer="Of course! We love creating events for teams of all sizes. Fun circle will work with you to create the perfect event that fits your budget and goals."
                />
                <FaqItem
                  question="What’s included in your tournament packages?"
                  answer="Our packages cover everything: venue booking, referees, food, merchandise, digital scoring, trophies, and our team on the ground to manage it all. You don’t have to worry about a thing."
                />
                <FaqItem
                  question="Are your events good for beginners?"
                  answer="Yes! Our tournaments are for everyone. We make sure all skill levels feel welcome and have a great time."
                />
              </div>
            </div>
          </section>

          {/* Testimonials Section for SEO */}
          <section className="py-12 px-4 md:py-24 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
                  Why Companies Choose Fun Circle as Their Sport Event
                  Organizers
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  See what companies say about our sport event organizers and
                  tournament management services
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    &apos;Fun Circle&apos;s cricket event organizers delivered
                    an amazing tournament at Sportslane Arena Sector 58.
                    Professional management, great venue, and our employees
                    loved every minute!&apos;
                  </p>
                  <div className="text-sm text-slate-400">
                    - Tech Company, Cyber City
                  </div>
                </div>

                <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    &apos;Best badminton event organizers in Gurgaon! The
                    tournament at Gurgaon Badminton Club Sector 52 was
                    flawlessly organized. Will definitely book again!&apos;
                  </p>
                  <div className="text-sm text-slate-400">
                    - Financial Services, Golf Course Road
                  </div>
                </div>

                <div className="bg-slate-800/60 p-6 rounded-lg border border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    &apos;Outstanding football event organizers! The tournament
                    at Play All Sector 62 exceeded expectations. Great
                    organization, professional referees, perfect venue.&apos;
                  </p>
                  <div className="text-sm text-slate-400">
                    - Manufacturing Company, Manesar
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-cyan-500 px-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Ready, Set, Play! Contact Fun circle Now!
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-800">
                Whether you want the ultimate company sports tournament or want
                to join one of our multi-company leagues, Fun circle is ready to
                help you create an unforgettable experience. Let’s work together
                to make your next company event something your employees will be
                talking about for years!
              </p>
              <div className="mt-8">
                <a
                  href="tel:9561079271"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 inline-flex items-center shadow-lg"
                >
                  <Phone className="mr-3" /> Call or WhatsApp us at: 9561079271
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-800 text-sm font-medium">
                <div>✓ Cricket Event Organizers</div>
                <div>✓ Badminton Event Organizers</div>
                <div>✓ Football Event Organizers</div>
                <div>✓ Pickleball Event Organizers</div>
                <div>✓ Table Tennis Organizers</div>
                <div>✓ Tennis Event Organizers</div>
                <div>✓ Premium Gurgaon Venues</div>
                <div>✓ Complete Event Management</div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Footer Content Grid */}
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-4">
                  Fun Circle Events
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Gurgaon&apos;s leading sport event organizers specializing in
                  company sports tournaments across all major sports.
                </p>
                <div className="space-y-2 text-sm text-slate-400">
                  <div>📞 +91-9561079271</div>
                  <div>📍 Gurgaon, Haryana</div>
                  <div>🕐 9 AM - 9 PM (All Days)</div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-4">
                  Our Sport Event Organizers
                </h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>
                    <a href="#cricket" className="hover:text-cyan-400">
                      Cricket Event Organizers
                    </a>
                  </li>
                  <li>
                    <a href="#badminton" className="hover:text-cyan-400">
                      Badminton Event Organizers
                    </a>
                  </li>
                  <li>
                    <a href="#football" className="hover:text-cyan-400">
                      Football Event Organizers
                    </a>
                  </li>
                  <li>
                    <a href="#pickleball" className="hover:text-cyan-400">
                      Pickleball Event Organizers
                    </a>
                  </li>
                  <li>
                    <a href="#tabletennis" className="hover:text-cyan-400">
                      Table Tennis Event Organizers
                    </a>
                  </li>
                  <li>
                    <a href="#tennis" className="hover:text-cyan-400">
                      Tennis Event Organizers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Venues */}
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-4">
                  Partner Venues
                </h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>Gurgaon Badminton Club Sector 52</li>
                  <li>Sportslane Arena Sector 58</li>
                  <li>Play All Sector 62</li>
                  <li>La Riva Sector 65</li>
                  <li>Flow Sector 48</li>
                  <li>SmashPro Sector 102</li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>
                    <a href="/about" className="hover:text-cyan-400">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="hover:text-cyan-400">
                      All Services
                    </a>
                  </li>
                  <li>
                    <a href="/venues" className="hover:text-cyan-400">
                      Venues
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-cyan-400">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/gallery" className="hover:text-cyan-400">
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a href="/testimonials" className="hover:text-cyan-400">
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-800 pt-8">
              <div className="text-center text-slate-400">
                <p className="mb-4">
                  &copy; {new Date().getFullYear()} Fun Circle Events - Premier
                  Sport Event Organizers in Gurgaon. All Rights Reserved.
                </p>

                {/* SEO Footer Keywords */}
                <div className="text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto">
                  <p className="mb-2">
                    <strong>Keywords:</strong> sport event organizers, company
                    sports tournaments, cricket event organizers, badminton
                    event organizers, football event organizers, pickleball
                    event organizers, table tennis event organizers, tennis
                    event organizers, sports event planners Gurgaon, corporate
                    sports days, team building sports events
                  </p>
                  <p>
                    <strong>Venues:</strong> Gurgaon Badminton Club Sector 52,
                    Sportslane Arena Sector 58, Play All Sector 62, La Riva
                    Sector 65, Flow Sector 48, SSBA Sector 23, JNS Sports Sector
                    51, PT Sports Sector 5, SmashPro Sector 102
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
