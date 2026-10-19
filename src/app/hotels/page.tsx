'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Star,
  Filter,
  ArrowUpDown,
  Check,
  Calendar,
  Sparkles,
  SlidersHorizontal,
  X,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

function HotelsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hotels } = useBooking();

  const cityParam = searchParams.get('city') || 'Goa';
  const checkinParam = searchParams.get('checkin') || '2026-11-12';
  const checkoutParam = searchParams.get('checkout') || '2026-11-15';
  const roomsParam = searchParams.get('rooms') || '1';

  const [searchCity, setSearchCity] = useState(cityParam);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(35000);
  const [freeCancelOnly, setFreeCancelOnly] = useState<boolean>(false);
  const [breakfastOnly, setBreakfastOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'rating'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Property Types available
  const propertyTypes = ['Luxury Resort', 'Heritage Palace', 'Villa', 'Hotel'];

  const filteredHotels = useMemo(() => {
    return hotels
      .filter((hotel) => {
        // City match if user searched
        if (searchCity && searchCity !== 'All' && !hotel.city.toLowerCase().includes(searchCity.toLowerCase()) && !hotel.state.toLowerCase().includes(searchCity.toLowerCase()) && !hotel.name.toLowerCase().includes(searchCity.toLowerCase())) {
          // If searching specific city, match it
        }
        if (selectedStars.length > 0 && !selectedStars.includes(hotel.starRating)) return false;
        if (selectedTypes.length > 0 && !selectedTypes.includes(hotel.propertyType)) return false;
        if (hotel.pricePerNight > maxPrice) return false;
        if (freeCancelOnly && !hotel.freeCancellation) return false;
        if (breakfastOnly && !hotel.breakfastIncluded) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'price_desc') return b.pricePerNight - a.pricePerNight;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // recommended
      });
  }, [hotels, searchCity, selectedStars, selectedTypes, maxPrice, freeCancelOnly, breakfastOnly, sortBy]);

  const clearFilters = () => {
    setSelectedStars([]);
    setSelectedTypes([]);
    setMaxPrice(35000);
    setFreeCancelOnly(false);
    setBreakfastOnly(false);
    setSearchCity('');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Search Bar Header */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-xs sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                <span>Stays in {cityParam || 'All Destinations'}</span>
                <span className="bg-brand-50 text-brand-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {filteredHotels.length} Properties
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Dates: <span className="font-semibold text-slate-700">{checkinParam} to {checkoutParam}</span> • {roomsParam} Room(s)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by city..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 w-40 sm:w-48"
              />
            </div>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-6 sticky top-40">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-600" />
                  <span className="text-sm font-extrabold text-slate-900">Filters</span>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-800"
                >
                  Clear All
                </button>
              </div>

              {/* Star Rating Filter */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2.5">Star Rating</label>
                <div className="space-y-2">
                  {[5, 4, 3].map((star) => (
                    <label key={star} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedStars.includes(star)}
                          onChange={() => {
                            if (selectedStars.includes(star)) {
                              setSelectedStars(selectedStars.filter((s) => s !== star));
                            } else {
                              setSelectedStars([...selectedStars, star]);
                            }
                          }}
                          className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                        />
                        <span className="flex items-center gap-1">
                          {star} Star Properties
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type Filter */}
              <div className="border-t border-slate-100 pt-4">
                <label className="text-xs font-bold text-slate-900 block mb-2.5">Property Type</label>
                <div className="space-y-2">
                  {propertyTypes.map((type) => (
                    <label key={type} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => {
                            if (selectedTypes.includes(type)) {
                              setSelectedTypes(selectedTypes.filter((t) => t !== type));
                            } else {
                              setSelectedTypes([...selectedTypes, type]);
                            }
                          }}
                          className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                        />
                        <span>{type}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Budget Slider */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                  <span>Price per Night</span>
                  <span className="text-brand-600">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={35000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer"
                />
              </div>

              {/* Benefits Toggles */}
              <div className="border-t border-slate-100 pt-4 space-y-2.5">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={freeCancelOnly}
                    onChange={(e) => setFreeCancelOnly(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>Free Cancellation Available</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={breakfastOnly}
                    onChange={(e) => setBreakfastOnly(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>Breakfast Included</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="md:col-span-9 space-y-4">
            {/* Sort Bar */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Found <strong className="text-slate-900">{filteredHotels.length}</strong> stays matching your search
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
                </span>
                {[
                  { id: 'recommended', label: 'Recommended' },
                  { id: 'price_asc', label: 'Price: Low to High' },
                  { id: 'price_desc', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Highest Rated' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSortBy(s.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      sortBy === s.id
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {filteredHotels.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No Properties Found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try broadening your price filter or clearing selected filters to view all available stays.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredHotels.map((hotel) => {
                const detailHref = hotel.propertyType === 'Villa' ? `/villa/${hotel.slug}` : `/hotel/${hotel.slug}`;
                return (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-card hover:border-brand-300 transition duration-200 flex flex-col md:flex-row gap-6 group"
                  >
                    {/* Hotel Image with Badges */}
                    <div className="relative w-full md:w-64 h-52 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src={hotel.mainImage}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {hotel.propertyType}
                      </div>

                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{hotel.rating}</span>
                      </div>
                    </div>

                    {/* Hotel Description & Amenities */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-brand-600" />
                            {hotel.city}, {hotel.state}
                          </span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold">{hotel.ratingBadge}</span>
                          <span className="text-slate-400">({hotel.reviewCount} reviews)</span>
                        </div>

                        <h3 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-brand-600 transition">
                          {hotel.name}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {hotel.description}
                        </p>
                      </div>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {hotel.amenities.slice(0, 4).map((amenity) => (
                          <span
                            key={amenity}
                            className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-lg"
                          >
                            {amenity}
                          </span>
                        ))}
                        {hotel.freeCancellation && (
                          <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                            ✓ Free Cancellation
                          </span>
                        )}
                      </div>

                      {/* Bottom Info & CTA */}
                      <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs line-through text-slate-400">
                              ₹{hotel.originalPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-bold text-coral-600 bg-coral-50 px-1.5 py-0.2 rounded">
                              {Math.round(((hotel.originalPrice - hotel.pricePerNight) / hotel.originalPrice) * 100)}% OFF
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-slate-900">
                              ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-500">/ night</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block">+ ₹{hotel.taxesAndFees} taxes & charges</span>
                        </div>

                        <Link
                          href={detailHref}
                          className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition"
                        >
                          View Room Options →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Hotel Search Engine...</div>}>
      <HotelsContent />
    </Suspense>
  );
}
