'use client';

import { ComponentProps, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import TotalStepsSlide from '@/components/slides/TotalStepsSlide';
import AverageStepsSlide from '@/components/slides/AverageStepsSlide';
import StepsGraphSlide from '@/components/slides/StepsGraphSlide';
import LeaderboardsSlide from '@/components/slides/LeaderboardsSlide';
import { User } from '@supabase/supabase-js';
import { useUserStepsStore } from '@/stores/userStepsStore';
import FinalSlide from '../slides/FinalSlide';
import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { useUserProfileStore } from '@/stores/userProfileStore';

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

  // Slide management

  const slides = [TotalStepsSlide, AverageStepsSlide, StepsGraphSlide, LeaderboardsSlide, FinalSlide];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const SlideComponent = slides[currentSlide];

  return (
    <div className="h-screen flex flex-col">
      {loading ? <div>Loading wrapped...</div> : <SlideComponent />}
      <div className="flex justify-between gap-4 absolute bottom-2 right-2">
        <Button onClick={goToPrevSlide}>Prev</Button>
        <Button onClick={goToNextSlide}>Next</Button>
      </div>
    </div>
  );
}
