import { createClient } from '@/utils/supabase/server';
import { EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as EmailOtpType;

  const origin = requestUrl.origin;

  if (token_hash && type) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/auth/callback`);
}
