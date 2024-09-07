import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { motion } from 'framer-motion';
import Leaderboard from '../composed/Leaderboard';
import { TEXT_REVEAL_ANIMATION_DURATION } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { SlideProps } from '@/types';
import SineWave from '../animations/SineWave';

export default function LeaderboardsSlide({ onAnimationComplete }: SlideProps) {
  const { weeklyLeaderboards } = useLeaderboardStore();

  // Animation vs content
  const [showContent, setShowContent] = useState(false);
  const sineGrowthDuration = 3;

  const [showTitle, setShowTitle] = useState(false);
  const [showLeaderboards, setShowLeaderboards] = useState(false);

  // Animation control
  useEffect(() => {
    setTimeout(() => setShowContent(true), sineGrowthDuration * 1000 * 2);
    setTimeout(() => setShowTitle(true), TEXT_REVEAL_ANIMATION_DURATION * 2.25);
    setTimeout(() => {
      setShowLeaderboards(true);
      onAnimationComplete();
    }, TEXT_REVEAL_ANIMATION_DURATION * 3);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-[100dvh] bg-[#ffe1a8] overflow-hidden w-screen px-8"
    >
      {showContent ? (
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
      ) : (
        <>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: sineGrowthDuration,
              ease: 'easeInOut'
            }}
            className="overflow-hidden absolute inset-0"
          >
            <SineWave amplitude={40} frequency={0.2} growDuration={sineGrowthDuration} />
            <SineWave amplitude={62} frequency={0.2} growDuration={sineGrowthDuration} />
            <SineWave amplitude={88} frequency={0.2} growDuration={sineGrowthDuration} />
            <SineWave amplitude={73} frequency={0.2} growDuration={sineGrowthDuration} />
            <SineWave amplitude={40} frequency={0.2} growDuration={sineGrowthDuration} />
            <SineWave amplitude={62} frequency={0.2} growDuration={sineGrowthDuration} />
            <SineWave amplitude={88} frequency={0.2} growDuration={sineGrowthDuration} />
            <SineWave amplitude={73} frequency={0.2} growDuration={sineGrowthDuration} />
          </motion.div>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              delay: sineGrowthDuration, // Start after the first set finishes
              duration: sineGrowthDuration,
              ease: 'easeInOut'
            }}
            className="overflow-hidden absolute inset-0"
          >
            <SineWave amplitude={40} frequency={0.2} growDuration={sineGrowthDuration} color="#ffe1a8" />
            <SineWave amplitude={62} frequency={0.2} growDuration={sineGrowthDuration} color="#ffe1a8" />
            <SineWave amplitude={88} frequency={0.2} growDuration={sineGrowthDuration} color="#ffe1a8" />
            <SineWave amplitude={73} frequency={0.2} growDuration={sineGrowthDuration} color="#ffe1a8" />
            <SineWave amplitude={40} frequency={0.2} growDuration={sineGrowthDuration} color="#ffe1a8" />
            <SineWave amplitude={62} frequency={0.2} growDuration={sineGrowthDuration} color="#ffe1a8" />
            <SineWave amplitude={88} frequency={0.2} growDuration={sineGrowthDuration} color="#ffe1a8" />
            <SineWave amplitude={73} frequency={0.2} growDuration={sineGrowthDuration} color="#ffe1a8" />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
