"use client";

import React from "react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Trophy } from "lucide-react";
import CustomHeader from "@/app/components/CustomHeader";
import CustomSlider from "@/app/components/CustomSlider";
import { createClient } from "@/app/utils/supabase/client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from 'next/navigation'

export default function LevelAssignmentComponent() {
  const router = useRouter()
  const searchParams= useSearchParams()
  const [sliderValue, setSliderValue] = useState(2); // ✅ This will work correctly
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authLoading, user } = useAuth();
  const supabase = createClient();
  const levelData = {
    2: {
      title: " Beginner",
      description: "You’ve just started playing. Still learning how to serve, rally, and score. No prior experience needed — come try it out!",
      features: [
        "Core concepts",
        "Practical exercises",
        "Skill building",
        "Progress tracking",
      ],
      image:
        "https://media.istockphoto.com/id/1305966517/vector/playing-badminton-illustration.jpg?s=612x612&w=0&k=20&c=L2yRBybtI3t6cZYtfm_21cWBh9AqlJq2Xj_A5h5kdSo=",
      color: "from-blue-500 to-blue-600",
    },
    4: {
      title: "Beginner +",
      description:
        "You can rally 3–5 shots. You’ve played a few casual games and understand basic rules and scoring. Still improving footwork and positioning.",
      features: [
        "Advanced techniques",
        "Complex projects",
        "Problem solving",
        "Peer collaboration",
      ],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqUN3UXnUVAshhXzDd1sNYeUy935nzhY4BGg&s",
      color: "from-yellow-500 to-yellow-600",
    },
    6: {
      title: "Intermediate",
      description: "You play regularly. Can rally 6–10 shots, defend smashes, and understand court movement in doubles. Looking for good, competitive games.",
      features: [
        "Expert strategies",
        "Leadership roles",
        "Mentoring others",
        "Innovation projects",
      ],
      image: "https://badmintonhq.co.uk/cdn/shop/articles/123.jpg?v=1704207657",
      color: "from-orange-500 to-orange-600",
    },
    8: {
      title: "Upper Intermediate",
      description: "You’ve got strong footwork, consistent smashes, and use strategy. Play frequently and enjoy a fast-paced, tactical game.",
      features: [
        "Cutting-edge techniques",
        "Research & development",
        "Industry leadership",
        "Knowledge sharing",
      ],
      image:
        "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_sm_2x/f_auto/primary/hsz5zl0ur6fuza7gfpx8",
      color: "from-red-500 to-red-600",
    },
    10: {
      title: "Professional",
      description: "You play tournaments or at club level. Expect fast rallies, deceptive shots, and high-intensity games. You’re here to compete.",
      features: [
        "Groundbreaking innovation",
        "Global recognition",
        "Thought leadership",
        "Legacy building",
      ],
      image:
        "https://cdn.britannica.com/44/256944-050-8D414329/PV-Sindhu-2020-Tokyo-Olympics.jpg",
      color: "from-purple-500 to-purple-600",
    },
  };

  const currentLevel = levelData[sliderValue as keyof typeof levelData];


  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({ usersetlevel: sliderValue.toString() })
        .eq("user_id", user?.uid);

      if (error) {
        console.error("Supabase error:", error);
        toast("Error saving your level", {
          className: "bg-yellow-400 text-black text-lg",
        });
        return;
      }

      // Optionally show success message
      toast("Level saved successfully!", {
        className: "bg-green-400 text-black text-lg",
      });

      setTimeout(() => {
        router.push(`/funcircle/ticket?id=${searchParams.get('rq')}`)
      }, 600);

    } catch (error) {
      console.log(error);
      toast("Error saving your level", {
        className: "bg-yellow-400 text-black text-lg",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white">
      <CustomHeader />

      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Slider Section */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl text-white font-semibold mb-2">
                  Select Your Level
                </h2>
                <p className="text-gray-400 text-sm">
                  Move the slider to choose your current skill level
                </p>
              </div>
              <CustomSlider value={sliderValue} onChange={setSliderValue} />
            </div>
          </CardContent>
        </Card>

        {/* Current Level Display */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${currentLevel.color} rounded-full flex items-center justify-center`}
                >
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  {/* <h3 className="text-xl font-bold text-white">Level {sliderValue}</h3> */}
                  <p className="text-xl font-bold text-white">
                    {currentLevel.title}
                  </p>
                </div>
              </div>

              <p className="text-gray-300">{currentLevel.description}</p>

              {/* <div className="space-y-2">
                <h4 className="font-semibold text-white flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-purple-400" />
                  What you will get:
                </h4>
                <ul className="grid grid-cols-2 gap-2">
                  {currentLevel.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </CardContent>
        </Card>

        {/* Demo Image Section */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-2">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={currentLevel.image || "/placeholder.svg"}
                  alt={`${currentLevel.title} demonstration`}
                  className="w-full h-48 object-cover transition-all duration-300"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${currentLevel.color} opacity-20`}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="space-y-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium text-base"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up your profile...
              </>
            ) : (
              <>
                Continue with Level {sliderValue}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-sm text-gray-400">
            Don not worry, you can always change this later in your settings
          </p>
        </div>
      </div>
    </div>
  );
}
