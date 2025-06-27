"use client";

import { useAuth, useProfile, UserProfile } from "@/hooks/useAuth";
import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Edit2,
  Save,
  X,
  User,
  MapPin,
  Trophy,
  Shield,
  AlertCircle,
  GamepadIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/app/utils/supabase/client";
import { FormatDateTime } from "@/app/utils/Formating/DateFormat";

// Types

interface FormData {
  location: string;
  first_name: string;
  usersetlevel: string;
}

const supabase = createClient();

// Constants
const SKILL_LEVELS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Beginner +", label: "Beginner+" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Upper Intermediate", label: "Upper Intermediate" },
  { value: "Professional", label: "Professional" },
] as const;

// Helper function to check if profile is complete
const isProfileComplete = (profile: UserProfile): boolean => {
  return !!(
    profile?.location?.trim() &&
    profile?.first_name?.trim() &&
    profile?.usersetlevel?.trim()
  );
};

// Helper function to get missing fields
const getMissingFields = (profile: UserProfile): string[] => {
  const missing: string[] = [];
  if (!profile?.first_name?.trim()) missing.push("First Name");
  if (!profile?.location?.trim()) missing.push("Location");
  if (!profile?.usersetlevel?.trim()) missing.push("Skill Level");
  return missing;
};

// Loading component
const ProfileSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="animate-pulse">
      <div className="h-8 bg-zinc-800 rounded w-1/3 mb-4"></div>
      <div className="space-y-4">
        <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
        <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

