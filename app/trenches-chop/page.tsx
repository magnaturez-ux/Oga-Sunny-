"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import LocationBar from "@/components/LocationBar";
import { ChatIcon, PhoneIcon } from "@/components/Icons";
import { FOOD_SPOTS } from "@/data/food";
import { AREAS, formatKm, formatNaira, haversineKm, whatsappLink } from "@/lib/geo";
import { useLocation } from "@/hooks/useLocation";

export default function TrenchesChopPage() {
  const { coords, status, locate } = useLocation();
  const [area, setArea] = useState("All");

  useEffect(() => {
    locate();
  }, [locate]);

  const spots = useMemo(
    () =>
      FOOD_SPOTS.filter((s) => area === "All" || s.area === area)
        .map((spot) => ({ spot, distance: haversineKm(coords, spot) }))
        .sort((a, b) => a.distance - b.distance),
    [coords, area]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Trenches Chop"
        title="Belle Full, Pocket Safe"
        subtitle="Cheap correct food near you. Call or WhatsApp to order."
      />

      <LocationBar status={status} onLocate={locate} />

      <div role="group" aria-label="Filter by area" className="flex gap-2 overflow-x-auto pb-1">
        {["All", ...AREAS].map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setArea(a)}
            aria-pressed={area === a}
            className={`shrink-0 rounded-full border-2 px-3.5 py-1.5 text-xs font-black uppercase tracking-wide ${
              area === a ? "border-sun bg-sun text-black" : "border-white/20 text-white/70 hover:border-neon"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {spots.map(({ spot, distance }) => (
          <li key={spot.id} className="flex flex-col gap-3 rounded-2xl border-2 border-neon p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-graffiti text-xl leading-snug text-neon">{spot.name}</h2>
                <p className="text-sm text-white/70">{spot.area} · {spot.hours}</p>
              </div>
              <span className="shrink-0 rounded-full bg-sun px-2.5 py-1 text-xs font-black text-black">
                {formatKm(distance)}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2 rounded-lg bg-white/5 px-3 py-2">
              <span className="font-bold">{spot.dish}</span>
              <span className="font-graffiti text-xl text-sun">{formatNaira(spot.price)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${spot.phone}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-neon py-2 text-xs font-black uppercase text-black"
              >
                <PhoneIcon className="h-4 w-4" /> Call
              </a>
              <a
                href={whatsappLink(spot.phone, `Hello ${spot.name}, I wan order ${spot.dish} (${formatNaira(spot.price)}). I see you for Oga Sunny Africa.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-neon py-2 text-xs font-black uppercase text-neon"
              >
                <ChatIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
