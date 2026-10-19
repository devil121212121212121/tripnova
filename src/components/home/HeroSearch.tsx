'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plane,
  Building2,
  Home,
  Palmtree,
  Bus as BusIcon,
  Train as TrainIcon,
  Car,
  Calendar,
  Users,
  ArrowRightLeft,
  Search,
  Sparkles,
  ChevronDown,
  Check,
  MapPin,
  Clock,
  Shield,
  Percent,
} from 'lucide-react';
import { TravelCategory } from '@/types/travel';

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TravelCategory>('flights');

  // Flight states
  const [flightTripType, setFlightTripType] = useState<'oneway' | 'roundtrip'>('oneway');
  const [flightFrom, setFlightFrom] = useState({ city: 'New Delhi', code: 'DEL', airport: 'Indira Gandhi Int\'l Airport' });
  const [flightTo, setFlightTo] = useState({ city: 'Goa', code: 'GOI', airport: 'Dabolim Airport' });
  const [flightDepDate, setFlightDepDate] = useState('2026-11-12');
  const [flightRetDate, setFlightRetDate] = useState('2026-11-16');
  const [flightTravellers, setFlightTravellers] = useState({ adults: 1, children: 0, cabin: 'Economy' });
  const [flightDropdownOpen, setFlightDropdownOpen] = useState(false);
  const [flightFareType, setFlightFareType] = useState('Regular');

  // Hotel states
  const [hotelCity, setHotelCity] = useState('Goa');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-11-12');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-11-15');
  const [hotelGuests, setHotelGuests] = useState({ rooms: 1, adults: 2, children: 0 });
  const [hotelDropdownOpen, setHotelDropdownOpen] = useState(false);

  // Villa states
  const [villaLocation, setVillaLocation] = useState('Goa');
  const [villaCheckIn, setVillaCheckIn] = useState('2026-11-20');
  const [villaCheckOut, setVillaCheckOut] = useState('2026-11-23');
  const [villaGuests, setVillaGuests] = useState('4 Guests • 2 Bedrooms');

  // Package states
  const [packageDest, setPackageDest] = useState('Kashmir');
  const [packageDuration, setPackageDuration] = useState('All Durations');
  const [packageTravellers, setPackageTravellers] = useState('2 Adults');

  // Bus states
  const [busFrom, setBusFrom] = useState('New Delhi');
  const [busTo, setBusTo] = useState('Manali');
  const [busDate, setBusDate] = useState('2026-11-12');

  // Train states
  const [trainFrom, setTrainFrom] = useState({ station: 'New Delhi', code: 'NDLS' });
  const [trainTo, setTrainTo] = useState({ station: 'Varanasi Junction', code: 'BSB' });
  const [trainDate, setTrainDate] = useState('2026-11-15');
  const [trainClass, setTrainClass] = useState('All Classes');

  // Cab states
  const [cabType, setCabType] = useState<'outstation' | 'airport'>('outstation');
  const [cabFrom, setCabFrom] = useState('New Delhi');
  const [cabTo, setCabTo] = useState('Agra');
  const [cabDate, setCabDate] = useState('2026-11-12');

  // Handlers
  const handleSwapAirports = () => {
    const temp = flightFrom;
    setFlightFrom(flightTo);
    setFlightTo(temp);
  };

  const handleSearchFlights = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/flights?from=${flightFrom.code}&to=${flightTo.code}&dep=${flightDepDate}&type=${flightTripType}&adults=${flightTravellers.adults}`);
  };

  const handleSearchHotels = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/hotels?city=${encodeURIComponent(hotelCity)}&checkin=${hotelCheckIn}&checkout=${hotelCheckOut}&rooms=${hotelGuests.rooms}`);
  };

  const handleSearchVillas = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/villas?city=${encodeURIComponent(villaLocation)}`);
  };

  const handleSearchPackages = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/packages?dest=${encodeURIComponent(packageDest)}`);
  };

  const handleSearchBuses = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/buses?from=${encodeURIComponent(busFrom)}&to=${encodeURIComponent(busTo)}&date=${busDate}`);
  };

  const handleSearchTrains = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/trains?from=${trainFrom.code}&to=${trainTo.code}&date=${trainDate}`);
  };

  const handleSearchCabs = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/cabs?from=${encodeURIComponent(cabFrom)}&to=${encodeURIComponent(cabTo)}&date=${cabDate}`);
  };

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'villas', label: 'Villas & Homestays', icon: Home },
    { id: 'packages', label: 'Holiday Packages', icon: Palmtree },
    { id: 'buses', label: 'Buses', icon: BusIcon },
    { id: 'trains', label: 'Trains', icon: TrainIcon },
    { id: 'cabs', label: 'Cabs', icon: Car },
  ];

  return (
    <div className="relative">
      {/* Background Hero Banner */}
      <div className="relative bg-gradient-to-b from-brand-950 via-brand-900 to-slate-900 pt-10 pb-32 md:pb-36 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
        {/* Subtle background ambient circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-coral-300 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-coral-400" />
            <span>Discover India & Global Destinations with Unrivalled Luxury</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Seamless Journeys, <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-400 via-amber-300 to-coral-400">Extraordinary Stays</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Book verified flights, curated 5-star palace hotels, private jungle villas and all-inclusive holiday packages with transparent pricing.
          </p>
        </div>
      </div>

      {/* Floating Hero Search Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 relative z-20 pb-8">
        <div className="bg-white rounded-3xl shadow-hero border border-slate-100 overflow-hidden">
          {/* Top Category Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar bg-slate-50/70 p-2 sm:p-2.5 gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TravelCategory)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Containers */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* 1. FLIGHTS FORM */}
            {activeTab === 'flights' && (
              <form onSubmit={handleSearchFlights} className="space-y-5">
                {/* Trip Type Radios & Special Fares */}
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tripType"
                        checked={flightTripType === 'oneway'}
                        onChange={() => setFlightTripType('oneway')}
                        className="text-brand-600 focus:ring-brand-500 w-4 h-4"
                      />
                      <span>One Way</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tripType"
                        checked={flightTripType === 'roundtrip'}
                        onChange={() => setFlightTripType('roundtrip')}
                        className="text-brand-600 focus:ring-brand-500 w-4 h-4"
                      />
                      <span>Round Trip</span>
                    </label>
                  </div>

                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-slate-400 font-normal">Special Fares:</span>
                    {['Regular', 'Armed Forces', 'Student', 'Senior Citizen'].map((fare) => (
                      <button
                        key={fare}
                        type="button"
                        onClick={() => setFlightFareType(fare)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                          flightFareType === fare
                            ? 'bg-brand-50 border-brand-500 text-brand-700'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {fare}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Flight Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4 relative">
                  {/* From Airport */}
                  <div className="md:col-span-3 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      From City / Airport
                    </span>
                    <input
                      type="text"
                      value={flightFrom.city}
                      onChange={(e) => setFlightFrom({ ...flightFrom, city: e.target.value })}
                      className="text-lg lg:text-xl font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 truncate block mt-0.5">
                      [{flightFrom.code}] {flightFrom.airport}
                    </span>
                  </div>

                  {/* Swap Airport Button */}
                  <div className="hidden md:flex absolute left-[24.5%] top-1/2 -translate-y-1/2 z-10">
                    <button
                      type="button"
                      onClick={handleSwapAirports}
                      className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-brand-600 hover:scale-110 active:rotate-180 transition-all duration-300"
                      title="Swap Departure and Arrival"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* To Airport */}
                  <div className="md:col-span-3 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      To City / Airport
                    </span>
                    <input
                      type="text"
                      value={flightTo.city}
                      onChange={(e) => setFlightTo({ ...flightTo, city: e.target.value })}
                      className="text-lg lg:text-xl font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 truncate block mt-0.5">
                      [{flightTo.code}] {flightTo.airport}
                    </span>
                  </div>

                  {/* Departure Date */}
                  <div className="md:col-span-2 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-600" /> Departure
                    </span>
                    <input
                      type="date"
                      value={flightDepDate}
                      onChange={(e) => setFlightDepDate(e.target.value)}
                      className="text-sm lg:text-base font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-500 block mt-0.5">Thursday</span>
                  </div>

                  {/* Return Date */}
                  <div className={`md:col-span-2 bg-slate-50 p-3.5 rounded-2xl border transition ${
                    flightTripType === 'roundtrip'
                      ? 'border-slate-200 hover:bg-brand-50/30'
                      : 'border-dashed border-slate-200 opacity-60'
                  }`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-600" /> Return
                    </span>
                    {flightTripType === 'roundtrip' ? (
                      <input
                        type="date"
                        value={flightRetDate}
                        onChange={(e) => setFlightRetDate(e.target.value)}
                        className="text-sm lg:text-base font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setFlightTripType('roundtrip')}
                        className="text-xs text-brand-600 font-semibold hover:underline mt-1 block"
                      >
                        + Add Return Flight
                      </button>
                    )}
                  </div>

                  {/* Travellers & Cabin Class */}
                  <div className="md:col-span-2 relative">
                    <div
                      onClick={() => setFlightDropdownOpen(!flightDropdownOpen)}
                      className="bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition cursor-pointer"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                        <Users className="w-3 h-3 text-brand-600" /> Travellers & Class
                      </span>
                      <div className="text-sm lg:text-base font-extrabold text-slate-900 truncate">
                        {flightTravellers.adults + flightTravellers.children} Traveller(s)
                      </div>
                      <span className="text-[11px] text-brand-600 font-semibold block truncate mt-0.5">
                        {flightTravellers.cabin}
                      </span>
                    </div>

                    {flightDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-bold text-slate-900">Adults (12+ yrs)</p>
                              <p className="text-[10px] text-slate-500">On the day of travel</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                disabled={flightTravellers.adults <= 1}
                                onClick={() => setFlightTravellers({ ...flightTravellers, adults: flightTravellers.adults - 1 })}
                                className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700 disabled:opacity-40"
                              >
                                -
                              </button>
                              <span className="text-sm font-bold w-4 text-center">{flightTravellers.adults}</span>
                              <button
                                type="button"
                                onClick={() => setFlightTravellers({ ...flightTravellers, adults: flightTravellers.adults + 1 })}
                                className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="border-t border-slate-100 pt-3">
                            <label className="text-xs font-bold text-slate-900 block mb-2">Cabin Class</label>
                            <div className="grid grid-cols-1 gap-1">
                              {['Economy', 'Premium Economy', 'Business'].map((cls) => (
                                <button
                                  key={cls}
                                  type="button"
                                  onClick={() => setFlightTravellers({ ...flightTravellers, cabin: cls })}
                                  className={`px-3 py-1.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between ${
                                    flightTravellers.cabin === cls ? 'bg-brand-50 text-brand-600' : 'hover:bg-slate-50 text-slate-700'
                                  }`}
                                >
                                  <span>{cls}</span>
                                  {flightTravellers.cabin === cls && <Check className="w-3.5 h-3.5 text-brand-600" />}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setFlightDropdownOpen(false)}
                            className="w-full bg-brand-600 text-white text-xs font-bold py-2 rounded-xl"
                          >
                            Apply Selection
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Search CTA */}
                <div className="flex items-center justify-center pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-base font-extrabold px-10 py-4 rounded-2xl shadow-lg shadow-coral-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                    <span>SEARCH FLIGHTS</span>
                  </button>
                </div>
              </form>
            )}

            {/* 2. HOTELS FORM */}
            {activeTab === 'hotels' && (
              <form onSubmit={handleSearchHotels} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* City or Destination */}
                  <div className="md:col-span-4 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-600" /> City, Property Name or Location
                    </span>
                    <input
                      type="text"
                      value={hotelCity}
                      onChange={(e) => setHotelCity(e.target.value)}
                      placeholder="e.g. Goa, Manali, Jaipur, Dubai, Bali"
                      className="text-lg lg:text-xl font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 block mt-0.5">India & International Destinations</span>
                  </div>

                  {/* Check-In */}
                  <div className="md:col-span-3 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-600" /> Check-In Date
                    </span>
                    <input
                      type="date"
                      value={hotelCheckIn}
                      onChange={(e) => setHotelCheckIn(e.target.value)}
                      className="text-sm lg:text-base font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-500 block mt-0.5">From 2:00 PM standard</span>
                  </div>

                  {/* Check-Out */}
                  <div className="md:col-span-3 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-600" /> Check-Out Date
                    </span>
                    <input
                      type="date"
                      value={hotelCheckOut}
                      onChange={(e) => setHotelCheckOut(e.target.value)}
                      className="text-sm lg:text-base font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-500 block mt-0.5">Until 12:00 PM standard</span>
                  </div>

                  {/* Rooms & Guests */}
                  <div className="md:col-span-2 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Users className="w-3 h-3 text-brand-600" /> Rooms & Guests
                    </span>
                    <div className="text-base font-extrabold text-slate-900">
                      {hotelGuests.rooms} Room, {hotelGuests.adults} Guests
                    </div>
                    <span className="text-[11px] text-brand-600 font-semibold block mt-0.5">Click to customize</span>
                  </div>
                </div>

                {/* Popular City Chips */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Trending searches:</span>
                  {['Goa Beach Resorts', 'Manali Snow Chalets', 'Jaipur Royal Palaces', 'Udaipur Lake Pichola', 'Dubai Palm Jumeirah'].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setHotelCity(chip.split(' ')[0])}
                      className="bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-700 px-3 py-1 rounded-full font-medium transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-base font-extrabold px-10 py-4 rounded-2xl shadow-lg shadow-coral-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                    <span>SEARCH HOTELS</span>
                  </button>
                </div>
              </form>
            )}

            {/* 3. VILLAS FORM */}
            {activeTab === 'villas' && (
              <form onSubmit={handleSearchVillas} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Destination / City
                    </span>
                    <input
                      type="text"
                      value={villaLocation}
                      onChange={(e) => setVillaLocation(e.target.value)}
                      placeholder="e.g. Goa, Lonavala, Alibaug, Bali, Srinagar"
                      className="text-lg lg:text-xl font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 block mt-0.5">Private pool villas, estates & homestays</span>
                  </div>

                  <div className="md:col-span-3 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Check-In & Check-Out
                    </span>
                    <input
                      type="date"
                      value={villaCheckIn}
                      onChange={(e) => setVillaCheckIn(e.target.value)}
                      className="text-sm font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-500 block mt-0.5">Flexible cancellation available</span>
                  </div>

                  <div className="md:col-span-4 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Guests & Bedrooms
                    </span>
                    <input
                      type="text"
                      value={villaGuests}
                      onChange={(e) => setVillaGuests(e.target.value)}
                      className="text-base font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-brand-600 font-semibold block mt-0.5">Private chef & caretaker included</span>
                  </div>
                </div>

                <div className="flex items-center justify-center pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-base font-extrabold px-10 py-4 rounded-2xl shadow-lg shadow-coral-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                    <span>SEARCH VILLAS</span>
                  </button>
                </div>
              </form>
            )}

            {/* 4. PACKAGES FORM */}
            {activeTab === 'packages' && (
              <form onSubmit={handleSearchPackages} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Holiday Destination
                    </span>
                    <input
                      type="text"
                      value={packageDest}
                      onChange={(e) => setPackageDest(e.target.value)}
                      placeholder="e.g. Kashmir, Bali, Dubai, Rajasthan, Himachal, Goa"
                      className="text-lg lg:text-xl font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 block mt-0.5">All-inclusive guided & self-drive circuits</span>
                  </div>

                  <div className="md:col-span-4 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Trip Duration
                    </span>
                    <select
                      value={packageDuration}
                      onChange={(e) => setPackageDuration(e.target.value)}
                      className="text-base font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                    >
                      <option>All Durations</option>
                      <option>3 - 4 Nights (Quick Getaway)</option>
                      <option>5 - 7 Nights (Most Popular)</option>
                      <option>8+ Nights (Grand Tour)</option>
                    </select>
                    <span className="text-[11px] text-slate-500 block mt-0.5">With flights or land only</span>
                  </div>

                  <div className="md:col-span-3 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Travellers
                    </span>
                    <input
                      type="text"
                      value={packageTravellers}
                      onChange={(e) => setPackageTravellers(e.target.value)}
                      className="text-base font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-brand-600 font-semibold block mt-0.5">Honeymoon / Family special</span>
                  </div>
                </div>

                <div className="flex items-center justify-center pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-base font-extrabold px-10 py-4 rounded-2xl shadow-lg shadow-coral-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                    <span>EXPLORE HOLIDAY PACKAGES</span>
                  </button>
                </div>
              </form>
            )}

            {/* 5. BUSES FORM */}
            {activeTab === 'buses' && (
              <form onSubmit={handleSearchBuses} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      From City
                    </span>
                    <input
                      type="text"
                      value={busFrom}
                      onChange={(e) => setBusFrom(e.target.value)}
                      className="text-lg font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 block mt-0.5">Major ISBT and boarding points</span>
                  </div>

                  <div className="md:col-span-4 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      To City
                    </span>
                    <input
                      type="text"
                      value={busTo}
                      onChange={(e) => setBusTo(e.target.value)}
                      className="text-lg font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 block mt-0.5">Volvo Multi-Axle & BharatBenz</span>
                  </div>

                  <div className="md:col-span-3 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Travel Date
                    </span>
                    <input
                      type="date"
                      value={busDate}
                      onChange={(e) => setBusDate(e.target.value)}
                      className="text-base font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                    />
                    <span className="text-[11px] text-brand-600 font-semibold block mt-0.5">Free sleeper blankets</span>
                  </div>
                </div>

                <div className="flex items-center justify-center pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-base font-extrabold px-10 py-4 rounded-2xl shadow-lg shadow-coral-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                    <span>SEARCH BUSES</span>
                  </button>
                </div>
              </form>
            )}

            {/* 6. TRAINS FORM */}
            {activeTab === 'trains' && (
              <form onSubmit={handleSearchTrains} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      From Station
                    </span>
                    <input
                      type="text"
                      value={trainFrom.station}
                      onChange={(e) => setTrainFrom({ ...trainFrom, station: e.target.value })}
                      className="text-lg font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 block mt-0.5">[{trainFrom.code}] New Delhi</span>
                  </div>

                  <div className="md:col-span-4 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      To Station
                    </span>
                    <input
                      type="text"
                      value={trainTo.station}
                      onChange={(e) => setTrainTo({ ...trainTo, station: e.target.value })}
                      className="text-lg font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 block mt-0.5">[{trainTo.code}] Varanasi</span>
                  </div>

                  <div className="md:col-span-2 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Date
                    </span>
                    <input
                      type="date"
                      value={trainDate}
                      onChange={(e) => setTrainDate(e.target.value)}
                      className="text-sm font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                    />
                  </div>

                  <div className="md:col-span-2 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Class
                    </span>
                    <select
                      value={trainClass}
                      onChange={(e) => setTrainClass(e.target.value)}
                      className="text-sm font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                    >
                      <option>All Classes</option>
                      <option>Executive (EC)</option>
                      <option>AC Chair Car (CC)</option>
                      <option>1st AC (1A)</option>
                      <option>2nd AC (2A)</option>
                      <option>3rd AC (3A)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-center pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-base font-extrabold px-10 py-4 rounded-2xl shadow-lg shadow-coral-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                    <span>SEARCH TRAINS</span>
                  </button>
                </div>
              </form>
            )}

            {/* 7. CABS FORM */}
            {activeTab === 'cabs' && (
              <form onSubmit={handleSearchCabs} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      From City / Airport
                    </span>
                    <input
                      type="text"
                      value={cabFrom}
                      onChange={(e) => setCabFrom(e.target.value)}
                      className="text-lg font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 block mt-0.5">Doorstep pickup available</span>
                  </div>

                  <div className="md:col-span-5 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      To Destination
                    </span>
                    <input
                      type="text"
                      value={cabTo}
                      onChange={(e) => setCabTo(e.target.value)}
                      className="text-lg font-extrabold text-slate-900 bg-transparent w-full focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 block mt-0.5">Outstation round-trip or one-way drop</span>
                  </div>

                  <div className="md:col-span-3 bg-slate-50 hover:bg-brand-50/30 p-3.5 rounded-2xl border border-slate-200 transition">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Pickup Date
                    </span>
                    <input
                      type="date"
                      value={cabDate}
                      onChange={(e) => setCabDate(e.target.value)}
                      className="text-base font-bold text-slate-900 bg-transparent w-full focus:outline-none cursor-pointer"
                    />
                    <span className="text-[11px] text-brand-600 font-semibold block mt-0.5">Zero cancellation fee</span>
                  </div>
                </div>

                <div className="flex items-center justify-center pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-base font-extrabold px-10 py-4 rounded-2xl shadow-lg shadow-coral-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                    <span>SEARCH CABS</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
