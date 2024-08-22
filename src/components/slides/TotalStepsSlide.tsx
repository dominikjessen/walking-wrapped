import { useUserStepsStore } from '@/stores/userStepsStore';
import { motion } from 'framer-motion';

export default function TotalStepsSlide() {
  const { steps } = useUserStepsStore();

  const totalSteps = steps.reduce((sum, step) => sum + step.steps, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500"
    >
      <h1 className="text-4xl font-bold text-white">Slide 1 - Total steps</h1>
      <p className="text-lg text-white mt-4">In total you took {totalSteps} steps this month.</p>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Your steps</h2>
          <ul>
            {steps?.map((step) => (
              <li key={step.id}>{step.steps}</li>
            ))}
          </ul>
        </main>
      </div>
    </motion.div>
  );
}
