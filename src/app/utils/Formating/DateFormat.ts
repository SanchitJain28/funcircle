export function FormatDateTime(date: Date){
    const result = {
        date: date.getUTCDate(),
        day: date.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' }),
        month: date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }),
        hour: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds()
      };
      return result
}