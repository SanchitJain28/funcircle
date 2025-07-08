"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trophy } from "lucide-react";
import CustomSlider from "@/components/assign-level/CustomSlider";
import { levelData } from "../props/LevelProps";

interface LevelAssignmentModalProps {
  openModal: boolean;
  setModalOpen: (open: boolean) => void;
  onLevelSelect?: (level: number) => void;
}

export default function LevelAssignmentModal({
  openModal,
  setModalOpen,
}: LevelAssignmentModalProps) {
  const [sliderValue, setSliderValue] = useState(2);

  const currentLevel = levelData[sliderValue as keyof typeof levelData];

  return (
    <Dialog open={openModal} onOpenChange={setModalOpen}>
      <DialogContent className="max-w-2xl bg-[#0f0f11] border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <div className="space-y-6 py-4">
          {/* Slider Section */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg text-white font-medium mb-2">
                    Current Selection
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Move the slider to adjust your level
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
                    <p className="text-xl font-bold text-white">
                      {currentLevel.title}
                    </p>
                    <p className="text-sm text-gray-400">Level {sliderValue}</p>
                  </div>
                </div>
                <p className="text-gray-300">{currentLevel.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Image Section */}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
