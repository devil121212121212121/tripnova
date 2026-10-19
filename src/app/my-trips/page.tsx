'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Trash2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { Booking } from '@/types/travel';

export default function MyTripsPage() {
  const { bookings, cancelBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'Upcoming') return b.status === 'Confirmed';
    if (activeTab === 'Completed') return b.status === 'Completed';
    if (activeTab === 'Cancelled') return b.status === 'Cancelled';
    return true;
  });

  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    cancelBooking(cancellingBooking.reference);
    setCancellingBooking(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-brand-500/20 text-brand-300 border border-brand-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Booking Management Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">My Trips & Vouchers</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              View confirmed e-tickets, hotel booking vouchers, or initiate simulated cancellations.
            </p>
          </div>

          <Link
            href="/"
            className="self-start sm:self-auto bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <span>Book New Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
          {(['Upcoming', 'Completed', 'Cancelled'] as const).map((tab) => {
            const count = bookings.filter((b) => {
              if (tab === 'Upcoming') return b.status === 'Confirmed';
              if (tab === 'Completed') return b.status === 'Completed';
              return b.status === 'Cancelled';
            }).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{tab} Trips</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  activeTab === tab ? 'bg-white text-brand-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Trips Cards List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No {activeTab} Trips Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              {activeTab === 'Upcoming'
                ? "You don't have any upcoming trips yet. Book a flight, hotel room or holiday package to see it here!"
                : `There are currently no ${activeTab.toLowerCase()} bookings in your history.`}
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 bg-brand-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
            >
              <span>Explore Flights & Stays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-card transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded">
                        #{booking.reference}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : booking.status === 'Completed'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900">{booking.title}</h3>
                    <p className="text-xs text-slate-500">{booking.subtitle}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-slate-900">
                        <Calendar className="w-3.5 h-3.5 text-brand-600" />
                        Travel: {booking.travelDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-coral-500" />
                        {booking.destination}
                      </span>
                      <span className="text-slate-400">
                        Booked on {booking.bookingDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-400 block">Total Amount</span>
                    <span className="text-xl font-black text-slate-900">
                      ₹{booking.totalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{booking.paymentMethod}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/booking/confirmation/${booking.reference}`}
                      className="bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Voucher</span>
                    </Link>

                    {booking.status === 'Confirmed' && (
                      <button
                        onClick={() => setCancellingBooking(booking)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancellation Modal Dialog */}
      {cancellingBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="text-center">
              <h4 className="text-lg font-black text-slate-900">Cancel Booking #{cancellingBooking.reference}?</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to cancel your simulated reservation for <strong>{cancellingBooking.title}</strong>?
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Total Paid:</span>
                <span>₹{cancellingBooking.totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Estimated Simulated Refund:</span>
                <span>₹{cancellingBooking.totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                Refund is simulated and credited instantly to your demo Nova Wallet.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancellingBooking(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
