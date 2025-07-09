"use client";

import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Trophy, Shield } from "lucide-react";

export default function DuoInfo() {
  const { profile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!profile?.current_duo?.other_user) {
    return (
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/20">
        <CardContent className="p-4">
          <p className="text-muted-foreground text-center">
            No duo partner found
          </p>
        </CardContent>
      </Card>
    );
  }

  const duoPartner = profile.current_duo.other_user;
  const initials = duoPartner.first_name
    ? duoPartner.first_name.charAt(0).toUpperCase()
    : duoPartner.email?.charAt(0).toUpperCase() || "?";

  return (
    <Card className="bg-gradient-to-r mb-2 from-blue-500/10 to-purple-500/10 border-blue-200/20 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full h-auto p-0 hover:bg-transparent"
            >
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-10 w-10 border-2 border-blue-200">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-white font-medium">
                    Duo Partner: {duoPartner.first_name || "Unknown"}
                  </p>
                  <p className="text-blue-200 text-sm">Click to view details</p>
                </div>
              </div>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Duo Partner Details
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {duoPartner.first_name || "Unknown User"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    ID: {duoPartner.user_id}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {duoPartner.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">User Level</p>
                    <Badge variant="secondary" className="mt-1">
                      {duoPartner.usersetlevel || "Not set"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Admin Level</p>
                    <Badge
                      variant={
                        duoPartner.adminsetlevel ? "default" : "secondary"
                      }
                      className="mt-1"
                    >
                      {duoPartner.adminsetlevel || "Not set"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
