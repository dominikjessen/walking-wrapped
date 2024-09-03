import { motion, RepeatType } from 'framer-motion';
import { useWalkingBuddiesStore } from '@/stores/walkingBuddiesStore';
import { useEffect, useState } from 'react';
import { generatePoissonDiskPositions } from '@/lib/utils';

export default function WalkingBuddySlide() {
  const { topBuddies } = useWalkingBuddiesStore();

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const heartVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: [0, 1, 0],
      y: [20, -20, 20],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop' as RepeatType,
        ease: 'easeInOut'
      }
    }
  };

  const heartPositions = generatePoissonDiskPositions(95, 105, 20, 20, 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-sky-100 overflow-hidden w-screen px-8"
    >
      {showContent ? (
        <div className="w-full flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            {topBuddies?.people.map((name) => (
              <div key={name} className="font-bold text-2xl">
                {name}
              </div>
            ))}
          </div>

          <div>
            <span>{topBuddies!.people.length > 1 ? 'were' : 'was'}</span> your August walking {topBuddies!.people.length > 1 ? 'buddies' : 'buddy'}.
          </div>
          <div className="flex flex-col gap-4">
            <div>
              There were <span className="font-bold">{topBuddies?.days}</span> days when you were closest to them in steps.
            </div>
            {topBuddies!.people.length > 2 ? (
              <div>Looks like you were quite popular this month, huh?</div>
            ) : topBuddies!.people.length > 1 ? (
              <div>Guess you couldn't decide who to pick. Triangles are a nice shape anyway.</div>
            ) : (
              <div>So how many of those walks did two you go on together then? 👀</div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-4xl font-bold text-center size-full relative">
          {heartPositions.map((position, i) => (
            <motion.div
              key={i}
              variants={heartVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
              className="absolute text-3xl"
              style={position}
            >
              ❤️
            </motion.div>
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-sky-100 py-8 px-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
                Love is in the air
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
