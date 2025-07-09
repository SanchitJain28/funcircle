import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Star, User } from "lucide-react";
import { TagGroup } from "@/hooks/useAuth";
import { createClient } from "@/app/utils/supabase/client";

import { Button } from "@/components/ui/button";
import FlameButton from "../FlameButton";
import { TAG_CONFIG } from "../Props/TAG_CONFIG";

const supabase = createClient();

interface TagModalProps {
  user_id: string;
  isOpen: boolean;
  onClose: () => void;
  tagGroup: TagGroup | null;
  isLoadingFriendRequest: string | null;
}

export const TagMembersModal: React.FC<TagModalProps> = ({
  user_id,
  isOpen,
  onClose,
  tagGroup,
}) => {
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
    <div className="mx-20">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-[#1a1a1a] border-0 text-white max-w-lg shadow-2xl rounded-3xl p-0 overflow-hidden">
          <div className="p-8">
            <DialogTitle className="sr-only">
              {tagGroupData.tag} Members
            </DialogTitle>

            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 rounded-2xl bg-[#F9761C] mb-4">
                <IconComponent className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {tagGroupData.tag}
              </h2>
              <p className="text-[#F9761C] text-sm font-semibold mb-3">
                {tagGroupData.venue}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                {tagConfig?.description ||
                  "Connect with members who share this achievement"}
              </p>
            </div>

            {/* Members Section */}
            {tagGroupData.ticket_members.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex p-6 rounded-full bg-gray-800 mb-4">
                  <IconComponent className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  No members yet
                </h3>
                <p className="text-gray-400 text-sm">
                  Be the first to earn this recognition!
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold">Members</h3>
                  <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                    {tagGroup.ticket_members.length} active
                  </span>
                </div>

                {tagGroupData.ticket_members.map((member, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur rounded-2xl p-4 border border-gray-700/50 hover:border-[#F9761C]/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#F9761C] to-[#ff8c42] rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-black" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">
                            {member.name}
                          </p>
                          <p className="text-gray-400 text-xs">Active member</p>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className={`text-xs font-semibold transition-all duration-300 ${
                          member.connection
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-[#F9761C] text-black hover:bg-[#e86a19]"
                        }`}
                        onClick={
                          member.connection
                            ? () => {}
                            : () => handleConnection(member.id)
                        }
                      >
                        {member.connection ? "✓ Connected" : "+ Connect"}
                      </Button>
                    </div>

                    <div className="flex justify-end">
                      <FlameButton id={member.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
