"use client";

import {
  GamesResponse,
  TagGroup,
  useAuth,
  useProfile,
  UserProfile,
} from "@/hooks/useAuth";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Star,
  UserPlus,
  Crown,
  Target,
  Zap,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight,
  Users,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { formatLevelByName } from "@/utils/formatLevelBynumber";
import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();
// Constants
const SKILL_LEVELS = [
  { value: "2", label: "Beginner" },
  { value: "4", label: "Beginner+" },
  { value: "6", label: "Intermediate" },
  { value: "8", label: "Upper Intermediate" },
  { value: "10", label: "Professional" },
] as const;

const TAG_CONFIG = {
  MVP: {
    icon: Crown,
    color: "from-amber-400 via-yellow-400 to-orange-500",
    bgColor:
      "bg-gradient-to-br from-amber-500/10 via-yellow-500/15 to-orange-500/20",
    borderColor: "border-amber-400/50 hover:border-amber-400/70",
    textColor: "text-amber-400 group-hover:text-amber-300",
    shadowColor: "shadow-amber-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-amber-500/30",
    description: "Most Valuable Player - Outstanding performance",
  },
  "Team Player": {
    icon: Users,
    color: "from-sky-400 via-blue-400 to-blue-600",
    bgColor: "bg-gradient-to-br from-sky-500/10 via-blue-500/15 to-blue-600/20",
    borderColor: "border-sky-400/50 hover:border-sky-400/70",
    textColor: "text-sky-400 group-hover:text-sky-300",
    shadowColor: "shadow-sky-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-sky-500/30",
    description: "Excellent teamwork and collaboration",
  },
  "Most improved player": {
    icon: TrendingUp,
    color: "from-emerald-400 via-green-400 to-emerald-500",
    bgColor:
      "bg-gradient-to-br from-emerald-500/10 via-green-500/15 to-emerald-500/20",
    borderColor: "border-emerald-400/50 hover:border-emerald-400/70",
    textColor: "text-emerald-400 group-hover:text-emerald-300",
    shadowColor: "shadow-emerald-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-emerald-500/30",
    description: "Remarkable improvement and growth",
  },
  "Tactical player": {
    icon: Target,
    color: "from-violet-400 via-purple-400 to-purple-600",
    bgColor:
      "bg-gradient-to-br from-violet-500/10 via-purple-500/15 to-purple-600/20",
    borderColor: "border-violet-400/50 hover:border-violet-400/70",
    textColor: "text-violet-400 group-hover:text-violet-300",
    shadowColor: "shadow-violet-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-violet-500/30",
    description: "Strategic thinking and smart gameplay",
  },
  "Power performer": {
    icon: Zap,
    color: "from-rose-400 via-red-400 to-red-600",
    bgColor: "bg-gradient-to-br from-rose-500/10 via-red-500/15 to-red-600/20",
    borderColor: "border-rose-400/50 hover:border-rose-400/70",
    textColor: "text-rose-400 group-hover:text-rose-300",
    shadowColor: "shadow-rose-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-rose-500/30",
    description: "Explosive power and aggressive play",
  },
  "Consistent player": {
    icon: Award,
    color: "from-indigo-400 via-blue-500 to-indigo-600",
    bgColor:
      "bg-gradient-to-br from-indigo-500/10 via-blue-500/15 to-indigo-600/20",
    borderColor: "border-indigo-400/50 hover:border-indigo-400/70",
    textColor: "text-indigo-400 group-hover:text-indigo-300",
    shadowColor: "shadow-indigo-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-indigo-500/30",
    description: "Reliable and steady performance",
  },
} as const;

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

// Helper function to format date
const formatGameDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.log(error);
    return "Invalid date";
  }
};

// Loading component
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

