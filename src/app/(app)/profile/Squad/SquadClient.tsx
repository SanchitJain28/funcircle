"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import CustomHeader from "@/components/header-footers/CustomHeader";
import { DuoRequiredModal } from "./DuoRequiredModal";
import { useRouter } from "next/navigation";

export interface SquadMember {
  member_id: string;
  member_name: string;
  avatar_url?: string;
}

export interface Squad {
  id: string;
  squad_name: string;
  squad_members: SquadMember[];
  created_at: string; // ISO timestamp
  squad_admin: string;
}

export default function SquadClient() {
  const router = useRouter();

  const { user, profile } = useAuth();
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetchSquads = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/fetch-squads", {
        user_id: user.uid,
      });
      setSquads(data.userSquads || []);
    } catch (error) {
      console.error("Failed to fetch squads:", error);
      // Handle error appropriately in UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSquads();
  }, [user?.uid]);

  useEffect(() => {
    console.log("CURRENT DUO", profile?.current_duo);
    console.log(!!profile?.current_duo);
  }, [profile?.current_duo]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#171717] text-white">
        <p>Please log in to view your squads.</p>
      </div>
    );
  }

  return (
    <div className="">
      <CustomHeader />
      <div className="bg-[#171717] min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Your Squads</h1>
            {/* <Link href="Squad/create-squad"> */}
            <Button
              onClick={() => {
                if (!profile?.current_duo) {
                  setIsOpen(true); // Open modal if no duo
                } else {
                  // Navigate to create squad page or handle squad creation
                  // Example: router.push('/Squad/create-squad');
                  router.push("Squad/create-squad");
                }
              }}
              className="bg-[#8A36EB] hover:bg-[#732bbf] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Create Squad
            </Button>
            {/* </Link> */}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card
                  key={i}
                  className="bg-[#222] border-gray-700 animate-pulse"
                >
                  <CardHeader>
                    <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-600 rounded w-1/2 mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
                      <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
                      <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : squads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {squads.map((squad) => (
                <Card
                  key={squad.id}
                  className="bg-[#222222] border border-gray-700 rounded-xl shadow-lg hover:shadow-[#8A36EB]/20 transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">
                      {squad.squad_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 mb-4">
                      Admin: {squad.squad_admin === user.uid ? "You" : "Other"}
                    </p>
                    <h3 className="font-semibold mb-2 text-gray-300">
                      Members
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {squad.squad_members.map((member) => (
                        <div
                          key={member.member_id}
                          className="flex items-center gap-2 bg-[#333] p-2 rounded-lg"
                        >
                          <img
                            src={
                              member.avatar_url ||
                              `https://avatar.vercel.sh/${member.member_name}.png`
                            }
                            alt={member.member_name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-200">
                            {member.member_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-400">
                No Squads Found
              </h2>
              <p className="text-gray-500 mt-2">
                You have not created or joined any squads yet.
              </p>
              <Button className="mt-6 bg-[#8A36EB] hover:bg-[#732bbf] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 mx-auto">
                <PlusCircle size={20} />
                Create Your First Squad
              </Button>
            </div>
          )}
        </div>
      </div>
      <DuoRequiredModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
