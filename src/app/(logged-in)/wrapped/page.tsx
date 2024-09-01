import WrappedSlideshow from '@/components/composed/WrappedSlideshow';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function WrappedPage() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return <WrappedSlideshow user={user} />;
}
