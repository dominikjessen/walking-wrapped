import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  };

  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOut}>
        <Button>Logout</Button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
      Login
    </Link>
  );
}
