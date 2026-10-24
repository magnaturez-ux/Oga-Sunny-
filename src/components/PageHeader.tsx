export default function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="space-y-2">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-sun">{kicker}</p>
      <h1 className="font-graffiti text-4xl leading-tight text-neon text-balance sm:text-5xl">{title}</h1>
      {subtitle ? <p className="max-w-prose text-white/70 text-pretty">{subtitle}</p> : null}
    </header>
  );
}
