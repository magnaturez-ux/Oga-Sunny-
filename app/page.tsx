import Image from "next/image";
import Link from "next/link";

const CARDS = [
  {
    href: "/find",
    tag: "01",
    title: "Find House",
    text: "Self-con, room & parlour, flats — sorted by how near e be to you.",
  },
  {
    href: "/trenches-chop",
    tag: "02",
    title: "Trenches Chop",
    text: "Mama Put, Suya, Okpa and more. Call or WhatsApp straight.",
  },
  {
    href: "/music",
    tag: "03",
    title: "Oga Sunny Radio",
    text: "Bang the official PK playlist while you dey waka.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border-2 border-neon">
        <Image
          src="/hero.png"
          alt="Mararaba street at night with suya smoke and okada lights"
          width={1584}
          height={672}
          priority
          className="h-72 w-full object-cover opacity-50 sm:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 space-y-3 p-5 sm:p-8">
          <p className="inline-block -rotate-2 bg-sun px-2 py-0.5 text-xs font-black uppercase tracking-widest text-black">
            Mararaba · Masaka · One Man · Ado · New Nyanya
          </p>
          <h1 className="font-graffiti text-4xl leading-[1.05] text-neon text-balance drop-shadow-[0_2px_0_#000] sm:text-6xl">
            Oga Sunny Africa
          </h1>
          <p className="font-graffiti text-2xl text-white text-balance sm:text-3xl">
            Find House Nearest To You
          </p>
        </div>
      </section>

      <section aria-label="Explore" className="grid gap-4 sm:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex flex-col justify-between gap-6 rounded-2xl border-2 border-neon bg-black p-5 transition hover:-translate-y-1 hover:shadow-neon"
          >
            <span className="font-graffiti text-3xl text-sun">{card.tag}</span>
            <div className="space-y-2">
              <h2 className="font-graffiti text-2xl text-neon">{card.title}</h2>
              <p className="text-sm text-white/70">{card.text}</p>
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-sun group-hover:underline">
              Enter →
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border-2 border-dashed border-sun p-6 text-center">
        <p className="font-graffiti text-3xl leading-tight text-sun text-balance sm:text-5xl">
          OORGANIC NO BE MECHANIC
        </p>
        <p className="mt-2 font-black tracking-[0.4em] text-neon">— PK —</p>
      </section>
    </div>
  );
}
