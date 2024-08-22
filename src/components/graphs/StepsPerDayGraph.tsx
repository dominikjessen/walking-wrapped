import { useUserStepsStore } from '@/stores/userStepsStore';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function StepsPerDayGraph() {
  const { steps } = useUserStepsStore();

  return (
    <LineChart width={600} height={300} data={steps} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="steps" stroke="#8884d8" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
