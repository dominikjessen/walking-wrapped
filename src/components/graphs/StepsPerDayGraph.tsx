'use client';

import { useUserStepsStore } from '@/stores/userStepsStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb'
  }
} satisfies ChartConfig;

export default function StepsPerDayGraph() {
  const { steps } = useUserStepsStore();

  return (
    <ChartContainer config={chartConfig} className="min-h-[400px] w-1/2 p-12 bg-white rounded-xl">
      <LineChart accessibilityLayer data={steps}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <YAxis />
        <Line type="monotone" dataKey="steps" stroke="#8884d8" />
      </LineChart>
    </ChartContainer>
  );
}