// Tags Modal Component
const TagMembersModal: React.FC<{
  user_id: string;
  isOpen: boolean;
  onClose: () => void;
  tagGroup: TagGroup | null;
  isLoadingFriendRequest: string | null;
}> = ({ user_id, isOpen, onClose, tagGroup, isLoadingFriendRequest }) => {
  if (!tagGroup) return null;

  const tagConfig = TAG_CONFIG[tagGroup.tag as keyof typeof TAG_CONFIG];
  const IconComponent = tagConfig?.icon || Star;

  const handleConnection = async (id: string) => {
    setTagGroupData((prev) => {
      const updatedMembers = prev.ticket_members.map((member) => {
        if (member.id === id) {
          return { ...member, connection: true };
        }
        return member;
      });
      return { ...prev, ticket_members: updatedMembers };
    });

    const { error } = await supabase.from("connections").insert({
      user_id1: user_id,
      user_id2: id,
      status: "accepted",
    });
    if (error) {
      setTagGroupData((prev) => {
        const updatedMembers = prev.ticket_members.map((member) => {
          if (member.id === id) {
            return { ...member, connection: false };
          }
          return member;
        });
        return { ...prev, ticket_members: updatedMembers };
      });
    }
  };

  const [tagGroupData, setTagGroupData] = useState<TagGroup>(tagGroup);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] border-zinc-600/50 text-white max-w-md backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-start gap-4 text-xl">
            <div
              className={`p-3 rounded-2xl ${tagConfig?.bgColor} border-2 ${tagConfig?.borderColor} shadow-lg`}
            >
              <IconComponent className={`h-6 w-6 ${tagConfig?.textColor}`} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white font-bold">{tagGroup.tag} </span>
              <p className="text-white text-sm font-bold">{tagGroup.venue}</p>
              <p className="text-sm text-zinc-400 font-normal mt-1 leading-relaxed">
                {tagConfig?.description}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-8">
          <div className="flex items-center justify-between">
            <p className="text-zinc-300 text-sm font-medium">
              {tagGroup.ticket_members.length} member
              {tagGroup.ticket_members.length !== 1 ? "s" : ""}
            </p>
          </div>

          {tagGroup.ticket_members.length === 0 ? (
            <div className="text-center py-12">
              <div
                className={`p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center ${tagConfig?.bgColor} border-2 ${tagConfig?.borderColor} shadow-lg`}
              >
                <IconComponent
                  className={`h-10 w-10 ${tagConfig?.textColor}`}
                />
              </div>
              <p className="text-zinc-400 text-lg font-medium">
                No members with this tag yet
              </p>
              <p className="text-zinc-500 text-sm mt-2">
                Be the first to earn this recognition!
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {tagGroupData.ticket_members
                .filter((member) => member.id !== user_id)
                .map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#252529] to-[#2a2a2e] border border-zinc-600/30 hover:border-zinc-500/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-full flex items-center justify-center border border-[#8338EC]/30">
                        <User className="h-6 w-6 text-[#8338EC]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {member.name}
                        </p>
                      </div>
                    </div>
                    {member.connection ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:from-[#7c2dd8] hover:to-[#8b3ac7] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Added
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleConnection(member.id)}
                          disabled={isLoadingFriendRequest === member.id}
                          size="sm"
                          className="bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:from-[#7c2dd8] hover:to-[#8b3ac7] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {isLoadingFriendRequest === member.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Add Friend
                            </>
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Tags section component
const TagsSection: React.FC<{ tagsData: TagGroup[]; user_id: string }> = ({
  tagsData,
  user_id,
}) => {
  const [selectedTag, setSelectedTag] = useState<TagGroup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleTagClick = useCallback((tagGroup: TagGroup) => {
    setSelectedTag(tagGroup);
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#8338EC]/10 to-[#9d4edd]/10 border-b border-zinc-700/50 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-xl border border-[#8338EC]/30">
              <Star className="h-6 w-6 text-[#8338EC]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Achievement Tags</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Recognition earned through gameplay
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {tagsData.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-6 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-zinc-600/50">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <p className="text-zinc-400 text-lg font-semibold mb-2">
                No achievement tags yet
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">
                Play more games and showcase your skills to earn recognition
                tags from the community
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tagsData.map((tagGroup) => {
                const tagConfig =
                  TAG_CONFIG[tagGroup.tag as keyof typeof TAG_CONFIG];
                const IconComponent = tagConfig?.icon || Star;

                return (
                  <button
                    key={tagGroup.tag}
                    onClick={() => handleTagClick(tagGroup)}
                    className={`relative p-2 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${tagConfig?.bgColor} ${tagConfig?.borderColor} group overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-start gap-3">
                      <div
                        className={`p-3 rounded-2xl bg-black/20 group-hover:bg-black/30 transition-all duration-300 border border-white/10`}
                      >
                        <IconComponent
                          className={`h-6 w-6 ${tagConfig?.textColor} text-white`}
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <p
                          className={`text-sm font-bold text-white ${tagConfig?.textColor} mb-1`}
                        >
                          {tagGroup.tag}
                        </p>
                        <p className="text-xs text-zinc-400">
                          Show Full Team :- {tagGroup.ticket_members.length}{" "}
                          member
                          {tagGroup.ticket_members.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <TagMembersModal
        user_id={user_id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tagGroup={selectedTag}
        isLoadingFriendRequest={""}
      />
    </>
  );
};

// Games section component
const GamesPlayedSection: React.FC<{ gamesData: GamesResponse }> = ({
  gamesData,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#8338EC]/10 to-[#9d4edd]/10 border-b border-zinc-700/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-xl border border-[#8338EC]/30">
              <GamepadIcon className="h-6 w-6 text-[#8338EC]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Game History</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Your recent gaming activity
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {!gamesData?.games_name?.length ? (
          <div className="text-center py-12">
            <div className="p-6 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-zinc-600/50">
              <GamepadIcon className="h-10 w-10 text-zinc-400" />
            </div>
            <p className="text-zinc-400 text-lg font-semibold mb-2">
              No games played yet
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">
              Your game history will appear here once you start playing. Join
              your first game to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {gamesData.games_name.slice(0, 5).map((game, index) => (
              <div
                key={`${game.name}-${game.date}-${index}`}
                className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-[#252529] to-[#2a2a2e] border border-zinc-600/30 hover:border-zinc-500/50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-xl border border-[#8338EC]/30 group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="h-5 w-5 text-[#8338EC]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold ">{game.name}</p>
                    <p className="text-zinc-400 text-sm mt-1">
                      {formatGameDate(game.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {gamesData.games_name.length > 5 && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-[#252529] to-[#2a2a2e] border-zinc-600/50 text-white hover:bg-gradient-to-r hover:from-[#2a2a2e] hover:to-[#303035] hover:text-white hover:border-zinc-500/50 transition-all duration-300"
                >
                  View All {gamesData.count} Games
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

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
    return (
      <div className="space-y-4">
        <Label
          htmlFor={fieldName as string}
          className="text-sm font-semibold flex items-center gap-3 text-white"
        >
          <span className="text-[#8338EC] p-1 bg-[#8338EC]/10 rounded-lg">
            {icon}
          </span>
          {label}
        </Label>
        {type === "select" &&
        fieldName === ("usersetlevel" as keyof FormData) ? (
          <Select
            value={formData[fieldName]}
            onValueChange={(value) => onFormChange(fieldName, value)}
          >
            <SelectTrigger className="bg-gradient-to-r from-[#252529] to-[#2a2a2e] border-zinc-700/50 text-white hover:border-[#8338EC]/50 focus:border-[#8338EC] focus:ring-[#8338EC]/20">
              <SelectValue placeholder="Select your skill level" />
            </SelectTrigger>
            <SelectContent className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] border-zinc-700/50">
              {SKILL_LEVELS.map((level) => (
                <SelectItem
                  key={level.value}
                  value={level.value}
                  className="text-white hover:bg-[#252529]/50 focus:bg-[#252529]/50"
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
            className="bg-gradient-to-r from-[#252529] to-[#2a2a2e] border-zinc-700/50 text-white placeholder:text-zinc-400 hover:border-[#8338EC]/50 focus:border-[#8338EC] focus:ring-[#8338EC]/20"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#1D1D1F] to-[#252529] border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 group">
      <div className="mt-1 text-[#8338EC] p-2 bg-[#8338EC]/10 rounded-xl border border-[#8338EC]/20 group-hover:bg-[#8338EC]/15 transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white mb-1">{label}</p>
        <p
          className={`text-base ${isEmpty ? "text-zinc-400 italic" : "text-zinc-300 font-medium"}`}
        >
          {label === "Skill Level"
            ? formatLevelByName(displayValue)
            : displayValue}
        </p>
      </div>
      {isEmpty && (
        <div className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30 font-semibold animate-pulse">
          Missing
        </div>
      )}
    </div>
  );
};

// Define FormData type for form state
type FormData = {
  first_name: string;
  location: string;
  usersetlevel: string;
};

export default function ProfileClient() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profile, isLoading } = useProfile({
    id: user?.uid ?? "",
    enabled: !!user,
  });

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
      // TODO: Replace with your actual API call
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

  if (!profile) {
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

        {/* Enhanced Games Played Section */}
        <GamesPlayedSection gamesData={profile.gamesPlayed} />
      </div>
    </div>
  );
}
