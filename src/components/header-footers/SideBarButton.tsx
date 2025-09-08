"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

import {
  MapPin,
  Menu,
  Calendar,
  Gamepad2Icon as GameController2,
  LogIn,
  User,
  Users,
  CreditCard,
  Trophy,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export default function SideBarButton() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();
  const mainItems = [
    {
      title: "My Chats",
      url: "/chat",
      icon: MessageCircle,
    },
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
          title: "My Chats",
          url: "/chat",
          icon: MessageCircle,
        },
        {
          title: "See Duo Requests",
          url: "/profile?isopmod=true",
          icon: Users,
        },
        {
          title: "See Game Requests",
          url: "/requests",
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
          url: "/sign-up",
          icon: LogIn,
        },
      ];

  const subscriptionItems = [
    {
      title: "Subscription",
      url: "/subscription",
      icon: CreditCard,
    },
  ];
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div
          className=""
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault()
          }}
        >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className="relative text-white  border-black border-2 hover:bg-white/10 rounded-lg p-3"
            >
              <Menu className="h-8 w-8" />
              {/* {requests.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center min-w-[1.5rem]">
                {requests.length > 99 ? "99+" : requests.length}
              </span>
            )} */}
              {/* <span className="sr-only">
              Open menu with {requests.length} requests
            </span> */}
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-full p-2">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
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
                    {/* {item.title === "See Duo Requests" &&
                      requests.length > 0 && (
                        <Badge
                          variant="destructive"
                          className="ml-auto min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full flex items-center justify-center"
                        >
                          {requests.length > 99 ? "99+" : requests.length}
                        </Badge>
                      )} */}
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
    </div>
  );
}
