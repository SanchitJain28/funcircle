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
// import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appContext } from "@/app/Contexts/AppContext";
import AuthPopup from "@/components/Funcircle-signup/Authpopup";
import { useAuth, useCheckRedirection } from "@/hooks/useAuth";
import TermsAndConditions from "./TermsAndConditions";
import { createClient } from "@/app/utils/supabase/client";
import { formatDate } from "@/app/utils/Functions/FormatDate";
import TicketCounter from "./TicketCounter";
import BottomFixedBar from "./Components/BottomFixedBar";
import { toast } from "react-toastify";
import RecentMembers from "./Components/RecentMembers";
import InfoByLevel from "./Components/InfoByLevel";
import KnowYourLevel from "../eventTicket/[group_id]/KnowYourLevel";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { isPlayerLevelValid } from "@/utils/level-format/LevelFormatFromTitleToNumber";
import { useAlert } from "@/app/Contexts/AlertContext";
import { formatDateAndTime } from "@/utils/FormatDateAndTime";
import TicketMembers from "./Components/TicketMembers";

const supabase = createClient();

// Constants
// const SHUTTLE_DISCOUNT = 30;
const CARD_STYLES = "bg-[#101011] border border-zinc-800 shadow-lg mb-6";

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

  const serviceFee = Number(ticket.servicecharge) || 0; // 18% service fee
  const ticketPrice = useMemo(() => Number(ticket.price) || 0, [ticket.price]);

  const totalTicketPrice = useMemo(
    () => count * (ticketPrice + serviceFee),
    [ticketPrice, serviceFee, count]
  );
  // const [isUserOwnShuttle, setIsUserOwnShuttle] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  // Hooks
  const { user, profile } = useAuth();

  const { data: redirection } = useCheckRedirection({
    user_id: user?.uid ?? "",
    enabled: !!user,
  });

  const { showDanger } = useAlert();

  // Get admin_set_level directly from profile - this is the fix
  const admin_set_level = useMemo(() => {
    return profile?.profile?.adminsetlevel || null;
  }, [profile]);

  // Memoized values
  // const total = useMemo(() => count * ticketPrice, [count, ticketPrice]);
  const isTicketSoldOut = useMemo(
    () => ticket.bookedtickets >= ticket.capacity,
    [ticket]
  );

  // Callbacks
  const fetchSupabaseProfile = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("premiumtype,adminsetlevel")
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

  const createTicketOrder = useCallback(
    (orderValue: number, type: string) => {
      const newTicketOrder = {
        ticket,
        quantity: count,
        total: orderValue,
        type: type,
      };
      setOrder(newTicketOrder);
      localStorage.setItem("ORDER", JSON.stringify(newTicketOrder));
    },
    [ticket, count, setOrder]
  );

  const handleSubmit = useCallback(
    (orderValue: number, type: string) => {
      if (type === "subscription" && count > 1) {
        toast("You can't order more than one ticket by subscription 😌😌");
        return;
      }

      console.log("admin set level in handleSubmit:", admin_set_level);

      if (admin_set_level) {
        console.log("Checking level validity:", admin_set_level, ticket.title);
        if (!isPlayerLevelValid(admin_set_level, ticket.title)) {
          showDanger(
            "Warning",
            "You cannot join this level match ,Join another match of your level by clicking this !"
          );
          console.log(
            "Level validation result:",
            isPlayerLevelValid(admin_set_level, ticket.title)
          );
          return;
        }
      }

      createTicketOrder(orderValue, type);

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
    },
    [
      createTicketOrder,
      user,
      redirection,
      pathname,
      searchParams,
      router,
      admin_set_level,
      count,
      ticket.title,
    ]
  );

  // Effects
  useEffect(() => {
    if (isTicketSoldOut) {
      setCount(0);
    }
  }, [ticket.price, isTicketSoldOut]);

  useEffect(() => {
    if (user) {
      fetchSupabaseProfile();
    }
  }, [user, fetchSupabaseProfile]);

  // const startDateTime = formatDateAndTime(ticket.startdatetime);
  const endDateTime = formatDateAndTime(ticket.enddatetime);

  return (
    <>
      <CustomHeader />
      <div className="bg-[#000000] min-h-screen">
        <div className="max-w-md mx-auto  shadow-lg overflow-hidden">
          {/* <div className="relative">
          <img
            src={
              ticket.venueid.images[0] ||
              "/placeholder.svg?height=192&width=384&query=venue"
            }
            alt={ticket.venueid.venue_name + " image"}
            className="w-full h-48 object-cover"
          />
        </div> */}

          <div className="p-4 bg-[#267bf2]">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="text font-bold text-[#F9F9F9] flex-1">
                {ticket.venueid.venue_name}
              </h1>
              <a
                href={ticket.venueid.maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 p-1 hover:bg-[#8A36EB] hover:bg-opacity-20 rounded transition-colors"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Google_Maps_icon_%282015-2020%29.svg/2048px-Google_Maps_icon_%282015-2020%29.svg.png"
                  alt=""
                  className="w-8 h-8"
                />
                {""}
              </a>
            </div>

            <p className="text-[#F9F9F9] text-opacity-80 text-sm leading-relaxed mb-3">
              {ticket.venueid.location}
            </p>

            <div className="rounded-xl shadow-md">
              <div className="flex rounded-lg items-center p-2 mb-2">
                <p className="font-sans rounded-lg text-white p-2">
                  <span className="font-medium">
                    {ticket?.startdatetime
                      ? formatDate(ticket.startdatetime)
                      : "N/A"}{" "}
                    to {endDateTime.hours12 + " " + endDateTime.ampm}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden pb-24">
          {/* <p className="text-3xl font-sans mx-6 pt-6 mb-4 font-bold text-white">
            Tickets
          </p> */}

          <div className="my-4">
            {/* Ticket Information */}
            <div className="flex flex-col bg-[#101011] rounded-xl mx-6 border border-zinc-700/50 p-6 shadow-lg">
              <p className="text-2xl font-sans text-white font-bold mb-1">
                {ticket?.title}
              </p>

              <p className="text-4xl font-sans font-bold mb-2 text-[#8338EC]">
                ₹{ticket?.price}
                <span className="text-xs text-zinc-400">
                  {" "}
                  Court Share ( Total court price / 4)
                </span>
              </p>

              <p className="text-sm font-sans text-zinc-400 mb-4">
                + ₹{ticket?.servicecharge} Service Fee
              </p>

              <TicketCounter
                ticket={ticket}
                count={count}
                onChange={setCount}
              />
            </div>

            <div className="bg-[#101011] border mt-4 border-zinc-600 mx-6 shadow-lg rounded-2xl py-2 px-4 ">
              <p className="text-zinc-400 leading-relaxed text-sm">
                Players will have to bring their own shuttle and play with
                coordination of others. Non-compliants will be blocked.
              </p>
            </div>

            <RecentMembers
              user_id={user?.uid ?? ""}
              game_date={ticket.startdatetime.toString()}
              game_time={ticket.startdatetime.toString()}
              game_name={ticket.title}
              game_link={`${pathname}?id=${searchParams.get("id")}`}
            />

            <TicketMembers params={{ticket_id: ticket.id}}/>

            <AdminButton ticket={ticket} isAdmin={isAdmin} />

            <InfoByLevel title={ticket.title} />

            <InfoCards ticket={ticket} />

            <TermsAndConditions />

            <KnowYourLevel className="bottom-24 right-6" fixed={true} />

            {/* Bottom Fixed Bar */}
            <BottomFixedBar
              onConfirm={(orderValue, type: string) => {
                handleSubmit(orderValue, type);
              }}
              count={count}
              total={totalTicketPrice}
            />
          </div>
        </div>

        <AuthPopup
          isOpen={isAuthPopupOpen}
          onClose={() => setIsAuthPopupOpen(false)}
          eventTitle=""
        />
      </div>
    </>
  );
}
