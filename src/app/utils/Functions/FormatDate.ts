export const formatDate = (isoString: Date) => {
  return new Date(isoString).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long", // e.g., Thursday
    year: "numeric",
    month: "long", // e.g., February
    day: "numeric", // e.g., 27
    hour: "numeric",
  });
};
