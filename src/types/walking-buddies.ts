import { WalkingBuddyRow } from './database.types';

export type WalkingBuddyEntry = WalkingBuddyRow & { profiles: { username: string | null } | null };

export type TopBottomBuddyEntry = {
  days: number;
  people: string[];
};
