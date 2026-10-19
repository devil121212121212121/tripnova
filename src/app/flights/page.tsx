'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Plane,
  Clock,
  Filter,
  ArrowUpDown,
  Check,
  ChevronDown,
  Info,
  Calendar,
  Sparkles,
  SlidersHorizontal,
  X,
  Luggage,
  ShieldCheck,
  Coffee,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { Flight } from '@/types/travel';

function FlightsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { flights, initiateBooking } = useBooking();

  const fromParam = searchParams.get('from') || 'DEL';
  const toParam = searchParams.get('to') || 'GOI';
  const depParam = searchParams.get('dep') || '2026-11-12';
  const adultsParam = parseInt(searchParams.get('adults') || '1', 10);

  // Filters State
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [refundableOnly, setRefundableOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'earliest' | 'recommended'>('cheapest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedFareFlight, setSelectedFareFlight] = useState<Flight | null>(null);

  // Available Airlines for filter
  const allAirlines = useMemo(() => {
    return Array.from(new Set(flights.map((f) => f.airline)));
  }, [flights]);

  // Filter & Sort Logic
  const filteredFlights = useMemo(() => {
    return flights
      .filter((flight) => {
        if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) return false;
        if (selectedStops.length > 0 && !selectedStops.includes(flight.stops)) return false;
        if (flight.price > maxPrice) return false;
        if (refundableOnly && !flight.refundable) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'cheapest') return a.price - b.price;
        if (sortBy === 'fastest') return a.durationMinutes - b.durationMinutes;
        if (sortBy === 'earliest') return a.departureTime.localeCompare(b.departureTime);
        return 0; // recommended
      });
  }, [flights, selectedAirlines, selectedStops, maxPrice, refundableOnly, sortBy]);

  const handleBookFlight = (flight: Flight) => {
    const unitPrice = flight.price;
    const baseAmount = unitPrice * adultsParam;
    const taxes = Math.round(baseAmount * 0.16);
    const totalPayable = baseAmount + taxes;

    initiateBooking({
      category: 'flights',
      title: `${flight.fromCity} to ${flight.toCity} (${flight.airline} ${flight.flightNumber})`,
      subtitle: `${flight.departureTime} - ${flight.arrivalTime} • ${flight.cabinClass} • Non-stop`,
      destination: flight.toCity,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop',
      travelDate: depParam,
      unitPrice,
      quantity: adultsParam,
      baseAmount,
      taxes,
      discountAmount: 0,
      totalPayable,
      travellers: [
        { name: 'Primary Traveller', age: 30, gender: 'Male', seatNumber: '12A' }
      ],
      itemDetails: {
        flightId: flight.id,
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        fromCode: flight.fromCode,
        fromCity: flight.fromCity,
        fromAirport: flight.fromAirport,
        toCode: flight.toCode,
        toCity: flight.toCity,
        toAirport: flight.toAirport,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        duration: flight.duration,
        baggage: flight.baggage,
        aircraft: flight.aircraft,
        refundable: flight.refundable,
      }
    });

    router.push('/checkout');
  };

  const clearFilters = () => {
    setSelectedAirlines([]);
    setSelectedStops([]);
    setMaxPrice(25000);
    setRefundableOnly(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Search Criteria Bar */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-xs sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                <span>{fromParam}</span>
                <span className="text-slate-400">→</span>
                <span>{toParam}</span>
                <span className="bg-brand-50 text-brand-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                  One Way
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Departure: <span className="font-semibold text-slate-700">{depParam}</span> • {adultsParam} Adult(s) • Economy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3.5 py-2 rounded-xl transition"
            >
              Modify Search
            </button>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({selectedAirlines.length + selectedStops.length + (refundableOnly ? 1 : 0)})</span>
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

              {/* Stops Filter */}
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-2.5">Stops</label>
                <div className="space-y-2">
                  {[
                    { label: 'Non-Stop (Direct)', val: 0 },
                    { label: '1 Stop', val: 1 },
                  ].map((s) => (
                    <label key={s.val} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedStops.includes(s.val)}
                          onChange={() => {
                            if (selectedStops.includes(s.val)) {
                              setSelectedStops(selectedStops.filter((x) => x !== s.val));
                            } else {
                              setSelectedStops([...selectedStops, s.val]);
                            }
                          }}
                          className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                        />
                        <span>{s.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Airlines Filter */}
              <div className="border-t border-slate-100 pt-4">
                <label className="text-xs font-bold text-slate-900 block mb-2.5">Airlines</label>
                <div className="space-y-2">
                  {allAirlines.map((airline) => (
                    <label key={airline} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(airline)}
                          onChange={() => {
                            if (selectedAirlines.includes(airline)) {
                              setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
                            } else {
                              setSelectedAirlines([...selectedAirlines, airline]);
                            }
                          }}
                          className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                        />
                        <span>{airline}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                  <span>Max Fare</span>
                  <span className="text-brand-600">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={3500}
                  max={25000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer"
                />
              </div>

              {/* Refundable Toggle */}
              <div className="border-t border-slate-100 pt-4">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={refundableOnly}
                    onChange={(e) => setRefundableOnly(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>Show Refundable Fares Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Main Column */}
          <div className="md:col-span-9 space-y-4">
            {/* Sort Bar */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Showing <strong className="text-slate-900">{filteredFlights.length}</strong> available flights
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
                </span>
                {[
                  { id: 'cheapest', label: 'Cheapest' },
                  { id: 'fastest', label: 'Fastest' },
                  { id: 'earliest', label: 'Earliest' },
                  { id: 'recommended', label: 'Recommended' },
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

            {/* Empty State */}
            {filteredFlights.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Plane className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No Flights Match Your Filters</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting the maximum price slider or clearing your airline selection.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Flight Cards List */
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-card hover:border-brand-300 transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Airline & Schedule */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-6">
                    {/* Airline Logo & Name */}
                    <div className="flex items-center gap-3 sm:w-44 shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 shrink-0">
                        <Plane className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{flight.airline}</h4>
                        <span className="text-[11px] font-mono text-slate-400 block">{flight.flightNumber}</span>
                        <span className="text-[10px] text-slate-500">{flight.aircraft}</span>
                      </div>
                    </div>

                    {/* Flight Times & Duration */}
                    <div className="flex-1 flex items-center justify-between sm:justify-center gap-4 sm:gap-8 text-center">
                      <div className="text-left sm:text-center">
                        <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
                          {flight.departureTime}
                        </span>
                        <span className="text-xs font-bold text-slate-700">{flight.fromCode}</span>
                        <span className="text-[10px] text-slate-400 block truncate max-w-[90px]">{flight.fromCity}</span>
                      </div>

                      {/* Line with Duration */}
                      <div className="flex-1 max-w-[130px] flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-brand-500" />
                          <span>{flight.duration}</span>
                        </span>
                        <div className="w-full h-0.5 bg-slate-200 relative flex items-center justify-center">
                          <div className={`w-2 h-2 rounded-full ${flight.stops === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        </div>
                        <span className={`text-[10px] font-bold mt-1 ${flight.stops === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop`}
                        </span>
                      </div>

                      <div className="text-right sm:text-center">
                        <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
                          {flight.arrivalTime}
                        </span>
                        <span className="text-xs font-bold text-slate-700">{flight.toCode}</span>
                        <span className="text-[10px] text-slate-400 block truncate max-w-[90px]">{flight.toCity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 flex md:flex-col items-center md:items-end justify-between shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-xs line-through text-slate-400">
                        ₹{flight.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <div className="text-2xl font-black text-slate-900 leading-tight">
                        ₹{flight.price.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-slate-500 block">per adult + taxes</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedFareFlight(selectedFareFlight?.id === flight.id ? null : flight)}
                        className="text-[11px] font-bold text-slate-500 hover:text-brand-600 underline"
                      >
                        Fare Details
                      </button>
                      <button
                        onClick={() => handleBookFlight(flight)}
                        className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>

                  {/* Expanded Fare Breakdown Modal / Drawer */}
                  {selectedFareFlight?.id === flight.id && (
                    <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200 mt-3 md:col-span-12 text-xs text-slate-700 space-y-2">
                      <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-1.5">
                        <span>Fare Rules & Baggage Allowance</span>
                        <button onClick={() => setSelectedFareFlight(null)} className="text-slate-400 hover:text-slate-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="flex items-center gap-2">
                          <Luggage className="w-4 h-4 text-brand-600" />
                          <span>Cabin: <strong>{flight.baggage.cabin}</strong> • Check-in: <strong>{flight.baggage.checkIn}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>{flight.refundable ? 'Partially Refundable on cancellation' : 'Non-Refundable fare'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Coffee className="w-4 h-4 text-amber-600" />
                          <span>{flight.mealIncluded ? 'Complimentary Meal Included' : 'Meals Available for Purchase'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Flight Search Engine...</div>}>
      <FlightsContent />
    </Suspense>
  );
}
