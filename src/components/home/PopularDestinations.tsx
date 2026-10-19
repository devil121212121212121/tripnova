'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Sun, Hotel, Calendar } from 'lucide-react';
import { mockDestinations } from '@/data/mockData';

export default function PopularDestinations() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
              Popular Escapes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Top Trending Destinations
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Handpicked getaways with verified 4-star & 5-star properties and scenic tours
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 mt-2 sm:mt-0 group"
          >
            <span>Explore All 50+ Cities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Weather Pill */}
                <div className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                  <Sun className="w-3 h-3 text-amber-300" />
                  <span>{dest.weather}</span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 bg-brand-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  {dest.category}
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 text-white">
                  <h3 className="text-xl font-extrabold tracking-tight">{dest.name}</h3>
                  <p className="text-xs text-slate-200 line-clamp-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-coral-400" />
                    <span>{dest.stateOrCountry}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.tagline}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Starting from</span>
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{dest.startingPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500"> / night</span>
                  </div>

                  <Link
                    href={`/hotels?city=${encodeURIComponent(dest.name)}`}
                    className="inline-flex items-center gap-1 bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 text-xs font-bold px-3 py-2 rounded-xl transition duration-150"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
