"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, Trophy, Star, Crown } from "lucide-react";
import Image from "next/image";

export default function KnowYourLevel({
  className = "bottom-6 right-6",
  fixed = true,
}: {
  className?: string;
  custom?: string;
  fixed: boolean;
}) {
  const [currentLevel, setCurrentLevel] = useState(3);

  const levelData = {
    1: {
      title: "Beginner",
      description:
        "You've just started playing. Still learning how to serve, rally, and score. No prior experience needed — come try it out!",
      features: [
        "Core concepts",
        "Practical exercises",
        "Skill building",
        "Progress tracking",
      ],
      image:
        "https://media.istockphoto.com/id/1305966517/vector/playing-badminton-illustration.jpg?s=612x612&w=0&k=20&c=L2yRBybtI3t6cZYtfm_21cWBh9AqlJq2Xj_A5h5kdSo=",
      color: "from-blue-500 to-blue-600",
      icon: <Zap className="w-5 h-5" />,
    },
    2: {
      title: "Beginner Intermediate",
      description:
        "You can rally 3–5 shots. You've played a few casual games and understand basic rules and scoring. Still improving footwork and positioning.",
      features: [
        "Game basics refinement",
        "Consistent rally practice",
        "Footwork and positioning drills",
        "Confidence building through play",
      ],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqUN3UXnUVAshhXzDd1sNYeUy935nzhY4BGg&s",
      color: "from-yellow-500 to-yellow-600",
      icon: <Target className="w-5 h-5" />,
    },
    3: {
      title: "Intermediate",
      description:
        "You play regularly. Can rally 6–10 shots, defend smashes, and understand court movement in doubles. Looking for good, competitive games.",
      features: [
        "Better shot control",
        "Team play and positioning",
        "Practice smashes and blocks",
        "Play matches with real game feel",
      ],
      image: "https://badmintonhq.co.uk/cdn/shop/articles/123.jpg?v=1704207657",
      color: "from-orange-500 to-orange-600",
      icon: <Trophy className="w-5 h-5" />,
    },
    4: {
      title: "Upper Intermediate",
      description:
        "You've got strong footwork, consistent smashes, and use strategy. Play frequently and enjoy a fast-paced, tactical game.",
      features: [
        "Competitive match simulations",
        "Tactical gameplay improvement",
        "Pressure-handling drills",
        "Rotation & coverage mastery",
      ],
      image:
        "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_sm_2x/f_auto/primary/hsz5zl0ur6fuza7gfpx8",
      color: "from-red-500 to-red-600",
      icon: <Star className="w-5 h-5" />,
    },
    5: {
      title: "Professional",
      description:
        "You play tournaments or at club level. Expect fast rallies, deceptive shots, and high-intensity games. You're here to compete.",
      features: [
        "High-intensity matchups",
        "Tournament-style sessions",
        "Opponent analysis techniques",
        "Speed, precision, and strategy focus",
      ],

      image:
        "https://cdn.britannica.com/44/256944-050-8D414329/PV-Sindhu-2020-Tokyo-Olympics.jpg",
      color: "from-purple-500 to-purple-600",
      icon: <Crown className="w-5 h-5" />,
    },
  };

  const currentLevelData = levelData[currentLevel as keyof typeof levelData];
  const levelKeys = Object.keys(levelData).map(Number);

  return (
    <>
      {/* Floating Trigger Button */}
      <div className={`${fixed ? "fixed" : ""} ${className} z-50`}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-2xl rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 border-2 border-black/20"
              size="lg"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Know Your Level
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:max-w-lg bg-black text-white border-l-4 border-orange-500 overflow-y-auto"
          >
            <SheetHeader className="border-b border-orange-500/30 pb-4 mb-6">
              <SheetTitle className="text-2xl font-bold text-orange-500 flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Badminton Skill Levels
              </SheetTitle>
            </SheetHeader>

            {/* Level Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-orange-400">
                  Select Your Level
                </span>
                <Badge
                  variant="outline"
                  className="bg-orange-500/20 text-orange-400 border-orange-500/50"
                >
                  Level {currentLevel}
                </Badge>
              </div>

              <div className="px-2">
                <Slider
                  value={[currentLevel]}
                  onValueChange={(value) => setCurrentLevel(value[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  {levelKeys.map((level) => (
                    <span
                      key={level}
                      className={
                        currentLevel === level
                          ? "text-orange-400 font-semibold"
                          : ""
                      }
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Level Content */}
            <div className="space-y-6">
              {/* Level Header */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-500/30">
                <div className="p-2 bg-orange-500 rounded-full text-black">
                  {currentLevelData.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-400">
                    {currentLevelData.title}
                  </h3>
                  <p className="text-sm text-gray-300">Level {currentLevel}</p>
                </div>
              </div>

              {/* Level Image */}
              <div className="relative h-48 rounded-lg overflow-hidden border-2 border-orange-500/30">
                <Image
                  src={currentLevelData.image || "/placeholder.svg"}
                  alt={currentLevelData.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Description */}
              <div className="p-4 bg-gray-900/50 rounded-lg border border-orange-500/20">
                <p className="text-gray-300 leading-relaxed">
                  {currentLevelData.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  What to Expect
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {currentLevelData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-colors"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
