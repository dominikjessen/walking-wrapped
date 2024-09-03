'use client';

import {
  COUNT_ANIMATION_DURATION,
  SECONDS_PER_TEETH_BRUSHING,
  SECONDS_TO_BOIL_LITER_OF_WATER,
  STEPS_PER_KM,
  STEPS_PER_SECOND,
  TEXT_REVEAL_ANIMATION_DURATION
} from '@/lib/constants';
import { formatNumber, formatSecondsToHoursMinSecs } from '@/lib/utils';
import { useUserStepsStore } from '@/stores/userStepsStore';
import { animate, easeIn, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import FunFactCard from '../composed/FunFactCard';

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
      setTimeout(() => setShowKm(true), COUNT_ANIMATION_DURATION + TEXT_REVEAL_ANIMATION_DURATION * 1.5);
      setTimeout(() => setShowTime(true), COUNT_ANIMATION_DURATION + TEXT_REVEAL_ANIMATION_DURATION * 2.5);
      setTimeout(() => setShowFunFacts(true), COUNT_ANIMATION_DURATION + TEXT_REVEAL_ANIMATION_DURATION * 3.5);
    });

    return controls.stop;
  }, [count, totalSteps]);

  // constant values
  const secondsStepped = totalSteps * STEPS_PER_SECOND;
  const totalKm = formatNumber(totalSteps / STEPS_PER_KM, 'standard', 2);
  const timeSpent = formatSecondsToHoursMinSecs(secondsStepped);

  // Fun facts
  const funFacts: FunFact[] = [
    {
      topText: 'spent',
      figureText: timeSpent.split(' ')[0],
      bottomText: 'petting 🐈s'
    },
    {
      topText: 'boiled',
      figureText: `${formatNumber(secondsStepped / SECONDS_TO_BOIL_LITER_OF_WATER, 'standard', 0)}l`,
      bottomText: 'of water'
    },
    {
      topText: 'brushed your teeth',
      figureText: formatNumber(secondsStepped / SECONDS_PER_TEETH_BRUSHING, 'standard', 0),
      bottomText: 'times'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-pink-100 overflow-hidden w-screen px-8"
    >
      <div className="flex flex-col gap-12 items-center">
        <div className="flex flex-col gap-4 items-center">
          <p className="">In total you did</p>
          <motion.span className="font-bold text-6xl">{formatted}</motion.span>
          <p>steps this month!</p>
        </div>

        {showKm ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col gap-2 items-center">
            <div>Which means you walked</div>
            <div className="text-4xl font-bol">~{totalKm} km</div>
          </motion.div>
        ) : null}

        {showTime ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col gap-2 items-center">
            <div>And it probably took you about</div>
            <div className="text-4xl font-bol">{timeSpent}</div>
          </motion.div>
        ) : null}
      </div>

      {showFunFacts ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col gap-4 w-full mt-12">
          <div>In that time you could've also...</div>
          <div className="flex gap-4 w-full overflow-x-auto">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: index * 0.75, duration: 0.5 } }}
                className="min-w-52 min-h-52"
              >
                <FunFactCard fact={fact} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
