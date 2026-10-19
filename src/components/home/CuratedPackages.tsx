'use client';

import React from 'react';
import Link from 'next/link';
import { Palmtree, Clock, Star, Plane, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function CuratedPackages() {
  const { packages } = useBooking();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-coral-600 block mb-1">
              All-Inclusive Itineraries
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bespoke Holiday Packages
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Curated vacations complete with 4/5-star stays, private sightseeing, guided tours & meals
            </p>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 mt-2 sm:mt-0 group"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.slice(0, 6).map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={pkg.heroImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Theme Tag */}
                <div className="absolute top-3 left-3 bg-brand-900/85 backdrop-blur-md text-brand-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                  {pkg.theme}
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-xl shadow-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-600" />
                  <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                </div>

                {pkg.flightsIncluded && (
                  <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Plane className="w-3 h-3" />
                    <span>Flights Incl.</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-brand-600">{pkg.destination}, {pkg.country}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {pkg.rating} ({pkg.reviewCount})
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-brand-600 transition">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {pkg.overview}
                  </p>
                </div>

                {/* Inclusions checklist preview */}
                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 border border-slate-100 text-[11px] text-slate-700">
                  <p className="font-bold text-slate-900 text-xs mb-1">Key Inclusions:</p>
                  {pkg.inclusions.slice(0, 3).map((inc, i) => (
                    <div key={i} className="flex items-start gap-1.5 line-clamp-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
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
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
                  >
                    <span>View Package</span>
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
