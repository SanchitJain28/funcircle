import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { SKILL_LEVELS } from "./Props/SKILL_LEVELS";
import { Input } from "@/components/ui/input";
import { formatLevelByName } from "@/utils/formatLevelBynumber";

type FormData = {
  first_name: string;
  location: string;
  usersetlevel: string;
};

export const ProfileField: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  isEditing: boolean;
  fieldName: keyof FormData;
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string) => void;
  type?: "input" | "select";
}> = ({
  icon,
  label,
  value,
  isEditing,
  fieldName,
  formData,
  onFormChange,
  type = "input",
}) => {
  const displayValue = value?.trim() || "Not provided";
  const isEmpty = !value?.trim();

  if (isEditing) {
    return (
      <div className="space-y-4">
        <Label
          htmlFor={fieldName as string}
          className="text-sm font-semibold flex items-center gap-3 text-white"
        >
          <span className="text-[#8338EC] p-1 bg-[#8338EC]/10 rounded-lg">
            {icon}
          </span>
          {label}
        </Label>
        {type === "select" &&
        fieldName === ("usersetlevel" as keyof FormData) ? (
          <Select
            value={formData[fieldName]}
            onValueChange={(value) => onFormChange(fieldName, value)}
          >
            <SelectTrigger className="bg-gradient-to-r from-[#252529] to-[#2a2a2e] border-zinc-700/50 text-white hover:border-[#8338EC]/50 focus:border-[#8338EC] focus:ring-[#8338EC]/20">
              <SelectValue placeholder="Select your skill level" />
            </SelectTrigger>
            <SelectContent className="bg-gradient-to-br from-[#1D1D1F] to-[#252529] border-zinc-700/50">
              {SKILL_LEVELS.map((level) => (
                <SelectItem
                  key={level.value}
                  value={level.value}
                  className="text-white hover:bg-[#252529]/50 focus:bg-[#252529]/50"
                >
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={fieldName}
            value={formData[fieldName]}
            onChange={(e) => onFormChange(fieldName, e.target.value)}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className="bg-gradient-to-r from-[#252529] to-[#2a2a2e] border-zinc-700/50 text-white placeholder:text-zinc-400 hover:border-[#8338EC]/50 focus:border-[#8338EC] focus:ring-[#8338EC]/20"
          />
        )}
      </div>
    );
  }

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
