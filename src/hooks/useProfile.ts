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

async function fetchProfile(id: string) {
  try {
    const { data } = await axios.post<ProfileApiResponse>(
      "/api/profile/fetch",
      {
        user_id: id,
      }
    );
    return data.data ?? {
        first_name: null,
        email: null,
        user_id: null,
        usersetlevel: null,
        adminsetlevel: null,
      }
    
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