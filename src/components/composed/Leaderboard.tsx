import { ComponentProps } from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';
import { cn, formatDate, formatNumber } from '@/lib/utils';
import { useUserProfileStore } from '@/stores/userProfileStore';

interface LeaderboardProps extends ComponentProps<'div'> {
  leaderboard: LeaderboardEntry;
  scrollable?: boolean;
  fullSize?: boolean;
}

export default function Leaderboard({ leaderboard, scrollable = false, fullSize = false, className }: LeaderboardProps) {
  const { profile } = useUserProfileStore();

  return (
    <div className={cn('flex flex-col gap-2 lg:gap-4 p-2 md:p-4 border rounded-xl bg-white', className)}>
      <div className="flex gap-2 items-center justify-center font-bold text-xl lg:text-2xl text-card-foreground/80">
        <div>{formatDate(leaderboard.start_date)}</div>
        <div>-</div>
        <div>{formatDate(leaderboard.end_date)}</div>
      </div>
      <ul
        className={cn('max-h-40 md:max-h-56 lg:max-h-64 xl:max-h-80', scrollable ? 'overflow-y-auto' : 'overflow-y-hidden', fullSize && 'max-h-none')}
      >
        {leaderboard.ranking.map((entry) => (
          <li
            key={entry.user_id}
            className={cn('grid grid-cols-3 py-1 md:py-2 items-center px-2 rounded-xl', entry.user_id === profile?.id && 'bg-fuchsia-50')}
          >
            <span className="text-2xl font-bold">{entry.rank}</span>
            <span className="font-bold">{entry.username}</span>
            <span className="ml-auto">{formatNumber(entry.total_steps, 'standard', 0)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
