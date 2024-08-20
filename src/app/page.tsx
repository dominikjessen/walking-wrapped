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

  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center p-12 w-1/3 mx-auto">
      <div className="flex flex-col gap-4">
        <span className="text-7xl animate-wave origin-[70%_70%] w-fit">👋🏻</span>
        <p className="text-4xl font-bold">Hey {user.user_metadata.name},</p>
        <p className="text-2xl">are you ready to find out how busy your feet were this month?</p>
      </div>

      <Link href="/wrapped" className="w-full mt-12">
        <Button className="w-3/4 text-xl">Start recap</Button>
      </Link>
    </main>
  );
}
