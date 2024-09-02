'use client';

import { ComponentProps, useEffect, useState } from 'react';
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
        <Button onClick={goToPrevSlide} disabled={currentSlide === 0}>
          Prev
        </Button>
        <Button onClick={goToNextSlide} disabled={currentSlide === slides.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
}
