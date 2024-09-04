import { Button } from '@/components/ui/Button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: profile } = await supabase.from('profiles').select().eq('id', user.id).limit(1).single();

  return (
    <main className="min-h-[100dvh] flex flex-col gap-4 items-center justify-center p-12 w-full md:w-1/3 mx-auto">
      <div className="flex flex-col gap-4">
        <span className="text-7xl animate-wave origin-[70%_70%] w-fit">👋🏻</span>
        <p className="text-4xl font-bold">Hey {profile?.username},</p>
        <p className="text-2xl">are you ready to find out how busy your feet were this month?</p>
      </div>

      <Link href="/wrapped" className="w-full mt-4">
        <Button className="text-lg" size="lg">
          Start recap
        </Button>
      </Link>
    </main>
  );
}
