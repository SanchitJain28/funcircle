export function formatLevelByName(level: string): string {
  const levelIntoNum = Number(level);

  switch (levelIntoNum) {
    case 2:
      return "Beginner";
    case 4:
      return "Beginner Intermediate";
    case 6:
      return "Intermediate";
    case 8:
      return "Upper Intermediate";
    case 10:
      return "Professional";
    default:
      return "Unknown Level";
  }
}
