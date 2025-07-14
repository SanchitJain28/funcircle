"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { DuoRequest, Subject, UserProfile } from "../types";
import { useProfileExp } from "@/hooks/useAuth";
import { useDuosRealtime } from "@/hooks/useDuoRealtime";
import { toast } from "react-toastify";

// Define the custom user type based on your database schema
export interface GetUserWithDuosResponse {
  profile: UserProfile;
  duos: DuoRequest[];
  current_duo: DuoRequest;
  subject: Subject;
}

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  error: string | null;
  requests: DuoRequest[];
  profile?: GetUserWithDuosResponse | null;
  isProfilePending: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<DuoRequest[]>([]);
  const [profile, setProfile] = useState<GetUserWithDuosResponse | null>(null);

  // Only fetch profile data when user exists and has uid
  const {
    data,
    error: profileError,
    isPending: isProfilePending,
  } = useProfileExp({
    id: user?.uid,
    enabled: !!user?.uid,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log(user?.uid);
        setUser(user);
        setError(null);
        setAuthLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setError(error?.message || "Authentication error occurred");
        setAuthLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Handle profile fetch error
    if (profileError) {
      return;
    }

    if (data) {
      console.log(data);
      setProfile(data);
    }

    // Process duo requests only when data exists and has the expected structure
    if (data?.duos && Array.isArray(data.duos)) {
      try {
        const RequestFromUser = data.duos.filter((duo: DuoRequest) => {
          return duo?.is_requester === true;
        });

        const RequestToUser = data.duos.filter((duo: DuoRequest) => {
          return duo?.is_requester === false;
        });

        console.log("Requests from user:", RequestFromUser);
        // console.log("Requests to user:", RequestToUser);

        // Set requests to user (incoming requests)
        setRequests(RequestToUser);
      } catch (filterError) {
        console.error("Error filtering duo requests:", filterError);
        setError("Failed to process duo requests");
        setRequests([]);
      }
    } else if (data && !data.duos) {
      // Data exists but no duos array - this might be expected
      console.log("No duos found in profile data");
      setRequests([]);
    }
  }, [data, profileError]);

  useDuosRealtime(user?.uid ?? "", (payload) => {
    // You can show toast, store in context, or trigger a notification
    console.log("🔥 Duo Event in Context", payload);
    console.log("PAYLOAD", payload);
    // Example: Global toast
    if (payload.payload.eventType === "INSERT") {
      if (payload.appendableRequest) {
        setRequests([...requests, payload.appendableRequest]);
      }
      toast(`👥 New duo request received!`);
    }
  });

  // Reset requests when user logs out
  useEffect(() => {
    if (!user) {
      setRequests([]);
    }
  }, [user]);

  useEffect(() => {
    console.log("🧠 user ID:", user?.uid, "enabled:", !!user?.uid);

    console.log("🧪 isProfilePending changed:", isProfilePending);
  }, [isProfilePending]);

  return (
    <AuthContext.Provider
      value={{ user, authLoading, error, requests, profile, isProfilePending }}
    >
      {children}
    </AuthContext.Provider>
  );
}
