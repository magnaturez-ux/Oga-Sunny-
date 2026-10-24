'use client';

import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

type Listing = {
  id: string;
  name: string;
  phone: string;
  location: string;
  type: string;
  price: string;
  desc: string;
};

const initialListing = {
  name: '',
  phone: '',
  location: 'Mararaba',
  type: 'Apartment',
  price: '',
  desc: ''
};

export default function LandlordPage() {
  const [form, setForm] = useState(initialListing);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('oga-sunny-listings');
    if (saved) {
      setListings(JSON.parse(saved));
    }
  }, []);

  const poster = useMemo(() => {
    const id = `OGS-MAR-${String(Math.floor(1000 + Math.random() * 9000))}`;
    return {
      id,
      ...form,
      qrValue: `OGA SUNNY AFRICA|${form.name}|${form.phone}|${form.location}|${form.type}|${form.price}|${form.desc}`
    };
  }, [form]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const id = `OGS-MAR-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const listing: Listing = {
      id,
      name: form.name || 'New landlord',
      phone: form.phone || 'No number',
      location: form.location,
      type: form.type,
      price: form.price || 'Negotiable',
      desc: form.desc || 'Clean modern home available'
    };

    const nextListings = [listing, ...listings];
    setListings(nextListings);
    localStorage.setItem('oga-sunny-listings', JSON.stringify(nextListings));
    setForm(initialListing);
  };

  return (
    <main className="bg-[#020202] px-4 pb-24 pt-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="yellow-glow text-xs font-bold uppercase tracking-[0.3em]">Landlord</p>
          <h1 className="graffiti mt-2 text-3xl uppercase text-[#00FF88]">Register Property</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="neon-border rounded-2xl bg-black p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-zinc-300">
                Name
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#00FF88] bg-[#101010] px-3 py-2 text-white"
                  placeholder="Your name"
                />
              </label>

              <label className="text-sm text-zinc-300">
                Phone
                <input
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#00FF88] bg-[#101010] px-3 py-2 text-white"
                  placeholder="0803..."
                />
              </label>

              <label className="text-sm text-zinc-300">
                Location
                <input
                  value={form.location}
                  onChange={(event) => setForm({ ...form, location: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#00FF88] bg-[#101010] px-3 py-2 text-white"
                  placeholder="Mararaba"
                />
              </label>

              <label className="text-sm text-zinc-300">
                Type
                <select
                  value={form.type}
                  onChange={(event) => setForm({ ...form, type: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#00FF88] bg-[#101010] px-3 py-2 text-white"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Studio">Studio</option>
                </select>
              </label>

              <label className="text-sm text-zinc-300 sm:col-span-2">
                Price
                <input
                  value={form.price}
                  onChange={(event) => setForm({ ...form, price: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-[#00FF88] bg-[#101010] px-3 py-2 text-white"
                  placeholder="N18M"
                />
              </label>

              <label className="text-sm text-zinc-300 sm:col-span-2">
                Description
                <textarea
                  value={form.desc}
                  onChange={(event) => setForm({ ...form, desc: event.target.value })}
                  className="mt-2 h-28 w-full rounded-xl border border-[#00FF88] bg-[#101010] px-3 py-2 text-white"
                  placeholder="Good location, clean compound, running water, security..."
                />
              </label>
            </div>

            <button type="submit" className="mt-5 w-full rounded-xl bg-[#00FF88] px-4 py-3 font-black uppercase text-black">
              Save Listing
            </button>
          </form>

          <div className="neon-border rounded-2xl bg-black p-5">
            <p className="yellow-glow mb-3 text-xs font-bold uppercase tracking-[0.25em]">QR Poster</p>
            <div className="rounded-2xl border border-[#FFD60A] bg-[#111111] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-zinc-400">Listing ID</span>
                <span className="font-bold text-[#00FF88]">{poster.id}</span>
              </div>
              <div className="mb-3 space-y-2 text-sm text-zinc-200">
                <p><strong>Name:</strong> {form.name || 'Your landlord name'}</p>
                <p><strong>Phone:</strong> {form.phone || '080...'}</p>
                <p><strong>Location:</strong> {form.location}</p>
                <p><strong>Type:</strong> {form.type}</p>
                <p><strong>Price:</strong> {form.price || 'Negotiable'}</p>
              </div>
              <div className="flex justify-center rounded-xl border border-[#00FF88] bg-black p-3">
                <QRCodeSVG value={poster.qrValue} size={160} fgColor="#00FF88" bgColor="#000000" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold uppercase text-[#FFD60A]">Saved Listings</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
              <div key={listing.id} className="neon-border rounded-2xl bg-black p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-bold text-[#00FF88]">{listing.id}</span>
                  <span className="text-xs uppercase text-[#FFD60A]">{listing.type}</span>
                </div>
                <p className="text-lg font-bold text-[#FFD60A]">{listing.name}</p>
                <p className="text-sm text-zinc-300">{listing.location}</p>
                <p className="mt-2 text-sm text-zinc-300">{listing.phone}</p>
                <p className="mt-2 text-sm text-zinc-300">{listing.price}</p>
                <p className="mt-3 text-sm text-zinc-400">{listing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
