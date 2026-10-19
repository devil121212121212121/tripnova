'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Car, Star, Users, Luggage, ShieldCheck, Check, Clock } from 'lucide-react';
import { mockCabs } from '@/data/mockData';
import { useBooking } from '@/context/BookingContext';
import { Cab } from '@/types/travel';

function CabsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initiateBooking } = useBooking();

  const from = searchParams.get('from') || 'New Delhi';
  const to = searchParams.get('to') || 'Agra';
  const date = searchParams.get('date') || '2026-11-12';

  const handleBookCab = (cab: Cab) => {
    const unitPrice = cab.price;
    const taxes = Math.round(unitPrice * 0.05);
    const totalPayable = unitPrice + taxes;

    initiateBooking({
      category: 'cabs',
      title: `${cab.cabType} (${cab.model})`,
      subtitle: `${from} → ${to} • ${cab.includedKm} km included • AC Cab`,
      destination: to,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop',
      travelDate: date,
      unitPrice,
      quantity: 1,
      baseAmount: unitPrice,
      taxes,
      discountAmount: 0,
      totalPayable,
      travellers: [{ name: 'Lead Passenger', age: 30, gender: 'Male' }],
      itemDetails: {
        cabType: cab.cabType,
        model: cab.model,
        capacity: cab.capacity,
        luggageCount: cab.luggageCount,
        includedKm: cab.includedKm,
        perKmRate: cab.perKmRate,
        fuelType: cab.fuelType,
      }
    });

    router.push('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-xs sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {from} to {to} Cabs
              </h2>
              <p className="text-xs text-slate-500">
                Pickup Date: <span className="font-semibold text-slate-700">{date}</span> • Chauffeur Driven AC Cabs
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push('/')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 px-3.5 py-2 rounded-xl transition"
          >
            Change Route
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        {mockCabs.map((cab) => (
          <div
            key={cab.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-card transition flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="bg-brand-50 text-brand-700 border border-brand-200 font-extrabold text-xs px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {cab.cabType}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{cab.model}</h3>
                <span className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {cab.rating}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-brand-600" /> Up to {cab.capacity} Passengers
                </span>
                <span className="flex items-center gap-1">
                  <Luggage className="w-3.5 h-3.5 text-brand-600" /> {cab.luggageCount} Bags
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-600" /> ETA: {cab.estimatedArrivalMin} mins
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-slate-600">
                {cab.features.map((f) => (
                  <span key={f} className="bg-slate-100 px-2 py-0.5 rounded font-medium">
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 flex md:flex-col items-center md:items-end justify-between shrink-0">
              <div className="text-left md:text-right">
                <div className="text-2xl font-black text-slate-900">₹{cab.price.toLocaleString('en-IN')}</div>
                <span className="text-[11px] text-slate-500 block">{cab.includedKm} km included (₹{cab.perKmRate}/km extra)</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Tolls & Taxes included</span>
              </div>

              <button
                onClick={() => handleBookCab(cab)}
                className="mt-2 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-xs"
              >
                Book This Cab
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CabsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Cabs...</div>}>
      <CabsContent />
    </Suspense>
  );
}
