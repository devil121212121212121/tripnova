'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  MapPin,
  Star,
  Check,
  ShieldCheck,
  Users,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function VillaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { hotels, initiateBooking } = useBooking();

  const villa = hotels.find((h) => h.slug === resolvedParams.slug) || hotels.find((h) => h.propertyType === 'Villa') || hotels[0];

  const [activeImage, setActiveImage] = useState(villa.mainImage);
  const [checkInDate, setCheckInDate] = useState('2026-11-20');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-23'); // 3 nights default
  const [guestsCount, setGuestsCount] = useState(4);

  const nights = Math.max(1, Math.round((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24))) || 3;

  const handleBookVilla = () => {
    const baseAmount = villa.pricePerNight * nights;
    const taxes = Math.round(baseAmount * 0.18);
    const totalPayable = baseAmount + taxes;

    initiateBooking({
      category: 'villas',
      title: villa.name,
      subtitle: `Entire Villa Retreat (${nights} Nights • ${guestsCount} Guests)`,
      destination: villa.city,
      image: villa.mainImage,
      travelDate: checkInDate,
      returnDate: checkOutDate,
      unitPrice: villa.pricePerNight,
      quantity: nights,
      baseAmount,
      taxes,
      discountAmount: 0,
      totalPayable,
      travellers: [
        { name: 'Lead Guest', age: 34, gender: 'Male' }
      ],
      itemDetails: {
        villaId: villa.id,
        villaName: villa.name,
        nights,
        checkIn: `${checkInDate} (${villa.checkInTime})`,
        checkOut: `${checkOutDate} (${villa.checkOutTime})`,
        address: villa.address,
        amenities: villa.amenities,
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
          <Link href="/villas" className="hover:text-brand-600">Villas</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{villa.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-coral-50 text-coral-600 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-coral-200">
                Luxury Villa Retreat
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(villa.starRating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {villa.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-coral-500 shrink-0" />
              <span>{villa.address}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs self-start md:self-auto">
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600 block">{villa.ratingBadge}</span>
              <span className="text-[11px] text-slate-400">{villa.reviewCount} reviews</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white font-black text-lg flex items-center justify-center shadow-sm">
              {villa.rating}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <div className="md:col-span-3 rounded-2xl overflow-hidden aspect-16/10 bg-slate-200">
            <img src={activeImage} alt={villa.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2.5">
            {villa.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`rounded-xl overflow-hidden aspect-16/10 cursor-pointer border-2 transition ${
                  activeImage === img ? 'border-brand-600 ring-2 ring-brand-200' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Villa Photo" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900">About this Villa Estate</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{villa.description}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">Villa Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium text-slate-700">
                {villa.amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">House Rules & Check-In</h2>
              <ul className="space-y-2 text-xs text-slate-600">
                {villa.houseRules.map((rule, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card sticky top-24 space-y-5">
              <div>
                <span className="text-xs text-slate-400 block">Whole Villa Rate</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{villa.pricePerNight.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500">/ night</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-In</span>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="text-xs font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-Out</span>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="text-xs font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Guests Capacity</span>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="text-xs font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer mt-0.5"
                  >
                    <option value={2}>Up to 2 Guests (Whole Villa)</option>
                    <option value={4}>Up to 4 Guests (Whole Villa)</option>
                    <option value={6}>Up to 6 Guests (Whole Villa)</option>
                    <option value={8}>Up to 8 Guests (Whole Villa)</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-xs text-slate-600 border border-slate-200/60">
                <div className="flex justify-between">
                  <span>₹{villa.pricePerNight.toLocaleString('en-IN')} × {nights} Nights</span>
                  <span className="font-semibold text-slate-900">₹{(villa.pricePerNight * nights).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & GST (18%)</span>
                  <span className="font-semibold text-slate-900">₹{Math.round(villa.pricePerNight * nights * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-brand-600">
                    ₹{Math.round(villa.pricePerNight * nights * 1.18).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBookVilla}
                className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition"
              >
                BOOK THIS VILLA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
