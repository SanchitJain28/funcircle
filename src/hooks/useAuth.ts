import { AuthContext } from "@/app/Contexts/AuthContext";
import { createClient } from "@/app/utils/supabase/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

interface Game {
  ticket_id: number;

  name: string;
  date: string; // ISO 8601 format, can use `Date` type if you plan to parse it
  ticket_members: TicketMember[];
}

export interface GamesResponse {
  count: number;
  games: Game[];
}

interface NormalUserProfile {
  age: number | null;
  images: string[] | null; // Replace `any` with actual image type if known
  location: string | null;
  faith: string | null;
  drink: string | null;
  smoke: string | null;
  college: string | null;
  work: string | null;
  interests: string[] | null;
  zodiac: string | null;
  political_leaning: string | null;
  hometown: string | null;
  mother_tongue: string | null;
  recommended_users: string[] | null;
  last_updated: string | null; // ISO date-time format
  liked_users: string[] | null;
  first_name: string;
  email: string;
  birthday: string | null; // ISO date string
  gender: string | null;
  looking_for: string | null;
  height: number | null;
  workout_status: string | null;
  pets: string[] | null;
  bio: string | null;
  is_premium: boolean;
  profile_completion: number;
  user_id: string;
  graduation_year: number | null;
  company: string | null;
  recommendationtimedays: number | null;
  openfordating: boolean;
  premiumtype: string | null;
  premiumvalidtill: string | null;
  secrets: string[] | null;
  created: string; // ISO date-time string
  usersetlevel: string;
  adminsetlevel: string;
}

export interface UserProfile {
  adminsetlevel: number | null;
  age: number | null;
  bio: string | null;
  birthday: string | null;
  college: string | null;
  company: string | null;
  created: string; // ISO date string
  drink: string | null;
  email: string;
  faith: string | null;
  first_name: string;
  gender: string | null;
  graduation_year: number | null;
  height: number | null;
  hometown: string | null;
  images: string[] | null;
  interests: string[] | null;
  is_premium: boolean;
  last_updated: string | null;
  liked_users: string[] | null;
  location: string | null;
  looking_for: string | null;
  mother_tongue: string | null;
  openfordating: boolean;
  pets: string | null;
  political_leaning: string | null;
  premiumtype: string | null;
  premiumvalidtill: string | null;
  profile_completion: number;
  recommendationtimedays: number | null;
  recommended_users: string[] | null;
  secrets: string[] | null;
  smoke: string | null;
  user_id: string;
  usersetlevel: string;
  work: string | null;
  workout_status: string | null;
  zodiac: string | null;
  gamesPlayed: GamesResponse;
  tags: TagGroup[] | null;
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

const getProfileWithGames = async (
  id: string,
  offset: number = 0,
  limit: number = 5
): Promise<UserProfile> => {
  try {
    const { data, error } = await supabase.rpc("get_user_profile_with_games", {
      p_user_id: id,
      p_limit: limit,
      p_offset: offset,
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
export function useProfileWithInfiniteGames({
  id,
  enabled,
  limit = 5,
}: {
  id: string;
  enabled: boolean;
  limit?: number;
}) {
  return useInfiniteQuery({
    queryKey: ["profile", id, "infinite"],
    queryFn: ({ pageParam = 0 }) => getProfileWithGames(id, pageParam, limit),
    getNextPageParam: (lastPage, allPages) => {
      const currentGamesCount = allPages.length * limit;
      const hasMoreGames =
        lastPage.gamesPlayed &&
        lastPage.gamesPlayed.games &&
        lastPage.gamesPlayed.games.length === limit;

      return hasMoreGames ? currentGamesCount : undefined;
    },
    initialPageParam: 0,
    enabled,
  });
}

export async function getProfile(id: string): Promise<NormalUserProfile> {
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
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    enabled,
    retry: 1,
  });
}
