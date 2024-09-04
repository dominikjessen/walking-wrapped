import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '@/components/ui/SubmitButton';

export default function MagicLink({ searchParams }: { searchParams: { message: string } }) {
  const signInWithMagicLink = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
      }
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }
  };

  return (
    <div className="flex flex-col w-full sm:max-w-md justify-center items-center gap-2 m-auto h-[100dvh]">
      <form className="flex flex-col w-full justify-center gap-2 text-foreground bg-white p-10 rounded-xl">
        <h1 className="text-xl font-bold mb-4">Sign in with a magic link</h1>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input className="rounded-md px-4 py-2 bg-inherit border mb-6" name="email" placeholder="you@example.com" required />

        <SubmitButton formAction={signInWithMagicLink} className="bg-teal-400  rounded-md px-4 py-2 text-foreground mb-2" pendingText="Signing In...">
          Sign In
        </SubmitButton>

        {searchParams?.message && <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>}
      </form>
    </div>
  );
}
