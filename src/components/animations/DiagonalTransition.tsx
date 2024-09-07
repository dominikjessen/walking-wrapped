import { motion } from 'framer-motion';
import React from 'react';
import RawTopBottomSlideContent from './RawTopBottomSlideContent';

interface DiagonalTransitionProps {}

const DiagonalTransition: React.FC<DiagonalTransitionProps> = () => {
  const sections = [
    { color: 'hsl(var(--slide-leaderboard-one))', clipPath: 'polygon(0% 100%, 100% 50%, 100% 100%, 0% 100%)' }, // Bottom green
    { color: 'hsl(var(--slide-leaderboard-two))', clipPath: 'polygon(0% 50.5%, 100% 0%, 100% 50.5%, 0% 100%)' }, // Middle yellow
    { color: 'hsl(var(--slide-leaderboard-three))', clipPath: 'polygon(0% 0%, 100% 0%, 100% 0.5%, 0% 50.5%)' }, // Top red
    { color: 'hsl(var(--slide-leaderboard-final))', clipPath: 'polygon(0% 0%, 100% 0%, 100% 0.5%, 0% 50.5%)' }, // Top purple
    { color: 'hsl(var(--slide-leaderboard-final))', clipPath: 'polygon(0% 50.5%, 100% 0%, 100% 50.5%, 0% 100%)' }, // Middle purple
    { color: 'hsl(var(--slide-leaderboard-final))', clipPath: 'polygon(0% 100%, 100% 50%, 100% 100%, 0% 100%)' } // Bottom purple
  ];

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: index * 1, ease: 'easeIn' }}
          className="absolute inset-0"
          style={{
            backgroundColor: section.color,
            clipPath: section.clipPath
          }}
        />
      ))}
      <RawTopBottomSlideContent />
    </div>
  );
};

export default DiagonalTransition;
