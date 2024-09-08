import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { motion } from 'framer-motion';
import Leaderboard from '../composed/Leaderboard';
import { TEXT_REVEAL_ANIMATION_DURATION } from '@/lib/constants';
import { useState, useEffect, useRef, RefCallback } from 'react';
import { SlideProps } from '@/types';
import SineWave from '../animations/SineWave';
import DiagonalTransition from '../animations/DiagonalTransition';

export default function LeaderboardsSlide({ onAnimationComplete }: SlideProps) {
  const { weeklyLeaderboards } = useLeaderboardStore();

  // Animation vs content
  const [showContent, setShowContent] = useState(false);
  const diagonalTransitionDuration = 6;

  const [showTitle, setShowTitle] = useState(false);
  const [showLeaderboards, setShowLeaderboards] = useState(false);

  // Leaderboard controls
  const [currentWeek, setCurrentWeek] = useState(0);

  const leaderboardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setRef: RefCallback<HTMLDivElement> = (el) => {
    if (el) {
      leaderboardRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (leaderboardRefs.current[currentWeek]) {
      leaderboardRefs.current[currentWeek].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [currentWeek]);

  // Animation control
  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);

      // Stagger content
      setShowTitle(true);
      // setTimeout(() => setShowTitle(true), TEXT_REVEAL_ANIMATION_DURATION * 0);
      setTimeout(() => {
        setShowLeaderboards(true);
        onAnimationComplete();
      }, TEXT_REVEAL_ANIMATION_DURATION);
    }, diagonalTransitionDuration * 1000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-[100dvh] bg-slide-leaderboard-final overflow-hidden w-screen px-8"
    >
      {showContent ? (
        <div className="w-full flex flex-col gap-24 mx-auto">
          {showTitle ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full text-center">
              <div className="text-2xl">Now, shall we see how everyone else's weeks went?</div>
            </motion.div>
          ) : null}

          {showLeaderboards ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full flex flex-col gap-4">
              {/* Controls */}
              <div className="flex items-center justify-between w-full">
                <button
                  disabled={currentWeek === 0}
                  onClick={() => setCurrentWeek((prev) => Math.max(prev - 1, 0))}
                  className={`px-4 py-2 ${currentWeek === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  &lt;
                </button>
                <div>Week {currentWeek + 1}</div>
                <button
                  disabled={currentWeek === weeklyLeaderboards.length - 1}
                  onClick={() => setCurrentWeek((prev) => Math.min(prev + 1, weeklyLeaderboards.length - 1))}
                  className={`px-4 py-2 ${currentWeek === weeklyLeaderboards.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  &gt;
                </button>
              </div>

              {/* Leaderboards */}
              <div className="flex gap-4 overflow-x-auto xl:justify-center">
                {weeklyLeaderboards.map((leaderboard, i) => (
                  <motion.div
                    key={`${leaderboard.start_date}-${leaderboard.end_date}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: i * 0.75, duration: 0.5 } }}
                    ref={setRef}
                  >
                    <Leaderboard leaderboard={leaderboard} scrollable className="min-w-[320px]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[100dvh] bg-slide-leaderboard-final overflow-hidden w-screen px-8">
          <DiagonalTransition />
        </div>
      )}
    </motion.div>
  );
}
