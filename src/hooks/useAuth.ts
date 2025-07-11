import {
  AuthContext,
  GetUserWithDuosResponse,
} from "@/app/Contexts/AuthContext";
import { Game, UserProfile } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

interface TicketMember {
  id: string;
  name: string;
  connection: boolean;
}

export interface TagGroup {
  tag: string;
  ticket_members: TicketMember[];
  venue: string;
}

export interface UserProfileWithTags {
  profile: UserProfile;
  tags: TagGroup[];
}

const supabase = createClient();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const CheckForRedirection = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("usersetlevel")
      .eq("user_id", user_id)
      .single();

    console.log(data, error);

    if (error) {
      return "/complete-profile";
    }
    //PROFILE EXISTS
    if (data) {
      //LEVEL ALSO EXISTS
      if (data.usersetlevel) {
        //NO REDIRECTION
        return false;
      }

      //LEVEL DON'T EXIST
      return "/assign-level";
    }

    //PROFILE DOES NOT EXIST WITH THE USER ID
    return "/complete-profile";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export function useCheckRedirection({
  user_id,
  enabled,
}: {
  user_id: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["isSubabaselevelset", user_id],
    queryFn: () => CheckForRedirection(user_id),
    enabled,
    staleTime: 0, // Forces refetching on remount
    refetchOnMount: "always", // always refetch when component mounts
    refetchOnWindowFocus: true, // also helps when tab refocuses
  });
}

const getProfileWithTags = async (id: string): Promise<UserProfileWithTags> => {
  try {
    const { data, error } = await supabase.rpc("get_user_with_tags", {
      p_user_id: id,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export function useProfileWithTags({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["profile", id, "infinite"],
    queryFn: () => getProfileWithTags(id),
    enabled,
  });
}

export async function getProfile(id: string): Promise<UserProfile> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useProfile({ id, enabled }: { id: string; enabled: boolean }) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => {
      console.log("FETCHED THE PROFILE");
      return getProfile(id);
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24 * 2,
    enabled,
    retry: 1,
  });
}

export async function getProfileExp(
  id: string
): Promise<GetUserWithDuosResponse> {
  const {
    data: { data },
  } = await axios.post("/api/fetch-profile", {
    user_id: id,
  });
  return data;
}

export function useProfileExp({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["userExp", id],
    queryFn: () => getProfileExp(id),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24 * 2,
    enabled,
    retry: 1,
  });
}

async function getUserGames(
  id: string,
  page: number = 2,
  limit: number = 10
): Promise<Game[]> {
  try {
    const { data, error } = await supabase.rpc("get_user_games", {
      user_id_param: id,
      page_param: page,
      limit_param: limit,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useUserGames({
  id,
  enabled,
  limit = 10,
}: {
  id: string;
  enabled: boolean;
  limit?: number;
}) {
  const query = useInfiniteQuery({
    queryKey: ["userGames", id],
    queryFn: ({ pageParam = 1 }) => getUserGames(id, pageParam, limit),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24 * 2,
    enabled,
    retry: 1,
    // Determine if there's a next page
    getNextPageParam: (lastPage, allPages) => {
      // Check if lastPage exists and has data

      if (!lastPage || !Array.isArray(lastPage) || lastPage.length === 0) {
        return undefined;
      }

      // If the last page has fewer items than the limit, there's no next page
      if (lastPage.length < limit) {
        return undefined;
      }

      // Return the next page number
      return allPages.length + 1;
    },
    // Optional: Handle previous page for bidirectional pagination
    getPreviousPageParam: (firstPage, allPages) => {
      return allPages.length > 1 ? allPages.length - 1 : undefined;
    },
    // Optional: Set initial page param
    initialPageParam: 1,
  });

  if (!query.data?.pages[0]) return { games: null, ...query };
  const games = query.data?.pages.flatMap((page) => page);

  return { games, ...query };
}
