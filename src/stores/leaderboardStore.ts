import { fetchAllWeeklyLeaderboards, fetchMonthlyLeaderboard, prepareLeaderboards } from '@/lib/leaderboard';
import { LeaderboardEntry, LeaderboardRow } from '@/types/leaderboard';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type LeaderboardState = {
  weeklyLeaderboards: LeaderboardEntry[];
  monthlyLeaderboard: LeaderboardEntry | null;
  loading: boolean;
  error: string | null;
  fetchWeeklyLeaderboards: () => Promise<void>;
  fetchMonthlyLeaderboard: () => Promise<void>;
};

export const useLeaderboardStore = create<LeaderboardState>()(
  devtools(
    (set) => ({
      weeklyLeaderboards: [],
      monthlyLeaderboard: null,
      loading: false,
      error: null,
      fetchWeeklyLeaderboards: async () => {
        set({ loading: true, error: null });
        try {
          const { data: weeklyLeaderboards, error } = await fetchAllWeeklyLeaderboards();

          if (error) {
            throw new Error(error.message);
          }

          const groupedLeaderboards = Array.from(prepareLeaderboards(weeklyLeaderboards as LeaderboardRow[]).values());

          if (groupedLeaderboards) {
            set({ weeklyLeaderboards: groupedLeaderboards });
          }
        } catch (err) {
          set({ error: 'Something went wrong when fetching the weekly leaderboard...' });
        } finally {
          set({ loading: false });
        }
      },
      fetchMonthlyLeaderboard: async () => {
        set({ loading: true, error: null });
        try {
          const { data: monthlyLeaderboard, error } = await fetchMonthlyLeaderboard();

          if (error) {
            throw new Error(error.message);
          }

          const groupedLeaderboards = Array.from(prepareLeaderboards(monthlyLeaderboard as LeaderboardRow[]).values());

          if (groupedLeaderboards[0]) {
            set({ monthlyLeaderboard: groupedLeaderboards[0] });
          }
        } catch (err) {
          set({ error: 'Something went wrong when fetching the weekly leaderboard...' });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { store: 'LeaderboardStore' }
  )
);
