import { AuthContext } from "@/app/Contexts/AuthContext";
import { createClient } from "@/app/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

interface TicketMember {
  id: string;
  name: string;
  connection: boolean
}

export interface TagGroup {
  tag: string;
  ticket_members: TicketMember[];
  venue : string
}

interface Game {
  name: string;
  date: string; // ISO 8601 format, can use `Date` type if you plan to parse it
}

export interface GamesResponse {
  count: number;
  games_name: Game[];
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
  tags :TagGroup[] | null;
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

const getProfile = async (id: string): Promise<UserProfile> => {
  try {
    const { data, error } = await supabase.rpc("get_full_profile_with_games", {
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

export function useProfile({ id, enabled }: { id: string; enabled: boolean }) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
    staleTime: 0,
    gcTime: 0,
    enabled,
  });
}
