'use client';

import { useUserStepsStore } from '@/stores/userStepsStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { formatDate, formatNumber } from '@/lib/utils';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb'
  }
} satisfies ChartConfig;

export default function StepsPerDayGraph() {
  const { steps } = useUserStepsStore();

  return (
    <ChartContainer config={chartConfig} className={`min-h-[320px] w-full px-1 py-4 bg-white rounded-xl`}>
      <LineChart accessibilityLayer data={steps}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <YAxis tickFormatter={(value) => formatNumber(value, 'compact', 0)} />
        <Line type="monotone" dataKey="steps" stroke="#8884d8" />
      </LineChart>
    </ChartContainer>
  );
}
