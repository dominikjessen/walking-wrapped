import { motion } from 'framer-motion';
import StepsPerDayGraph from '@/components/graphs/StepsPerDayGraph';
import { useUserStepsStore } from '@/stores/userStepsStore';
import { calculateDogStepPercentile, calculateHumanStepPercentile } from '@/lib/steps';
import { formatNumber } from '@/lib/utils';

export default function AverageStepsSlide() {
  const { steps } = useUserStepsStore();

  const totalSteps = steps.reduce((acc, entry) => acc + entry.steps, 0);
  const averageSteps = totalSteps / steps.length;

  const humanPercentile = calculateHumanStepPercentile(averageSteps);
  const dogPercentile = calculateDogStepPercentile(averageSteps);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-8 items-center justify-center bg-teal-100 h-screen overflow-hidden w-screen px-8"
    >
      <h2>You want the day-by-day for your steps? Coming right up.</h2>

      <StepsPerDayGraph />

      <div className="flex flex-col gap-4 pt-4">
        <h2>
          That's an average of <span className="font-bold">{formatNumber(averageSteps, 'standard', 0)}</span> every single day!
        </h2>
        <div className="flex gap-2 items-center">
          <div>
            Did you know this puts you in the <span className="font-bold">{humanPercentile}th</span> percentile of all humans...
          </div>
          <div className="text-4xl">🚶</div>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <div>
            ...but only the <span className="font-bold">{dogPercentile}th</span> percentile for dogs.
          </div>
          <div className="text-4xl">🐕</div>
        </div>
      </div>
    </motion.div>
  );
}
