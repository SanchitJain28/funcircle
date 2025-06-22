import { AuthContext } from "@/app/Contexts/AuthContext";
import { createClient } from "@/app/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

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
