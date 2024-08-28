'use client';

import { COUNT_ANIMATION_DURATION, STEPS_PER_KM, STEPS_PER_SECOND } from '@/lib/constants';
import { formatNumber, formatSecondsToHoursMinSecs } from '@/lib/utils';
import { useUserStepsStore } from '@/stores/userStepsStore';
import { animate, easeIn, motion, stagger, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function TotalStepsSlide() {
  // Data from store
  const { steps } = useUserStepsStore();
  const totalSteps = steps.reduce((sum, step) => sum + step.steps, 0);

  // Hide parts
  const [showKm, setShowKm] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showFunFacts, setShowFunFacts] = useState(false);

  // Count animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const formatted = useTransform(rounded, (latest) => formatNumber(latest, 'standard', 0));

  useEffect(() => {
    const controls = animate(count, totalSteps, {
      duration: COUNT_ANIMATION_DURATION,
      ease: easeIn
    });

    controls.then(() => {
      setTimeout(() => setShowKm(true), COUNT_ANIMATION_DURATION + 4000);
      setTimeout(() => setShowTime(true), COUNT_ANIMATION_DURATION + 6000);
      setTimeout(() => setShowFunFacts(true), COUNT_ANIMATION_DURATION + 8000);
    });

    return controls.stop;
  }, [count, totalSteps]);

  // KM
  const totalKm = formatNumber(totalSteps / STEPS_PER_KM, 'standard', 2);
  const timeSpent = formatSecondsToHoursMinSecs(totalSteps * STEPS_PER_SECOND);

  // Fun facts
  const funFacts = ['Spent 134 hours petting cats', 'Brushed your teeth 134 times', 'Boiled 144l of water'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500"
    >
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-lg text-white">In total you did</p>
          <motion.span className="font-bold text-4xl">{formatted}</motion.span>
          <p className="text-lg text-white">steps this month!</p>
        </div>

        {showKm ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-lg text-white">
              Which means you walked <span>~{totalKm} km</span>
            </div>
          </motion.div>
        ) : null}

        {showTime ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-lg text-white">
              And it probably took you about <span>{timeSpent}</span>
            </div>
          </motion.div>
        ) : null}

        {showFunFacts ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
            <div className="text-lg text-white">In that time you could've also...</div>
            <div className="flex flex-col gap-2">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: index * 0.2 } }}
                  className="text-lg text-white"
                >
                  {fact}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
