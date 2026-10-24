'use client';

import Link from 'next/link';

const cards = [
  {
    title: 'Find House',
    href: '/find',
    description: 'Nearest homes around your location',
    accent: 'text-[#00FF88]'
  },
  {
    title: 'Trenches Chop',
    href: '/trenches-chop',
    description: 'Fast food spots and local meals',
    accent: 'text-[#FFD60A]'
  },
  {
    title: 'Radio',
    href: '/music',
    description: 'Street vibes and local sounds',
    accent: 'text-[#00FF88]'
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020202] px-4 pb-20 pt-10 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="neon-border mb-8 rounded-2xl bg-black p-6 sm:p-8">
          <p className="yellow-glow mb-4 text-xs font-bold uppercase tracking-[0.35em]">Oga Sunny Africa</p>
          <h1 className="graffiti mb-4 text-4xl uppercase text-[#00FF88] sm:text-6xl">
            Oga Sunny Africa - Find House Nearest To You
          </h1>
          <p className="max-w-2xl text-base text-zinc-300">
            Smart homes, quick food, and radio vibes for the people on the move.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="neon-border rounded-2xl bg-black p-5 transition hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className={`text-lg font-black uppercase ${card.accent}`}>{card.title}</span>
                <span className="text-[#FFD60A]">→</span>
              </div>
              <p className="text-sm text-zinc-300">{card.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[#FFD60A] bg-[#111111] p-5 text-center">
          <p className="graffiti text-2xl text-[#FFD60A]">OORGANIC NO BE MECHANIC - PK</p>
        </div>
      </div>
    </main>
  );
}
