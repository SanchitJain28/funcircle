"use client";

import { useAuth, useProfileWithInfiniteGames } from "@/hooks/useAuth";
import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { createClient } from "@/app/utils/supabase/client";
import { isProfileComplete } from "./Functions/isProfileComplete";
import { getMissingFields } from "./Functions/getMissingFeilds";
import { TagsSection } from "./TagSection";
import { GamesPlayedSection } from "./GamesPlayedSection";
import { ProfileField } from "./ProfileFeild";

type FormData = {
  first_name: string;
  location: string;
  usersetlevel: string;
};

const supabase = createClient();

const ProfileSkeleton: React.FC = () => (
  <div className="space-y-8">
    <div className="animate-pulse">
      <div className="h-10 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-2xl w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="h-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-xl w-1/2"></div>
        <div className="h-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-xl w-2/3"></div>
        <div className="h-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-xl w-1/4"></div>
      </div>
    </div>
  </div>
);

export default function ProfileClient() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Use infinite query instead of regular profile query
  const {
    data: profilePages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useProfileWithInfiniteGames({
    id: user?.uid ?? "",
    enabled: !!user,
  });

  // Extract profile info from first page and combine all games
  const profile = profilePages?.pages[0];
  const allGames =
    profilePages?.pages.flatMap((page) => page.gamesPlayed.games || []) || [];
  console.log(allGames);
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
      console.log(profile);
      setFormData({
        location: profile.location || "",
        first_name: profile.first_name || "",
        usersetlevel: profile.usersetlevel || "",
      });
    }
  }, [profile]);

  // Handlers
  const handleFormChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!user?.uid) return;

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
      const { data, error } = await supabase
        .from("users")
        .update({
          first_name: formData.first_name,
          location: formData.location,
          usersetlevel: formData.usersetlevel,
        })
        .eq("user_id", user.uid);

      console.log(data, error);

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
      <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="p-6 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-zinc-600/50">
              <User className="h-10 w-10 text-zinc-400" />
            </div>
            <p className="text-zinc-400 text-lg">
              Please log in to view your profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="max-w-4xl mx-auto p-8">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  if (!profile || error) {
    return (
      <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="p-6 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-zinc-600/50">
              <AlertCircle className="h-10 w-10 text-zinc-400" />
            </div>
            <p className="text-zinc-400 text-lg">Profile not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const profileComplete = isProfileComplete(profile);
  const missingFields = getMissingFields(profile);

  return (
    <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen">
      <CustomHeader />
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Header with enhanced styling */}
        <div className="flex flex-col items-start justify-between mb-8">
          <div className="space-y-2 mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Profile Dashboard
            </h1>
          </div>
          <div className="w-full">
            {!isEditing && profileComplete && (
              <Button
                onClick={handleEdit}
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-[#1D1D1F] to-[#252529] border-zinc-700/50 text-white hover:bg-gradient-to-r hover:from-[#252529] hover:to-[#2a2a2e] hover:text-white hover:border-zinc-600/50 transition-all duration-300 shadow-lg w-full hover:shadow-xl"
              >
                <Edit2 className="h-5 w-5 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Profile completion alert */}
        {!profileComplete && (
          <div className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] rounded-2xl p-8 border border-zinc-700/50 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8338EC]/5 to-[#9d4edd]/5" />
            <div className="relative flex items-start gap-6">
              <div className="p-4 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-2xl border border-[#8338EC]/30 shadow-lg">
                <AlertCircle className="h-8 w-8 text-[#8338EC]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-2xl mb-3">
                  Complete Your Profile
                </h3>
                <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                  Unlock the full potential of your gaming experience by
                  providing the missing information:{" "}
                  <span className="text-[#8338EC] font-semibold">
                    {missingFields.join(", ")}
                  </span>
                </p>
                <Button
                  onClick={handleEdit}
                  size="lg"
                  className="bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:from-[#7c2dd8] hover:to-[#8b3ac7] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Complete Profile Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Profile Information */}
        <div className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#8338EC]/10 to-[#9d4edd]/10 border-b border-zinc-700/50 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-xl border border-[#8338EC]/30">
                <User className="h-6 w-6 text-[#8338EC]" />
              </div>
              Personal Information
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Manage your personal details and preferences
            </p>
          </div>
          <div className="px-4 py-4 space-y-6">
            <ProfileField
              icon={<User className="h-5 w-5" />}
              label="First Name"
              value={profile.first_name}
              isEditing={isEditing}
              fieldName="first_name"
              formData={formData}
              onFormChange={handleFormChange}
            />

            <ProfileField
              icon={<MapPin className="h-5 w-5" />}
              label="Location"
              value={profile.location}
              isEditing={isEditing}
              fieldName="location"
              formData={formData}
              onFormChange={handleFormChange}
            />

            <ProfileField
              icon={<Trophy className="h-5 w-5" />}
              label="Skill Level"
              value={profile.usersetlevel}
              isEditing={isEditing}
              fieldName="usersetlevel"
              formData={formData}
              onFormChange={handleFormChange}
              type="select"
            />

            {/* Enhanced Admin set level (read-only) */}
            {profile.adminsetlevel && (
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#252529] to-[#2a2a2e] border-2 border-amber-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
                <div className="relative text-amber-400 p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                    Admin Set Level
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30 font-semibold">
                      ADMIN
                    </span>
                  </p>
                  <p className="text-base text-amber-300 font-medium mb-2">
                    {profile.adminsetlevel}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    This level was set by an administrator and cannot be
                    changed. It reflects your verified skill assessment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Action buttons */}
        {isEditing && (
          <div className="flex gap-4 justify-end pt-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              size="lg"
              disabled={isSaving}
              className="bg-gradient-to-r from-[#1D1D1F] to-[#252529] border-zinc-700/50 text-white hover:bg-gradient-to-r hover:from-[#252529] hover:to-[#2a2a2e] hover:text-white hover:border-zinc-600/50 transition-all duration-300"
            >
              <X className="h-5 w-5 mr-2" />
              Cancel Changes
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              size="lg"
              className="bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:from-[#7c2dd8] hover:to-[#8b3ac7] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-w-[160px]"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}

        {/* Enhanced Tags Section */}
        <TagsSection tagsData={profile.tags ?? []} user_id={profile.user_id} />

        {/* Enhanced Games Played Section with infinite loading */}
        <GamesPlayedSection
          user_id={profile.user_id}
          gamesData={allGames}
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
