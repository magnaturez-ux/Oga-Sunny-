import type { House } from "@/data/houses";

const STORAGE_KEY = "ogs-landlord-listings";

export function loadListings(): House[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as House[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveListing(listing: House): House[] {
  const updated = [listing, ...loadListings()];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function generateListingId(existing: House[]): string {
  const taken = new Set(existing.map((h) => h.id));
  let id = "";
  do {
    id = `OGS-MAR-${Math.floor(1000 + Math.random() * 9000)}`;
  } while (taken.has(id));
  return id;
}
