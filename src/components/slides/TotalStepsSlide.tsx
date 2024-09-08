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
import { FunFact, SlideProps } from '@/types';
import { Footsteps } from '../animations/Footsteps';

export default function TotalStepsSlide({ onAnimationComplete }: SlideProps) {
  const [showContent, setShowContent] = useState(false);

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

  const numberOfFootsteps = 8;
  const footStepAnimationDuration = 0.5;
  const footStepDirectionChangeDelayConstant = 1;

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);

      const controls = animate(count, totalSteps, {
        duration: COUNT_ANIMATION_DURATION,
        ease: easeIn
      });

      controls.then(() => {
        setTimeout(() => setShowKm(true), COUNT_ANIMATION_DURATION + TEXT_REVEAL_ANIMATION_DURATION * 1.5);
        setTimeout(() => setShowTime(true), COUNT_ANIMATION_DURATION + TEXT_REVEAL_ANIMATION_DURATION * 2.5);
        setTimeout(() => {
          setShowFunFacts(true);
          onAnimationComplete();
        }, COUNT_ANIMATION_DURATION + TEXT_REVEAL_ANIMATION_DURATION * 3.5);
      });

      return controls.stop;
    }, footStepDirectionChangeDelayConstant * 1000 + 1000 + numberOfFootsteps * footStepAnimationDuration * 1000 * 2);
  }, [count, totalSteps]);

  // constant values
  const secondsStepped = totalSteps * STEPS_PER_SECOND;
  const hoursStepped = (secondsStepped / 3600).toFixed();
  const totalKm = formatNumber(totalSteps / STEPS_PER_KM, 'standard', 2);
  const timeSpent = formatSecondsToHoursMinSecs(secondsStepped);

  // Fun facts
  const funFacts: FunFact[] = [
    {
      topText: 'spent',
      figureText: `${hoursStepped}h`,
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
      className="flex flex-col items-center justify-center h-[100dvh] bg-slide-total overflow-hidden w-screen px-8"
    >
      {showContent ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="flex flex-col gap-6 lg:gap-12 items-center">
            <div className="flex flex-col gap-2 lg:gap-4 items-center">
              <p className="">In total you did</p>
              <motion.span className="font-bold text-6xl">{formatted}</motion.span>
              <p>steps this month!</p>
            </div>

            {showKm ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col gap-2 items-center">
                <div>Which means you walked</div>
                <div className="text-4xl font-bold">~{totalKm} km</div>
              </motion.div>
            ) : null}

            {showTime ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col gap-2 items-center">
                <div>And it probably took you about</div>
                <div className="text-4xl font-bold">{timeSpent}</div>
              </motion.div>
            ) : null}
          </div>

          {showFunFacts ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-4 w-full mt-8 lg:mt-12 text-center"
            >
              <div>In that time you could've also...</div>
              <div className="flex gap-2 lg:gap-4 w-full overflow-x-auto xl:justify-center items-stretch">
                {funFacts.map((fact, index) => (
                  <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: index * 0.75, duration: 0.5 } }}>
                    <FunFactCard fact={fact} className="min-w-28 md:min-w-44 lg:min-w-52 min-h-36 md:min-h-44 lg:min-h-52" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
          <Footsteps numberOfFootsteps={numberOfFootsteps} footstepAnimationDuration={footStepAnimationDuration} direction="right" startDelay={0} />
          <Footsteps
            numberOfFootsteps={numberOfFootsteps}
            footstepAnimationDuration={footStepAnimationDuration}
            direction="left"
            startDelay={footStepDirectionChangeDelayConstant + footStepAnimationDuration * numberOfFootsteps}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
