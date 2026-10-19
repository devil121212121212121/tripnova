'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Train as TrainIcon, Clock, CheckCircle2, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { mockTrains } from '@/data/mockData';
import { useBooking } from '@/context/BookingContext';
import { Train, TrainClassSeat } from '@/types/travel';

function TrainsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initiateBooking } = useBooking();

  const from = searchParams.get('from') || 'NDLS';
  const to = searchParams.get('to') || 'BSB';
  const date = searchParams.get('date') || '2026-11-15';

  const handleBookTrainClass = (train: Train, cls: TrainClassSeat) => {
    const unitPrice = cls.price;
    const taxes = Math.round(unitPrice * 0.05);
    const totalPayable = unitPrice + taxes;

    initiateBooking({
      category: 'trains',
      title: `${train.trainName} (#${train.trainNumber})`,
      subtitle: `${train.fromStation} (${train.fromCode}) → ${train.toStation} (${train.toCode}) • ${cls.className}`,
      destination: train.toStation,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop',
      travelDate: date,
      unitPrice,
      quantity: 1,
      baseAmount: unitPrice,
      taxes,
      discountAmount: 0,
      totalPayable,
      travellers: [{ name: 'Primary Passenger', age: 32, gender: 'Male', berthPreference: 'Lower Berth' }],
      itemDetails: {
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        fromCode: train.fromCode,
        fromStation: train.fromStation,
        toCode: train.toCode,
        toStation: train.toStation,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
        classCode: cls.classCode,
        className: cls.className,
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
              <TrainIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {from} → {to} Trains
              </h2>
              <p className="text-xs text-slate-500">
                Date: <span className="font-semibold text-slate-700">{date}</span> • Vande Bharat, Tejas & Rajdhani
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {mockTrains.map((train) => (
          <div
            key={train.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-card transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    #{train.trainNumber}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">{train.trainName}</h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Runs on: {train.runningDays.join(', ')}
                </p>
              </div>

              {/* Times */}
              <div className="flex items-center gap-6">
                <div className="text-left sm:text-right">
                  <span className="text-lg font-black text-slate-900 block">{train.departureTime}</span>
                  <span className="text-xs text-slate-500">{train.fromCode}</span>
                </div>
                <span className="text-xs font-bold text-slate-400">{train.duration}</span>
                <div className="text-left">
                  <span className="text-lg font-black text-slate-900 block">{train.arrivalTime}</span>
                  <span className="text-xs text-slate-500">{train.toCode}</span>
                </div>
              </div>
            </div>

            {/* IRCTC Classes List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {train.classes.map((cls) => (
                <div
                  key={cls.classCode}
                  className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-brand-400 hover:bg-brand-50/20 transition group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-slate-900">{cls.className} ({cls.classCode})</span>
                    <span className="text-base font-extrabold text-slate-900">₹{cls.price}</span>
                  </div>

                  <div className="mb-3">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded border border-emerald-200 inline-block">
                      {cls.status}: {cls.seatsCount} Seats
                    </span>
                    {cls.confirmationChance && (
                      <span className="text-[10px] text-slate-500 block mt-1">
                        {cls.confirmationChance} Chance
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleBookTrainClass(train, cls)}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2 rounded-lg transition"
                  >
                    Book {cls.classCode}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrainsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Trains...</div>}>
      <TrainsContent />
    </Suspense>
  );
}
