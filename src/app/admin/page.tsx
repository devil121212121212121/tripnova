'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Building2,
  Plane,
  Palmtree,
  Tag,
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { Hotel, Flight, HolidayPackage, PromoOffer } from '@/types/travel';

export default function AdminDashboardPage() {
  const {
    bookings,
    hotels,
    packages,
    flights,
    promos,
    addHotel,
    deleteHotel,
    addFlight,
    deleteFlight,
    addPackage,
    deletePackage,
    addCoupon,
    deleteCoupon,
    updateBookingStatus,
    resetToDefaultData,
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'hotels' | 'flights' | 'packages' | 'coupons'>('overview');
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [bookingFilter, setBookingFilter] = useState<string>('all');
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // New Hotel Form State
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelCity, setNewHotelCity] = useState('');
  const [newHotelPrice, setNewHotelPrice] = useState(12000);
  const [newHotelType, setNewHotelType] = useState<'Hotel' | 'Luxury Resort' | 'Villa'>('Luxury Resort');

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponTitle, setNewCouponTitle] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('₹1,500 OFF');
  const [newCouponMin, setNewCouponMin] = useState(5000);

  // Computed KPIs
  const totalBookings = bookings.length;
  const hotelBookings = bookings.filter((b) => b.type === 'hotels' || b.type === 'villas').length;
  const flightBookings = bookings.filter((b) => b.type === 'flights').length;
  const packageBookings = bookings.filter((b) => b.type === 'packages').length;
  const totalGBV = bookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.totalPrice : 0), 0);

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'all') return true;
    return b.status.toLowerCase() === bookingFilter.toLowerCase();
  });

  const handleCreateHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName.trim() || !newHotelCity.trim()) return;

    const slug = newHotelName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newHotel: Hotel = {
      id: `hotel-${Date.now()}`,
      slug,
      name: newHotelName,
      tagline: `Premium ${newHotelType} in ${newHotelCity}`,
      propertyType: newHotelType,
      starRating: 5,
      rating: 4.8,
      reviewCount: 48,
      ratingBadge: 'Exceptional',
      city: newHotelCity,
      state: 'India',
      address: `Luxury Enclave, ${newHotelCity}`,
      locationHighlights: ['Centrally located', 'Complimentary airport shuttle'],
      pricePerNight: Number(newHotelPrice),
      originalPrice: Math.round(Number(newHotelPrice) * 1.3),
      taxesAndFees: Math.round(Number(newHotelPrice) * 0.18),
      mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop'
      ],
      amenities: ['Swimming Pool', 'Fine Dining', 'Free Wi-Fi', 'Spa', 'Valet Parking'],
      freeCancellation: true,
      breakfastIncluded: true,
      coupleFriendly: true,
      description: `A brand-new luxury addition to our verified portfolio in ${newHotelCity}. Featuring refined aesthetics and world-class hospitality.`,
      houseRules: ['Check-in: 2:00 PM', 'Check-out: 12:00 PM'],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM',
      rooms: [
        {
          id: `room-${Date.now()}`,
          name: 'Executive Deluxe Suite',
          bedType: '1 King Bed',
          maxGuests: 2,
          areaSqFt: 450,
          pricePerNight: Number(newHotelPrice),
          originalPrice: Math.round(Number(newHotelPrice) * 1.3),
          inclusions: ['Breakfast Included', 'Free Cancellation up to 24 hrs'],
          cancellationPolicy: 'Free cancellation 24h before arrival.',
          availableRooms: 5,
          image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop'
        }
      ],
      reviews: []
    };

    addHotel(newHotel);
    setShowAddHotelModal(false);
    setNewHotelName('');
    setNewHotelCity('');
    setNoticeMessage(`Hotel "${newHotelName}" added to live inventory.`);
    setTimeout(() => setNoticeMessage(null), 3500);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newPromo: PromoOffer = {
      id: `promo-${Date.now()}`,
      code: newCouponCode.toUpperCase().trim(),
      title: newCouponTitle || `${newCouponCode.toUpperCase()} Special Discount`,
      subtitle: `Instant savings on your next trip booking with code ${newCouponCode.toUpperCase()}`,
      discountValue: newCouponDiscount,
      minSpend: Number(newCouponMin),
      category: 'all',
      expiryDate: '31 Dec 2027',
      bannerImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop',
      terms: [`Valid on minimum order of ₹${Number(newCouponMin).toLocaleString('en-IN')}`, 'One-time use per customer']
    };

    addCoupon(newPromo);
    setShowAddCouponModal(false);
    setNewCouponCode('');
    setNewCouponTitle('');
    setNoticeMessage(`Coupon "${newPromo.code}" created and active.`);
    setTimeout(() => setNoticeMessage(null), 3500);
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-20">
      {/* Admin Top Navbar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Management Console
                </span>
                <span className="bg-brand-500/30 text-brand-300 border border-brand-400/40 text-[10px] font-bold px-2 py-0.2 rounded">
                  Live Sync
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-white">TripNova Admin Suite</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Reset inventory and simulated bookings to default seed data?')) {
                  resetToDefaultData();
                  setNoticeMessage('All inventory and bookings restored to initial defaults.');
                  setTimeout(() => setNoticeMessage(null), 3500);
                }
              }}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs"
            >
              <span>Back to Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {noticeMessage && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center">
          {noticeMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-2">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
            { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Briefcase },
            { id: 'hotels', label: `Hotels & Villas (${hotels.length})`, icon: Building2 },
            { id: 'flights', label: `Flights (${flights.length})`, icon: Plane },
            { id: 'packages', label: `Packages (${packages.length})`, icon: Palmtree },
            { id: 'coupons', label: `Coupons (${promos.length})`, icon: Tag },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Gross Booking Value</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  ₹{totalGBV.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                  ↑ Across {totalBookings} simulated orders
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Hotel Bookings</span>
                  <Building2 className="w-4 h-4 text-brand-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">{hotelBookings}</div>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">Resorts & Villas</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Flight Bookings</span>
                  <Plane className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">{flightBookings}</div>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">Domestic & International</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Holiday Packages</span>
                  <Palmtree className="w-4 h-4 text-coral-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">{packageBookings}</div>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">All-inclusive itineraries</span>
              </div>
            </div>

            {/* Quick Actions & Recent Bookings Preview */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Recent Customer Bookings</h3>
                  <p className="text-xs text-slate-500">Live feed of orders placed through the website</p>
                </div>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  View All ({bookings.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">Ref Code</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Trip Details</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-brand-700">#{b.reference}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-900">
                          {b.travellers[0]?.name || 'Customer'}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate">{b.title}</td>
                        <td className="py-3.5 px-4 text-slate-500">{b.travelDate}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">₹{b.totalPrice.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : b.status === 'Completed'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-red-50 text-red-600'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. BOOKINGS MANAGEMENT TAB */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Order & Reservation Records</h3>
                <p className="text-xs text-slate-500">Update status or inspect simulated payment proofs</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold">Filter:</span>
                {['all', 'confirmed', 'completed', 'cancelled'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setBookingFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                      bookingFilter === f
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Reference</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Item Details</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4">Live Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-700">#{b.reference}</td>
                      <td className="py-3.5 px-4 capitalize font-medium">{b.type}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-900 block">{b.travellers[0]?.name || 'Guest'}</span>
                        <span className="text-[10px] text-slate-400">{b.contactEmail}</span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate">{b.title}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">₹{b.totalPrice.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 text-slate-500">{b.paymentMethod}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.reference, e.target.value as any)}
                          className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/booking/confirmation/${b.reference}`}
                          className="text-brand-600 hover:underline font-bold"
                        >
                          Voucher
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. HOTELS MANAGEMENT TAB */}
        {activeTab === 'hotels' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Hotel & Villa Inventory</h3>
                <p className="text-xs text-slate-500">Add custom resorts or manage current catalog</p>
              </div>
              <button
                onClick={() => setShowAddHotelModal(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotels.map((h) => (
                <div key={h.id} className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                        {h.propertyType}
                      </span>
                      <span className="text-xs font-bold text-amber-500">★ {h.rating}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">{h.name}</h4>
                    <p className="text-xs text-slate-500">{h.city}, {h.state}</p>
                    <p className="text-xs font-bold text-slate-900 mt-2">
                      ₹{h.pricePerNight.toLocaleString('en-IN')} / night
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={h.propertyType === 'Villa' ? `/villa/${h.slug}` : `/hotel/${h.slug}`}
                      className="text-xs text-brand-600 font-bold hover:underline"
                    >
                      View Page →
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(`Remove property "${h.name}" from catalog?`)) {
                          deleteHotel(h.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. FLIGHTS MANAGEMENT TAB */}
        {activeTab === 'flights' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Flight Schedules & Inventory</h3>
                <p className="text-xs text-slate-500">Active simulated airlines and flight legs</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Flight</th>
                    <th className="py-3 px-4">Airline</th>
                    <th className="py-3 px-4">Route</th>
                    <th className="py-3 px-4">Schedule</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Base Fare</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {flights.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{f.flightNumber}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">{f.airline}</td>
                      <td className="py-3.5 px-4 font-bold">{f.fromCode} → {f.toCode}</td>
                      <td className="py-3.5 px-4">{f.departureTime} - {f.arrivalTime}</td>
                      <td className="py-3.5 px-4 text-slate-500">{f.duration}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">₹{f.price.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => deleteFlight(f.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. PACKAGES MANAGEMENT TAB */}
        {activeTab === 'packages' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Holiday Packages Catalog</h3>
                <p className="text-xs text-slate-500">Bespoke multi-day travel circuits</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-coral-600 bg-coral-50 px-2 py-0.5 rounded">
                      {pkg.theme}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-1">{pkg.title}</h4>
                    <p className="text-xs text-slate-500">{pkg.destination} • {pkg.durationDays} Days / {pkg.durationNights} Nights</p>
                    <p className="text-xs font-bold text-slate-900 mt-1">₹{pkg.pricePerPerson.toLocaleString('en-IN')} / person</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link href={`/package/${pkg.slug}`} className="text-xs text-brand-600 font-bold hover:underline">
                      View Tour →
                    </Link>
                    <button onClick={() => deletePackage(pkg.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. COUPONS TAB */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Promo Offers & Discounts</h3>
                <p className="text-xs text-slate-500">Create promotional codes that can be tested in checkout</p>
              </div>
              <button
                onClick={() => setShowAddCouponModal(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Create Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {promos.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-black text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                        {p.code}
                      </span>
                      <span className="text-[10px] text-coral-600 font-bold">{p.discountValue}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">{p.title}</h4>
                    <p className="text-[10px] text-slate-400">Min spend: ₹{p.minSpend.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 capitalize">{p.category}</span>
                    <button onClick={() => deleteCoupon(p.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Property */}
      {showAddHotelModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <h4 className="text-lg font-black text-slate-900">Add New Property to Inventory</h4>
            <form onSubmit={handleCreateHotel} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Property Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Oberoi Grand Palace"
                  value={newHotelName}
                  onChange={(e) => setNewHotelName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">City / Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Udaipur"
                  value={newHotelCity}
                  onChange={(e) => setNewHotelCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Property Type</label>
                  <select
                    value={newHotelType}
                    onChange={(e) => setNewHotelType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Luxury Resort">Luxury Resort</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Price per Night (₹)</label>
                  <input
                    type="number"
                    required
                    value={newHotelPrice}
                    onChange={(e) => setNewHotelPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddHotelModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs"
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Coupon */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <h4 className="text-lg font-black text-slate-900">Create New Coupon Code</h4>
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SPECIAL50"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Offer Title</label>
                <input
                  type="text"
                  placeholder="e.g. Flat ₹1,500 Off"
                  value={newCouponTitle}
                  onChange={(e) => setNewCouponTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Discount Tag</label>
                  <input
                    type="text"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Min Spend (₹)</label>
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCouponModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs"
                >
                  Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
