import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit'
  });

  return formatter.format(date);
}

export function formatNumber(
  number: number,
  notation: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined = 'standard',
  decimals: number
) {
  const formatter = Intl.NumberFormat('en', { notation, maximumFractionDigits: decimals });

  return formatter.format(number);
}

export function formatSecondsToHoursMinSecs(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = '';
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0 || hours > 0) {
    result += `${minutes}m `;
  }
  result += `${seconds.toFixed(0)}s`;

  return result.trim();
}
