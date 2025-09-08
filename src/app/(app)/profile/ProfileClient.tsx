"use client";
import { useAuth, useProfileWithTags } from "@/hooks/useAuth";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

// Refined ProfileClient component with improved structure and UI

type FormData = {
  first_name: string;
  location: string;
  usersetlevel: string;
};

const supabase = createClient();

// Skeleton loader for a better loading experience
export const ProfileSkeleton: React.FC = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-8">
    <div className="h-8 bg-gray-800/60 rounded-lg w-1/3 animate-pulse"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4 p-6 bg-gray-900/50 rounded-2xl">
        <div className="h-6 bg-gray-800/60 rounded-md w-1/2 animate-pulse"></div>
        <div className="h-10 bg-gray-800/60 rounded-lg w-full animate-pulse"></div>
        <div className="h-10 bg-gray-800/60 rounded-lg w-full animate-pulse"></div>
        <div className="h-10 bg-gray-800/60 rounded-lg w-full animate-pulse"></div>
      </div>
      <div className="space-y-4 p-6 bg-gray-900/50 rounded-2xl">
        <div className="h-6 bg-gray-800/60 rounded-md w-1/2 animate-pulse"></div>
        <div className="h-16 bg-gray-800/60 rounded-lg w-full animate-pulse"></div>
        <div className="h-24 bg-gray-800/60 rounded-lg w-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Centered message component for loading/error states
const CenteredMessage: React.FC<{ icon: React.ReactNode; message: string }> = ({
  icon,
  message,
}) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c]">
    <div className="text-center p-8 bg-gray-900/40 rounded-2xl shadow-xl">
      <div className="p-4 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-16 h-16 mx-auto mb-5 flex items-center justify-center border border-zinc-700/50">
        {icon}
      </div>
      <p className="text-zinc-300 text-lg">{message}</p>
    </div>
  </div>
);

export default function ProfileClient() {
  const { user, profile: userProfile } = useAuth();
  const { toast } = useToast();
  const { data, isError , isPending } = useProfileWithTags({
    id: user?.uid ?? "",
    enabled: !!user,
  });

  const router = useRouter();

  // const router = useRouter();

  const profile = data?.profile;

  const [animationEnabled, setAnimationEnabled] = useState(false);
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
        title: "Missing Information",
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

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your profile has been updated.",
        variant: "default",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
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

  const formatAdminSetLevel = (s: string) => {
    switch (s) {
      case "2":
        return "Beginner";
      case "4":
        return "Begineer Intermediate";
      case "6":
        return "Intermediate";
      case "8":
        return "Upper Intermediate";
      case "10":
        return "Professional";
    }
  };

  if (!user) {
    // router.push("/sign-up")
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <CenteredMessage
          icon={<User className="h-8 w-8 text-zinc-400" />}
          message="Please log in to view your profile."
        />

        <Link href="/sign-up">
          <button
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 
                 text-white font-semibold shadow-lg shadow-purple-500/30
                 hover:scale-105 hover:shadow-xl hover:shadow-purple-600/40
                 transition-all duration-300 ease-out"
          >
            Sign in with Phone Number
          </button>
        </Link>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen">
        <CustomHeader />
        <ProfileSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <CenteredMessage
        icon={<AlertCircle className="h-8 w-8 text-amber-500" />}
        message="An Error Occured While Fetching Your profile"
      />
    );
  }

  if (!profile) {
    router.push("/complete-profile?redirect=/play");
    return;
  }

  const profileComplete = isProfileComplete(profile);
  const missingFields = getMissingFields(profile);

  return (
    <div className="bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#1a1a1c] min-h-screen text-white">
      <CustomHeader />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Profile Dashboard
          </h1>
          {!isEditing && profileComplete && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="bg-gray-800/50 border-zinc-700 text-white hover:bg-gray-700/60 transition-colors"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </header>

        {!profileComplete && (
          <div className="bg-gradient-to-r from-[#8338EC]/15 to-[#9d4edd]/15 rounded-xl p-4 border border-[#8338EC]/40 mb-6 flex items-center gap-4">
            <AlertCircle className="h-6 w-6 text-[#a855f7] flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-white">Complete Your Profile</p>
              <p className="text-sm text-zinc-300">
                You are missing: {missingFields.join(", ")}
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              className="bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:brightness-110 transition text-white flex-shrink-0 shadow-lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Complete Now
            </Button>
          </div>
        )}

        {userProfile?.current_duo ? (
          <DuoInfo />
        ) : (
          <DuoRequestInbox onAccept={setAnimationEnabled} />
        )}

        {userProfile?.current_duo && (
          <DuoAnimation
            onOpen={animationEnabled}
            onClose={() => {}}
            partnerName={userProfile?.current_duo.other_user.first_name ?? ""}
          />
        )}

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900/60 border border-zinc-700/50 p-1.5 h-auto rounded-xl shadow-lg">
            <TabsTrigger
              value="profile"
              className="flex items-center justify-center gap-2 py-3 text-base font-medium rounded-lg data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-md text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-all"
            >
              <Settings className="h-5 w-5" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="games"
              className="flex items-center justify-center gap-2 py-3 text-base font-medium rounded-lg data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-md text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-all"
            >
              <Gamepad2 className="h-5 w-5" />
              <span>My Games</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 bg-gray-900/50 rounded-2xl border border-zinc-800/80 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="h-6 w-6 text-[#8338EC]" />
                  <h2 className="text-xl font-semibold text-white">
                    Personal Info
                  </h2>
                </div>
                <div className="space-y-5">
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
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                {profile.adminsetlevel && (
                  <div className="bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-2xl p-5 border border-amber-500/40">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-6 w-6 text-amber-400" />
                      <h3 className="text-lg font-semibold text-white">
                        Admin Verified Level
                      </h3>
                    </div>
                    <p className="text-2xl text-amber-300 font-bold mb-2">
                      {formatAdminSetLevel(profile.adminsetlevel)}
                    </p>
                    <p className="text-sm text-zinc-400">
                      This level is set by an admin and cannot be changed.
                    </p>
                  </div>
                )}

                {isEditing && (
                  <div className="flex gap-4">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      disabled={isSaving}
                      className="flex-1 bg-gray-800/50 border-zinc-700 text-white hover:bg-gray-700/60 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:brightness-110 transition text-white shadow-lg"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" /> Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}

                <TagsSection tagsData={data.tags} user_id={profile.user_id} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="games" className="mt-6">
            <GamesPlayedSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
