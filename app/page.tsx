import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PlayerProvider } from '@/src/context/PlayerContext';
import MiniPlayer from '@/src/components/MiniPlayer';

export const metadata: Metadata = {
  title: 'Oga Sunny Africa',
  description: 'Find homes, food, and music around you.',
};

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Find', href: '/find' },
  { label: 'Chop', href: '/trenches-chop' },
  { label: 'Radio', href: '/music' },
  { label: 'Landlord', href: '/landlord' },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#00FF88] bg-black/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2 sm:px-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-1 flex-col items-center justify-center rounded-xl border border-[#00FF88]/50 px-1 py-2 text-[10px] font-bold uppercase tracking-wide text-[#FFD60A] transition hover:border-[#00FF88] hover:text-[#00FF88]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="bg-black text-white antialiased">
        <PlayerProvider>
          <div className="min-h-screen pb-24">{children}</div>
          <MiniPlayer />
          <BottomNav />
        </PlayerProvider>
      </body>
    </html>
  );
}
