import { ComponentProps } from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';
import { cn, formatDate, formatNumber } from '@/lib/utils';
import { useUserProfileStore } from '@/stores/userProfileStore';

interface LeaderboardProps extends ComponentProps<'div'> {
  leaderboard: LeaderboardEntry;
  scrollable?: boolean;
}

export default function Leaderboard({ leaderboard, scrollable = false, className }: LeaderboardProps) {
  const { profile } = useUserProfileStore();

  return (
    <div className={cn('flex flex-col gap-4 p-4 border rounded bg-pink-100', className)}>
      <div className="flex gap-2 items-center justify-center">
        <div>{formatDate(leaderboard.start_date)}</div>
        <div>-</div>
        <div>{formatDate(leaderboard.end_date)}</div>
      </div>
      <ul className={`max-h-28 ${scrollable ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
        {leaderboard.ranking.map((entry) => (
          <li key={entry.user_id} className={cn('grid grid-cols-3 py-2 items-center', entry.user_id === profile?.id && 'bg-green-200')}>
            <span className="text-2xl font-bold">{entry.rank}</span>
            <span className="font-bold">{entry.username}</span>
            <span className="ml-auto">{formatNumber(entry.total_steps, 'standard', 0)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
