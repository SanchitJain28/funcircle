"use client";

import type { TagGroup } from "@/hooks/useAuth";
import { ChevronRight, Sparkles, Star, ChevronLeft } from "lucide-react";
import type React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import { TagMembersModal } from "./TagMemberModal";
import { TAG_CONFIG } from "../Props/TAG_CONFIG";

// New TagCard component for better modularity and cleaner code
const TagCard: React.FC<{
  tagGroup: TagGroup;
  onClick: (tagGroup: TagGroup) => void;
}> = ({ tagGroup, onClick }) => {
  const tagConfig = TAG_CONFIG[tagGroup.tag as keyof typeof TAG_CONFIG];
  const IconComponent = tagConfig?.icon || Star;

  return (
    <button
      onClick={() => onClick(tagGroup)}
      className={`relative flex-shrink-0 w-64 p-4 rounded-2xl border transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 ${tagConfig?.bgColor || "bg-gray-800"} ${tagConfig?.borderColor || "border-gray-700"} hover:border-purple-500/80`}
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${"from-purple-600"} ${"to-indigo-600"} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`}
      ></div>
      <div className="relative flex items-center gap-4">
        <div className="p-3 rounded-xl bg-black/30 border border-white/10">
          <IconComponent
            className={`h-6 w-6 ${tagConfig?.textColor || "text-white"}`}
          />
        </div>
        <div className="flex flex-col items-start flex-1 min-w-0">
          <p
            className={`text-base font-bold truncate w-full ${tagConfig?.textColor || "text-white"}`}
          >
            {tagGroup.tag}
          </p>
          <p className="text-sm text-zinc-400">
            {tagGroup.ticket_members.length} member
            {tagGroup.ticket_members.length !== 1 ? "s" : ""}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-zinc-500 opacity-50 group-hover:opacity-100 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" />
      </div>
    </button>
  );
};

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTagClick = useCallback((tagGroup: TagGroup) => {
    setSelectedTag(tagGroup);
    setIsModalOpen(true);
  }, []);

  const checkForScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    checkForScrollability();
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkForScrollability);
    window.addEventListener("resize", checkForScrollability);

    return () => {
      container?.removeEventListener("scroll", checkForScrollability);
      window.removeEventListener("resize", checkForScrollability);
    };
  }, [tagsData, checkForScrollability]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="bg-gray-900/50 rounded-2xl border border-zinc-800/80 overflow-hidden">
        <div className="p-5 border-b border-zinc-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#8338EC]/20 to-[#9d4edd]/20 rounded-xl border border-[#8338EC]/30">
                <Star className="h-6 w-6 text-[#a855f7]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">
                  Achievement Tags
                </h3>
                <p className="text-zinc-400 text-sm">
                  Recognition earned through gameplay
                </p>
              </div>
            </div>
            {tagsData.length > 3 && (
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className="p-2 bg-gray-800/60 hover:bg-gray-700/80 rounded-lg border border-zinc-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5 text-zinc-300" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className="p-2 bg-gray-800/60 hover:bg-gray-700/80 rounded-lg border border-zinc-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5 text-zinc-300" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-5">
          {tagsData.length === 0 ? (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full mb-5 border border-zinc-700">
                <Sparkles className="h-10 w-10 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">
                No Tags Earned Yet
              </h4>
              <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                Play games and complete challenges to unlock exclusive
                achievement tags.
              </p>
            </div>
          ) : (
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex gap-5 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide"
              >
                {tagsData.map((tagGroup, index) => (
                  <TagCard
                    key={index}
                    tagGroup={tagGroup}
                    onClick={handleTagClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <TagMembersModal
        user_id={user_id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tagGroup={selectedTag}
        isLoadingFriendRequest={null}
      />
    </>
  );
};
