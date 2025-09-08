import { ChatMessage, ChatRoom } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface ChatRoomDetailsApiResponse {
  data: ChatRoom;
}

export interface ApiError {
  message: string;
  status?: number;
}

async function fetchChatRoomDetails(id: string) {
  try {
    const {
      data: { data },
    } = await axios.get<ChatRoomDetailsApiResponse>("/api/chat/details", {
      params: {
        r_id: id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to Chat Room Details: ${axiosError.message}`
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching venue details"
    );
  }
}

export function useChatRoomDetails(id: string) {
  return useQuery({
    queryKey: ["chat-room-details", id],
    queryFn: () => fetchChatRoomDetails(id),
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

interface RoomInfo {
  id: string;
  name: string;
  description: string;
  type: string;
}

interface ChatRoomApiResponse {
  data: {
    success: boolean;
    is_member: boolean;
    room: RoomInfo;
    messages: ChatMessage[]; // you can replace `any[]` with a Message[] interface if you define message structure
    message: string;
  };
}

async function fetchChatRooms({
  room_id,
  user_id,
}: {
  room_id: string;
  user_id: string;
}) {
  try {
    const {
      data: { data },
    } = await axios.post<ChatRoomApiResponse>("/api/chat/fetch", {
      room_id,
      user_id,
    });
    return data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to Chat Room Details: ${axiosError.message}`
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching venue details"
    );
  }
}

export function useChatRooms({
  room_id,
  user_id,
}: {
  room_id: string;
  user_id: string | null;
}) {
  const query = useQuery({
    queryKey: ["chat", room_id, user_id],
    queryFn: () => fetchChatRooms({ room_id, user_id: user_id! }),
    enabled: !!(room_id && user_id),
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

  // Return a custom isPending that accounts for disabled queries
  return {
    ...query,
    isPending: query.isPending && query.fetchStatus !== "idle",
  };
}

interface ChatRoomMembersApiResponse {
  data: {
    user_id: string;
    first_name: string;
    role: "admin" | "moderator" | "member" | "system";
    joined_at: string; // ISO timestamp
    last_seen_at: string; // ISO timestamp
    is_muted: boolean;
    is_banned: boolean;
  }[];
}

async function fetchChatRoomsMembers(room_id: string) {
  try {
    const {
      data: { data },
    } = await axios.get<ChatRoomMembersApiResponse>("/api/chat/fetch-members", {
      params: {
        r_id: room_id,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to Fetch Chat Room Members Details: ${axiosError.message}`
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching Chat Room Members details"
    );
  }
}

export function useChatRoomMembers(id: string) {
  return useQuery({
    queryKey: ["chat-room-members", id],
    queryFn: () => fetchChatRoomsMembers(id),
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

interface UserRoom {
  id: string;
  name: string;
  description: string | null;
  type: "group" | "direct" | string; // adjust if you have fixed values
  sport_type: string | null;
  avatar_url: string | null;
  max_members: number;
  is_active: boolean;
  created_by: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  member_count: number;
  last_message: {
    content: string;
    sent_at: string; // ISO timestamp
    sender_id: string;
    sender_name: string;
  } | null; // can be null if no message yet
  user_membership: {
    role: "member" | "admin" | string; // adjust roles as needed
    joined_at: string; // ISO timestamp
    last_seen_at: string | null; // maybe null if never seen
    is_muted: boolean;
  };
}

interface UserChatsApiResponse {
  data: UserRoom[];
}

async function fetchUserChats(user_id: string) {
  try {
    const {
      data,
    } = await axios.post<UserChatsApiResponse>("/api/chat/fetch-chats", {
      user_id,
    });
    return data.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(
        axiosError.response?.data?.message ||
          `Failed to User Chats ${axiosError.message}`
      );
    }
    throw new Error("An unexpected error occurred while fetching User Chats");
  }
}

export function useUserChats(id: string) {
  const query = useQuery({
    queryKey: ["user-chats", id],
    queryFn: () => fetchUserChats(id),
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

  return {
    ...query,
    isPending: query.isPending && query.fetchStatus !== "idle",
  };
}
