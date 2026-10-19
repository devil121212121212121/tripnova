'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Palmtree,
  Clock,
  Star,
  Plane,
  Check,
  X,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { packages, initiateBooking } = useBooking();

  const pkg = packages.find((p) => p.slug === resolvedParams.slug) || packages[0];

  const [activeDay, setActiveDay] = useState<number>(1);
  const [travellersCount, setTravellersCount] = useState<number>(2);
  const [departureDate, setDepartureDate] = useState<string>('2026-11-15');

  const unitPrice = pkg.pricePerPerson;
  const baseAmount = unitPrice * travellersCount;
  const taxes = Math.round(baseAmount * 0.05); // 5% GST on tour packages
  const totalPayable = baseAmount + taxes;

  const handleBookPackage = () => {
    initiateBooking({
      category: 'packages',
      title: pkg.title,
      subtitle: `${pkg.durationDays} Days / ${pkg.durationNights} Nights • ${travellersCount} Person(s)`,
      destination: pkg.destination,
      image: pkg.heroImage,
      travelDate: departureDate,
      unitPrice,
      quantity: travellersCount,
      baseAmount,
      taxes,
      discountAmount: 0,
      totalPayable,
      travellers: [
        { name: 'Lead Traveller', age: 31, gender: 'Male' },
        ...(travellersCount > 1 ? [{ name: 'Companion', age: 29, gender: 'Female' as const }] : [])
      ],
      itemDetails: {
        packageId: pkg.id,
        packageTitle: pkg.title,
        duration: `${pkg.durationDays} Days / ${pkg.durationNights} Nights`,
        flightsIncluded: pkg.flightsIncluded,
        hotelCategory: pkg.hotelCategory,
        inclusions: pkg.inclusions,
      }
    });

    router.push('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/packages" className="hover:text-brand-600">Packages</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{pkg.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-brand-200">
                {pkg.theme} Tour
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {pkg.destination}, {pkg.country}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {pkg.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs self-start md:self-auto">
            <Clock className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-extrabold text-slate-900">
              {pkg.durationDays} Days / {pkg.durationNights} Nights
            </span>
          </div>
        </div>

        {/* Hero Gallery Aspect */}
        <div className="relative rounded-2xl overflow-hidden aspect-21/9 bg-slate-200 mb-8 max-h-[420px]">
          <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 text-white">
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                🏨 {pkg.hotelCategory}
              </span>
              {pkg.flightsIncluded && (
                <span className="bg-emerald-600/90 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5" /> Return Flights Included
                </span>
              )}
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {pkg.rating} ({pkg.reviewCount} Reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Itinerary & Inclusions */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">Tour Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{pkg.overview}</p>
            </div>

            {/* Day by Day Itinerary */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Day-Wise Detailed Itinerary</h2>
                <span className="text-xs text-brand-600 font-bold">{pkg.itinerary.length} Days Planned</span>
              </div>

              <div className="space-y-3 pt-2">
                {pkg.itinerary.map((dayItem) => {
                  const isOpen = activeDay === dayItem.day;
                  return (
                    <div
                      key={dayItem.day}
                      className="rounded-xl border border-slate-200 overflow-hidden transition"
                    >
                      <button
                        onClick={() => setActiveDay(isOpen ? 0 : dayItem.day)}
                        className={`w-full flex items-center justify-between p-4 text-left transition ${
                          isOpen ? 'bg-brand-50/60 text-brand-900 font-extrabold' : 'bg-slate-50 text-slate-800 font-bold hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                            isOpen ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                          }`}>
                            D{dayItem.day}
                          </span>
                          <span className="text-sm">{dayItem.title}</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-brand-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-5 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-3">
                          <p className="leading-relaxed">{dayItem.description}</p>

                          <div>
                            <span className="font-bold text-slate-900 text-xs block mb-1">Key Activities:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {dayItem.activities.map((act, i) => (
                                <span key={i} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                                  ✓ {act}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <span>Meals: <strong className="text-slate-800">{dayItem.mealsIncluded.join(', ') || 'Self'}</strong></span>
                            <span>Stay: <strong className="text-slate-800">{dayItem.stayCity}</strong></span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-base">
                  <Check className="w-5 h-5" />
                  <span>What's Included</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-red-600 font-extrabold text-base">
                  <X className="w-5 h-5" />
                  <span>What's Excluded</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Box */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card sticky top-24 space-y-5">
              <div>
                <span className="text-xs text-slate-400 block">Package Price</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500">/ person</span>
                </div>
                <span className="text-xs line-through text-slate-400">
                  ₹{pkg.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Booking controls */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Travel Date</span>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="text-xs font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer mt-1"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Number of Travellers</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-slate-900 text-sm">{travellersCount} Person(s)</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={travellersCount <= 1}
                        onClick={() => setTravellersCount(travellersCount - 1)}
                        className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700 disabled:opacity-40"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setTravellersCount(travellersCount + 1)}
                        className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-xs text-slate-600 border border-slate-200/60">
                <div className="flex justify-between">
                  <span>₹{unitPrice.toLocaleString('en-IN')} × {travellersCount} Travellers</span>
                  <span className="font-semibold text-slate-900">₹{baseAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Tourism Taxes (5%)</span>
                  <span className="font-semibold text-slate-900">₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-brand-600">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleBookPackage}
                className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition"
              >
                BOOK THIS PACKAGE
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulated booking • Instant travel voucher</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
