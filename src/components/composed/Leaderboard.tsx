import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ComponentProps } from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';
import { formatDate } from '@/lib/utils';

interface LeaderboardProps extends ComponentProps<'div'> {
  leaderboard: LeaderboardEntry;
  scrollable?: boolean;
}

export default function Leaderboard({ leaderboard, scrollable = false }: LeaderboardProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded bg-pink-100 min-w-[400px]">
      <div className="flex gap-2 items-center justify-center">
        <div>{formatDate(leaderboard.start_date)}</div>
        <div>-</div>
        <div>{formatDate(leaderboard.end_date)}</div>
      </div>
      <ul className={`max-h-28 ${scrollable ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
        {leaderboard.ranking.map((entry) => (
          <li className="grid grid-cols-3 py-2 items-center">
            <span className="text-2xl font-bold">{entry.rank}</span>
            <span className="font-bold">{entry.username}</span>
            <span className="text-sm ml-auto">{entry.total_steps}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
