import { motion } from 'framer-motion';
import React from 'react';

interface FlowerProps {
  size?: number;
  delay?: number;
  petalColor?: string;
  centerColor?: string;
  petalCount?: number;
  top?: string;
  left?: string;
  onBloomComplete?: () => void;
}

export default function Flower({
  size = 50,
  delay = 0,
  petalColor = '#a2a2ff',
  centerColor = '#ffa2a2',
  petalCount = 5,
  top = '0%',
  left = '0%',
  onBloomComplete
}: FlowerProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 2, delay }}
      className="absolute flex items-center justify-center size-full"
      style={{ width: size, height: size, top, left }}
      onAnimationComplete={onBloomComplete}
    >
      {/* Petals */}
      {[...Array(petalCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: petalColor,
            width: size / 2,
            height: size / 2,
            transformOrigin: 'bottom center',
            rotate: `${(360 / petalCount) * i}deg`
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: delay + 0.5 }}
        />
      ))}
      {/* Center of the flower */}
      <div className="absolute rounded-full top-[55%]" style={{ width: size / 3, height: size / 3, backgroundColor: centerColor }} />
    </motion.div>
  );
}
