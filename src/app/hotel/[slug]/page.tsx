'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Star,
  Check,
  ShieldCheck,
  Calendar,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Share2,
  Heart,
  Coffee,
  Waves,
  Wifi,
  Car,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { HotelRoom } from '@/types/travel';

export default function HotelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { hotels, initiateBooking } = useBooking();

  const hotel = hotels.find((h) => h.slug === resolvedParams.slug) || hotels[0];

  const [activeImage, setActiveImage] = useState(hotel.mainImage);
  const [checkInDate, setCheckInDate] = useState('2026-11-12');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-14'); // 2 nights default
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom>(hotel.rooms[0]);

  // Calculate nights
  const nights = Math.max(1, Math.round((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24))) || 2;

  const handleSelectRoomAndBook = (room: HotelRoom) => {
    const baseAmount = room.pricePerNight * nights;
    const taxes = Math.round(baseAmount * 0.18);
    const totalPayable = baseAmount + taxes;

    initiateBooking({
      category: 'hotels',
      title: hotel.name,
      subtitle: `${room.name} (${nights} Nights • ${guestsCount} Guests)`,
      destination: hotel.city,
      image: room.image || hotel.mainImage,
      travelDate: checkInDate,
      returnDate: checkOutDate,
      unitPrice: room.pricePerNight,
      quantity: nights,
      baseAmount,
      taxes,
      discountAmount: 0,
      totalPayable,
      travellers: [
        { name: 'Lead Guest', age: 32, gender: 'Male' }
      ],
      itemDetails: {
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomName: room.name,
        bedType: room.bedType,
        nights,
        checkIn: `${checkInDate} (${hotel.checkInTime})`,
        checkOut: `${checkOutDate} (${hotel.checkOutTime})`,
        inclusions: room.inclusions,
        cancellationPolicy: room.cancellationPolicy,
        address: hotel.address
      }
    });

    router.push('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/hotels" className="hover:text-brand-600">Hotels</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{hotel.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Title & Location Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-brand-200">
                {hotel.propertyType}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(hotel.starRating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {hotel.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-coral-500 shrink-0" />
              <span>{hotel.address}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs self-start md:self-auto">
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600 block">{hotel.ratingBadge}</span>
              <span className="text-[11px] text-slate-400">{hotel.reviewCount} verified reviews</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white font-black text-lg flex items-center justify-center shadow-sm">
              {hotel.rating}
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <div className="md:col-span-3 rounded-2xl overflow-hidden aspect-16/10 bg-slate-200">
            <img
              src={activeImage}
              alt={hotel.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-1 gap-2.5">
            {hotel.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`rounded-xl overflow-hidden aspect-16/10 cursor-pointer border-2 transition ${
                  activeImage === img ? 'border-brand-600 ring-2 ring-brand-200' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Content & Booking Sticky Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900">About the Property</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{hotel.description}</p>
              
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-2">Location Highlights:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {hotel.locationHighlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Amenities */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">Amenities & Perks</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium text-slate-700">
                {hotel.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Room Options */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">Available Room Options</h2>
              {hotel.rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-brand-400 transition flex flex-col md:flex-row gap-6"
                >
                  <div className="w-full md:w-56 h-40 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-extrabold text-slate-900">{room.name}</h3>
                        <span className="text-xs text-slate-500 font-medium">{room.areaSqFt} sq.ft</span>
                      </div>
                      <p className="text-xs text-slate-500">{room.bedType} • Fits up to {room.maxGuests} Guests</p>

                      <div className="mt-3 space-y-1 text-xs text-slate-600">
                        {room.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-emerald-600 font-semibold mt-2">
                        ✓ {room.cancellationPolicy}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs line-through text-slate-400">₹{room.originalPrice}</span>
                          <span className="text-xl font-black text-slate-900">₹{room.pricePerNight.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-slate-500">/ night</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectRoomAndBook(room)}
                        className="bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
                      >
                        Select Room & Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guest Reviews & Policies */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900">Demo Guest Reviews</h2>
              <div className="space-y-3">
                {hotel.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{rev.userName} ({rev.userCity})</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {rev.rating} / 5
                      </span>
                    </div>
                    <p className="text-slate-600 italic">"{rev.comment}"</p>
                    <span className="text-[10px] text-slate-400 block">{rev.tripType} Trip • {rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card sticky top-24 space-y-5">
              <div>
                <span className="text-xs text-slate-400 block">Starting from</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500">/ night</span>
                </div>
                <span className="text-xs text-slate-400 block">+ ₹{hotel.taxesAndFees} taxes & fees</span>
              </div>

              {/* Date pickers in widget */}
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
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Guests</span>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="text-xs font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer mt-0.5"
                  >
                    <option value={1}>1 Guest (1 Room)</option>
                    <option value={2}>2 Guests (1 Room)</option>
                    <option value={3}>3 Guests (1 Room)</option>
                    <option value={4}>4 Guests (2 Rooms)</option>
                  </select>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-xs text-slate-600 border border-slate-200/60">
                <div className="flex justify-between">
                  <span>₹{hotel.pricePerNight.toLocaleString('en-IN')} × {nights} Nights</span>
                  <span className="font-semibold text-slate-900">₹{(hotel.pricePerNight * nights).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & GST (18%)</span>
                  <span className="font-semibold text-slate-900">₹{Math.round(hotel.pricePerNight * nights * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-brand-600">
                    ₹{Math.round(hotel.pricePerNight * nights * 1.18).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSelectRoomAndBook(selectedRoom)}
                className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition"
              >
                PROCEED TO CHECKOUT
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulated booking • Instant confirmation voucher</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
