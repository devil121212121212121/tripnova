'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Palmtree, Clock, Star, Plane, Check, ArrowRight, Filter, ArrowUpDown } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

function PackagesContent() {
  const searchParams = useSearchParams();
  const { packages } = useBooking();

  const destParam = searchParams.get('dest') || '';
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'duration'>('recommended');
  const [flightsOnly, setFlightsOnly] = useState<boolean>(false);

  const themes = ['All', 'Romantic', 'Beach & Islands', 'Adventure', 'Cultural Heritage', 'Luxury Escapes'];

  const filteredPackages = useMemo(() => {
    return packages
      .filter((pkg) => {
        if (destParam && !pkg.destination.toLowerCase().includes(destParam.toLowerCase()) && !pkg.title.toLowerCase().includes(destParam.toLowerCase())) {
          return false;
        }
        if (selectedTheme !== 'All' && pkg.theme !== selectedTheme) return false;
        if (flightsOnly && !pkg.flightsIncluded) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.pricePerPerson - b.pricePerPerson;
        if (sortBy === 'price_desc') return b.pricePerPerson - a.pricePerPerson;
        if (sortBy === 'duration') return b.durationDays - a.durationDays;
        return 0;
      });
  }, [packages, destParam, selectedTheme, flightsOnly, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-coral-500/20 text-coral-300 border border-coral-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Palmtree className="w-3.5 h-3.5" />
            <span>Curated Holiday Circuits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore Handcrafted Holiday Packages
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            Complete itineraries including boutique stays, day-wise tours, meals, private cab transfers, and optional return flight bookings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls and Filters Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-400 mr-1">Theme:</span>
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedTheme === theme
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={flightsOnly}
                onChange={(e) => setFlightsOnly(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
              <span>Flights Included Only</span>
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-100 text-xs font-bold text-slate-800 rounded-xl px-3 py-2 border border-slate-200 focus:outline-none"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="duration">Longest Duration</option>
            </select>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={pkg.heroImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-brand-900/85 backdrop-blur-md text-brand-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                  {pkg.theme}
                </div>
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-xl shadow-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-600" />
                  <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                </div>
                {pkg.flightsIncluded && (
                  <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Plane className="w-3 h-3" />
                    <span>Flights Included</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-brand-600">{pkg.destination}, {pkg.country}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {pkg.rating}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-brand-600 transition">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {pkg.overview}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 space-y-1 border border-slate-100 text-[11px] text-slate-700">
                  <p className="font-bold text-slate-900 text-xs mb-1">Highlights:</p>
                  {pkg.inclusions.slice(0, 3).map((inc, i) => (
                    <div key={i} className="flex items-start gap-1.5 line-clamp-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 line-through">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-slate-900">
                        ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-500">/ person</span>
                    </div>
                  </div>

                  <Link
                    href={`/package/${pkg.slug}`}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Holiday Packages...</div>}>
      <PackagesContent />
    </Suspense>
  );
}
