import { motion } from 'framer-motion';
import StepsPerDayGraph from '@/components/graphs/StepsPerDayGraph';
import { useUserStepsStore } from '@/stores/userStepsStore';
import { formatDate, formatNumber } from '@/lib/utils';

export default function TopBottomSlide() {
  const { topDay, bottomDay } = useUserStepsStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-8 items-center justify-center bg-teal-100 h-screen overflow-hidden w-screen px-8 text-center"
    >
      <div className="flex flex-col gap-4 pt-4">
        <div>
          Psst, I know what you did on <span className="font-bold">{formatDate(topDay!.date)}</span>...
        </div>
        <div>You were busy walking!</div>
        <div>
          You did <span className="font-bold">{formatNumber(topDay!.steps, 'standard', 0)}</span> steps that day, the most you got all month.
        </div>

        <div>
          But what were you up to on <span className="font-bold">{formatDate(bottomDay!.date)}</span>?
        </div>
        <div>
          You only did <span className="font-bold">{formatNumber(bottomDay!.steps, 'standard', 0)}</span> steps that day.
        </div>
        <div>But hey, I bet you had a great day regardless.</div>
      </div>
    </motion.div>
  );
}
