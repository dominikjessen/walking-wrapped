import { fetchAllWalkingBuddiesStats, getTopWalkingBuddies, getBottomWalkingBuddies } from '@/lib/walking-buddies';
import { TopBottomBuddyEntry } from '@/types/walking-buddies';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type WalkingBuddyState = {
  topBuddies: TopBottomBuddyEntry | null;
  bottomBuddies: TopBottomBuddyEntry | null;
  loading: boolean;
  error: string | null;
  fetchWalkingBuddies: (user: User) => Promise<void>;
};

export const useWalkingBuddiesStore = create<WalkingBuddyState>()(
  devtools(
    (set) => ({
      topBuddies: null,
      bottomBuddies: null,
      loading: false,
      error: null,
      fetchWalkingBuddies: async (user: User) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await fetchAllWalkingBuddiesStats(user);

          if (error) {
            throw new Error(error.message);
          }

          if (data) {
            const topBuddies = getTopWalkingBuddies(data);
            const bottomBuddies = getBottomWalkingBuddies(data);

            set({ topBuddies, bottomBuddies });
          }
        } catch (err) {
          set({ error: 'Something went wrong when fetching your walking buddies...' });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { store: 'WalkingBuddiesStore' }
  )
);
