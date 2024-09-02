import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { motion } from 'framer-motion';
import Leaderboard from '../composed/Leaderboard';

export default function LeaderboardsSlide() {
  const { weeklyLeaderboards } = useLeaderboardStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-orange-100 overflow-hidden w-screen px-8"
    >
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl">Now, shall we see how everyone else's weeks went?</h2>
        <p>Here's the week-by-week rankings:</p>
        <div className="flex gap-4 overflow-x-auto">
          {weeklyLeaderboards.map((leaderboard) => (
            <Leaderboard key={`${leaderboard.start_date}-${leaderboard.end_date}`} leaderboard={leaderboard} scrollable className="min-w-[320px]" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
