import { useUserStepsStore } from '@/stores/userStepsStore';
import { motion } from 'framer-motion';

export default function AverageStepsSlide() {
  const { steps } = useUserStepsStore();

  const totalSteps = steps.reduce((sum, step) => sum + step.steps, 0);
  const averageSteps = steps.length ? totalSteps / steps.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500"
    >
      <h1 className="text-4xl font-bold text-white">Slide 2 - Average steps</h1>
      <p className="text-lg text-white mt-4">On average you took {averageSteps} steps this month per day.</p>
    </motion.div>
  );
}
