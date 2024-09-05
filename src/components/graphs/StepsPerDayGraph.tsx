'use client';

import { useUserStepsStore } from '@/stores/userStepsStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn, formatDate, formatNumber } from '@/lib/utils';
import { ComponentProps } from 'react';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#588157'
  }
} satisfies ChartConfig;

export default function StepsPerDayGraph({ className }: ComponentProps<'div'>) {
  const { steps } = useUserStepsStore();

  return (
    <ChartContainer config={chartConfig} className={cn('min-h-[256px] w-full pr-2 py-2 lg:py-4 bg-white rounded-xl', className)}>
      <LineChart accessibilityLayer data={steps}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickMargin={4} tickFormatter={(value) => formatDate(value)} />
        <ChartTooltip content={<ChartTooltipContent labelFormatter={(label) => formatDate(label)} />} />
        <YAxis width={32} tickFormatter={(value) => formatNumber(value, 'compact', 0)} axisLine={false} tickLine={false} tickMargin={4} />
        <Line type="monotone" dataKey="steps" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}
