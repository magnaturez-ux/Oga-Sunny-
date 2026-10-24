export type Coords = { lat: number; lng: number };

export const AREAS = ["Mararaba", "Masaka", "One Man", "Ado", "New Nyanya"] as const;
export type Area = (typeof AREAS)[number];

export const AREA_CENTERS: Record<Area, Coords> = {
  Mararaba: { lat: 9.0185, lng: 7.5935 },
  Masaka: { lat: 8.9986, lng: 7.6398 },
  "One Man": { lat: 9.0258, lng: 7.5781 },
  Ado: { lat: 9.0089, lng: 7.6122 },
  "New Nyanya": { lat: 9.0364, lng: 7.5683 },
};

export const DEFAULT_COORDS: Coords = AREA_CENTERS.Mararaba;

export function haversineKm(a: Coords, b: Coords): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatKm(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("234")) return digits;
  if (digits.startsWith("0")) return `234${digits.slice(1)}`;
  return digits;
}

export function whatsappLink(phone: string, message: string): string {
  return `https://wa.me/${toWhatsAppNumber(phone)}?text=${encodeURIComponent(message)}`;
}
