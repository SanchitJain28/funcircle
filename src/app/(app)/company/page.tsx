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
export const metadata: Metadata = {
  title:
    "Expert Sport Event Organizers in Gurgaon | Cricket, Badminton, Football Tournaments",
  description:
    "Searching for the best sport event organizers in Gurgaon? We plan unforgettable company sports tournaments—Cricket, Badminton, Football, Pickleball & more. Boost morale and teamwork. Get a free quote!",
  keywords:
    "company sports tournaments, sport event organizers, cricket event organizers, badminton event organizers, football event organizers, table tennis event organizers, tennis event organizers, pickleball event organizers, sports event planners Gurgaon, corporate sports days, team building sports events, Fun circle events, Sportslane Arena Sector 58, Play All Sector 62, Gurgaon Badminton Club Sector 52",
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
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
            <p>
              &copy; {new Date().getFullYear()} Fun circle Events. All Rights
              Reserved.
            </p>
            <p className="text-sm mt-2">
              Tags: company sports tournaments, sport event organizers, cricket
              event organizers, badminton event organizers, football event
              organizers, table tennis event organizers, tennis event
              organizers, pickleball event organizers, sports event planners
              Gurgaon, corporate sports days, team building sports events, Fun
              circle events, Sportslane Arena Sector 58, Play All Sector 62,
              Gurgaon Badminton Club Sector 52.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
