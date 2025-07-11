"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Archivo } from "next/font/google";
import { User } from "lucide-react";
import { TagsSection } from "./Tags/TagSection";
import { TagGroup } from "@/hooks/useAuth";

const archivo = Archivo({ subsets: ["latin"], weight: "400" });

const tabs = [
  {
    id: "Profile",
    title: "Profile",
    icon: User,
    activeStyle: "bg-white text-gray-800 shadow-md",
    inactiveStyle: "bg-gray-100 text-gray-500",
  },
  {
    id: "Games",
    title: "Games",
    icon: User,
    activeStyle: "bg-white text-gray-800 shadow-md",
    inactiveStyle: "bg-gray-100 text-gray-500",
  },
];

export default function ProfileTabs({
  tags,
  user_id,
}: {
  tags: TagGroup[];
  user_id: string;
}) {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className={archivo.className}>
      <div className="flex gap-4">
        {tabs.map((tab, index: number) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;

          return (
            <motion.div
              className={`rounded-2xl text-base px-6 py-4 cursor-pointer flex items-center gap-3 ${
                isActive ? tab.activeStyle : tab.inactiveStyle
              }`}
              key={index}
              onClick={() => setActiveTab(tab.id)}
              animate={{
                scale: isActive ? 1 : 1,
                opacity: isActive ? 1 : 0.7,
              }}
              whileHover={{
                scale: 1.02,
                opacity: 1,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <IconComponent size={20} />
              <span className="font-medium">{tab.title}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="py-4">
        {activeTab === "Profile" && (
          <div>
            <TagsSection tagsData={tags} user_id={user_id} />
          </div>
        )}
      </div>
    </div>
  );
}
