import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { DuoRequest } from "@/app/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface DuoRealtimePayload {
  schema: "public";
  table: "duos";
  commit_timestamp: string; // ISO timestamp
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: DuoRecord;
  old: Partial<DuoRecord>;
  errors: string[]; // null or object (depending on Supabase internals)
}

export interface DuoRecord {
  id: string;
  requester_id: string;
  partner_id: string;
  status: "pending" | "accepted" | "declined";
  created_at: string; // ISO timestamp
}

// Define the user type based on your Supabase query

export const useDuosRealtime = (
  userId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEvent: (data: { payload: any; appendableRequest?: DuoRequest }) => void
) => {
  useEffect(() => {
    const channel = supabase
      .channel(`duo-events-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT or UPDATE
          schema: "public",
          table: "duos",
          filter: `partner_id=eq.${userId}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (payload: any) => {
          console.log("💥 Realtime Duo Event", payload);
          const requesterId = payload.new?.requester_id;

          let appendableRequest: DuoRequest | undefined = undefined;

          if (requesterId) {
            const { data: user, error } = await supabase
              .from("users")
              .select(
                "first_name,user_id,email,adminsetlevel,usersetlevel,location"
              )
              .eq("user_id", requesterId)
              .single();

            if (user) {
              appendableRequest = {
                duo_id: payload.new.id,
                status: payload.new.status,
                created_at: payload.new.created_at,
                is_requester: false,
                other_user: user,
              };
            } else {
              console.error("❌ Failed to fetch requester name", error);
            }
          }

          onEvent({
            payload,
            appendableRequest,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onEvent]);
};
