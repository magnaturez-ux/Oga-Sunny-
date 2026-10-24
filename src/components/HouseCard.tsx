"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { House } from "@/data/houses";
import { formatKm, formatNaira, whatsappLink } from "@/lib/geo";
import { ChatIcon, PhoneIcon } from "@/components/Icons";

export default function HouseCard({ house, distanceKm }: { house: House; distanceKm: number }) {
  const [showQr, setShowQr] = useState(false);
  const message = `Hello ${house.landlord}, I saw ${house.id} (${house.title}, ${house.area}) on Oga Sunny Africa. E still dey?`;
  const waLink = whatsappLink(house.phone, message);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border-2 border-neon bg-black p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-[11px] font-black uppercase tracking-widest text-sun">{house.id}</p>
          <h2 className="font-graffiti text-xl leading-snug text-neon text-balance">{house.title}</h2>
        </div>
        <span className="shrink-0 rounded-full bg-sun px-2.5 py-1 text-xs font-black text-black">
          {formatKm(distanceKm)}
        </span>
      </div>

      <dl className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <dt className="text-[10px] uppercase tracking-widest text-white/50">Area</dt>
          <dd className="font-bold">{house.area}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-widest text-white/50">Type</dt>
          <dd className="font-bold">{house.type}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-widest text-white/50">Rent / yr</dt>
          <dd className="font-bold text-sun">{formatNaira(house.price)}</dd>
        </div>
      </dl>

      <p className="text-sm text-white/70">{house.description}</p>

      {showQr ? (
        <div className="flex flex-col items-center gap-2 rounded-xl bg-white p-4">
          <QRCodeSVG value={waLink} size={160} level="M" aria-label={`QR code to WhatsApp ${house.landlord}`} />
          <p className="text-center text-xs font-bold text-black">Scan to WhatsApp {house.landlord}</p>
        </div>
      ) : null}

      <div className="mt-auto grid grid-cols-3 gap-2">
        <a
          href={`tel:${house.phone}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-neon py-2 text-xs font-black uppercase text-black"
        >
          <PhoneIcon className="h-4 w-4" /> Call
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-neon py-2 text-xs font-black uppercase text-neon"
        >
          <ChatIcon className="h-4 w-4" /> Chat
        </a>
        <button
          type="button"
          onClick={() => setShowQr((v) => !v)}
          aria-expanded={showQr}
          className="rounded-lg border-2 border-sun py-2 text-xs font-black uppercase text-sun"
        >
          {showQr ? "Hide QR" : "QR"}
        </button>
      </div>
    </article>
  );
}
