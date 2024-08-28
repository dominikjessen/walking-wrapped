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
