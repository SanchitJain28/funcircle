"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  Calendar,
  Gamepad2Icon as GameController2,
  LogIn,
  MapPin,
  Trophy,
  User,
  Users,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import React from "react";

export function AppSidebar() {
  const { user, authLoading } = useAuth();

  // Main navigation items
  const mainItems = [
    {
      title: "See Events",
      url: "/funcircle",
      icon: Calendar,
    },
    {
      title: "Play Badminton",
      url: "/funcircle/event/90",
      icon: GameController2,
    },
  ];

  // Profile related items
  const profileItems = user
    ? [
        {
          title: "My Profile",
          url: "/profile",
          icon: User,
        },
        {
          title: "See Duo Requests",
          url: "/profile",
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
      url: "/subscription",
      icon: CreditCard,
    },
  ];

  if (authLoading) {
    return (
      <Sidebar>
        <SidebarContent>
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-3 p-4">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-full p-2">
            <MapPin className="text-white w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-lg">Fun Circle</p>
            <p className="text-muted-foreground text-sm">Gurgaon</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Events & Games</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Profile</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {subscriptionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {user && (
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-full p-2">
                <User className="text-white w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Welcome</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
