import { ProfilesRow } from '@/types/database.types';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserProfileState = {
  profile: ProfilesRow | null;
  loading: boolean;
  error: string | null;
  fetchUserProfile: (user: User) => Promise<void>;
};

export const useUserProfileStore = create<UserProfileState>()(
  devtools(
    (set) => ({
      profile: null,
      loading: false,
      error: null,
      fetchUserProfile: async (user: User) => {
        set({ loading: true, error: null });
        try {
          const supabase = createClient();
          const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).limit(1).single();

          if (error) {
            throw new Error(error.message);
          }

          if (profile) {
            set({ profile });
          }
        } catch (err) {
          set({ error: 'Something went wrong when fetching your profile...' });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { store: 'UserProfileStore' }
  )
);
