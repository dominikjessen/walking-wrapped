import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import '../globals.css';
import AuthButton from '@/components/ui/AuthButton';
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
      <body className={cn('h-screen w-screen overflow-hidden text-xl', font.className)}>
        <nav className="absolute right-4 top-4 z-50">
          <AuthButton />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
