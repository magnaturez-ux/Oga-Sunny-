"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChopIcon, HomeIcon, KeyIcon, RadioIcon, SearchIcon } from "@/components/Icons";

const LINKS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/find", label: "Find", Icon: SearchIcon },
  { href: "/trenches-chop", label: "Chop", Icon: ChopIcon },
  { href: "/music", label: "Radio", Icon: RadioIcon },
  { href: "/landlord", label: "Landlord", Icon: KeyIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-neon bg-black/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-between">
        {LINKS.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                  active ? "text-sun" : "text-white/60 hover:text-neon"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
