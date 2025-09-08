
import { useQuery } from "@tanstack/react-query";
import { Review } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();

const fetchUserReviews = async (userId: string): Promise<Review[]> => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("from_user_id", userId);

  if (error) {
    console.error("Error fetching user reviews:", error);
    throw new Error(error.message);
  }

  return data || [];
};

export const useUserReviews = (userId: string) => {
  return useQuery<Review[]>({
    queryKey: ["user-reviews", userId],
    queryFn: () => fetchUserReviews(userId),
    enabled: !!userId,
  });
};
