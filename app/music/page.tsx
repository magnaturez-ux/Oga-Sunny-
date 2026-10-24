'use client';

import { useEffect, useMemo, useState } from 'react';

type FoodSpot = {
  id: number;
  name: string;
  meal: string;
  price: string;
  location: string;
  phone: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
};

const spots: FoodSpot[] = [
  { id: 1, name: 'Mama Put Rice', meal: 'Rice + Stew', price: 'N700', location: 'Mararaba', phone: '08031111111', latitude: 9.1301, longitude: 7.3694 },
  { id: 2, name: 'Suya City', meal: 'Suya', price: 'N500', location: 'Masaka', phone: '08032222222', latitude: 9.1171, longitude: 7.4086 },
  { id: 3, name: 'Okpa Hub', meal: 'Okpa', price: 'N300', location: 'New Nyanya', phone: '08033333333', latitude: 9.0687, longitude: 7.5035 },
  { id: 4, name: 'Awoof Pot', meal: 'Beans + Plantain', price: 'N650', location: 'One Man Ado', phone: '08034444444', latitude: 9.0874, longitude: 7.3884 },
  { id: 5, name: 'Buka Express', meal: 'Jollof Rice', price: 'N850', location: 'Mararaba', phone: '08035555555', latitude: 9.1378, longitude: 7.3811 },
  { id: 6, name: 'Street Swallow', meal: 'Eba & Soup', price: 'N600', location: 'Masaka', phone: '08036666666', latitude: 9.1064, longitude: 7.4209 },
  { id: 7, name: 'Ariya Cook', meal: 'Yam Porridge', price: 'N550', location: 'New Nyanya', phone: '08037777777', latitude: 9.0808, longitude: 7.4912 },
  { id: 8, name: 'Pepper Pot', meal: 'Snail & Rice', price: 'N900', location: 'One Man Ado', phone: '08038888888', latitude: 9.0993, longitude: 7.3576 },
  { id: 9, name: 'No Wahala Buka', meal: 'Amala', price: 'N700', location: 'Mararaba', phone: '08039999999', latitude: 9.1439, longitude: 7.3459 },
  { id: 10, name: 'Aunty Nneka', meal: 'Moi Moi', price: 'N350', location: 'Masaka', phone: '08040000000', latitude: 9.1238, longitude: 7.4358 },
  { id: 11, name: 'Roadside Grill', meal: 'Chicken & Chips', price: 'N800', location: 'New Nyanya', phone: '08041111111', latitude: 9.0711, longitude: 7.5177 },
  { id: 12, name: 'Mama Ada Buka', meal: 'Ofada Rice', price: 'N950', location: 'One Man Ado', phone: '08042222222', latitude: 9.0921, longitude: 7.3672 },
  { id: 13, name: 'Abuja Swallow', meal: 'Fufu', price: 'N750', location: 'Mararaba', phone: '08043333333', latitude: 9.1517, longitude: 7.3735 },
  { id: 14, name: 'Golden Fry', meal: 'Fish + Chips', price: 'N1,000', location: 'Masaka', phone: '08044444444', latitude: 9.1119, longitude: 7.4241 },
  { id: 15, name: 'Village Bowl', meal: 'Pasta', price: 'N650', location: 'New Nyanya', phone: '08045555555', latitude: 9.0621, longitude: 7.4949 }
];

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function TrenchesChopPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        setLocation({ lat: 9.0765, lng: 7.3986 });
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }, []);

  const sortedSpots = useMemo(() => {
    if (!location) return spots;

    return [...spots]
      .map((spot) => ({
        ...spot,
        distanceKm: haversineDistance(location.lat, location.lng, spot.latitude, spot.longitude)
      }))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }, [location]);

  return (
    <main className="bg-[#020202] px-4 pb-24 pt-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="yellow-glow text-xs font-bold uppercase tracking-[0.3em]">Chop</p>
          <h1 className="graffiti mt-2 text-3xl uppercase text-[#00FF88]">Trenches Chop</h1>
        </div>

        {location ? (
          <div className="mb-6 rounded-2xl border border-[#00FF88] bg-black p-4 text-sm text-zinc-300">
            Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </div>
        ) : (
          <div className="mb-6 rounded-2xl border border-[#FFD60A] bg-[#111111] p-4 text-sm text-[#FFD60A]">
            Getting your location... please allow geolocation.
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sortedSpots.map((spot) => (
            <div key={spot.id} className="neon-border rounded-2xl bg-black p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#FFD60A]">{spot.name}</h2>
                  <p className="text-sm text-zinc-400">{spot.location}</p>
                </div>
                <span className="rounded-full border border-[#00FF88] px-2 py-1 text-[10px] uppercase text-[#00FF88]">
                  {spot.meal}
                </span>
              </div>

              <div className="mb-3 space-y-2 text-sm text-zinc-300">
                <p>Price: {spot.price}</p>
                <p>Distance: {(spot.distanceKm ?? 0).toFixed(1)} KM</p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${spot.phone}`}
                  className="flex-1 rounded-xl bg-[#00FF88] px-3 py-2 text-center font-bold text-black"
                >
                  Call
                </a>
                <a
                  href={`https://wa.me/${spot.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-xl border border-[#FFD60A] px-3 py-2 text-center font-bold text-[#FFD60A]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
