"use client";

import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TicketType } from "@/app/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appContext } from "@/app/Contexts/AppContext";
import AuthPopup from "@/components/Funcircle-signup/Authpopup";
import { useAuth, useCheckRedirection } from "@/hooks/useAuth";
import TermsAndConditions from "./TermsAndConditions";
import TicketLoadingSkeleton from "./Loading/LoadingSkeletonForTicket";
import { createClient } from "@/app/utils/supabase/client";
import { formatDate } from "@/app/utils/Functions/FormatDate";
import TicketCounter from "./TicketCounter";

const supabase = createClient();

// Constants
const SHUTTLE_DISCOUNT = 30;
const CARD_STYLES = "bg-[#1D1D1F] border border-zinc-800 shadow-lg mb-6";

// Skill Level Components
const SkillLevelCard = ({
  title,
  requirements,
}: {
  title: string;
  requirements: string[];
}) => (
  <div className="mx-6 mb-6">
    <Card className={CARD_STYLES}>
      <CardHeader>
        <CardTitle className="text-lg text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm text-white space-y-2 list-none">
          {requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </div>
);

const IntermediateSection = () => {
  const requirements = [
    "✅ You can consistently rally (6–10+ shots)",
    "✅ You know the game rules and positioning",
    "✅ You've played regularly and enjoy competitive doubles",
    "✅ You can serve, smash, and defend under pressure",
    "❌ Not for new players or those still learning the basics",
    "❌ You may be moved to Beginner+ if your level doesn't match",
  ];

  return <SkillLevelCard title="Who Can Join" requirements={requirements} />;
};

const BeginnerSection = () => {
  const requirements = [
    "✅ You've recently started playing",
    "✅ You can do short rallies (3–5 shots)",
    "✅ You're here to improve and have fun – no pressure!",
    "✅ You're still learning positioning and scoring",
    "❌ Not for absolute first-timers (who've never held a racquet)",
    "❌ Not suitable if you play fast-paced games regularly",
  ];

  return <SkillLevelCard title="Who Can Join" requirements={requirements} />;
};

// Date and Time Component
const DateTimeSection = ({ ticket }: { ticket: TicketType }) => (
  <div className="mx-6 my-6">
    <div className="bg-[#1D1D1F] rounded-xl p-4 border border-zinc-700/50 shadow-md">
      <div className="flex rounded-lg items-center p-2 mb-2">
        <Clock className="text-[#8338EC] h-5 w-5" />
        <p className="font-sans rounded-lg text-white p-2">
          <span className="text-zinc-400">From:</span>{" "}
          <span className="font-medium">
            {ticket?.startdatetime ? formatDate(ticket.startdatetime) : "N/A"}
          </span>
        </p>
      </div>
      <div className="flex rounded-lg items-center p-2">
        <Clock className="text-[#8338EC] h-5 w-5" />
        <p className="font-sans rounded-lg text-white p-2">
          <span className="text-zinc-400">To:</span>{" "}
          <span className="font-medium">
            {ticket?.enddatetime
              ? formatDate(ticket.enddatetime)
              : "End time not available"}
          </span>
        </p>
      </div>
    </div>
  </div>
);

// Venue Component
const VenueSection = ({ ticket }: { ticket: TicketType }) => {
  if (!ticket.venueid) {
    return (
      <div className="mx-6 mb-6 p-4 bg-[#1D1D1F] rounded-xl border border-zinc-700/50">
        <p className="text-zinc-300 text-center">No venue details available</p>
      </div>
    );
  }

  return (
    <div className="mx-6 mb-6 rounded-xl p-5 bg-[#1D1D1F] border border-zinc-700/50 shadow-md">
      <p className="text-white text-lg font-semibold mb-4">Venue details</p>
      <div className="flex items-center">
        <img
          src={ticket.venueid.images[0] || "/placeholder.svg"}
          className="w-20 h-20 rounded-full object-cover border-2"
          alt="Venue"
        />
        <div className="flex flex-col ml-4">
          <p className="mb-1 font-sans text-white font-semibold text-lg">
            {ticket.venueid.venue_name}
          </p>
          <p className="font-sans text-zinc-300 mb-2">
            {ticket.venueid.location}
          </p>
          <div className="flex">
            <a
              href={ticket.venueid.maps_link}
              className="flex items-center gap-1 mr-2 bg-[#8338EC] hover:bg-emerald-600 transition-colors px-4 py-2 rounded-lg text-black font-medium w-fit"
            >
              <MapPin size={16} />
              <span>Location</span>
            </a>
            <Link
              href="/new-subscription"
              className="flex items-center gap-1 bg-gradient-to-r from-[#EBC777] via-[#E2B934] to-[#EBC777] hover:bg-emerald-600 transition-colors px-4 py-2 rounded-lg text-black font-medium w-fit"
            >
              <span>Subscription</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Button Component
const AdminButton = ({
  ticket,
  isAdmin,
}: {
  ticket: TicketType;
  isAdmin: boolean;
}) => {
  if (!isAdmin) return null;

  return (
    <Link href={`/admin?ticketid=${ticket.id}`}>
      <div className="mx-6 my-6">
        <button className="bg-white p-4 text-lg text-black border rounded-lg w-full">
          Go to admin page
        </button>
      </div>
    </Link>
  );
};

// Info Cards Component
const InfoCards = ({ ticket }: { ticket: TicketType }) => (
  <>
    <div className="mx-6 mb-6">
      <Card className={CARD_STYLES}>
        <CardHeader>
          <CardTitle className="text-lg text-white">
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line text-white text-sm">
            {ticket.description}
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="mx-6 mb-6">
      <Card className={CARD_STYLES}>
        <CardHeader>
          <CardTitle className="text-lg text-white">⚠ WARNING</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line text-yellow-400 text">
            ⚠ Important: Please book only if you match the level listed above.
            Incorrect bookings affect game quality for everyone. If your level
            doesn not match, we may ask you to switch slots.
          </div>
        </CardContent>
      </Card>
    </div>
  </>
);

// Shuttle Checkbox Component
const ShuttleCheckbox = ({
  isUserOwnShuttle,
  onToggle,
}: {
  isUserOwnShuttle: boolean;
  onToggle: () => void;
}) => (
  <div className="flex justify-between items-center my-6">
    <div className="flex-1 mr-4">
      <p className="font-semibold text-white mb-1 leading-tight">
        Want to bring your own shuttle?
      </p>
      <p className="text-white">- Rs{SHUTTLE_DISCOUNT}</p>
      <p className="text-white text-sm">Good condition - MAVIS 350</p>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox
        id="shuttle-checkbox"
        checked={isUserOwnShuttle}
        onCheckedChange={onToggle}
        className="w-6 h-6 border-2 border-slate-400/60 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 rounded-md transition-all duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent"
      />
      <label
        htmlFor="shuttle-checkbox"
        className="text-sm text-slate-300 cursor-pointer select-none hover:text-white transition-colors duration-200"
      />
    </div>
  </div>
);

// Main Component
export default function TicketClient({ ticket }: { ticket: TicketType }) {
  const appCtx = useContext(appContext);
  if (!appCtx) {
    throw new Error(
      "appContext is null. Ensure the provider is set up correctly."
    );
  }

  const { setOrder } = appCtx;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // State
  const [count, setCount] = useState<number>(1);
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [isUserOwnShuttle, setIsUserOwnShuttle] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  // Hooks
  const { user, authLoading } = useAuth();
  const { data: redirection } = useCheckRedirection({
    user_id: user?.uid ?? "",
    enabled: !!user,
  });

  // Memoized values
  const total = useMemo(() => count * ticketPrice, [count, ticketPrice]);
  const isTicketSoldOut = useMemo(
    () => ticket.bookedtickets >= ticket.capacity,
    [ticket]
  );
  const isIntermediateLevel = useMemo(
    () => ticket.title.toUpperCase().includes("INTERMEDIATE"),
    [ticket.title]
  );
  const isBeginnerLevel = useMemo(
    () => ticket.title.toUpperCase().includes("BEGINNER"),
    [ticket.title]
  );

  // Callbacks
  const fetchSupabaseProfile = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("premiumtype")
        .eq("user_id", user.uid)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(!!data?.premiumtype);
    } catch (error) {
      console.error("Error in fetchSupabaseProfile:", error);
      setIsAdmin(false);
    }
  }, [user?.uid]);

  const createTicketOrder = useCallback(() => {
    const newTicketOrder = {
      ticket,
      quantity: count,
      total,
    };
    setOrder(newTicketOrder);
    localStorage.setItem("ORDER", JSON.stringify(newTicketOrder));
  }, [ticket, count, total, setOrder]);

  const handleSubmit = useCallback(() => {
    createTicketOrder();

    if (!user) {
      setIsAuthPopupOpen(true);
      return;
    }

    if (redirection) {
      const redirectUrl =
        redirection +
        `?redirect=${encodeURIComponent(pathname + `?id=${searchParams.get("id")}`)}`;
      router.push(redirectUrl);
      return;
    }

    router.push("/TicketCheckout");
  }, [createTicketOrder, user, redirection, pathname, searchParams, router]);

  const handleShuttleToggle = useCallback(() => {
    setIsUserOwnShuttle((prev) => {
      const newValue = !prev;
      setTicketPrice((prevPrice) =>
        newValue ? prevPrice - SHUTTLE_DISCOUNT : prevPrice + SHUTTLE_DISCOUNT
      );
      return newValue;
    });
  }, []);

  // Effects
  useEffect(() => {
    if (isTicketSoldOut) {
      setCount(0);
    }
    setTicketPrice(Number(ticket.price));
  }, [ticket.price, isTicketSoldOut]);

  useEffect(() => {
    if (user) {
      fetchSupabaseProfile();
    }
  }, [user, fetchSupabaseProfile]);

  // Loading state
  if (authLoading) {
    return <TicketLoadingSkeleton />;
  }

  return (
    <div className="bg-gradient-to-b from-[#131315] to-[#1a1a1c] min-h-screen">
      <div className="overflow-hidden pb-24">
        <p className="text-3xl font-sans mx-6 pt-6 mb-4 font-bold text-white">
          Tickets
        </p>

        <div className="my-4">
          {/* Ticket Information */}
          <div className="flex flex-col bg-[#1D1D1F] rounded-xl mx-6 border border-zinc-700/50 p-6 shadow-lg">
            <p className="text-2xl font-sans text-white font-bold mb-1">
              {ticket?.title}
            </p>
            <p className="text-4xl font-sans font-bold mb-4 text-[#8338EC]">
              ₹{ticket?.price}
            </p>

            <TicketCounter ticket={ticket} count={count} onChange={setCount} />

            <ShuttleCheckbox
              isUserOwnShuttle={isUserOwnShuttle}
              onToggle={handleShuttleToggle}
            />
          </div>

          <DateTimeSection ticket={ticket} />
          <AdminButton ticket={ticket} isAdmin={isAdmin} />

          {isIntermediateLevel && <IntermediateSection />}
          {isBeginnerLevel && <BeginnerSection />}

          <InfoCards ticket={ticket} />
          <VenueSection ticket={ticket} />
          <TermsAndConditions />

          {/* Bottom Fixed Bar */}
          <div className="flex bg-[#131315]/95 backdrop-blur-md items-center border-t border-zinc-700 text-white w-full justify-between px-6 py-4 fixed bottom-0 shadow-lg z-10">
            <div className="flex flex-col">
              <p className="font-sans text-2xl font-bold text-white">
                ₹{total}
              </p>
              <p className="font-sans text-sm text-zinc-400">Total amount</p>
            </div>
            {count > 0 && (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1 bg-[#8338EC] hover:bg-emerald-600 transition-colors px-6 py-3 rounded-lg text-black font-semibold text-lg"
              >
                CONFIRM SPOT
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthPopup
        isOpen={isAuthPopupOpen}
        onClose={() => setIsAuthPopupOpen(false)}
        eventTitle=""
      />
    </div>
  );
}
