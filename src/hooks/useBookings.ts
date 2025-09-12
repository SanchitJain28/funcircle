import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export interface Order {
  order_id: number;
  ticket_id: number;
  quantity: number;
  sub_price: string;
  userid: string;
  status: "confirmed" | "pending" | "cancelled" | string; // extend if you have fixed statuses
  used_premium_discount: boolean | null;
  userequipments: unknown | null;
  ticket: Ticket;
}

interface Ticket {
  id: number;
  title: string;
  startdatetime: string; // could use Date if you parse it
  enddatetime: string;
  venueid: number;
  venue: Venue;
}

interface Venue {
  id: number;
  venue_name: string;
  location: string;
}

interface BookingsApiResponse {
  data: Order[];
}

interface ApiErrorResponse {
  message: string;
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

async function fetchUserBookings(id: string) {
  try {
    const { data } = await axios.post<BookingsApiResponse>(
      "/api/bookings/fetch",
      {
        user_id: id,
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch user bookings : ${axiosError.message}`
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching user bookings"
    );
  }
}

export const useUserBookings = (userId?: string) => {
  const query = useQuery({
    queryKey: ["user-bookings", userId],
    queryFn: () => fetchUserBookings(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (!userId) {
    return {
      ...query,
      isPending: false,
      isLoading: false,
    };
  }

  return query;
};

interface BookingApiResponse {
  data: Order;
}

async function fetchUserBooking(id: string) {
  try {
    const { data } = await axios.post<BookingApiResponse>(
      "/api/bookings/fetch-booking",
      {
        order_id: id,
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch user booking for order_id ${id} : ${axiosError.message}`
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching user bookings"
    );
  }
}

export const useUserBooking = (orderId: string) => {
  const query = useQuery({
    queryKey: ["user-booking", orderId],
    queryFn: () => fetchUserBooking(orderId!),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return query;
};
