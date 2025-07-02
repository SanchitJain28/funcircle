import { TagGroup } from "@/hooks/useAuth";
import { ChevronRight, Sparkles, Star } from "lucide-react";
import React, { useState, useCallback } from "react";
import { TAG_CONFIG } from "./Props/TAG_CONFIG";
import { TagMembersModal } from "./TagMemberModal";

interface TagsSectionProps {
  tagsData: TagGroup[];
  user_id: string;
}

export const TagsSection: React.FC<TagsSectionProps> = ({
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
              {tagsData.map((tagGroup, index: number) => {
                const tagConfig =
                  TAG_CONFIG[tagGroup.tag as keyof typeof TAG_CONFIG];
                const IconComponent = tagConfig?.icon || Star;

                return (
                  <button
                    key={index}
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
