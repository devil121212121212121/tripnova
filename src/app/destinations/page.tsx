'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Sun, Calendar, ArrowRight, Hotel, Palmtree, Sparkles } from 'lucide-react';
import { mockDestinations } from '@/data/mockData';

export default function DestinationsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Domestic' | 'International'>('All');

  const filtered = activeCategory === 'All'
    ? mockDestinations
    : mockDestinations.filter((d) => d.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-coral-500/20 text-coral-300 border border-coral-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explore The World With TripNova</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Popular Travel Destinations
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            From misty Himalayan valleys and golden desert dunes to tropical island paradises and futuristic skylines.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Toggles */}
        <div className="flex items-center gap-2 mb-8">
          {(['All', 'Domestic', 'International'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? 'All Destinations' : `${cat} Getaways`}
            </button>
          ))}
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-card hover:-translate-y-1 transition duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>{dest.weather}</span>
                </div>

                <div className="absolute top-3 right-3 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {dest.category}
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-4 text-white">
                  <h3 className="text-2xl font-black">{dest.name}</h3>
                  <p className="text-xs text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-coral-400" />
                    <span>{dest.stateOrCountry}</span>
                  </p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {dest.description}
                </p>

                {/* Highlights */}
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block mb-1.5">Top Attractions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.topAttractions.map((att) => (
                      <span key={att} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
                        {att}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  <span>Best Season: <strong>{dest.bestTimeToVisit}</strong></span>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Stays from</span>
                    <span className="text-lg font-extrabold text-slate-900">
                      ₹{dest.startingPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500"> / night</span>
                  </div>

                  <Link
                    href={`/hotels?city=${encodeURIComponent(dest.name)}`}
                    className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    <span>View Stays</span>
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
