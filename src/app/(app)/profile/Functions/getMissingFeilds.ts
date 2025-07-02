import { UserProfile } from "@/hooks/useAuth";

export const getMissingFields = (profile: UserProfile): string[] => {
  const missing: string[] = [];
  if (!profile?.first_name?.trim()) missing.push("First Name");
  if (!profile?.location?.trim()) missing.push("Location");
  if (!profile?.usersetlevel?.trim()) missing.push("Skill Level");
  return missing;
};
