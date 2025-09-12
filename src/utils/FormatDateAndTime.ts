import { formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';

interface DateTimeComponents {
  year: number;
  month: number;
  monthName: string;   // added
  day: number;
  dayName: string;     // added
  hours: number;
  minutes: number;
  seconds: number;
  hours12: number;
  ampm: 'AM' | 'PM';
  formattedDate: string;
  formattedTime: string;
  formattedTime12: string;
  fullDateTime: string;
  fullDateTime12: string;
}

export function formatDateAndTime(date?: Date | string): DateTimeComponents {
  const inputDate = date ? (typeof date === 'string' ? parseISO(date) : date) : new Date();
  const istTimeZone = 'Asia/Kolkata';

  const year = parseInt(formatInTimeZone(inputDate, istTimeZone, 'yyyy'));
  const month = parseInt(formatInTimeZone(inputDate, istTimeZone, 'MM'));
  const day = parseInt(formatInTimeZone(inputDate, istTimeZone, 'dd'));
  const hours = parseInt(formatInTimeZone(inputDate, istTimeZone, 'HH'));
  const minutes = parseInt(formatInTimeZone(inputDate, istTimeZone, 'mm'));
  const seconds = parseInt(formatInTimeZone(inputDate, istTimeZone, 'ss'));

  // Day name (Monday, Tuesday…)
  const dayName = formatInTimeZone(inputDate, istTimeZone, 'EEEE');

  // Month name (January, February…)
  const monthName = formatInTimeZone(inputDate, istTimeZone, 'LLLL');

  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const ampm: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';
  const pad = (num: number): string => num.toString().padStart(2, '0');

  const formattedDate = formatInTimeZone(inputDate, istTimeZone, 'dd-MM-yyyy');
  const formattedTime = formatInTimeZone(inputDate, istTimeZone, 'HH:mm:ss');
  const formattedTime12 = `${pad(hours12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  const fullDateTime = `${formattedDate} ${formattedTime}`;
  const fullDateTime12 = `${formattedDate} ${formattedTime12}`;

  return {
    year,
    month,
    monthName,
    day,
    dayName,
    hours,
    minutes,
    seconds,
    hours12,
    ampm,
    formattedDate,
    formattedTime,
    formattedTime12,
    fullDateTime,
    fullDateTime12
  };
}
