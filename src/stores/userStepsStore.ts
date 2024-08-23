import { StepsRow } from '@/types/database.types';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStepsState = {
  steps: StepsRow[];
  otherSteps: Map<string, StepsRow[]>;
  loading: boolean;
  error: string | null;
  fetchSteps: (user: User) => Promise<void>;
  fetchAllSteps: () => Promise<void>;
};

export const useUserStepsStore = create<UserStepsState>()(
  devtools(
    (set) => ({
      steps: [],
      otherSteps: new Map(),
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
            set({ steps });
          }
        } catch (err) {
          set({ error: 'Something went wrong when fetching your steps...' });
        } finally {
          set({ loading: false });
        }
      },
      fetchAllSteps: async () => {
        set({ loading: true, error: null });
        try {
          const supabase = createClient();
          const { data: steps, error } = await supabase.from('steps').select('*');

          if (error) {
            throw new Error(error.message);
          }

          if (steps) {
            const otherSteps = steps.reduce<Map<string, StepsRow[]>>((acc, item) => {
              const { user_id } = item;

              if (!acc.has(user_id)) {
                acc.set(user_id, []);
              }

              acc.get(user_id)!.push(item);

              return acc;
            }, new Map<string, StepsRow[]>());

            set({ otherSteps });
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
