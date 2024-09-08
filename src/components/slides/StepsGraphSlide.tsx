import { motion } from 'framer-motion';
import StepsPerDayGraph from '@/components/graphs/StepsPerDayGraph';
import { useUserStepsStore } from '@/stores/userStepsStore';
import { calculateDogStepPercentile, calculateHumanStepPercentile } from '@/lib/steps';
import { formatNumber } from '@/lib/utils';
import { TEXT_REVEAL_ANIMATION_DURATION } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { SlideProps } from '@/types';
import SineWave from '../animations/SineWave';

export default function AverageStepsSlide({ onAnimationComplete }: SlideProps) {
  const { steps } = useUserStepsStore();

  const totalSteps = steps.reduce((acc, entry) => acc + entry.steps, 0);
  const averageSteps = totalSteps / steps.length;

  const humanPercentile = calculateHumanStepPercentile(averageSteps);
  const dogPercentile = calculateDogStepPercentile(averageSteps);

  // Animation vs content
  const [showContent, setShowContent] = useState(false);
  const sineGrowthDuration = 3;

  // Staggered content reveal
  const [showTitle, setShowTitle] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showAverage, setShowAverage] = useState(false);
  const [showHuman, setShowHuman] = useState(false);
  const [showDog, setShowDog] = useState(false);

  // Animation control
  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);

      // Stagger rest of content
      setTimeout(() => setShowTitle(true), TEXT_REVEAL_ANIMATION_DURATION * 0);
      setTimeout(() => setShowGraph(true), TEXT_REVEAL_ANIMATION_DURATION * 0.75);
      setTimeout(() => setShowAverage(true), TEXT_REVEAL_ANIMATION_DURATION * 2);
      setTimeout(() => setShowHuman(true), TEXT_REVEAL_ANIMATION_DURATION * 3);
      setTimeout(() => {
        setShowDog(true);
        onAnimationComplete();
      }, TEXT_REVEAL_ANIMATION_DURATION * 3.75);
    }, sineGrowthDuration * 1000 * 2);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-4 lg:gap-8 items-center justify-center bg-teal-100 h-[100dvh] overflow-hidden w-screen px-8"
    >
      {showContent ? (
        <>
          {showTitle ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
              <div className="text-center">You want the day-by-day of your steps? Coming right up.</div>
            </motion.div>
          ) : null}

          {showGraph ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="px-12">
              <StepsPerDayGraph className="w-4/5 mx-auto lg:w-full" />
            </motion.div>
          ) : null}

          <div className="flex flex-col gap-2 lg:gap-4">
            {showAverage ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
                <div className="text-center mb-2 lg:mb-4">
                  That's an average of <span className="font-bold">{formatNumber(averageSteps, 'standard', 0)}</span> every single day!
                </div>
              </motion.div>
            ) : null}

            {showHuman ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
                <div className="flex gap-2 items-center justify-between text-lg">
                  <div>
                    Did you know this puts you in the <span className="font-bold">{humanPercentile}th</span> percentile of all humans...
                  </div>
                  <div className="text-4xl">🚶</div>
                </div>
              </motion.div>
            ) : null}

            {showDog ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
                <div className="flex gap-2 items-center justify-between text-lg">
                  <div>
                    ...but only the <span className="font-bold">{dogPercentile}th</span> percentile for dogs.
                  </div>
                  <div className="text-4xl">🐕</div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </>
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
