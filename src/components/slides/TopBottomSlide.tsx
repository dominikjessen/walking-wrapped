import { motion } from 'framer-motion';
import { useUserStepsStore } from '@/stores/userStepsStore';
import { formatDate, formatNumber } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { TEXT_REVEAL_ANIMATION_DURATION } from '@/lib/constants';
import { SlideProps } from '@/types';

export default function TopBottomSlide({ onAnimationComplete }: SlideProps) {
  const { topDay, bottomDay } = useUserStepsStore();

  // Animation vs content
  // TODO: Add animation
  const [showContent, setShowContent] = useState(true);

  // Staggered content reveal
  const [showTopTitle, setShowTopTitle] = useState(false);
  const [showTopSubTitle, setShowTopSubTitle] = useState(false);
  const [showTopText, setShowTopText] = useState(false);

  const [showBottomTitle, setShowBottomTitle] = useState(false);
  const [showBottomSubTitle, setShowBottomSubTitle] = useState(false);
  const [showBottomText, setShowBottomText] = useState(false);

  // Animation control
  useEffect(() => {
    // setTimeout(() => setShowContent(true), TEXT_REVEAL_ANIMATION_DURATION * 3);
    setTimeout(() => setShowTopTitle(true), TEXT_REVEAL_ANIMATION_DURATION * 0);
    setTimeout(() => setShowTopSubTitle(true), TEXT_REVEAL_ANIMATION_DURATION * 0.75);
    setTimeout(() => setShowTopText(true), TEXT_REVEAL_ANIMATION_DURATION * 1.25);

    setTimeout(() => setShowBottomTitle(true), TEXT_REVEAL_ANIMATION_DURATION * 3);
    setTimeout(() => setShowBottomSubTitle(true), TEXT_REVEAL_ANIMATION_DURATION * 3.75);
    setTimeout(() => {
      setShowBottomText(true);
      onAnimationComplete();
    }, TEXT_REVEAL_ANIMATION_DURATION * 4.5);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-8 items-center justify-center bg-teal-100 h-screen overflow-hidden w-screen px-8 text-center"
    >
      <div className="flex flex-col gap-12 justify-evenly">
        <div className="flex flex-col gap-6">
          {showTopTitle ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
              <div>
                Psst, I know what you did on <span className="font-bold">{formatDate(topDay!.date)}</span>...
              </div>
            </motion.div>
          ) : null}

          {showTopSubTitle ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
              <div>You were busy walking!</div>
            </motion.div>
          ) : null}

          {showTopText ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
              <div>
                You did <span className="font-bold">{formatNumber(topDay!.steps, 'standard', 0)}</span> steps that day - the most you got all month 💪
              </div>
            </motion.div>
          ) : null}
        </div>

        <div className="flex flex-col gap-6 mt-12">
          {showBottomTitle ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
              <div>
                But what happened on <span className="font-bold">{formatDate(bottomDay!.date)}</span>?
              </div>
            </motion.div>
          ) : null}

          {showBottomSubTitle ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
              <div>
                You only did <span className="font-bold">{formatNumber(bottomDay!.steps, 'standard', 0)}</span> steps that day.
              </div>
            </motion.div>
          ) : null}

          {showBottomText ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full">
              <div>But hey, I bet you had a great day just rotting away on the couch regardless.</div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
