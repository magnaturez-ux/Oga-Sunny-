'use client';

import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

type House = {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  price: string;
  type: string;
  status: string;
  distanceKm?: number;
};

const mockHouses: House[] = [
  { id: 1, name: 'Sunrise Duplex', location: 'Mararaba', latitude: 9.1278, longitude: 7.3775, price: 'N18M', type: '3 Bedroom', status: 'Verified' },
  { id: 2, name: 'Greenfield Court', location: 'Masaka', latitude: 9.1159, longitude: 7.4146, price: 'N15M', type: '2 Bedroom', status: 'New' },
  { id: 3, name: 'Aso Rock Villa', location: 'Masaka', latitude: 9.1096, longitude: 7.3928, price: 'N25M', type: '4 Bedroom', status: 'Premium' },
  { id: 4, name: 'One Man Ado Heights', location: 'One Man Ado', latitude: 9.0958, longitude: 7.3558, price: 'N12M', type: '2 Bedroom', status: 'Hot' },
  { id: 5, name: 'City Grace Homes', location: 'Mararaba', latitude: 9.1463, longitude: 7.3552, price: 'N17M', type: '3 Bedroom', status: 'Verified' },
  { id: 6, name: 'Lucky Star Estate', location: 'New Nyanya', latitude: 9.0747, longitude: 7.5149, price: 'N14M', type: '2 Bedroom', status: 'New' },
  { id: 7, name: 'Auntie Bimpe House', location: 'Masaka', latitude: 9.1522, longitude: 7.4266, price: 'N11M', type: '1 Bedroom', status: 'Affordable' },
  { id: 8, name: 'Sunny Lane Apartments', location: 'Mararaba', latitude: 9.1397, longitude: 7.3249, price: 'N19M', type: '3 Bedroom', status: 'Verified' },
  { id: 9, name: 'Ado Pride Suites', location: 'One Man Ado', latitude: 9.0854, longitude: 7.3938, price: 'N16M', type: '2 Bedroom', status: 'Hot' },
  { id: 10, name: 'Nyanya Family Homes', location: 'New Nyanya', latitude: 9.0635, longitude: 7.5019, price: 'N13M', type: '2 Bedroom', status: 'Affordable' },
  { id: 11, name: 'Golden Palm Homes', location: 'Mararaba', latitude: 9.1197, longitude: 7.3657, price: 'N21M', type: '4 Bedroom', status: 'Premium' },
  { id: 12, name: 'Osho Realty', location: 'Masaka', latitude: 9.0892, longitude: 7.4302, price: 'N10M', type: '1 Bedroom', status: 'Affordable' },
  { id: 13, name: 'Oga Sunny Court', location: 'One Man Ado', latitude: 9.1031, longitude: 7.3482, price: 'N20M', type: '3 Bedroom', status: 'Verified' },
  { id: 14, name: 'Lagos Blue Homes', location: 'New Nyanya', latitude: 9.0809, longitude: 7.5338, price: 'N22M', type: '4 Bedroom', status: 'Premium' },
  { id: 15, name: 'Abba Terrace', location: 'Mararaba', latitude: 9.1369, longitude: 7.3869, price: 'N9M', type: '1 Bedroom', status: 'Affordable' },
  { id: 16, name: 'Mighty Land Lodge', location: 'Masaka', latitude: 9.1588, longitude: 7.4032, price: 'N24M', type: '4 Bedroom', status: 'Premium' },
  { id: 17, name: 'Mafikuyomi Homes', location: 'One Man Ado', latitude: 9.0782, longitude: 7.3798, price: 'N12M', type: '2 Bedroom', status: 'New' },
  { id: 18, name: 'Mighty Grace Flats', location: 'New Nyanya', latitude: 9.0578, longitude: 7.4864, price: 'N15M', type: '2 Bedroom', status: 'Verified' },
  { id: 19, name: 'Junction Villa', location: 'Mararaba', latitude: 9.1216, longitude: 7.3462, price: 'N18M', type: '3 Bedroom', status: 'Hot' },
  { id: 20, name: 'Sunny Place Homes', location: 'Masaka', latitude: 9.1004, longitude: 7.4371, price: 'N13M', type: '2 Bedroom', status: 'New' }
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

export default function FindPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

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

  const houses = useMemo(() => {
    if (!location) return mockHouses;

    return mockHouses
      .map((house) => ({
        ...house,
        distanceKm: haversineDistance(location.lat, location.lng, house.latitude, house.longitude)
      }))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }, [location]);

  const filteredHouses = houses.filter((house) => {
    const matchesFilter = filter === 'all' ? true : house.location.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      house.name.toLowerCase().includes(search.toLowerCase()) ||
      house.location.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <main className="bg-[#020202] px-4 pb-24 pt-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="yellow-glow text-xs font-bold uppercase tracking-[0.3em]">Find</p>
            <h1 className="graffiti mt-2 text-3xl uppercase text-[#00FF88]">Nearest Houses</h1>
          </div>

          <div className="flex gap-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search location or house"
              className="rounded-xl border border-[#00FF88] bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-500"
            />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-[#00FF88] bg-black px-3 py-2 text-sm text-white"
            >
              <option value="all">All areas</option>
              <option value="mararaba">Mararaba</option>
              <option value="masaka">Masaka</option>
              <option value="one man ado">One Man Ado</option>
              <option value="new nyanya">New Nyanya</option>
            </select>
          </div>
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
          {filteredHouses.map((house) => (
            <div key={house.id} className="neon-border rounded-2xl bg-black p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#FFD60A]">{house.name}</h2>
                  <p className="text-sm text-zinc-400">{house.location}</p>
                </div>
                <span className="rounded-full border border-[#00FF88] px-2 py-1 text-[10px] uppercase text-[#00FF88]">
                  {house.status}
                </span>
              </div>

              <div className="mb-3 space-y-2 text-sm text-zinc-300">
                <p>Type: {house.type}</p>
                <p>Price: {house.price}</p>
                <p>Distance: {(house.distanceKm ?? 0).toFixed(1)} KM</p>
              </div>

              <div className="mb-3 flex items-center justify-between rounded-xl border border-[#00FF88] bg-[#06150d] p-2 text-xs text-[#00FF88]">
                <span>Map ID</span>
                <span>{house.id.toString().padStart(3, '0')}</span>
              </div>

              <div className="flex justify-center rounded-xl border border-[#FFD60A] bg-[#111111] p-2">
                <QRCodeSVG value={`Oga Sunny Africa|${house.name}|${house.location}|${house.price}|${house.type}`} size={110} fgColor="#00FF88" bgColor="#111111" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
