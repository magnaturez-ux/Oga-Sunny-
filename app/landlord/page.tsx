"use client";

import { useEffect, useState, type FormEvent } from "react";
import { QRCodeSVG } from "qrcode.react";
import PageHeader from "@/components/PageHeader";
import { HOUSE_TYPES, type House, type HouseType } from "@/data/houses";
import { AREAS, AREA_CENTERS, formatNaira, whatsappLink, type Area } from "@/lib/geo";
import { generateListingId, loadListings, saveListing } from "@/lib/listings";

type FormState = {
  name: string;
  phone: string;
  area: Area;
  type: HouseType;
  price: string;
  description: string;
};

const EMPTY: FormState = {
  name: "",
  phone: "",
  area: "Mararaba",
  type: "Self-Con",
  price: "",
  description: "",
};

export default function LandlordPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<House[]>([]);
  const [poster, setPoster] = useState<House | null>(null);

  useEffect(() => {
    setListings(loadListings());
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneDigits = form.phone.replace(/\D/g, "");
    const price = Number(form.price);

    if (form.name.trim().length < 2) return setError("Abeg enter your full name.");
    if (phoneDigits.length < 10 || phoneDigits.length > 14) return setError("Phone number no correct.");
    if (!Number.isFinite(price) || price <= 0) return setError("Enter correct rent price.");
    setError(null);

    const center = AREA_CENTERS[form.area];
    const jitter = () => (Math.random() - 0.5) * 0.004;
    const listing: House = {
      id: generateListingId(listings),
      title: `${form.type} in ${form.area}`,
      area: form.area,
      type: form.type,
      price: Math.round(price),
      lat: center.lat + jitter(),
      lng: center.lng + jitter(),
      phone: form.phone.trim(),
      landlord: form.name.trim(),
      description: form.description.trim() || "Contact landlord for more details.",
    };

    setListings(saveListing(listing));
    setPoster(listing);
    setForm(EMPTY);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Landlord Corner"
        title="List Your House"
        subtitle="Fill the form, get your OGS ID and print the QR poster. Paste am for gate, tenants go scan and WhatsApp you."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-2xl border-2 border-neon p-5">
          <div>
            <label htmlFor="name" className="label">Landlord name</label>
            <input id="name" className="field" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Baba Musa" autoComplete="name" required />
          </div>
          <div>
            <label htmlFor="phone" className="label">Phone</label>
            <input id="phone" type="tel" inputMode="tel" className="field" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0803 123 4567" autoComplete="tel" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="area" className="label">Location</label>
              <select id="area" className="field" value={form.area} onChange={(e) => update("area", e.target.value as Area)}>
                {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="type" className="label">Type</label>
              <select id="type" className="field" value={form.type} onChange={(e) => update("type", e.target.value as HouseType)}>
                {HOUSE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="price" className="label">Rent per year (₦)</label>
            <input id="price" type="number" inputMode="numeric" min={1} className="field" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="350000" required />
          </div>
          <div>
            <label htmlFor="desc" className="label">Description</label>
            <textarea id="desc" rows={4} maxLength={300} className="field resize-none" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Prepaid meter, borehole, tiled floor..." />
          </div>

          {error ? <p role="alert" className="text-sm font-bold text-red-400">{error}</p> : null}

          <button type="submit" className="w-full rounded-lg bg-neon py-3 font-black uppercase tracking-widest text-black">
            Generate ID & Poster
          </button>
        </form>

        <section aria-label="QR poster" className="space-y-4">
          {poster ? (
            <>
              <div className="print-area rounded-2xl border-4 border-black bg-sun p-6 text-black">
                <p className="font-graffiti text-3xl leading-tight">House For Rent!</p>
                <p className="mt-1 text-sm font-black uppercase tracking-widest">Oga Sunny Africa</p>
                <div className="my-5 flex justify-center rounded-xl bg-white p-4">
                  <QRCodeSVG
                    value={whatsappLink(poster.phone, `Hello ${poster.landlord}, I scan your poster ${poster.id}. The ${poster.type} for ${poster.area} still dey?`)}
                    size={200}
                    level="M"
                    aria-label={`QR code for ${poster.id}`}
                  />
                </div>
                <p className="text-center font-graffiti text-2xl">{poster.id}</p>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold">
                  <dt>Type</dt><dd className="text-right">{poster.type}</dd>
                  <dt>Area</dt><dd className="text-right">{poster.area}</dd>
                  <dt>Rent / yr</dt><dd className="text-right">{formatNaira(poster.price)}</dd>
                  <dt>Call</dt><dd className="text-right">{poster.phone}</dd>
                </dl>
                <p className="mt-4 text-center text-xs font-black uppercase tracking-widest">
                  Scan to WhatsApp landlord
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full rounded-lg border-2 border-sun py-3 font-black uppercase tracking-widest text-sun"
              >
                Print poster
              </button>
            </>
          ) : (
            <div className="grid min-h-64 place-items-center rounded-2xl border-2 border-dashed border-sun/60 p-8 text-center text-white/60">
              Your QR poster go show here after you submit.
            </div>
          )}

          {listings.length > 0 ? (
            <div className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-sun">Your listings on this phone</h2>
              <ul className="divide-y divide-white/10 rounded-xl border border-white/15">
                {listings.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => setPoster(l)}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm hover:bg-white/5"
                    >
                      <span className="font-bold text-neon">{l.id}</span>
                      <span className="truncate text-white/70">{l.type} · {l.area}</span>
                      <span className="shrink-0 text-sun">{formatNaira(l.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
