import { formatLevelByName } from "@/utils/formatLevelBynumber";
import React from "react";

export const ProfileField: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
}> = ({ icon, label, value }) => {
  const displayValue = value?.trim() || "Not provided";
  const isEmpty = !value?.trim();

  return (
    <div className="flex items-start gap-4 p-3 rounded-2xl bg-gradient-to-r from-[#1D1D1F] to-[#252529] border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 group">
      <div className="mt-1 text-[#8338EC] p-2 bg-[#8338EC]/10 rounded-xl border border-[#8338EC]/20 group-hover:bg-[#8338EC]/15 transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white mb-1">{label}</p>
        <p
          className={`text-base ${isEmpty ? "text-zinc-400 italic" : "text-zinc-300 font-medium"}`}
        >
          {label === "Skill Level"
            ? formatLevelByName(displayValue)
            : displayValue}
        </p>
      </div>
      {isEmpty && (
        <div className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30 font-semibold animate-pulse">
          Missing
        </div>
      )}
    </div>
  );
};
