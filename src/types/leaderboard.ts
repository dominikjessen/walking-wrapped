export type LeaderboardRow = {
  type: string | null;
  start_date: string | null;
  end_date: string | null;
  total_steps: number | null;
  rank: number | null;
  profiles: {
    id: string | null;
    username: string | null;
  } | null;
};

export type Leaderboard = Map<string, LeaderboardEntry>;

export type LeaderboardEntry = {
  start_date: string;
  end_date: string;
  ranking: RankingEntry[];
};

export type RankingEntry = {
  user_id: string;
  username: string;
  rank: number;
  total_steps: number;
};
