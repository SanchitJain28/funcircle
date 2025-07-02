import { Award, Crown, Target, TrendingUp, Users, Zap } from "lucide-react";

export const TAG_CONFIG = {
  MVP: {
    icon: Crown,
    color: "from-amber-400 via-yellow-400 to-orange-500",
    bgColor:
      "bg-gradient-to-br from-amber-500/10 via-yellow-500/15 to-orange-500/20",
    borderColor: "border-amber-400/50 hover:border-amber-400/70",
    textColor: "text-amber-400 group-hover:text-amber-300",
    shadowColor: "shadow-amber-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-amber-500/30",
    description: "Most Valuable Player - Outstanding performance",
  },
  "Team Player": {
    icon: Users,
    color: "from-sky-400 via-blue-400 to-blue-600",
    bgColor: "bg-gradient-to-br from-sky-500/10 via-blue-500/15 to-blue-600/20",
    borderColor: "border-sky-400/50 hover:border-sky-400/70",
    textColor: "text-sky-400 group-hover:text-sky-300",
    shadowColor: "shadow-sky-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-sky-500/30",
    description: "Excellent teamwork and collaboration",
  },
  "Most improved player": {
    icon: TrendingUp,
    color: "from-emerald-400 via-green-400 to-emerald-500",
    bgColor:
      "bg-gradient-to-br from-emerald-500/10 via-green-500/15 to-emerald-500/20",
    borderColor: "border-emerald-400/50 hover:border-emerald-400/70",
    textColor: "text-emerald-400 group-hover:text-emerald-300",
    shadowColor: "shadow-emerald-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-emerald-500/30",
    description: "Remarkable improvement and growth",
  },
  "Tactical player": {
    icon: Target,
    color: "from-violet-400 via-purple-400 to-purple-600",
    bgColor:
      "bg-gradient-to-br from-violet-500/10 via-purple-500/15 to-purple-600/20",
    borderColor: "border-violet-400/50 hover:border-violet-400/70",
    textColor: "text-violet-400 group-hover:text-violet-300",
    shadowColor: "shadow-violet-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-violet-500/30",
    description: "Strategic thinking and smart gameplay",
  },
  "Power performer": {
    icon: Zap,
    color: "from-rose-400 via-red-400 to-red-600",
    bgColor: "bg-gradient-to-br from-rose-500/10 via-red-500/15 to-red-600/20",
    borderColor: "border-rose-400/50 hover:border-rose-400/70",
    textColor: "text-rose-400 group-hover:text-rose-300",
    shadowColor: "shadow-rose-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-rose-500/30",
    description: "Explosive power and aggressive play",
  },
  "Consistent player": {
    icon: Award,
    color: "from-indigo-400 via-blue-500 to-indigo-600",
    bgColor:
      "bg-gradient-to-br from-indigo-500/10 via-blue-500/15 to-indigo-600/20",
    borderColor: "border-indigo-400/50 hover:border-indigo-400/70",
    textColor: "text-indigo-400 group-hover:text-indigo-300",
    shadowColor: "shadow-indigo-500/25",
    glowEffect: "hover:shadow-lg hover:shadow-indigo-500/30",
    description: "Reliable and steady performance",
  },
} as const;
