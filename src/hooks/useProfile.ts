import axios, { AxiosError } from "axios";
import { ApiError } from "./useChat";
import { useQuery } from "@tanstack/react-query";

interface Profile {
  first_name: string | null;
  email: string | null;
  user_id: string | null;
  usersetlevel: string | null;
  adminsetlevel: string | null;
}

interface ProfileApiResponse {
  data: Profile;
}

async function fetchCheckProfile(id: string) {
  try {
    const {
      data: { data },
    } = await axios.post<ProfileApiResponse>("/api/profile/fetch", {
      user_id: id,
    });
    return (
      data ?? {
        first_name: null,
        email: null,
        user_id: null,
        usersetlevel: null,
        adminsetlevel: null,
      }
    );
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch profile: ${axiosError.message}`
      );
    }
    throw new Error(`unexpected Error Happened`);
  }
}

export function useCheckProfile(id: string) {
  return useQuery({
    queryKey: ["profile-check-details", id],
    queryFn: () => fetchCheckProfile(id),
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

async function fetchProfile(id: string) {
  try {
    const {
      data: { data },
    } = await axios.post<ProfileApiResponse>("/api/profile/fetch", {
      user_id: id,
    });
    return data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch profile: ${axiosError.message}`
      );
    }
    throw new Error(`unexpected Error Happened`);
  }
}

export function useProfile(id: string) {
  return useQuery({
    queryKey: ["profile-details", id],
    queryFn: () => fetchProfile(id),
    enabled: !!id,
    // Additional recommended options
    staleTime: 60 * 60 * 1000, // 5 minutes - venue data doesn't change frequently
    gcTime: 60 * 60 * 1000, // 10 minutes (formerly cacheTime)
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

interface Usergames {
  title: string;
  status: string;
  venue_id: number;
  ticket_id: number;
  startdatetime: string; // ISO datetime string
}

interface UserGamesApiResponse {
  data: Usergames[];
}

async function fetchUserGames(user_id: string): Promise<Usergames[]> {
  try {
    const {
      data: { data },
    } = await axios.post<UserGamesApiResponse>("/api/profile/games", {
      user_id,
    });
    return data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch user games: ${axiosError.message}`
      );
    }
    throw new Error("Unexpected Error Occured While Fetching User games");
  }
}

export function useUserGames(id: string) {
  const query = useQuery({
    queryKey: ["user-games", id],
    queryFn: () => fetchUserGames(id),
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

  if (!id) {
    return {
      ...query,
      isPending: false,
    };
  }

  return query;
}

interface Duo {
  id: string;
  status: "pending" | "accepted" | "rejected" | string; // adjust based on your DB enum
  created_at: string; // ISO timestamp
  requester: UserSummary;
  partner: UserSummary;
}

interface UserSummary {
  user_id: string;
  first_name: string;
  email?: string;
  usersetlevel?: string;
  adminsetlevel?: string;
}


interface UserDuosApiResponse {
  data :Duo[]
}

async function fetchUserDuos(id: string):Promise<Duo[]> {
  try {
    const {
      data: { data },
    } = await axios.post<UserDuosApiResponse>("/api/profile/duos/fetch", {
      user_id: id,
    });
    return data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to fetch user duos: ${axiosError.message}`
      );
    }
    throw new Error(
      `Failed to fetch user duos , Unexpected Servor Error Occured`
    );
  }
}

export const useUserDuos = (id?: string) => {
  const query = useQuery<Duo[]>({
    queryKey: ["user-duos",id],
    queryFn: () => fetchUserDuos(id!),
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

  if (!id) {
    return {
      ...query,
      isPending: false,
      isLoading: false,
    };
  }

  return query;
};
