import { motion } from 'framer-motion';
import { useWalkingBuddiesStore } from '@/stores/walkingBuddiesStore';

export default function WalkingBuddySlide() {
  const { topBuddies, bottomBuddies } = useWalkingBuddiesStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-sky-100 overflow-hidden w-screen px-8"
    >
      <div className="w-full flex flex-col gap-4 items-center">
        <h2 className="text-2xl">Love is in the air... ❤️</h2>
        <div className="flex gap-2">
          {topBuddies?.people.map((name) => (
            <div key={name} className="font-bold text-2xl">
              {name}
            </div>
          ))}
        </div>

        <div>
          <span>{topBuddies && topBuddies.people.length > 1 ? 'were' : 'was'}</span> your August walking buddy.
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
    </motion.div>
  );
}
