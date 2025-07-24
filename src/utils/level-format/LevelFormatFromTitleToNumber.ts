export function LevelFormatFromTitleToNumber(t: string): string {
  const levelMap: Record<string, string> = {
    "level 1": "2",
    "level 2": "4",
    "level 3": "6",
    "level 4": "8",
    "level 5": "10",
  };

  const normalized = t.toLowerCase();
  const levelKey = Object.keys(levelMap).find((key) =>
    normalized.includes(key)
  );

  return levelKey ? levelMap[levelKey] : "Invalid level given";
}

export function isPlayerLevelValid(pl?: string, tl?: string): boolean {
  const levels = ["2", "4", "6", "8", "10"];
  if (!pl || !tl) {
    return false;
  }

  const ticket_level = LevelFormatFromTitleToNumber(tl);

  if (!levels.includes(pl) || !levels.includes(ticket_level)) {
    return false; // Invalid input
  }

  const adjacentLevels: string[] = [];

  const playerIndex = levels.indexOf(pl);
  if (playerIndex !== -1) {
    if (playerIndex > 0) adjacentLevels.push(levels[playerIndex - 1]);
    if (playerIndex < levels.length - 1)
      adjacentLevels.push(levels[playerIndex + 1]);
  }

  // valid if ticket level is player's level or adjacent
  return pl === ticket_level || adjacentLevels.includes(ticket_level);
}
