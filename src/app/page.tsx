import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = createClient();
  const { data: steps } = await supabase.from('steps').select();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <div className="">Some steps</div>
      <ul>
        {steps?.map((step) => (
          <li key={step.id}>{step.steps}</li>
        ))}
      </ul>
    </main>
  );
}
