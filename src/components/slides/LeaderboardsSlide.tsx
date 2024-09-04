import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { motion } from 'framer-motion';
import Leaderboard from '../composed/Leaderboard';
import { TEXT_REVEAL_ANIMATION_DURATION } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { SlideProps } from '@/types';

export default function LeaderboardsSlide({ onAnimationComplete }: SlideProps) {
  const { weeklyLeaderboards } = useLeaderboardStore();

  // Animation vs content
  // TODO: Add animation
  const [showContent, setShowContent] = useState(true);

  const [showTitle, setShowTitle] = useState(false);
  const [showLeaderboards, setShowLeaderboards] = useState(false);

  // Animation control
  useEffect(() => {
    // setTimeout(() => setShowContent(true), TEXT_REVEAL_ANIMATION_DURATION * 3);
    setTimeout(() => setShowTitle(true), TEXT_REVEAL_ANIMATION_DURATION * 0);
    setTimeout(() => {
      setShowLeaderboards(true);
      onAnimationComplete();
    }, TEXT_REVEAL_ANIMATION_DURATION * 1);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-[100dvh] bg-orange-100 overflow-hidden w-screen px-8"
    >
      <div className="w-full flex flex-col gap-24 mx-auto">
        {showTitle ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full text-center">
            <div className="text-2xl">Now, shall we see how everyone else's weeks went?</div>
          </motion.div>
        ) : null}

        {showLeaderboards ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
            <div className="flex gap-4 overflow-x-auto xl:justify-center">
              {weeklyLeaderboards.map((leaderboard, i) => (
                <motion.div
                  key={`${leaderboard.start_date}-${leaderboard.end_date}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: i * 0.75, duration: 0.5 } }}
                >
                  <Leaderboard leaderboard={leaderboard} scrollable className="min-w-[320px]" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
