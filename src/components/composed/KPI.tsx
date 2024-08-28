import { cn, formatNumber } from '@/lib/utils';
import { ComponentProps } from 'react';

export interface KPI extends ComponentProps<'div'> {
  title: string;
  value: number;
  formatNotation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
}

export default function KPI({ className, title, value, formatNotation = 'standard' }: KPI) {
  return (
    <div className={cn('flex flex-col items-center justify-between gap-2 p-6 border rounded-xl bg-card text-card-foreground shadow', className)}>
      <h2 className="md:text-lg font-semibold text-card-foreground/50">{title}</h2>
      <span className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">{formatNumber(value, formatNotation, 0)}</span>
    </div>
  );
}
