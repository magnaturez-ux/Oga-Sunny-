"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import LocationBar from "@/components/LocationBar";
import HouseCard from "@/components/HouseCard";
import { HOUSES, HOUSE_TYPES, type House } from "@/data/houses";
import { AREAS, haversineKm } from "@/lib/geo";
import { loadListings } from "@/lib/listings";
import { useLocation } from "@/hooks/useLocation";

const PRICE_OPTIONS = [
  { value: 0, label: "Any price" },
  { value: 250000, label: "Up to ₦250k" },
  { value: 400000, label: "Up to ₦400k" },
  { value: 600000, label: "Up to ₦600k" },
  { value: 1000000, label: "Up to ₦1m" },
];

export default function FindPage() {
  const { coords, status, locate } = useLocation();
  const [area, setArea] = useState("All");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(0);
  const [query, setQuery] = useState("");
  const [landlordListings, setLandlordListings] = useState<House[]>([]);

  useEffect(() => {
    setLandlordListings(loadListings());
    locate();
  }, [locate]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...landlordListings, ...HOUSES]
      .filter((h) => area === "All" || h.area === area)
      .filter((h) => type === "All" || h.type === type)
      .filter((h) => maxPrice === 0 || h.price <= maxPrice)
      .filter(
        (h) =>
          !q ||
          h.title.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.id.toLowerCase().includes(q)
      )
      .map((house) => ({ house, distance: haversineKm(coords, house) }))
      .sort((a, b) => a.distance - b.distance);
  }, [landlordListings, area, type, maxPrice, query, coords]);

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Find House"
        title="House Nearest To You"
        subtitle="Mararaba, Masaka, One Man, Ado and New Nyanya — sorted by distance."
      />

      <LocationBar status={status} onLocate={locate} />

      <section aria-label="Filters" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-4">
          <label htmlFor="q" className="label">Search</label>
          <input
            id="q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, ID or description"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="area" className="label">Area</label>
          <select id="area" value={area} onChange={(e) => setArea(e.target.value)} className="field">
            <option value="All">All areas</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type" className="label">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="field">
            <option value="All">All types</option>
            {HOUSE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label htmlFor="price" className="label">Budget</label>
          <select
            id="price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="field"
          >
            {PRICE_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </section>

      <p className="text-sm text-white/60" aria-live="polite">
        {results.length} {results.length === 1 ? "house" : "houses"} found
      </p>

      {results.length === 0 ? (
        <p className="rounded-xl border-2 border-dashed border-white/20 p-8 text-center text-white/60">
          No house match. Loosen the filters small.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ house, distance }) => (
            <HouseCard key={house.id} house={house} distanceKm={distance} />
          ))}
        </div>
      )}
    </div>
  );
}
