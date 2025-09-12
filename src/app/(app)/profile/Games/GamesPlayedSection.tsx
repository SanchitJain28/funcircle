"use client";

import { GamepadIcon, Trophy, Users, Loader2 } from "lucide-react";
import type React from "react";
import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { createClient } from "@/app/utils/supabase/client";
import { formatGameDate } from "../Functions/formatGameDate";
import { useAuth, useUserGames } from "@/hooks/useAuth";
import { Game, UserGamesInfiniteData } from "@/app/types";
import { useQueryClient } from "@tanstack/react-query";
import GameModal from "./GameModal";

const supabase = createClient();

export const GamesPlayedSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  if (!user) return;

  const { games, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
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

      // Optimistic update
      queryClient.setQueryData(
        ["userGames", user.uid],
        (oldData: UserGamesInfiniteData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: Game[]) =>
              page.map((game: Game) =>
                game.id === gameId
                  ? {
                      ...game,
                      members: game.members.map((member) =>
                        member.id === memberId
                          ? { ...member, connection: true }
                          : member
                      ),
                    }
                  : game
              )
            ),
          };
        }
      );

      // Update selected game immediately
      setSelectedGame((prev) => {
        if (!prev || prev.id !== gameId) return prev;
        return {
          ...prev,
          members: prev.members.map((member) =>
            member.id === memberId ? { ...member, connection: true } : member
          ),
        };
      });

      try {
        const { error } = await supabase.from("connections").insert({
          user_id1: user.uid,
          user_id2: memberId,
          status: "accepted",
        });

        if (error) {
          console.error("Failed to create connection:", error);
          // Revert optimistic update on error
          queryClient.setQueryData(
            ["userGames", user.uid],
            (oldData: UserGamesInfiniteData) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                pages: oldData.pages.map((page: Game[]) =>
                  page.map((game: Game) =>
                    game.id === gameId
                      ? {
                          ...game,
                          members: game.members.map((member) =>
                            member.id === memberId
                              ? { ...member, connection: false }
                              : member
                          ),
                        }
                      : game
                  )
                ),
              };
            }
          );
        }
      } catch (error) {
        console.error("Error creating connection:", error);
      } finally {
        setIsConnecting(null);
      }
    },
    [user?.uid, isConnecting, queryClient]
  );

  if (!games || isLoading || games.length === 0) {
    return (
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
          Your game history will appear here once you start playing. Join your
          first game to get started!
        </p>
      </div>
    );
  }

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
      <GameModal
        onChange={setIsModalOpen}
        isModalOpen={isModalOpen}
        user_id={user.uid}
        selectedGame={selectedGame}
        isConnecting={isConnecting}
        handleConnection={handleConnection}
      />
    </>
  );
};