// Profile field component
const ProfileField: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  isEditing: boolean;
  fieldName: keyof FormData;
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string) => void;
  type?: "input" | "select";
}> = ({
  icon,
  label,
  value,
  isEditing,
  fieldName,
  formData,
  onFormChange,
  type = "input",
}) => {
  const displayValue = value?.trim() || "Not provided";
  const isEmpty = !value?.trim();

  if (isEditing) {
    console.log(formData.usersetlevel);
    // console.log(formatLevelByName(formData.usersetlevel))
    return (
      <div className="space-y-3">
        <Label
          htmlFor={fieldName}
          className="text-sm font-medium flex items-center gap-2 text-white"
        >
          <span className="text-[#8338EC]">{icon}</span>
          {label}
        </Label>
        {type === "select" && fieldName === "usersetlevel" ? (
          <Select
            value={formData.usersetlevel}
            onValueChange={(value) => onFormChange(fieldName, value)}
          >
            <SelectTrigger className="bg-[#252529] border-zinc-700 text-white focus:border-[#8338EC] focus:ring-[#8338EC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1D1D1F] border-zinc-700">
              {SKILL_LEVELS.map((level) => (
                <SelectItem
                  key={level.value}
                  value={level.value}
                  className="text-white hover:bg-[#252529] focus:bg-[#252529]"
                >
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={fieldName}
            value={formData[fieldName]}
            onChange={(e) => onFormChange(fieldName, e.target.value)}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className="bg-[#252529] border-zinc-700 text-white placeholder:text-zinc-400 focus:border-[#8338EC] focus:ring-[#8338EC]"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#1D1D1F] border border-zinc-700/50">
      <div className="mt-0.5 text-[#8338EC]">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        <p
          className={`text-sm mt-1 ${isEmpty ? "text-zinc-400 italic" : "text-zinc-300"}`}
        >
          {displayValue}
        </p>
      </div>
      {isEmpty && (
        <div className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
          Missing
        </div>
      )}
    </div>
  );
};

export default function ProfileClient() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profile, isLoading } = useProfile({
    id: user?.uid ?? "",
    enabled: !!user,
  });

  const getFullProfile = async () => {
    const { data, error } = await supabase.rpc("get_full_profile_with_games", {
      p_user_id: user?.uid,
    });
    console.log(data, error);
  };

  // State
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location: "",
    first_name: "",
    usersetlevel: "",
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        location: profile.location || "",
        first_name: profile.first_name || "",
        usersetlevel: profile.usersetlevel || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      console.log(user.uid);
      getFullProfile();
    }
  }, [user]);

  // Handlers
  const handleFormChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!user?.uid) return;
    console.log("INITIATED");

    // Validation
    const errors: string[] = [];
    if (!formData.first_name.trim()) errors.push("First name is required");
    if (!formData.location.trim()) errors.push("Location is required");
    if (!formData.usersetlevel.trim()) errors.push("Skill level is required");

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      console.log("RUNNING");
      const { data, error } = await supabase
        .from("users")
        .update(formData)
        .eq("user_id", user.uid);

      console.log(data, error);
      if (error) {
        return;
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [user?.uid, formData, toast]);

  const handleCancel = useCallback(() => {
    if (profile) {
      setFormData({
        location: profile.location || "",
        first_name: profile.first_name || "",
        usersetlevel: profile.usersetlevel || "",
      });
    }
    setIsEditing(false);
  }, [profile]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  // Early returns
  if (!user) {
    return (
      <div className="bg-gradient-to-b from-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-zinc-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="max-w-2xl mx-auto p-6">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-gradient-to-b from-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-zinc-400">Profile not found.</p>
        </div>
      </div>
    );
  }

  const profileComplete = isProfileComplete(profile);
  const missingFields = getMissingFields(profile);

  return (
    <div className="bg-gradient-to-b from-[#131315] to-[#1a1a1c] min-h-screen">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-zinc-400 mt-1">
              {profileComplete
                ? "Your profile is complete"
                : `Complete your profile (${missingFields.length} field${missingFields.length !== 1 ? "s" : ""} missing)`}
            </p>
          </div>
          {!isEditing && profileComplete && (
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              className="bg-[#1D1D1F] border-zinc-700 text-white hover:bg-[#252529] hover:text-white"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        {/* Profile completion alert */}
        {!profileComplete && (
          <div className="bg-[#1D1D1F] rounded-xl p-6 border border-zinc-700/50 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#8338EC]/20 rounded-full">
                <AlertCircle className="h-5 w-5 text-[#8338EC]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-lg">
                  Complete Your Profile
                </h3>
                <p className="text-zinc-300 mt-2 leading-relaxed">
                  Please provide the missing information to get the most out of
                  your experience:{" "}
                  <span className="text-[#8338EC] font-medium">
                    {missingFields.join(", ")}
                  </span>
                </p>
                <Button
                  onClick={handleEdit}
                  size="sm"
                  className="mt-4 bg-[#8338EC] hover:bg-[#7c2dd8] text-white font-medium"
                >
                  Complete Profile Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Information */}
        <div className="bg-[#1D1D1F] rounded-xl border border-zinc-700/50 shadow-lg">
          <div className="p-6 border-b border-zinc-700/50">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <User className="h-5 w-5 text-[#8338EC]" />
              Personal Information
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <ProfileField
              icon={<User className="h-4 w-4" />}
              label="First Name"
              value={profile.first_name}
              isEditing={isEditing}
              fieldName="first_name"
              formData={formData}
              onFormChange={handleFormChange}
            />

            <ProfileField
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value={profile.location}
              isEditing={isEditing}
              fieldName="location"
              formData={formData}
              onFormChange={handleFormChange}
            />

            <ProfileField
              icon={<Trophy className="h-4 w-4" />}
              label="Skill Level"
              value={profile.usersetlevel}
              isEditing={isEditing}
              fieldName="usersetlevel"
              formData={formData}
              onFormChange={handleFormChange}
              type="select"
            />

            {/* Admin set level (read-only) */}
            {profile.adminsetlevel && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#252529] border border-zinc-600/50">
                <div className="mt-0.5 text-[#8338EC]">
                  <Shield className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">
                    Admin Set Level
                  </p>
                  <p className="text-sm text-zinc-300 mt-1">
                    {profile.adminsetlevel}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2">
                    This level was set by an administrator and cannot be
                    changed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* //GAMES PLAYED */}

        <div className="bg-[#1D1D1F] rounded-xl border border-zinc-700/50 shadow-lg">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GamepadIcon className="h-5 w-5 text-[#8338EC]" />
                <p className="text-white font-bold">Games Played</p>
              </div>
              <div className="px-3 py-1 bg-[#8338EC]/20 text-[#8338EC] text-sm rounded-full border border-[#8338EC]/30">
                {profile.gamesPlayed?.count || 0} Total
              </div>
            </div>

            {!profile.gamesPlayed?.games_name?.length ? (
              <div className="text-center py-8">
                <div className="p-4 bg-[#252529] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <GamepadIcon className="h-8 w-8 text-zinc-400" />
                </div>
                <p className="text-zinc-400 text-lg font-medium">
                  No games played yet
                </p>
                <p className="text-zinc-500 text-sm mt-1">
                  Your game history will appear here once you start playing
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {profile.gamesPlayed.games_name.slice(0, 5).map((game, index) => (
                  <div
                    key={`${game.name}-${game.date}-${index}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#252529] border border-zinc-600/50 hover:bg-[#2a2a2e] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#8338EC]/20 rounded-lg">
                        <Trophy className="h-4 w-4 text-[#8338EC]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{game.name}</p>
                        <p className="text-zinc-400 text-sm">
                          {FormatDateTime(game.date).date} {FormatDateTime(game.date).day} {FormatDateTime(game.date).month} {FormatDateTime(game.date).time}
                        </p>
                      </div>
                    </div>
                   
                  </div>
                ))}

                {profile.gamesPlayed.games_name.length > 5 && (
                  <div className="text-center pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#252529] border-zinc-700 text-white hover:bg-[#1D1D1F] hover:text-white"
                    >
                      View All {profile.gamesPlayed.count} Games
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {isEditing && (
          <div className="flex gap-3 justify-end">
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={isSaving}
              className="bg-[#1D1D1F] border-zinc-700 text-white hover:bg-[#252529] hover:text-white"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#8338EC] hover:bg-[#7c2dd8] text-white font-medium"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
