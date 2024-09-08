import { cn } from '@/lib/utils';
import { FunFact } from '@/types';
import { ComponentProps } from 'react';

export interface FunFactCardProps extends ComponentProps<'div'> {
  fact: FunFact;
}

export default function FunFactCard({ className, fact }: FunFactCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-2 py-2 lg:py-6 px-1 lg:px-4 border rounded-xl bg-card shadow text-card-foreground text-center',
        className
      )}
    >
      <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl">{fact.topText}</div>
      <div className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl">{fact.figureText}</div>
      <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl">{fact.bottomText}</div>
    </div>
  );
}
