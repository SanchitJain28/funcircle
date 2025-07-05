"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import axios from "axios";

// Define the custom user type based on your database schema
interface CustomSupaUser {
  user_id: string;
  // Add other fields from your users table here
  email: string;
  created_at?: string;
  first_name: string;
  // ... other fields
}

interface DuoRequest {
  id: string;
  sender_name: string;
  sender_avatar?: string;
  sender_email: string;
  message?: string;
  created_at: string;
  status: "pending" | "accepted" | "rejected";
  profiles: {
    first_name: string;
  };
}

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  error: string | null;
  getSupabaseUser: (uid: string) => Promise<CustomSupaUser>;
  requests: DuoRequest[];
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

  const supabase = createClient();

  const getSupabaseUser = async (uid: string): Promise<CustomSupaUser> => {
    if (!uid) {
      throw new Error("No authenticated user found");
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", uid)
        .single(); // Use .single() if you expect only one user

      if (error) {
        console.log(error);
        throw new Error("Unexpected Supabase Error occurred", error);
      }

      if (!data) {
        throw new Error("User not found in database");
      }

      return data as CustomSupaUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const checkForDuoRequests = async () => {
    console.log("START");
    if (!user?.uid) return;
    console.log("RUNNING");
    try {
      const { data } = await axios.post("/api/check-duo-requests", {
        user_id: user.uid,
      });
      console.log(data);
      setRequests(data.data || []);
    } catch (error) {
      console.error("Failed to fetch duo requests:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setError(null);
        setAuthLoading(false);

        if (user) {
          console.log("User is signed in with UID:", user.uid);
          checkForDuoRequests();
        } else {
          console.log("User is signed out");
        }
      },
      (error) => {
        console.error("Auth state change error:", error);
        setError(error.message);
        setAuthLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    checkForDuoRequests();
  }, [user?.uid]);

  return (
    <AuthContext.Provider
      value={{ user, authLoading, error, getSupabaseUser, requests }}
    >
      {children}
    </AuthContext.Provider>
  );
}
