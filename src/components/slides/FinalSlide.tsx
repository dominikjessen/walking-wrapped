import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { motion } from 'framer-motion';
import Leaderboard from '../composed/Leaderboard';
import StepsPerDayGraph from '../graphs/StepsPerDayGraph';
import { useUserStepsStore } from '@/stores/userStepsStore';
import KPI from '@/components/composed/KPI';
import { Button } from '../ui/Button';
import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { cn } from '@/lib/utils';
import { SlideProps } from '@/types';

export default function FinalSlide({ onAnimationComplete }: SlideProps) {
  const { steps } = useUserStepsStore();
  const { monthlyLeaderboard } = useLeaderboardStore();

  const totalSteps = steps.reduce((acc, steps) => acc + steps.steps, 0);
  const averageSteps = steps.length ? totalSteps / steps.length : 0;

  const imageRootRef = useRef(null);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);

  async function saveSlideAsImage() {
    if (imageRootRef.current === null) {
      return;
    }

    setIsDownloadingImage(true);

    // Hacky timeout to get the dynamic styling to apply
    setTimeout(async () => {
      try {
        const dataUrl = await toPng(imageRootRef.current!, { backgroundColor: '#f8fafc' });
        const link = document.createElement('a');
        link.download = 'walking-wrapped.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Could not generate image', error);
      } finally {
        setIsDownloadingImage(false);
      }
    }, 10);
  }

  // No animation here yet
  onAnimationComplete();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center bg-slide-final h-[100dvh] w-screen px-8 lg:overflow-y-auto"
    >
      <div className="flex flex-col items-center gap-2 lg:gap-4 w-full">
        <div ref={imageRootRef} className={cn('flex flex-col items-center gap-2 lg:gap-4 w-full', isDownloadingImage && 'px-4 py-6')}>
          <h1 className="text-3xl font-bold">Your steps in August</h1>
          <div className="lg:hidden flex gap-2 lg:gap-4 justify-between">
            <KPI title="Total" value={totalSteps} />
            <KPI title="Avg" value={averageSteps} />
          </div>
          <StepsPerDayGraph className="min-h-0 max-h-72 max-w-screen" />
          <div className="lg:grid grid-cols-2 flex flex-col gap-4 w-full">
            <div className="hidden lg:flex flex-col gap-4 justify-center w-1/2 self-center">
              <KPI title="Total" value={totalSteps} />
              <KPI title="Avg" value={averageSteps} />
            </div>

            <div className="flex flex-col gap-2 lg:gap-4">
              <h2 className="text-2xl font-bold">Final Leaderboard</h2>
              <Leaderboard
                key={`${monthlyLeaderboard?.start_date}-${monthlyLeaderboard?.end_date}`}
                leaderboard={monthlyLeaderboard!}
                scrollable={!isDownloadingImage}
                fullSize={isDownloadingImage}
                className="max-h-72"
              />
            </div>
          </div>
        </div>
        {/* <Button onClick={saveSlideAsImage}>Save image</Button> */}
      </div>
    </motion.div>
  );
}
