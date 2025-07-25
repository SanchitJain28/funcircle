import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useMemo } from "react";

export default function InfoByLevel({ title }: { title: string }) {
  const CARD_STYLES = "bg-[#1D1D1F] border border-zinc-800 shadow-lg mb-6";

  const SkillLevelCard = ({
    title,
    requirements,
  }: {
    title: string;
    requirements: string[];
  }) => (
    <div className="mx-6 mb-6">
      <Card className={CARD_STYLES}>
        <CardHeader>
          <CardTitle className="text-lg text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-white space-y-2 list-none">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  const BeginnerSection = () => {
    const requirements = [
      "✅ You've recently started playing",
      "✅ You can do short rallies (2–4 shots)",
      "✅ You're here to improve and have fun – no pressure!",
      "✅ You're still serving and rules and scoring",
      "❌ Not suitable if you play fast-paced games regularly",
    ];

    return <SkillLevelCard title="Who Can Join" requirements={requirements} />;
  };

  const BeginnerPlusSection = () => {
    const requirements = [
      "✅ You’ve played a few times and getting the hang of it",
      "✅ You can rally 5–8 shots without panic",
      "✅ You know the basic rules and scoring",
      "✅ You’re ready for slightly faster games with friendly competition",
      "❌ Not for absolute beginners who just picked up a racquet",
      "❌ Not suitable if you're already smashing and diving like a pro",
    ];
    return <SkillLevelCard title="Who Can Join" requirements={requirements} />;
  };

  const IntermediateSection = () => {
    const requirements = [
      "✅ You can consistently rally (6–10+ shots)",
      "✅ You know the game rules and positioning",
      "✅ You've played regularly and enjoy competitive doubles",
      "✅ You can serve, smash, and defend under pressure",
      "❌ Not for new players or those still learning the basics",
      "❌ You may be moved to Beginner+ if your level doesn't match",
    ];

    return <SkillLevelCard title="Who Can Join" requirements={requirements} />;
  };

  const UpperIntermediateSection = () => {
    const requirements = [
      "✅ You play frequently and thrive in competitive games",
      "✅ You can rally 15+ shots with consistency and control",
      "✅ You understand doubles strategies like rotation and coverage",
      "✅ You can pressure opponents with smashes, drops, and net play",
      "❌ Not for casual players or those still building consistency",
      "❌ You may be moved to Intermediate if your level doesn’t match up",
    ];
    return <SkillLevelCard title="Who Can Join" requirements={requirements} />;
  };

  const ProfessionalSection = () => {
    const requirements = [
      "✅ You’ve played at a competitive or tournament level",
      "✅ You have excellent footwork, shot accuracy, and game IQ",
      "✅ You can adapt strategies mid-game and dominate in fast-paced rallies",
      "✅ You’re here for serious, high-intensity matches with top players",
      "❌ Not for recreational or semi-regular players",
      "❌ You may be moved down if your level doesn’t match real-time performance",
    ];
    return <SkillLevelCard title="Who Can Join" requirements={requirements} />;
  };

  const isIntermediateLevel = useMemo(
    () => title.toUpperCase().includes("LEVEL 3"),
    [title]
  );

  const isBeginnerLevel = useMemo(
    () => title.toUpperCase().includes("LEVEL 1"),
    [title]
  );

  const isBeginnerPlusLevel = useMemo(
    () => title.toUpperCase().includes("LEVEL 2"),
    [title]
  );

  const isUpperIntermediateLevel = useMemo(
    () => title.toUpperCase().includes("LEVEL 4"),
    [title]
  );

  const isProfessionalLevel = useMemo(
    () => title.toUpperCase().includes("LEVEL 5"),
    [title]
  );

  return (
    <div>
      {isIntermediateLevel && <IntermediateSection />}
      {isBeginnerLevel && <BeginnerSection />}
      {isBeginnerPlusLevel && <BeginnerPlusSection />}
      {isUpperIntermediateLevel && <UpperIntermediateSection />}
      {isProfessionalLevel && <ProfessionalSection />}
    </div>
  );
}
