import { formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';

interface DateTimeComponents {
  year: number;
  month: number;
  day: number;
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
  // If no date provided, use current date
  const inputDate = date ? (typeof date === 'string' ? parseISO(date) : date) : new Date();
  
  // IST timezone
  const istTimeZone = 'Asia/Kolkata';
  
  // Extract individual components using formatInTimeZone
  const year = parseInt(formatInTimeZone(inputDate, istTimeZone, 'yyyy'));
  const month = parseInt(formatInTimeZone(inputDate, istTimeZone, 'MM'));
  const day = parseInt(formatInTimeZone(inputDate, istTimeZone, 'dd'));
  const hours = parseInt(formatInTimeZone(inputDate, istTimeZone, 'HH'));
  const minutes = parseInt(formatInTimeZone(inputDate, istTimeZone, 'mm'));
  const seconds = parseInt(formatInTimeZone(inputDate, istTimeZone, 'ss'));
  
  // Convert to 12-hour format
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const ampm: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';
  
  // Helper function to pad single digits with zero
  const pad = (num: number): string => num.toString().padStart(2, '0');
  
  // Format date (DD-MM-YYYY)
  const formattedDate = formatInTimeZone(inputDate, istTimeZone, 'dd-MM-yyyy');
  
  // Format time (HH:MM:SS) - 24-hour format
  const formattedTime = formatInTimeZone(inputDate, istTimeZone, 'HH:mm:ss');
  
  // Format time (HH:MM:SS AM/PM) - 12-hour format
  const formattedTime12 = `${pad(hours12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  
  // Full date time string - 24-hour format
  const fullDateTime = `${formattedDate} ${formattedTime}`;
  
  // Full date time string - 12-hour format
  const fullDateTime12 = `${formattedDate} ${formattedTime12}`;
  
  return {
    year,
    month,
    day,
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
