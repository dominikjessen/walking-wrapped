import { motion } from 'framer-motion';
import Image from 'next/image';
import LeftFootstep from '../../assets/left-footstep.svg';
import RightFootstep from '../../assets/right-footstep.svg';
import { cn } from '@/lib/utils';

interface FootstepsProps {
  numberOfFootsteps: number;
  footstepAnimationDuration: number;
  direction: 'right' | 'left';
  startDelay: number;
}

export const Footsteps = ({ numberOfFootsteps = 6, footstepAnimationDuration = 1, direction = 'right', startDelay = 0 }: FootstepsProps) => {
  function calculateOffsets(index: number) {
    if (direction === 'right') {
      return {
        left: `${index * 9}%`,
        top: `${60 - index * 9}%`
      };
    }

    return {
      right: `${index * 9}%`,
      bottom: `${60 - index * 9}%`
    };
  }

  return (
    <div className="overflow-hidden size-full">
      {Array.from({ length: numberOfFootsteps }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: footstepAnimationDuration, delay: startDelay + footstepAnimationDuration * index }}
          className={cn('absolute', direction === 'right' ? 'rotate-[45deg]' : '-rotate-[135deg]')}
          style={calculateOffsets(index)}
        >
          <Image priority src={index % 2 === 0 ? LeftFootstep : RightFootstep} alt="Footstep" className="size-16" />
        </motion.div>
      ))}
    </div>
  );
};
