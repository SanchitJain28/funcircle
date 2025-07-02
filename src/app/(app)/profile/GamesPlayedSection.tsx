"use client";

import { GamepadIcon, Trophy, Users, UserPlus, Loader2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { formatGameDate } from "./Functions/formatGameDate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/app/utils/supabase/client";

interface Game {
  ticket_id: number;
  name: string;
  date: string;
  ticket_members: TicketMember[];
}

interface TicketMember {
  id: string;
  name: string;
  connection: boolean;
}

interface GamesPlayedSectionProps {
  user_id: string;
  gamesData: Game[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const supabase = createClient();

export const GamesPlayedSection: React.FC<GamesPlayedSectionProps> = ({
  user_id,
  gamesData,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const [data, setData] = useState(gamesData);

  const handleConnection = async (gameID: number, memberId: string) => {
    setData((prev) => {
      const updated = prev.map((game) => {
        if (game.ticket_id === gameID) {
          return {
            ...game,
            ticket_members: game.ticket_members.map((member) => {
              if (member.id === memberId) {
                return { ...member, connection: !member.connection };
              }
              return member;
            }),
          };
        }
        return game;
      });

      // Also update selectedGame if it's the same game
      const updatedGame = updated.find((g) => g.ticket_id === gameID);
      if (updatedGame) {
        setSelectedGame(updatedGame);
      }

      return updated;
    });

    const { data, error } = await supabase.from("connections").insert({
      user_id1: user_id,
      user_id2: memberId,
      status: "accepted",
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Connection added", data);
    }
  };

  useEffect(() => {
    setData(gamesData);
  }, [gamesData]);

  return (
    <>
      <div className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#8338EC]/10 to-[#9d4edd]/10 border-b border-zinc-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-xl border border-[#8338EC]/30">
                <GamepadIcon className="h-6 w-6 text-[#8338EC]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">
                  Game History ({gamesData.length})
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Your recent gaming activity
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {!data?.length ? (
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
              {data.map((game, index) => (
                <div
                  key={`game-${index}`}
                  onClick={() => handleGameClick(game)}
                  className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-[#252529] to-[#2a2a2e] border border-zinc-600/30 hover:border-zinc-500/50 transition-all duration-300 hover:shadow-lg group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-xl border border-[#8338EC]/30 group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="h-5 w-5 text-[#8338EC]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {game.name}
                      </p>
                      <p className="text-zinc-400 text-sm mt-1">
                        {formatGameDate(game.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-zinc-700/50 text-zinc-300 border-zinc-600/50"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      {game.ticket_members?.length || 0}
                    </Badge>
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              {hasNextPage && (
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={onLoadMore}
                    disabled={isFetchingNextPage}
                    variant="outline"
                    size="lg"
                    className="bg-gradient-to-r from-[#1D1D1F] to-[#252529] border-zinc-700/50 text-white hover:bg-gradient-to-r hover:from-[#252529] hover:to-[#2a2a2e] hover:text-white hover:border-zinc-600/50 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
                  >
                    {isFetchingNextPage ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Loading more games...
                      </>
                    ) : (
                      <>
                        <GamepadIcon className="h-5 w-5 mr-2" />
                        Load More Games
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Loading indicator for fetching next page */}
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Loading more games...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Game Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] border-zinc-700/50 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-xl border border-[#8338EC]/30">
                <Trophy className="h-5 w-5 text-[#8338EC]" />
              </div>
              {selectedGame?.name}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Game played on {selectedGame && formatGameDate(selectedGame.date)}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-[#8338EC]" />
              Players ({selectedGame?.ticket_members?.length || 0})
            </h4>

            {selectedGame?.ticket_members?.length ? (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedGame.ticket_members.map((member, index) => (
                  <div
                    key={`member-${index}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#252529] to-[#2a2a2e] border border-zinc-600/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#8338EC]/20 to-[#9d4edd]/20 rounded-full flex items-center justify-center border border-[#8338EC]/30">
                        <span className="text-[#8338EC] font-semibold text-sm">
                          {member.name ? member.name[0] : "U"}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {member.name ? member.name : "Unknown"}
                        </p>
                      </div>
                    </div>
                    {member.connection ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:from-[#7c3aed] hover:to-[#8b5cf6] text-white border-0 h-8 px-3"
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Added
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleConnection(selectedGame.ticket_id, member.id)
                          }
                          className="bg-gradient-to-r from-[#8338EC] to-[#9d4edd] hover:from-[#7c3aed] hover:to-[#8b5cf6] text-white border-0 h-8 px-3"
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-400">No players found for this game</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
