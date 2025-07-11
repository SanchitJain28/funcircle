"use client";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Loader2, Trophy, UserPlus, Users, X } from "lucide-react";
import React, { useCallback } from "react";
import { formatGameDate } from "../Functions/formatGameDate";
import type { Game } from "@/app/types";
import FlameButton from "../FlameButton";

// Refined GameModal component with improved UI and animations
export default function GameModal({
  isModalOpen,
  selectedGame,
  user_id,
  isConnecting,
  handleConnection,
  onChange,
}: {
  selectedGame: Game | null;
  user_id: string;
  isConnecting: string | null;
  handleConnection: (game_id: number, member_id: string) => void;
  isModalOpen: boolean;
  onChange: (e: boolean) => void;
}) {
  const handleCloseModal = useCallback(() => {
    onChange(false);
  }, [onChange]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onChange(false);
      }
    },
    [onChange]
  );

  const availableMembers =
    selectedGame?.members.filter((member) => member.id !== user_id) || [];

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[95vw] max-w-md h-[70vh] m-0 p-0 bg-[#1a1a1a] border-0 text-white shadow-2xl rounded-t-3xl flex flex-col fixed bottom-0 left-1/2 transform -translate-x-1/2 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-10 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-10">
        {/* Header Section */}
        <div className="flex-shrink-0 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-gray-800/50">
          <div className="flex items-center justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCloseModal}
            className="absolute right-4 top-4 h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700/60 z-10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
          <DialogHeader className="pb-4 px-6">
            <DialogTitle className="text-center">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[#F9761C] to-[#ff8c42] mb-3 shadow-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1 break-words leading-tight">
                {selectedGame?.title}
              </h2>
              <p className="text-[#F9761C] text-sm font-semibold">
                {selectedGame && formatGameDate(selectedGame.created_at)}
              </p>
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 min-h-0">
          {availableMembers.length > 0 ? (
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold text-lg">Players</h3>
                <span className="text-sm text-gray-300 bg-gray-800/70 px-3 py-1 rounded-full">
                  {availableMembers.length} available
                </span>
              </div>

              {availableMembers.map((member, index) => (
                <div
                  key={member.id || `member-${index}`}
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-4 border border-gray-700/60 hover:border-[#F9761C]/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F9761C] to-[#ff8c42] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {member.name ? member.name[0].toUpperCase() : "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-base leading-tight break-words">
                        {member.name || "Unknown Player"}
                      </p>
                      <p className="text-gray-400 text-sm">Active player</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      onClick={() =>
                        handleConnection(selectedGame!.id, member.id)
                      }
                      disabled={member.connection || isConnecting === member.id}
                      className={`w-full h-11 font-semibold text-sm transition-all duration-300 shadow-lg rounded-xl ${
                        member.connection
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#F9761C] to-[#ff8c42] hover:from-[#e86a19] hover:to-[#F9761C] text-black shadow-[#F9761C]/25 hover:shadow-lg active:scale-[0.98]"
                      }`}
                    >
                      {isConnecting === member.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          {member.connection ? "Connected" : "Add Friend"}
                        </>
                      )}
                    </Button>
                    <div className="w-full">
                      <FlameButton id={member.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6">
              <div className="inline-flex p-5 rounded-full bg-gray-800/60 mb-5 border border-gray-700/60">
                <Users className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">
                No Players Found
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                This game is waiting for players. Check back soon!
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
