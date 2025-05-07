export function FormatDateTime(utcDateString: string) {
  const utcDate = new Date(utcDateString);
  const istOffset = 0;
  const istDate = new Date(utcDate.getTime() + istOffset);

  const result = {
    date: istDate.getDate(),
    day: istDate.toLocaleString("en-US", {
      weekday: "long",
      timeZone: "Asia/Kolkata",
    }),
    month: istDate.toLocaleString("en-US", {
      month: "long",
      timeZone: "Asia/Kolkata",
    }),
    time: istDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }),
  };
  return result;
}
