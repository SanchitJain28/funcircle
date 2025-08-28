import {
  AuthContext,
  GetUserWithDuosResponse,
} from "@/app/Contexts/AuthContext";
import {
  Game,
  RecentMembersProps,
  Subscription,
  TicketMemberNew,
  UserProfile,
} from "@/app/types";
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
  if (!id) throw new Error("User ID is required to fetch profile.");

  try {
    const response = await axios.post("/api/fetch-profile", {
      user_id: id,
    });

    // Debug log (optional, remove in production)

    const result = response?.data?.data;

    if (!result) {
      throw new Error("No profile data found in response.");
    }

    return result as GetUserWithDuosResponse;
  } catch (error) {
    console.error("❌ Failed to fetch profile:");
    throw error; // Let React Query or your caller handle it
  }
}

export function useProfileExp({
  id,
  enabled,
}: {
  id?: string; // Make id optional
  enabled: boolean;
}) {
  const query = useQuery({
    queryKey: ["userExp", id],
    queryFn: () => getProfileExp(id!), // Use non-null assertion since we check enabled
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24 * 2,
    enabled: enabled && !!id, // Only enable if both enabled is true AND id exists
    retry: 1,
  });

  return {
    ...query,
    isPending: enabled && !!id ? query.isPending : false,
  };
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

//FETCH SUBSCRIPTION BY THE USER -----------------------------------------------------

const fetchSubscription = async (user_id: string): Promise<Subscription> => {
  try {
    const { data } = await axios.post("/api/fetch-subscription-user", {
      user_id,
    });
    return data.subscription;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export function useSubscription({
  user_id,
  enabled,
}: {
  user_id?: string;
  enabled: boolean;
}) {
  const query = useQuery({
    queryKey: ["subscription", user_id],
    queryFn: () => fetchSubscription(user_id!),
    enabled,
    retry: 1,
  });

  return {
    ...query,
    isPending: enabled && !!user_id ? query.isPending : false,
  };
}

//FETCH SUBSCRIPTION BY THE USER END -----------------------------------------------------

//FETCH RECENT MEMBERS ---------------------------
const fetchRecentMembers = async (
  id: string
): Promise<RecentMembersProps[]> => {
  const {
    data: { data },
  } = await axios.post("/api/fetch-recent-members", {
    userId: id,
  });
  return data;
};

export function useRecentMembers({
  user_id,
  enabled,
}: {
  user_id: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["recentMembers", user_id],
    queryFn: () => fetchRecentMembers(user_id),
    enabled,
    retry: 1,
  });
}

//FETCH RECENT MEMBERS -END----------------------------

//FETCH REQUESTS ----------------------------------------

async function fetchRequests(user_id: string) {
  const {
    data: { requests },
  } = await axios.post("/api/fetch-game-requests", {
    user_id,
  });
  return requests;
}

export function useRequests({
  user_id,
  enabled,
}: {
  user_id: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["requests", user_id],
    queryFn: () => fetchRequests(user_id),
    enabled,
    retry: 1,
  });
}

//FETCH REQUESTS END ----------------

async function fetchTicketMembers(ticketid: string) :Promise<TicketMemberNew[]> {
  try {
    const { data } = await axios.get("/api/fetch-ticket-members", {
      params: { t_id: ticketid },
    });
    return data.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useTicketMembers({ t_id }: { t_id: string }) {
  return useQuery<TicketMemberNew[]>({
    queryKey: ["ticketMembers", t_id],
    queryFn: () => fetchTicketMembers(t_id),
    enabled: !!t_id,
    retry: 1,
  });
}
