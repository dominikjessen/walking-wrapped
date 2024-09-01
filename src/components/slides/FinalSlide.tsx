import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { motion } from 'framer-motion';
import Leaderboard from '../composed/Leaderboard';
import StepsPerDayGraph from '../graphs/StepsPerDayGraph';
import { useUserStepsStore } from '@/stores/userStepsStore';
import KPI from '@/components/composed/KPI';

export default function LeaderboardsSlide() {
  const { steps } = useUserStepsStore();
  const { monthlyLeaderboard } = useLeaderboardStore();

  const totalSteps = steps.reduce((acc, steps) => acc + steps.steps, 0);
  const averageSteps = steps.length ? totalSteps / steps.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 overflow-hidden w-screen px-4"
    >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-white">Your steps in August</h1>
        <div className="flex gap-4 justify-between">
          <KPI title="Total" value={totalSteps} formatNotation="compact" />
          <KPI title="Avg" value={averageSteps} />
        </div>
        <StepsPerDayGraph />
        <div className="flex items-center justify-between">
          <div></div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">Final Leaderboard</h2>
            <Leaderboard key={`${monthlyLeaderboard?.start_date}-${monthlyLeaderboard?.end_date}`} leaderboard={monthlyLeaderboard!} scrollable />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
