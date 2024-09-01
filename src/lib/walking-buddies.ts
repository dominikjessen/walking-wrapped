import { WalkingBuddyEntry, TopBottomBuddyEntry } from '@/types/walking-buddies';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export async function fetchAllWalkingBuddiesStats(user: User) {
  const supabase = createClient();

  const { data: buddies, error } = await supabase
    .from('walking_buddies')
    .select('id, user_id, partner_id, number_of_buddy_days, profiles:partner_id(username)')
    .eq('user_id', user.id)
    .order('number_of_buddy_days', { ascending: false });

  if (error) {
    console.error('Error fetching walking buddies:', error);
    return { error };
  }

  const data = buddies as unknown as WalkingBuddyEntry[]; // Supabase many-to-many joins and TS are weird

  return { data };
}

export function getTopWalkingBuddies(rows: WalkingBuddyEntry[]): TopBottomBuddyEntry {
  let topBuddies: TopBottomBuddyEntry = {
    days: 0,
    people: []
  };

  rows.forEach((entry) => {
    if (entry.number_of_buddy_days > topBuddies.days) {
      topBuddies.days = entry.number_of_buddy_days;
      topBuddies.people.push(entry.profiles?.username!);
    } else if (entry.number_of_buddy_days === topBuddies.days) {
      topBuddies.people.push(entry.profiles?.username!);
    }
  });

  return topBuddies;
}

export function getBottomWalkingBuddies(rows: WalkingBuddyEntry[]): TopBottomBuddyEntry {
  let topBuddies: TopBottomBuddyEntry = {
    days: 32,
    people: []
  };

  rows.forEach((entry) => {
    if (entry.number_of_buddy_days < topBuddies.days) {
      topBuddies.days = entry.number_of_buddy_days;
      topBuddies.people.push(entry.profiles?.username!);
    } else if (entry.number_of_buddy_days === topBuddies.days) {
      topBuddies.people.push(entry.profiles?.username!);
    }
  });

  return topBuddies;
}
