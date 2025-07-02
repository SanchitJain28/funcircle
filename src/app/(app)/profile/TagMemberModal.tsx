import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TAG_CONFIG } from "./Props/TAG_CONFIG";
import { Star, User, UserPlus } from "lucide-react";
import { TagGroup } from "@/hooks/useAuth";
import { createClient } from "@/app/utils/supabase/client";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] border-zinc-600/50 text-white max-w-md backdrop-blur-xl shadow-2xl">
        <AlertDialogHeader>
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
        </AlertDialogHeader>

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
                          size="sm"
                          className="bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:from-[#7c2dd8] hover:to-[#8b3ac7] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Friend
                          </>
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
