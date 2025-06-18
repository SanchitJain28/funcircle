"use client";
import React from "react";
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
import { Search, Users, Settings, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/app/utils/supabase/client";

interface User {
  email: string;
  first_name: string;
  user_id: string;
  usersetlevel?: string;
  adminsetlevel?: string;
  updated?: boolean;
}

// Mock Supabase client for demonstration
const supabase = createClient();

export default function AdminPage() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateUsers = (value: string, id: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.user_id === id ? { ...user, adminsetlevel: value } : user
      )
    );
  };

 

  const handleSubmit = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Orderitems")
        .select(
          `users (user_id, email, first_name, usersetlevel,adminsetlevel)`
        )
        .eq("ticket_id", Number.parseInt(input));

      if (error) throw error;

      // Fix: Handle potential array of users and properly type the response
      const filteredUsers: User[] =
        data?.flatMap((item) => {
          if (!item.users) return [];
          // If item.users is an array, map each user; otherwise, wrap in array
          const usersArray = Array.isArray(item.users)
            ? item.users
            : [item.users];
          return usersArray.map((user) => ({
            email: user.email,
            first_name: user.first_name,
            user_id: user.user_id,
            usersetlevel: user.usersetlevel ?? "",
            adminsetlevel: user.adminsetlevel,
          }));
        }) || [];

      console.log(filteredUsers);

      setUsers(filteredUsers);
      console.log("Fetched users", filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleUpdateSubmit = async () => {
    if (users) {
      for (let i = 0; i < users.length; i++) {
        try {
          const { data, error } = await supabase
            .from("users")
            .update({ adminsetlevel: users[i].adminsetlevel })
            .eq("user_id", users[i].user_id)
            .select("*");
          console.log(data);
          if (error) {
            console.log("update failed");
            toast({
              title: "Update Failed",
              description: "Could not update user",
              variant: "destructive",
            });
            throw new Error("Unexpected error occured");
          }
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id === users[i].user_id
                ? { ...user, updated: true }
                : user
            )
          );
          console.log("updated user", users[i].user_id);
        } catch (error) {
          console.log(error);
          toast({
            title: "Update Failed",
            description: "Could not update user",
            variant: "destructive",
          });
        }
      }
    }
  };

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
                {users ? users.length : 0} Users Found
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
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400 focus:ring-indigo-400/50 h-12 text-lg backdrop-blur-sm"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={loading || !input}
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
              {users.some(
                (user) => user.adminsetlevel !== user.usersetlevel
              ) && (
                <Button
                  onClick={handleUpdateSubmit}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-200"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Update All Users
                </Button>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user: User, index: number) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group shadow-xl ring-1 ring-white/5 hover:ring-white/20 hover:shadow-2xl hover:shadow-indigo-500/10"
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
                          {/* <Badge
                            variant="outline"
                            className="border-indigo-400/50 text-indigo-300 bg-indigo-500/10 px-3 py-1"
                          >
                            {user.user_id}
                          </Badge> */}
                        </div>

                        {user.usersetlevel && (
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                              Current Level
                            </div>
                            <div className="text-white font-medium">
                              {user.usersetlevel}
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
                            updateUsers(value, user.user_id)
                          }
                          defaultValue={
                            user.adminsetlevel ? user.adminsetlevel : "2"
                          }
                        >
                          <SelectTrigger
                            className={`bg-white/5 h-12 ${
                              user.adminsetlevel
                                ? "border-white/20 ring-1 ring-green-500/20"
                                : "border-red-400/50 ring-1 ring-red-500/30 bg-red-500/50"
                            } text-white focus:border-indigo-400 focus:ring-indigo-400/50 backdrop-blur-sm transition-all duration-200`}
                          >
                            <SelectValue placeholder="Select admin level..." />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 border-white/20 backdrop-blur-xl">
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

                      {/* Enhanced Update Status */}
                      {user.updated && (
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
                  onClick={() => setInput("")}
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
        {!users && (
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
