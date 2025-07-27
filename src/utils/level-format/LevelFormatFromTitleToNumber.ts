export function LevelFormatFromTitleToNumber(t: string): string {
  const levelMap: Record<string, string> = {
    "level 1": "2",
    "level 2": "4",
    "level 3": "6",
    "level 4": "8",
    "level 5": "10",
  };

  const normalized = t.toLowerCase();
  console.log(normalized);
  const levelKey = Object.keys(levelMap).find((key) =>
    normalized.includes(key)
  );

  return levelKey ? levelMap[levelKey] : "Invalid level given";
}

export function isPlayerLevelValid(pl?: string, tl?: string): boolean {
  const levels = ["2", "4", "6", "8", "10"];

  if (!pl || !tl) return true; // If no level, allow by default

  const ticket_level = LevelFormatFromTitleToNumber(tl);

  if (!levels.includes(pl) || !levels.includes(ticket_level)) {
    return false; // Invalid level
  }

  // High-level players (6,8,10) can join anything
  if (["6", "8", "10"].includes(pl)) return true;

  // Level 2 or 4 players can only join level 2 or 4 matches
  if (["2", "4"].includes(pl)) {
    return ["2", "4"].includes(ticket_level);
  }

  return false; // Any other weird case
}
