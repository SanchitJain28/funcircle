import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Venue {
  id: number;
  venue_name: string;
  images: string[];
  maps_link: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  group_id: number;
}

interface ApiResponse {
  data: Venue;
}

interface ApiError {
  message: string;
  status?: number;
}

interface VenueGamesApiResponse {
  data: Ticket[];
}

export interface Ticket {
  id: number;
  group_id: number;
  type: string;
  title: string;
  description: string;
  capacity: number;
  startdatetime: string; // ISO string
  enddatetime: string; // ISO string
  ticketstatus: "live" | "closed" | "soldout" | string;
  price: string;
  priceincludinggst: boolean;
  ticketpergroup: string;
  sku: string | null;
  bookedtickets: number;
  location: string | null;
  wooid: string | null;
  images: string[] | null;
  servicecharge: number | null;
  venue: Venue;
}

async function fetchVenueDetails(id: number): Promise<Venue> {
  try {
    const {
      data: { data },
    } = await axios.get<ApiResponse>("/api/venue/fetch-single-venue", {
      params: {
        v_id: id,
      },
    });
    return data;
  } catch (error) {
    // Better error handling with proper typing
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch venue: ${axiosError.message}`
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching venue details"
    );
  }
}

interface AllVenueDetailsAPIResponse {
  data: Venue[];
}

async function fetchVenueAllDetails({
  limit,
}: {
  limit?: number;
}): Promise<Venue[]> {
  try {
    const {
      data: { data },
    } = await axios.get<AllVenueDetailsAPIResponse>("/api/venue/fetch-all", {
      params: {
        limit,
      },
    });
    return data;
  } catch (error) {
    // Better error handling with proper typing
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch All venue details: ${axiosError.message}`
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching all venue details"
    );
  }
}

export function useVenueAllDetails({ limit }: { limit?: number }) {
  return useQuery({
    queryKey: ["venues",limit],
    queryFn: () => fetchVenueAllDetails({ limit }),
    // Additional recommended options
    staleTime: 5 * 60 * 1000, // 5 minutes - venue data doesn't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 404s (venue not found)
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useVenueDetails(id: string) {
  return useQuery({
    queryKey: ["venue", id],
    queryFn: () => fetchVenueDetails(Number(id)),
    enabled: !!id,
    // Additional recommended options
    staleTime: 5 * 60 * 1000, // 5 minutes - venue data doesn't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 404s (venue not found)
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

async function fetchVenueGames(id: number): Promise<Ticket[]> {
  try {
    const {
      data: { data },
    } = await axios.get<VenueGamesApiResponse>("/api/venue/fetch-games", {
      params: {
        v_id: id,
      },
    });

    return data;
  } catch (error) {
    // Better error handling with proper typing
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch venue games: ${axiosError.message}`
      );
    }
    throw new Error("An unexpected error occurred while fetching venue games");
  }
}

export function useVenueGames(id: string) {
  return useQuery({
    queryKey: ["venueGames", id],
    queryFn: () => fetchVenueGames(Number(id)),
    enabled: !!id,
    // Additional recommended options
    staleTime: 5 * 60 * 1000, // 5 minutes - venue data doesn't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 404s (venue not found)
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

interface VenueChatRoom {
  id: string;
  name: string;
  description: string;
  type: "group";
  sport_type: string | null;
  avatar_url: string | null;
  max_members: number;
  is_active: boolean;
  created_by: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  meta_data: {
    venue_name: string;
    group_level: number;
    venue_maplink: string;
    venue_location: string;
  };
  venue_id: number;
}

interface VenueChatRoomApiResponse {
  data: {
    venue_groups: VenueChatRoom[];
    members_count: number;
  };
}

async function fetchVenueChatRooms(id: number): Promise<{
  venue_groups: VenueChatRoom[];
  members_count: number;
}> {
  try {
    const {
      data: { data },
    } = await axios.get<VenueChatRoomApiResponse>("/api/venue/fetch-groups", {
      params: {
        v_id: id,
      },
    });

    return data;
  } catch (error) {
    // Better error handling with proper typing
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch venue games: ${axiosError.message}`
      );
    }
    throw new Error("An unexpected error occurred while fetching venue games");
  }
}

export function useVenueChatRooms(id: string) {
  return useQuery({
    queryKey: ["venueChatRoom", id],
    queryFn: () => fetchVenueChatRooms(Number(id)),
    enabled: !!id,
    // Additional recommended options
    staleTime: 5 * 60 * 1000, // 5 minutes - venue data doesn't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 404s (venue not found)
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
