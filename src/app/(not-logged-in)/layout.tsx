import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import '../globals.css';
import { cn } from '@/lib/utils';

const font = Baloo_2({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Walking Wrapped',
  description: 'See how your steps went... get it?!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('bg-slate-100 text-xl', font.className)}>{children}</body>
    </html>
  );
}
