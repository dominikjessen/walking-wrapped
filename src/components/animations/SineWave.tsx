'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SineWave = ({ amplitude = 20, frequency = 0.05, phase = 0, color = '#9bf6ff', growDuration = 8 }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pathData = Array.from({ length: width }, (_, x) => {
    const y = amplitude * Math.sin(frequency * x + phase);
    return `${x * (width / 100)},${50 + y}`;

    //    return `${x},${50 + y}`;
  }).join(' ');

  return (
    <motion.svg style={{ overflow: 'visible' }} width={width} height="100px" viewBox={`0 0 ${width} 100`}>
      <motion.path
        d={`M ${pathData}`}
        fill="transparent"
        stroke={color}
        strokeWidth="6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: growDuration, yoyo: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.5, yoyo: Infinity, ease: 'easeInOut' }
        }}
      />
    </motion.svg>
  );
};

export default SineWave;
