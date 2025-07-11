"use client";

import { GamepadIcon, Trophy, Users, UserPlus, X, Loader2 } from "lucide-react";
import type React from "react";
import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/app/utils/supabase/client";
import { formatGameDate } from "../Functions/formatGameDate";
import FlameButton from "../FlameButton";
import { useAuth, useUserGames } from "@/hooks/useAuth";
import { Game } from "@/app/types";
// import { useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

export const GamesPlayedSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const { user } = useAuth();
  // const query = useQueryClient();

  if (!user) return;

  const { games, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useUserGames({
      id: user.uid,
      enabled: !!user.uid,
    });

  // Use games directly instead of local state to prevent sync issues
  const gamesList = useMemo(() => games || [], [games]);

  const handleGameClick = useCallback((game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  }, []);

  const handleConnection = useCallback(
    async (gameId: number, memberId: string) => {
      if (!user.uid || isConnecting) return;

      setIsConnecting(memberId);

      try {
        const { error } = await supabase.from("connections").insert({
          user_id1: user.uid,
          user_id2: memberId,
          status: "accepted",
        });

        if (error) {
          console.error("Failed to create connection:", error);
          // You might want to show a toast notification here
        } else {
          console.log("Connection created successfully");
          // Optimistically update the selected game
          setSelectedGame((prev) => {
            if (!prev || prev.id !== gameId) return prev;
            return {
              ...prev,
              members: prev.members.map((member) =>
                member.id === memberId
                  ? { ...member, connection: true }
                  : member
              ),
            };
          });
        }
      } catch (error) {
        console.error("Error creating connection:", error);
      } finally {
        setIsConnecting(null);
      }
    },
    [user?.uid, isConnecting]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedGame(null);
  }, []);

  const availableMembers =
    selectedGame?.members.filter((member) => member.id !== user.uid) || [];

  return (
    <>
      <div className="bg-gradient-to-br from-[#1A1A1A] via-[#2A1A15] to-[#1F1F1F] rounded-2xl border border-[#F9761C]/20 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#F9761C]/10 to-[#FF8A3D]/10 border-b border-[#F9761C]/20 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F9761C] to-[#FF8A3D] rounded-xl blur-sm opacity-50" />
                <div className="relative p-2.5 bg-gradient-to-r from-[#F9761C] to-[#FF8A3D] rounded-xl border border-[#FFB366]/30 shadow-lg">
                  <GamepadIcon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  Game History ({gamesList.length})
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm mt-1">
                  Your recent gaming activity
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          {gamesList.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="relative mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F9761C] to-[#FF8A3D] rounded-full blur-lg opacity-30 w-16 h-16 sm:w-20 sm:h-20" />
                <div className="relative p-4 sm:p-6 bg-gradient-to-r from-[#F9761C]/20 to-[#FF8A3D]/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center border-2 border-[#F9761C]/30 shadow-xl">
                  <GamepadIcon className="h-8 w-8 sm:h-10 sm:w-10 text-[#F9761C]" />
                </div>
              </div>
              <p className="text-zinc-200 text-base sm:text-lg font-semibold mb-2">
                No games played yet
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto">
                Your game history will appear here once you start playing. Join
                your first game to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {gamesList.map((game, index) => (
                <div
                  key={game.id || `game-${index}`}
                  onClick={() => handleGameClick(game)}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-zinc-800/40 to-zinc-700/40 border border-zinc-600/30 hover:border-[#F9761C]/40 transition-all duration-300 hover:shadow-lg group cursor-pointer active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F9761C] to-[#FF8A3D] rounded-lg blur-sm opacity-40 group-hover:opacity-60 transition-opacity" />
                      <div className="relative p-2.5 bg-gradient-to-r from-[#F9761C]/30 to-[#FF8A3D]/30 rounded-lg border border-[#F9761C]/40 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <Trophy className="h-4 w-4 text-[#F9761C]" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">
                        {game.title}
                      </p>
                      <p className="text-zinc-400 text-xs mt-0.5">
                        {formatGameDate(game.created_at)}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-[#F9761C]/20 to-[#FF8A3D]/20 text-[#FFB366] border-[#F9761C]/30 hover:bg-gradient-to-r hover:from-[#F9761C]/30 hover:to-[#FF8A3D]/30">
                    <Users className="h-3 w-3 mr-1" />
                    {game.members?.length || 0}
                  </Badge>
                </div>
              ))}

              {/* Load More Button */}
              {hasNextPage && (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    size="lg"
                    className="bg-gradient-to-r from-[#F9761C] to-[#FF8A3D] hover:from-[#E85D00] hover:to-[#F9761C] text-white shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] active:scale-[0.98]"
                  >
                    {isFetchingNextPage ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <GamepadIcon className="h-4 w-4 mr-2" />
                        Load More Games
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Game Details Modal - Mobile Optimized */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] max-w-none h-[85vh] max-h-none m-0 p-0 bg-[#1a1a1a] border-0 text-white shadow-2xl rounded-t-3xl rounded-b-none fixed bottom-0 left-1/2 transform -translate-x-1/2 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom overflow-hidden">
          {/* Header Section */}
          <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-gray-800/50">
            {/* Drag Handle */}
            <div className="flex items-center justify-center pt-2 pb-4">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseModal}
              className="absolute right-4 top-4 h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800/50 z-10 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Game Info */}
            <DialogHeader className="pb-6">
              <DialogTitle className="text-center">
                <div className="inline-flex p-4 rounded-2xl bg-[#F9761C] mb-4 shadow-lg">
                  <Trophy className="h-8 w-8 text-black" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2 break-words">
                  {selectedGame?.title}
                </h2>
                <p className="text-[#F9761C] text-sm font-semibold">
                  {selectedGame && formatGameDate(selectedGame.created_at)}
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Content Section */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {availableMembers.length > 0 ? (
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold text-lg">Players</h3>
                  <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                    {availableMembers.length} available
                  </span>
                </div>

                {availableMembers.map((member, index) => (
                  <div
                    key={member.id || `member-${index}`}
                    className="bg-gray-800/40 backdrop-blur rounded-2xl p-5 border border-gray-700/50 hover:border-[#F9761C]/30 transition-all duration-300"
                  >
                    {/* Member Header */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#F9761C] to-[#ff8c42] rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-black font-bold text-lg">
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

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        size="lg"
                        onClick={() =>
                          handleConnection(selectedGame!.id, member.id)
                        }
                        disabled={
                          member.connection || isConnecting === member.id
                        }
                        className={`w-full h-12 font-semibold text-sm transition-all duration-300 shadow-lg rounded-xl ${
                          member.connection
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600 cursor-default"
                            : "bg-gradient-to-r from-[#F9761C] to-[#ff8c42] hover:from-[#e86a19] hover:to-[#F9761C] text-black shadow-[#F9761C]/20 hover:shadow-[#F9761C]/30 active:scale-[0.98]"
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
                            {member.connection ? "✓ Connected" : "Add Friend"}
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
              <div className="text-center py-20 px-4">
                <div className="inline-flex p-8 rounded-full bg-gray-800/50 mb-6 border border-gray-700/50">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">
                  No players found
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                  This game has no recorded players yet. Check back later for
                  updates.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
