"use client";
import { useAuth, useProfileWithInfiniteGames } from "@/hooks/useAuth";
import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Settings,
  Gamepad2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { createClient } from "@/app/utils/supabase/client";
import { isProfileComplete } from "./Functions/isProfileComplete";
import { getMissingFields } from "./Functions/getMissingFeilds";
import { ProfileField } from "./ProfileFeild";
import DuoRequestInbox from "./Duo/DuoRequestInbox";
import { TagsSection } from "./Tags/TagSection";
import { GamesPlayedSection } from "./Games/GamesPlayedSection";
import DuoInfo from "./Duo/DuoInfo";
import DuoAnimation from "./Duo/DuoAnimation";
// import FlameButton from "./FlameButton";

type FormData = {
  first_name: string;
  location: string;
  usersetlevel: string;
};

const supabase = createClient();

const ProfileSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div className="animate-pulse space-y-3">
      <div className="h-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-xl w-3/4"></div>
      <div className="h-4 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg w-1/2"></div>
      <div className="h-4 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg w-2/3"></div>
    </div>
    <div className="animate-pulse space-y-3">
      <div className="h-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-xl w-2/3"></div>
      <div className="h-4 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg w-3/4"></div>
    </div>
  </div>
);

export default function ProfileClient() {
  const { user, profile: userProfile } = useAuth();
  const { toast } = useToast();
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

  const profile = profilePages?.pages[0];
  const allGames =
    profilePages?.pages.flatMap((page) => page.gamesPlayed.games || []) || [];
  const [AnimationEnabled, setAnimationEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location: "",
    first_name: "",
    usersetlevel: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        location: profile.location || "",
        first_name: profile.first_name || "",
        usersetlevel: profile.usersetlevel || "",
      });
    }
  }, [profile]);

  const handleFormChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!user?.uid) return;

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
      const { error } = await supabase
        .from("users")
        .update({
          first_name: formData.first_name,
          location: formData.location,
          usersetlevel: formData.usersetlevel,
        })
        .eq("user_id", user.uid);

      if (error) {
        toast({
          title: "Profile Cannot be updated",
          description: "Your profile Cannot be updated",
        });
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

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="p-4 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-zinc-600/50">
              <User className="h-8 w-8 text-zinc-400" />
            </div>
            <p className="text-zinc-400">Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen">
        <div className="max-w-6xl mx-auto p-4">
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
            <div className="p-4 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-zinc-600/50">
              <AlertCircle className="h-8 w-8 text-zinc-400" />
            </div>
            <p className="text-zinc-400">Profile not found.</p>
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
      <div className="max-w-7xl mx-auto p-4 h-[calc(100vh-80px)] ">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            Profile Dashboard
          </h1>
          {!isEditing && profileComplete && (
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-[#1D1D1F] to-[#252529] border-zinc-700/50 text-white hover:bg-gradient-to-r hover:from-[#252529] hover:to-[#2a2a2e]"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        {/* Compact Profile completion alert */}
        {!profileComplete && (
          <div className="bg-gradient-to-r from-[#8338EC]/10 to-[#9d4edd]/10 rounded-xl p-4 border border-[#8338EC]/30 mb-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-[#8338EC] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">
                  Complete your profile:{" "}
                  <span className="text-[#8338EC] font-medium">
                    {missingFields.join(", ")}
                  </span>
                </p>
              </div>
              <Button
                onClick={handleEdit}
                size="sm"
                className="bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:from-[#7c2dd8] hover:to-[#8b3ac7] text-white flex-shrink-0"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Complete
              </Button>
            </div>
          </div>
        )}

        {userProfile?.current_duo ? (
          <DuoInfo />
        ) : (
          <DuoRequestInbox
            onAccept={(e) => {
              setAnimationEnabled(e);
            }}
          />
        )}

        {userProfile?.current_duo && (
          <DuoAnimation
            onOpen={AnimationEnabled}
            onClose={() => {}}
            partnerName={userProfile?.current_duo.other_user.first_name ?? ""}
          />
        )}

        {/* Main Content with Tabs */}
        <div className="">
          <Tabs defaultValue="profile" className="h-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#1D1D1F] border border-zinc-700/50 p-2 h-16 rounded-xl shadow-lg">
              <TabsTrigger
                value="profile"
                className="flex items-center justify-center gap-3 h-12 px-6 text-base font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200"
              >
                <Settings className="h-5 w-5" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="games"
                className="flex items-center justify-center gap-3 h-12 px-6 text-base font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200"
              >
                <Gamepad2 className="h-5 w-5" />
                My Games
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="profile"
              className="h-[calc(100%-60px)] overflow-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                {/* Personal Information */}
                <div className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] rounded-xl border border-zinc-700/50 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-[#8338EC]" />
                    <h2 className="text-lg font-semibold text-white">
                      Personal Info
                    </h2>
                  </div>
                  <div className="space-y-4">
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
                  </div>
                </div>

                {/* Admin Level & Actions */}
                <div className="space-y-4">
                  {profile.adminsetlevel && (
                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-amber-400" />
                        <span className="text-sm font-semibold text-white">
                          Admin Set Level
                        </span>
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                          ADMIN
                        </span>
                      </div>
                      <p className="text-amber-300 font-medium mb-1">
                        {profile.adminsetlevel}
                      </p>
                      <p className="text-xs text-zinc-400">
                        This level was set by an administrator and cannot be
                        changed.
                      </p>
                    </div>
                  )}

                  {/* Action buttons */}
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        disabled={isSaving}
                        className="flex-1 bg-gradient-to-r from-[#1D1D1F] to-[#252529] border-zinc-700/50 text-white"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:from-[#7c2dd8] hover:to-[#8b3ac7] text-white"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  <TagsSection
                    tagsData={profile.tags ?? []}
                    user_id={profile.user_id}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="games"
              className="h-[calc(100%-60px)] overflow-auto"
            >
              <GamesPlayedSection
                user_id={profile.user_id}
                gamesData={allGames}
                onLoadMore={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
