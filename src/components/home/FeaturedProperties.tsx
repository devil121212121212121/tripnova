'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function FeaturedProperties() {
  const { hotels } = useBooking();
  const [filterType, setFilterType] = useState<string>('All');

  const types = ['All', 'Luxury Resort', 'Heritage Palace', 'Villa', 'Hotel'];

  const filtered = filterType === 'All'
    ? hotels
    : hotels.filter((h) => h.propertyType === filterType);

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
              Handcrafted Stays
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Recommended Hotels & Luxury Villas
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top-rated properties verified for hygiene, hospitality, and authentic luxury
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mt-4 md:mt-0 py-1">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  filterType === t
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t === 'All' ? 'All Stays' : `${t}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.slice(0, 8).map((hotel) => {
            const detailHref = hotel.propertyType === 'Villa' ? `/villa/${hotel.slug}` : `/hotel/${hotel.slug}`;
            return (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={hotel.mainImage}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider border border-white/60">
                    {hotel.propertyType}
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-md text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                      <MapPin className="w-3 h-3 text-brand-600 shrink-0" />
                      <span className="truncate">{hotel.city}, {hotel.state}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-brand-600 transition">
                      {hotel.name}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {hotel.tagline}
                    </p>
                  </div>

                  {/* Amenities Highlights */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hotel.amenities.slice(0, 2).map((amenity) => (
                      <span
                        key={amenity}
                        className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.freeCancellation && (
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        Free Cancellation
                      </span>
                    )}
                  </div>

                  {/* Pricing and CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs line-through text-slate-400">
                          ₹{hotel.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-bold text-coral-600 bg-coral-50 px-1.5 py-0.2 rounded">
                          {Math.round(((hotel.originalPrice - hotel.pricePerNight) / hotel.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-extrabold text-slate-900">
                          ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-500">/ night</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">+ ₹{hotel.taxesAndFees} taxes & fees</span>
                    </div>

                    <Link
                      href={detailHref}
                      className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-brand-500 text-slate-800 hover:text-brand-600 font-bold text-sm px-6 py-3 rounded-2xl shadow-xs transition"
          >
            <span>Browse All Available Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
