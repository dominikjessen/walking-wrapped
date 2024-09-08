'use client';

import { motion } from 'framer-motion';
import { SlideProps } from '@/types';
import { useEffect, useState } from 'react';
import BloomingFlowers from '../animations/BloomingFlowers';

export default function TestSlide({ onAnimationComplete }: SlideProps) {
  // Animation control
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    onAnimationComplete();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-4 lg:gap-8 items-center justify-center bg-slide-total h-[100dvh] overflow-hidden w-screen px-8"
    >
      {!showContent ? (
        <div />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold text-center">
          Your content here
        </motion.div>
      )}
    </motion.div>
  );
}
