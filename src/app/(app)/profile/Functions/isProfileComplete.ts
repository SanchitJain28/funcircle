import { UserProfile } from "@/hooks/useAuth";

export const isProfileComplete = (profile: UserProfile): boolean => {
  return !!(
    profile?.location?.trim() &&
    profile?.first_name?.trim() &&
    profile?.usersetlevel?.trim()
  );
};
