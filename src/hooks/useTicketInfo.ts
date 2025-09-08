import { TicketInfo, Venue } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

async function fetchTicketInfo(ticket_id: string): Promise<TicketInfo | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select(
      `
      description,
      group_id,
      id,
      images,
      location,
      price,
      servicecharge,
      startdatetime,
      enddatetime,
      title,
      venue:venueid(*)
      `
    )
    .eq("id", ticket_id)
    .single();

  if (error) {
    console.error("Error fetching ticket info:", error);
    throw new Error(error.message);
  }

  if (!data) return null;

  // unwrap array -> single venue
  return {
    ...data,
    venue: data.venue[0] as Venue, // 👈 force TS to know it's one Venue
  };
}


export const useTicketInfo = (ticket_id: string) => {
  return useQuery<TicketInfo | null>({
    queryKey: ["ticket-info", ticket_id],
    queryFn: () => fetchTicketInfo(ticket_id),
    enabled: !!ticket_id,
  });
};
