'use client';

import React, { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Home, Star, MapPin, Users, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

function VillasContent() {
  const searchParams = useSearchParams();
  const { hotels } = useBooking();
  const cityParam = searchParams.get('city');

  // Filter villas and boutique homestays
  const villas = useMemo(() => {
    return hotels.filter((h) => h.propertyType === 'Villa' || h.propertyType === 'Luxury Resort');
  }, [hotels]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-coral-500/20 text-coral-300 border border-coral-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Home className="w-3.5 h-3.5" />
            <span>Private Estates & Luxury Homestays</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Handpicked Villas & Exclusive Retreats
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            Enjoy complete privacy with your family or friends. Experience private swimming pools, in-house gourmet chefs, manicured lawns, and personalized butler service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {villas.map((villa) => (
            <div
              key={villa.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-card hover:-translate-y-1 transition duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={villa.mainImage}
                  alt={villa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {villa.propertyType}
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{villa.rating}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span className="truncate">{villa.city}, {villa.state}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition">
                    {villa.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {villa.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-slate-600">
                  {villa.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Whole Villa from</span>
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹{villa.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500"> / night</span>
                  </div>

                  <Link
                    href={`/villa/${villa.slug}`}
                    className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                  >
                    View Villa →
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

export default function VillasPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Villas...</div>}>
      <VillasContent />
    </Suspense>
  );
}
