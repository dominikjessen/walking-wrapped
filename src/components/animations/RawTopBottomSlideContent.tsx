'use client';

import { useUserStepsStore } from '@/stores/userStepsStore';
import { formatDate, formatNumber } from '@/lib/utils';

export default function RawTopBottomSlideContent() {
  const { topDay, bottomDay, loading } = useUserStepsStore();

  return (
    <>
      {loading ? null : (
        <div className="flex flex-col gap-8 items-center justify-center h-[100dvh] overflow-hidden w-screen px-8 text-center bg-slide-top-bottom">
          <div className="flex flex-col gap-12 justify-evenly">
            <div className="flex flex-col gap-6">
              <div className="w-full">
                Psst, I know what you did on <span className="font-bold">{formatDate(topDay!.date)}</span>...
              </div>

              <div className="w-full">You were busy walking!</div>

              <div className="w-full">
                You did <span className="font-bold">{formatNumber(topDay!.steps, 'standard', 0)}</span> steps that day - the most you got all month 💪
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-12">
              <div className="w-full">
                But what happened on <span className="font-bold">{formatDate(bottomDay!.date)}</span>?
              </div>

              <div className="w-full">
                You only did <span className="font-bold">{formatNumber(bottomDay!.steps, 'standard', 0)}</span> steps that day.
              </div>

              <div className="w-full">But hey, I bet you had a great day just rotting away on the couch regardless.</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
