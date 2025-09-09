import { TicketInfo, Venue } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

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

interface ApiErrorResponse {
  message: string;
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

interface TicketMembersApiResponse {
  data: {
    name: string;
    image: string | null;
    user_id: string;
    adminsetlevel: string;
  }[];
}

async function fetchvenueMembers(ticket_id: string): Promise<
  {
    name: string;
    image: string | null;
    user_id: string;
    adminsetlevel: string;
  }[]
> {
  try {
    const {
      data: { data },
    } = await axios.get<TicketMembersApiResponse>("/api/ticket/members", {
      params: {
        t_id: ticket_id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch venue members: ${axiosError.message}`
      );
    }
    throw new Error("Unexpected Error occured While fetching venue Members");
  }
}

export function useTicketmembers(ticket_id: number) {
  return useQuery({
    queryKey: ["ticket-members", ticket_id],
    queryFn: () => fetchvenueMembers(String(ticket_id)),
    enabled: !!ticket_id,
    staleTime: 60 * 60 * 1000, // 5 minutes - venue data doesn't change frequently
    gcTime: 60 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 404s (venue not found)
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
