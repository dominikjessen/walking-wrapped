import { motion, RepeatType } from 'framer-motion';
import { useWalkingBuddiesStore } from '@/stores/walkingBuddiesStore';
import { useEffect, useState } from 'react';
import { generatePoissonDiskPositions } from '@/lib/utils';
import { TEXT_REVEAL_ANIMATION_DURATION } from '@/lib/constants';

export default function WalkingBuddySlide() {
  const { topBuddies } = useWalkingBuddiesStore();

  // Animation vs content
  const [showContent, setShowContent] = useState(false);

  const heartVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: [0.25, 1, 0.25],
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

  // Staggered content reveal
  const [showBuddy, setShowBuddy] = useState(false);
  const [showMainText, setShowMainText] = useState(false);
  const [showSubText, setShowSubText] = useState(false);

  // Animation control
  useEffect(() => {
    setTimeout(() => setShowContent(true), TEXT_REVEAL_ANIMATION_DURATION * 3);
    setTimeout(() => setShowBuddy(true), TEXT_REVEAL_ANIMATION_DURATION * 3);
    setTimeout(() => setShowMainText(true), TEXT_REVEAL_ANIMATION_DURATION * 4.5);
    setTimeout(() => setShowSubText(true), TEXT_REVEAL_ANIMATION_DURATION * 6);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-sky-100 overflow-hidden w-screen px-8"
    >
      {showContent ? (
        <div className="w-full flex flex-col gap-24 items-center text-center text-2xl">
          {showBuddy ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full flex flex-col gap-4 items-center"
            >
              <div className="flex gap-2">
                {topBuddies?.people.map((name, i) => (
                  <div key={name} className="font-bold text-8xl">
                    {name}
                    {i < topBuddies.people.length - 1 ? ', ' : null}
                  </div>
                ))}
              </div>
              <div>
                <span>{topBuddies!.people.length > 1 ? 'were' : 'was'}</span> your August walking{' '}
                {topBuddies!.people.length > 1 ? 'buddies' : 'buddy'}.
              </div>
            </motion.div>
          ) : null}

          {showMainText ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full flex flex-col gap-4 items-center"
            >
              <div>
                There were <span className="font-bold">{topBuddies?.days}</span> days when they were your closest step partner.
              </div>
            </motion.div>
          ) : null}

          {showSubText ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full flex flex-col gap-4 items-center"
            >
              {topBuddies!.people.length > 2 ? (
                <div>Looks like you were quite popular this month, huh?</div>
              ) : topBuddies!.people.length > 1 ? (
                <div>Guess you couldn't decide who to pick. Triangles are a nice shape anyway.</div>
              ) : (
                <div>So how many of those walks did you two go on together then? 👀</div>
              )}
            </motion.div>
          ) : null}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-center size-full relative"
        >
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
            <div className="bg-sky-100 py-8 px-4 text-8xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
                Love is in the air
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
