"use client";

import type { TagGroup } from "@/hooks/useAuth";
import { ChevronRight, Sparkles, Star, ChevronLeft } from "lucide-react";
import type React from "react";
import { useState, useCallback, useRef } from "react";
import { TagMembersModal } from "./TagMemberModal";
import { TAG_CONFIG } from "../Props/TAG_CONFIG";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTagClick = useCallback((tagGroup: TagGroup) => {
    setSelectedTag(tagGroup);
    setIsModalOpen(true);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] rounded-xl border border-zinc-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-[#8338EC]/10 to-[#9d4edd]/10 border-b border-zinc-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-xl border border-[#8338EC]/30">
                <Star className="h-5 w-5 text-[#8338EC]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  Achievement Tags
                </h3>
                <p className="text-zinc-400 text-xs">
                  Recognition earned through gameplay
                </p>
              </div>
            </div>
            {tagsData.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 bg-[#252529] hover:bg-[#2a2a2e] rounded-lg border border-zinc-700/50 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-zinc-400" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 bg-[#252529] hover:bg-[#2a2a2e] rounded-lg border border-zinc-700/50 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          {tagsData.length === 0 ? (
            <div className="text-center py-8">
              <div className="p-4 bg-gradient-to-r from-[#252529] to-[#2a2a2e] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-zinc-600/50">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <p className="text-zinc-400 font-semibold mb-1">
                No achievement tags yet
              </p>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                Play more games and showcase your skills to earn recognition
                tags
              </p>
            </div>
          ) : (
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {tagsData.map((tagGroup, index: number) => {
                  const tagConfig =
                    TAG_CONFIG[tagGroup.tag as keyof typeof TAG_CONFIG];
                  const IconComponent = tagConfig?.icon || Star;

                  return (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tagGroup)}
                      className={`relative flex-shrink-0 w-64 p-3 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${tagConfig?.bgColor} ${tagConfig?.borderColor} group overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl bg-black/20 group-hover:bg-black/30 transition-all duration-300 border border-white/10`}
                        >
                          <IconComponent
                            className={`h-5 w-5 ${tagConfig?.textColor} text-white`}
                          />
                        </div>
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <p
                            className={`text-sm font-bold text-white ${tagConfig?.textColor} mb-1 truncate w-full`}
                          >
                            {tagGroup.tag}
                          </p>
                          <p className="text-xs text-zinc-400 truncate w-full">
                            {tagGroup.ticket_members.length} member
                            {tagGroup.ticket_members.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Scroll indicators */}
              <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-[#1D1D1F] to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-[#252529] to-transparent pointer-events-none" />
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
