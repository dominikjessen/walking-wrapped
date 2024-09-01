import { Leaderboard, LeaderboardRow } from '@/types/leaderboard';
import { createClient } from '@/utils/supabase/client';

export async function fetchAllWeeklyLeaderboards() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('leaderboards')
    .select('type, start_date, end_date, total_steps, rank, profiles(username, id)')
    .eq('type', 'weekly')
    .order('start_date', { ascending: true })
    .order('rank', { ascending: true });

  if (error) {
    console.error('Error fetching leaderboards:', error);
    return { error };
  }

  return { data };
}

export async function fetchMonthlyLeaderboard() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('leaderboards')
    .select('type, start_date, end_date, total_steps, rank, profiles(username, id)')
    .eq('type', 'monthly')
    .order('rank', { ascending: true });

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return { error };
  }

  return { data };
}

export function prepareLeaderboards(rows: LeaderboardRow[]) {
  const groupedLeaderboards: Leaderboard = new Map();

  rows.forEach((entry) => {
    const weekKey = `${entry.start_date}-${entry.end_date}`;

    if (!groupedLeaderboards.has(weekKey)) {
      groupedLeaderboards.set(weekKey, {
        start_date: entry.start_date as string,
        end_date: entry.end_date as string,
        ranking: []
      });
    }

    const weekEntry = groupedLeaderboards.get(weekKey);

    if (weekEntry) {
      weekEntry.ranking.push({
        user_id: entry.profiles?.id ?? '',
        rank: entry.rank as number,
        username: entry.profiles?.username ?? '',
        total_steps: entry.total_steps as number
      });
    }
  });

  return groupedLeaderboards;
}
