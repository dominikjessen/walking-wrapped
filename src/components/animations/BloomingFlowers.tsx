import { useEffect, useRef, useState } from 'react';
import Flower from './Flower';
import { generatePoissonDiskPositions } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BloomingFlowersProps {
  onAllFlowersBloomed: () => void;
}

export default function BloomingFlowers({ onAllFlowersBloomed }: BloomingFlowersProps) {
  const [width, setWidth] = useState(window.innerWidth);

  // Boundaries for flowers
  const maxSize = width / 6;
  const minSize = 30;
  const maxPetals = 7;
  const minPetals = 3;
  const flowerCount = 12;

  // Four fixed size flowers, rest random
  const sizes = [maxSize, minSize, (maxSize + minSize) / 2, (maxSize + minSize) / 2];
  const petalCounts = [5, 4, 3, 6];

  for (let i = sizes.length; i < flowerCount; i++) {
    sizes.push(Math.floor(Math.random() * (maxSize - minSize + 1) + minSize));
    petalCounts.push(Math.floor(Math.random() * (maxPetals - minPetals + 1) + minPetals + 1));
  }

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scatter flowers
  const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    const positions = generatePoissonDiskPositions(80, 80, flowerCount, 25, 200);
    setPositions(positions);
  }, [flowerCount]);

  const bloomCountRef = useRef(0);

  const handleFlowerBloomEnd = () => {
    bloomCountRef.current += 1;
    if (bloomCountRef.current === flowerCount) {
      setTimeout(onAllFlowersBloomed, 2000);
    }
  };

  const flowerColors = [
    { petalColor: '#FFD700', centerColor: '#8B4513' }, // Sunflower
    { petalColor: '#9370DB', centerColor: '#E6E6FA' }, // Lavender Fields
    { petalColor: '#FF8C00', centerColor: '#FAFAD2' }, // Tangerine Twist
    { petalColor: '#FF1493', centerColor: '#FFE4E1' }, // Rose Garden
    { petalColor: '#FF6347', centerColor: '#FFB6C1' }, // Tropical Blossom
    { petalColor: '#4169E1', centerColor: '#FAEBD7' }, // Bluebell Dream
    { petalColor: '#FF4500', centerColor: '#FFD700' }, // Sunset Glow
    { petalColor: '#8A2BE2', centerColor: '#FFC0CB' }, // Berry Delight
    { petalColor: '#FFD700', centerColor: '#FFFACD' }, // Mellow Yellow
    { petalColor: '#98FB98', centerColor: '#F0FFF0' }, // Minty Fresh
    { petalColor: '#FF7F50', centerColor: '#FFE4B5' }, // Coral Reef
    { petalColor: '#4169E1', centerColor: '#FAEBD7' }, // Bluebell Dream
    { petalColor: '#FF69B4', centerColor: '#FFF0F5' } // Cotton Candy
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      {positions.length === flowerCount
        ? Array.from({ length: flowerCount }).map((_, i) => (
            <Flower
              key={i}
              petalCount={petalCounts[i]}
              delay={i * 0.5}
              size={sizes[i]}
              petalColor={flowerColors[i].petalColor}
              centerColor={flowerColors[i].centerColor}
              top={positions[i].top}
              left={positions[i].left}
              onBloomComplete={handleFlowerBloomEnd}
            />
          ))
        : null}
    </motion.div>
  );
}
