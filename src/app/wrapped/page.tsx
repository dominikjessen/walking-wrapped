import WrappedSlideshow from '@/components/composed/WrappedSlideshow';
import AuthButton from '@/components/ui/AuthButton';
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

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="ml-auto w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div>Hey there {user.user_metadata.name}</div>

      <WrappedSlideshow user={user} />
    </div>
  );
}
