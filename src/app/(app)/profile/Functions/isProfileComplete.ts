import { FullUserProfile } from "@/hooks/useAuth";

export const isProfileComplete = (profile: FullUserProfile): boolean => {
  return !!(
    profile?.location?.trim() &&
    profile?.first_name?.trim() &&
    profile?.usersetlevel?.trim()
  );
};
