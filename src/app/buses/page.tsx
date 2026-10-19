'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Bus as BusIcon, Clock, Star, ShieldCheck, MapPin, Check, Wifi, Sparkles } from 'lucide-react';
import { mockBuses } from '@/data/mockData';
import { useBooking } from '@/context/BookingContext';
import { Bus } from '@/types/travel';

function BusesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initiateBooking } = useBooking();

  const from = searchParams.get('from') || 'New Delhi';
  const to = searchParams.get('to') || 'Manali';
  const date = searchParams.get('date') || '2026-11-12';

  const [selectedSeat, setSelectedSeat] = useState<string>('U2');
  const [activeBusModal, setActiveBusModal] = useState<Bus | null>(null);

  const handleBookBus = (bus: Bus) => {
    const unitPrice = bus.price;
    const taxes = Math.round(unitPrice * 0.05);
    const totalPayable = unitPrice + taxes;

    initiateBooking({
      category: 'buses',
      title: `${bus.fromCity} to ${bus.toCity} (${bus.operator})`,
      subtitle: `${bus.busType} • Seat ${selectedSeat}`,
      destination: bus.toCity,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop',
      travelDate: date,
      unitPrice,
      quantity: 1,
      baseAmount: unitPrice,
      taxes,
      discountAmount: 0,
      totalPayable,
      travellers: [{ name: 'Primary Passenger', age: 28, gender: 'Male', seatNumber: selectedSeat }],
      itemDetails: {
        busId: bus.id,
        operator: bus.operator,
        busType: bus.busType,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        pickupPoint: bus.pickupPoint,
        dropPoint: bus.dropPoint,
        seatNumber: selectedSeat
      }
    });

    router.push('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Search Header */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-xs sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <BusIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {from} → {to} Buses
              </h2>
              <p className="text-xs text-slate-500">
                Travel Date: <span className="font-semibold text-slate-700">{date}</span> • Volvo & Luxury Multi-Axle
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        {mockBuses.map((bus) => (
          <div
            key={bus.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-card hover:border-brand-300 transition flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-extrabold text-slate-900">{bus.operator}</h3>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>{bus.rating}</span>
                </span>
                <span className="text-xs text-slate-400">({bus.reviewCount} ratings)</span>
              </div>

              <p className="text-xs text-slate-500 font-medium">{bus.busType}</p>

              {/* Schedule */}
              <div className="flex items-center gap-6 pt-2">
                <div>
                  <span className="text-xl font-black text-slate-900 block">{bus.departureTime}</span>
                  <span className="text-xs text-slate-500">{bus.pickupPoint}</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-bold text-slate-400 mb-0.5">{bus.duration}</span>
                  <div className="w-20 h-0.5 bg-slate-200 relative flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">Live Tracking</span>
                </div>

                <div>
                  <span className="text-xl font-black text-slate-900 block">{bus.arrivalTime}</span>
                  <span className="text-xs text-slate-500">{bus.dropPoint}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {bus.amenities.map((a) => (
                  <span key={a} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and Seat Selection Action */}
            <div className="pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 flex md:flex-col items-center md:items-end justify-between shrink-0">
              <div className="text-left md:text-right">
                <span className="text-xs text-slate-400">Starts from</span>
                <div className="text-2xl font-black text-slate-900">₹{bus.price.toLocaleString('en-IN')}</div>
                <span className="text-[10px] text-emerald-600 font-semibold">{bus.seatsAvailable} seats left</span>
              </div>

              <button
                onClick={() => handleBookBus(bus)}
                className="mt-2 bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
              >
                Select Seats & Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BusesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Buses...</div>}>
      <BusesContent />
    </Suspense>
  );
}
