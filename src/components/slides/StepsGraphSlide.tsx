import { motion } from 'framer-motion';
import StepsPerDayGraph from '@/components/graphs/StepsPerDayGraph';

export default function AverageStepsSlide() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500"
    >
      <h1 className="text-4xl font-bold text-white">Slide 3 - Graph steps</h1>
      <p className="text-lg text-white mt-4">This is what you have been up to:</p>
      <StepsPerDayGraph />
    </motion.div>
  );
}
