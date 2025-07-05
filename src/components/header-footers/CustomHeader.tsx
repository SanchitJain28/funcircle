"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  MapPin,
  UserRound,
  Menu,
  Calendar,
  Gamepad2Icon as GameController2,
  LogIn,
  User,
  Users,
  CreditCard,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "../ui/badge";

export default function CustomHeader() {
  const { user, requests } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Navigation items
  const mainItems = [
    {
      title: "See Events",
      url: "/funcircle",
      icon: Calendar,
    },
    {
      title: "Play Badminton",
      url: "/funcircle/eventTicket/90",
      icon: GameController2,
    },
  ];

  const profileItems = user
    ? [
        {
          title: "My Profile",
          url: "/profile",
          icon: User,
        },
        {
          title: "See Duo Requests",
          url: "/profile?isopmod=true",
          icon: Users,
        },
        {
          title: "My Games",
          url: "/profile",
          icon: Trophy,
        },
      ]
    : [
        {
          title: "Sign In",
          url: "/profile",
          icon: LogIn,
        },
      ];

  const subscriptionItems = [
    {
      title: "Subscription",
      url: "/new-subscription",
      icon: CreditCard,
    },
  ];

  return (
    <header className="bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Menu Button + Location Section */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="relative text-white border border-[#9A49EC] border-2 hover:bg-white/10 rounded-lg p-3"
                >
                  <Menu className="h-8 w-8" />
                  {requests.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center min-w-[1.5rem]">
                      {requests.length > 99 ? "99+" : requests.length}
                    </span>
                  )}
                  <span className="sr-only">
                    Open menu with {requests.length} requests
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-full p-2">
                      <MapPin className="text-white w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg">Fun Circle</p>
                      <p className="text-muted-foreground text-sm">Gurgaon</p>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 space-y-6">
                  {/* Events & Games Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Events & Games
                    </h3>
                    <div className="space-y-2">
                      {mainItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <item.icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Profile Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Profile
                    </h3>
                    <div className="space-y-2">
                      {profileItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                            <span className="font-medium">{item.title}</span>
                          </div>
                          {item.title === "See Duo Requests" &&
                            requests.length > 0 && (
                              <Badge
                                variant="destructive"
                                className="ml-auto min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full flex items-center justify-center"
                              >
                                {requests.length > 99 ? "99+" : requests.length}
                              </Badge>
                            )}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Account Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Account
                    </h3>
                    <div className="space-y-2">
                      {subscriptionItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <item.icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* User Info Footer */}
                  {user && (
                    <>
                      <Separator />
                      <div className="p-4 bg-accent/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-full p-2">
                            <User className="text-white w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Welcome</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.phoneNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Location Section */}
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-white text-xl font-bold">Fun Circle</p>
                <p className="text-white/70 font-bold text-sm">Gurgaon</p>
              </div>
            </div>
          </div>

          {/* User Section */}
          <Link href={"/profile"}>
            <div className="flex items-center space-x-3 hover:bg-white/10 rounded-lg p-2 transition-colors">
              <div>
                <p className="text-white/70 text-sm font-medium text-right">
                  Welcome
                </p>
                {user ? (
                  <p className="text-white font-bold text-lg text-right">
                    {user.phoneNumber}
                  </p>
                ) : (
                  <p className="text-white font-bold text-lg text-right">
                    Guest User
                  </p>
                )}
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 shadow-lg">
                <UserRound className="text-white w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
