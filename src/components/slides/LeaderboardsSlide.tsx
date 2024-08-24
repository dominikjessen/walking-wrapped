import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Leaderboard from '../composed/Leaderboard';

export default function LeaderboardsSlide() {
  const { weeklyLeaderboards, monthlyLeaderboard, fetchWeeklyLeaderboards, fetchMonthlyLeaderboard } = useLeaderboardStore();

  useEffect(() => {
    fetchWeeklyLeaderboards();
    fetchMonthlyLeaderboard();
  }, [fetchWeeklyLeaderboards, fetchMonthlyLeaderboard]);

  console.log('weekly', weeklyLeaderboards);
  console.log('monthly', monthlyLeaderboard);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 overflow-hidden w-screen"
    >
      <div className="w-4/5 mx-auto flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-white">Slide 4 - Leaderboards</h1>
        <h2>Weekly Leaderboards</h2>
        <div className="flex gap-4 overflow-x-auto">
          {weeklyLeaderboards.map((leaderboard) => (
            <Leaderboard key={`1-${leaderboard.start_date}-${leaderboard.end_date}`} leaderboard={leaderboard} />
          ))}

          {weeklyLeaderboards.map((leaderboard) => (
            <Leaderboard key={`2-${leaderboard.start_date}-${leaderboard.end_date}`} leaderboard={leaderboard} />
          ))}

          {weeklyLeaderboards.map((leaderboard) => (
            <Leaderboard key={`3-${leaderboard.start_date}-${leaderboard.end_date}`} leaderboard={leaderboard} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
