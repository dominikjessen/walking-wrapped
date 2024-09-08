'use client';

import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import TotalStepsSlide from '@/components/slides/TotalStepsSlide';
import StepsGraphSlide from '@/components/slides/StepsGraphSlide';
import LeaderboardsSlide from '@/components/slides/LeaderboardsSlide';
import { User } from '@supabase/supabase-js';
import { useUserStepsStore } from '@/stores/userStepsStore';
import FinalSlide from '../slides/FinalSlide';
import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { useUserProfileStore } from '@/stores/userProfileStore';
import WalkingBuddySlide from '../slides/WalkingBuddySlide';
import { useWalkingBuddiesStore } from '@/stores/walkingBuddiesStore';
import TopBottomSlide from '../slides/TopBottomSlide';
import { useRouter } from 'next/navigation';

export interface WrappedSlideshowProps extends ComponentProps<'div'> {
  user: User;
}

export default function WrappedSlideshow({ user }: WrappedSlideshowProps) {
  // User Profile

  const { fetchUserProfile } = useUserProfileStore();

  useEffect(() => {
    fetchUserProfile(user);
  }, [user, fetchUserProfile]);

  // Steps

  const { fetchSteps, loading } = useUserStepsStore();

  useEffect(() => {
    fetchSteps(user);
  }, [user, fetchSteps]);

  // Leaderboards

  const { fetchWeeklyLeaderboards, fetchMonthlyLeaderboard } = useLeaderboardStore();

  useEffect(() => {
    fetchWeeklyLeaderboards();
    fetchMonthlyLeaderboard();
  }, [fetchWeeklyLeaderboards, fetchMonthlyLeaderboard]);

  // Walking Buddies

  const { fetchWalkingBuddies } = useWalkingBuddiesStore();

  useEffect(() => {
    fetchWalkingBuddies(user);
  }, [user, fetchWalkingBuddies]);

  // Slide management
  const slides = [TotalStepsSlide, StepsGraphSlide, TopBottomSlide, LeaderboardsSlide, WalkingBuddySlide, FinalSlide];
  const [navigationDisabled, setNavigationDisabled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const router = useRouter();

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const restartWrapped = () => {
    router.push('/wrapped');
  };

  const SlideComponent = slides[currentSlide];

  useEffect(() => {
    setNavigationDisabled(true);
  }, [currentSlide]);

  const onSlideAnimationComplete = useCallback(() => {
    setNavigationDisabled(false);
  }, []);

  return (
    <div className="flex flex-col">
      {loading ? <div className="text-8xl self-center">🏃...</div> : <SlideComponent onAnimationComplete={onSlideAnimationComplete} />}
      <div className="flex justify-between gap-4 absolute bottom-4 right-4">
        <Button onClick={goToPrevSlide} disabled={currentSlide === 0 || navigationDisabled}>
          Prev
        </Button>
        <Button onClick={currentSlide === slides.length - 1 ? restartWrapped : goToNextSlide} disabled={navigationDisabled}>
          {currentSlide === slides.length - 1 ? 'Restart' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
