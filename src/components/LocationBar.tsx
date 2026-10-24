"use client";

import type { LocationStatus } from "@/hooks/useLocation";
import { PinIcon } from "@/components/Icons";

const MESSAGES: Record<LocationStatus, string> = {
  idle: "Showing distance from Mararaba Junction. Tap to use your real location.",
  locating: "Dey find where you dey...",
  found: "Sorted by distance from YOUR location.",
  denied: "Location blocked. Showing distance from Mararaba Junction.",
  unsupported: "Your phone no support location. Using Mararaba Junction.",
};

export default function LocationBar({
  status,
  onLocate,
}: {
  status: LocationStatus;
  onLocate: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border-2 border-sun/70 bg-sun/5 p-3 sm:flex-row sm:items-center">
      <p className="flex-1 text-sm text-white/80" aria-live="polite">
        {MESSAGES[status]}
      </p>
      <button
        type="button"
        onClick={onLocate}
        disabled={status === "locating"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-sun px-4 py-2 text-sm font-black uppercase text-black disabled:opacity-60"
      >
        <PinIcon className="h-4 w-4" />
        {status === "found" ? "Refresh location" : "Use my location"}
      </button>
    </div>
  );
}
