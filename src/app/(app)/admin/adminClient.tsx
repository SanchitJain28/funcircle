"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Settings, Loader, Tag } from "lucide-react";
import { createClient } from "@/app/utils/supabase/client";
import { toast } from "react-toastify";
import { formatLevelByName } from "@/utils/formatLevelBynumber";
import { useSearchParams } from "next/navigation";

interface User {
  email: string;
  user_id: string;
  first_name: string;
  usersetlevel: string;
  adminsetlevel: string; // Assuming this is a string as in the example, can be number if intended
  isChanged?: boolean; // Optional field to track changes
  tag?: string | null; // Assuming tag can be a string or null
  isUpdated?: boolean | null;
}

// Supabase client
const supabase = createClient();

// Tag options
const tagOptions = [
  { value: null, label: "No Tag", emoji: "❓" },
  { value: "MVP", label: "MVP", emoji: "🏆" },
  { value: "Team player", label: "Team player", emoji: "🤝" },
  { value: "Most improved player", label: "Most improved player", emoji: "📈" },
  { value: "Tactical player", label: "Tactical player", emoji: "🎯" },
  { value: "Power performer", label: "Power performer", emoji: "⚡" },
  { value: "Consistent player", label: "Consistent player", emoji: "🔄" },
];

export default function AdminClient() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const searchParams = useSearchParams();

  const ticket_id_by_search_param = searchParams.get("ticketid");

  const [ticketId, setTicketId] = useState<number | null>(null);

  useEffect(() => {
    if (ticket_id_by_search_param) {
      console.log(ticket_id_by_search_param);
      setTicketId(Number(ticket_id_by_search_param));
    }
  }, [ticket_id_by_search_param]);

  const updateUsers = (
    value: string,
    id: string,
    field: "adminsetlevel" | "tag"
  ) => {
    setUsers(
      (prevUsers) =>
        prevUsers?.map((user) => {
          if (user.user_id !== id) return user;

          const updatedUser = {
            ...user,
            [field]: value === "not-set" ? null : value, // Set to null if "not-set" is selected
          };

          const isChanged =
            updatedUser.adminsetlevel !== user.adminsetlevel ||
            updatedUser.tag !== user.tag;

          return {
            ...updatedUser,
            isChanged,
          };
        }) || null
    );
  };

  const handleSubmit = async (ticket_id?: string) => {
    console.log("RUINNING");
    if (!input.trim() && !searchParams.get("ticketid")) {
      toast.info("Invalid input", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const ticketId = parseInt(input.trim());
    console.log("ticket id", searchParams.get("ticketid"));
    if (isNaN(ticketId) && !searchParams.get("ticketid")) {
      toast.info("Invalid input", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const Ticket_id_by_search_param = parseInt(ticket_id ?? "");

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("get_users_by_ticket", {
        p_ticket_id: ticketId ? ticketId : Ticket_id_by_search_param,
      });

      console.log(data, error);

      if (error) {
        console.log(error);
        return error;
      }

      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);

      toast.info("An unexpected error occurred", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!users || users.length === 0) {
      toast("No users");
      return;
    }

    setIsUpdating(true);
    let successCount = 0;
    let errorCount = 0;
    const updatedUsers = [];

    for (const user of users) {
      try {
        if (user.isChanged) {
          console.log(ticketId);
          const { data, error } = await supabase.rpc("update_user_and_tag", {
            p_ticket_id: input ? input : ticketId, // the ticket_id
            p_tag: user.tag ?? null, // tag or null
            p_adminsetlevel: user.adminsetlevel ?? null, // adminsetlevel or null
            p_user_id: user.user_id,
          });

          console.log(data, error);

          if (error) {
            console.error(`Failed to update user ${user.user_id}:`, error);
            errorCount++;
            toast.info("Update failed", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }

          setUsers((prev) => {
            return (
              prev?.map((u) => {
                if (u.user_id === user.user_id) {
                  return {
                    ...u,
                    isChanged: false, // Reset the change flag after update
                    isUpdated: true, // Mark as updated
                  };
                }
                return u;
              }) || null
            );
          });

          updatedUsers.push(`${user.first_name}`);
          successCount++;
        }
      } catch (error) {
        console.error(`Error updating user ${user.user_id}:`, error);
        errorCount++;
        console.log(errorCount);
        toast("Update failed");
      }
    }

    // Show summary toast
    if (successCount > 0) {
      toast.info(
        <div>
          <p>{successCount} Changes done</p>
          {updatedUsers.map((e, index) => {
            return (
              <div className="" key={index}>
                <p className="">{e} Updated</p>
              </div>
            );
          })}
        </div>,
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }

    setIsUpdating(false);
  };

  const getTagDisplay = (tagValue: string) => {
    const tag = tagOptions.find((option) => option.value === tagValue);
    return tag ? `${tag.emoji} ${tag.label}` : "❓ No Tag";
  };

  useEffect(() => {
    if (searchParams.get("ticketid")) {
      console.log(searchParams.get("ticketid"));
      handleSubmit(searchParams.get("ticketid") ?? "");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Enhanced Header with Glassmorphism */}
      <div className="relative bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-lg border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm ring-1 ring-white/20">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-indigo-100 text-lg font-medium">
                  User Management System
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="bg-white/15 text-white border-0 px-4 py-2 text-sm font-semibold backdrop-blur-sm ring-1 ring-white/20"
              >
                <Users className="h-4 w-4 mr-2" />
                {users?.length || 0} Users Found
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Enhanced Search Section */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl mb-12 ring-1 ring-white/5">
          <CardHeader className="pb-6">
            <CardTitle className="text-white flex items-center space-x-3 text-xl">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Search className="h-5 w-5 text-indigo-400" />
              </div>
              <span>Search by Ticket ID</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Enter ticket ID to find users..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      handleSubmit();
                    }
                  }}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400 focus:ring-indigo-400/50 h-12 text-lg backdrop-blur-sm"
                />
              </div>
              <Button
                onClick={() => handleSubmit()}
                disabled={loading || !input.trim()}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 h-12 font-semibold shadow-lg transition-all duration-200 hover:shadow-indigo-500/25 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Search Users
                  </>
                )}
              </Button>
            </div>

            {input && (
              <div className="text-sm text-gray-400 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
                <span className="font-medium">Searching for:</span> Ticket ID #
                {input}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Users Grid */}
        {users && users.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Found {users.length} user{users.length !== 1 ? "s" : ""}
              </h2>
              {
                <Button
                  onClick={handleUpdateSubmit}
                  disabled={isUpdating}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50"
                >
                  {isUpdating ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Settings className="h-5 w-5 mr-2" />
                      Update All Users
                    </>
                  )}
                </Button>
              }
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user: User, index: number) => (
                <Card
                  key={`${user.user_id}-${index}`}
                  className={` ${user.isUpdated ? "border-green-500 bg-green-300/10" : "border-white/10 bg-white/5"} backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group shadow-xl ring-1 ring-white/5 hover:ring-white/20 hover:shadow-2xl hover:shadow-indigo-500/10`}
                >
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Enhanced User Info */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-bold text-white text-xl group-hover:text-indigo-300 transition-colors">
                              {user.first_name || "Unknown User"}
                            </h3>
                            <p className="text-gray-300 text-sm break-all font-medium">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        {user.usersetlevel && (
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                              User set level
                            </div>
                            <div className="text-white font-medium">
                              {formatLevelByName(user.usersetlevel)}
                            </div>
                          </div>
                        )}

                        {user.tag && (
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                              Current Tag
                            </div>
                            <div className="text-white font-medium">
                              {getTagDisplay(user.tag)}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Admin Level Selector */}
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                          Admin Level Assignment
                        </label>
                        <Select
                          onValueChange={(value) =>
                            updateUsers(value, user.user_id, "adminsetlevel")
                          }
                          value={user.adminsetlevel || "not-set"}
                        >
                          <SelectTrigger
                            className={`bg-white/5 h-12 ${
                              user.adminsetlevel
                                ? "border-white/20 ring-1 ring-green-500/20"
                                : "border-red-400/50 ring-1 ring-red-500/30 bg-red-600"
                            } text-white focus:border-indigo-400 focus:ring-indigo-400/50 backdrop-blur-sm transition-all duration-200`}
                          >
                            <SelectValue placeholder="Not Set" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 border-white/20 backdrop-blur-xl">
                            <SelectItem
                              value="not-set"
                              className="text-white hover:bg-white/10 focus:bg-white/10"
                            >
                              ❓ Not Set
                            </SelectItem>
                            <SelectItem
                              value="2"
                              className="text-white hover:bg-white/10 focus:bg-white/10"
                            >
                              🌱 Beginner
                            </SelectItem>
                            <SelectItem
                              value="4"
                              className="text-white hover:bg-white/10 focus:bg-white/10"
                            >
                              🚀 Beginner +
                            </SelectItem>
                            <SelectItem
                              value="6"
                              className="text-white hover:bg-white/10 focus:bg-white/10"
                            >
                              ⭐ Intermediate
                            </SelectItem>
                            <SelectItem
                              value="8"
                              className="text-white hover:bg-white/10 focus:bg-white/10"
                            >
                              💎 Upper Intermediate
                            </SelectItem>
                            <SelectItem
                              value="10"
                              className="text-white hover:bg-white/10 focus:bg-white/10"
                            >
                              👑 Professional
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* New Tag Selector */}
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide flex items-center space-x-2">
                          <Tag className="h-4 w-4" />
                          <span>Player Tag</span>
                        </label>
                        <Select
                          onValueChange={(value) =>
                            updateUsers(value, user.user_id, "tag")
                          }
                          value={user.tag || "not-set"}
                        >
                          <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/50 h-12 backdrop-blur-sm transition-all duration-200">
                            <SelectValue placeholder="Select a tag..." />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 border-white/20 backdrop-blur-xl">
                            {tagOptions.map((tag) => (
                              <SelectItem
                                key={tag.value}
                                value={tag.value ?? "not-set"}
                                className="text-white hover:bg-white/10 focus:bg-white/10"
                              >
                                {tag.emoji} {tag.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Enhanced Update Status */}
                      {user.isUpdated && (
                        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-lg p-4 text-center">
                          <div className="text-emerald-300 font-bold text-lg flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span>UPDATED SUCCESSFULLY</span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Empty State */}
        {users && users.length === 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-white/5">
            <CardContent className="p-16 text-center">
              <div className="space-y-6">
                <div className="p-6 bg-amber-500/10 rounded-full w-fit mx-auto ring-1 ring-amber-500/20">
                  <Users className="h-16 w-16 text-amber-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    No Users Found
                  </h3>
                  <p className="text-gray-400 text-lg max-w-md mx-auto">
                    No users were found for ticket ID #{input}. Please verify
                    the ticket ID and try again.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setInput("");
                    setUsers(null);
                  }}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Clear Search
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Initial State */}
        {users === null && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-white/5">
            <CardContent className="p-16 text-center">
              <div className="space-y-6">
                <div className="p-6 bg-indigo-500/10 rounded-full w-fit mx-auto ring-1 ring-indigo-500/20">
                  <Search className="h-16 w-16 text-indigo-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    Ready to Search
                  </h3>
                  <p className="text-gray-400 text-lg max-w-md mx-auto">
                    Enter a ticket ID above to find and manage users associated
                    with that ticket.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 max-w-sm mx-auto">
                  <div className="text-sm text-gray-300">
                    <span className="font-semibold">Tip:</span> Use numerical
                    ticket IDs for best results
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
