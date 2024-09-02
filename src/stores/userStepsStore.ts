import { StepsRow } from '@/types/database.types';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStepsState = {
  steps: StepsRow[];
  topDay: StepsRow | null;
  bottomDay: StepsRow | null;
  loading: boolean;
  error: string | null;
  fetchSteps: (user: User) => Promise<void>;
};

export const useUserStepsStore = create<UserStepsState>()(
  devtools(
    (set) => ({
      steps: [],
      topDay: null,
      bottomDay: null,
      loading: false,
      error: null,
      fetchSteps: async (user: User) => {
        set({ loading: true, error: null });
        try {
          const supabase = createClient();
          const { data: steps, error } = await supabase.from('steps').select('*').eq('user_id', user.id);

          if (error) {
            throw new Error(error.message);
          }

          if (steps) {
            const sortedSteps = steps.toSorted((a, b) => b.steps - a.steps);

            const topDay = sortedSteps[0];
            const bottomDay = sortedSteps[steps.length - 1];

            set({ steps, topDay, bottomDay });
          }
        } catch (err) {
          set({ error: 'Something went wrong when fetching your steps...' });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { store: 'UserStepsStore' }
  )
);
