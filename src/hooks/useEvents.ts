import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Event, TicketType } from "@/app/types";

const fetchEventsByCategory = async (category: string): Promise<Event[]> => {
  const { data } = await axios.post("/api/FetchEvents", {
    group_type: category,
  });
  return data.data;
};

export function useFetchEvents({
  activeCategory,
}: {
  activeCategory: string;
}) {
  return useQuery<Event[]>({
    queryKey: ["events", activeCategory],
    queryFn: () => fetchEventsByCategory(activeCategory),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

async function fetchTicketsByGroupId(group_id: string) {
  const {
    data: { data },
  } = await axios.post("/api/FetchTickets", { group_id });

  return data;
}

export function useEventTickets({ group_id }: { group_id: string })  {
  return useQuery<TicketType[]>({
    queryKey: ["eventTickets", group_id],
    queryFn: () => fetchTicketsByGroupId(group_id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}
