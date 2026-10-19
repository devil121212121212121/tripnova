'use client';

import React, { useEffect, use } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Calendar,
  Users,
  Printer,
  Download,
  Share2,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  QrCode,
  MapPin,
  Clock,
  Sparkles,
  Plane,
  Building2,
  Tag,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function BookingConfirmationPage({ params }: { params: Promise<{ reference: string }> }) {
  const resolvedParams = use(params);
  const { bookings } = useBooking();

  const booking = bookings.find((b) => b.reference === resolvedParams.reference) || bookings[0];

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Success Card */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Simulated Booking Confirmed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              You're All Set! Reference #{booking.reference}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              A copy of your simulated e-ticket and hotel voucher has been generated and stored in your My Trips dashboard.
            </p>
          </div>
        </div>

        {/* Printable Ticket Voucher Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-hero overflow-hidden print:border-none print:shadow-none">
          {/* Voucher Header with brand */}
          <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <span className="text-xl font-extrabold">Trip<span className="text-coral-500">Nova</span></span>
              <span className="text-[10px] text-slate-400 block tracking-widest uppercase font-semibold">
                Official Demo Travel Voucher
              </span>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-xs text-slate-400 block">Booking Reference:</span>
              <span className="font-mono text-xl font-black text-amber-400 tracking-wider">
                {booking.reference}
              </span>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-full sm:w-44 h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1.5 flex-1">
                <span className="bg-brand-50 text-brand-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-brand-200">
                  {booking.type}
                </span>
                <h2 className="text-xl font-black text-slate-900 leading-snug">{booking.title}</h2>
                <p className="text-xs text-slate-500">{booking.subtitle}</p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-2 font-medium">
                  <span className="flex items-center gap-1 text-slate-900 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-brand-600" />
                    Travel Date: {booking.travelDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-coral-500" />
                    {booking.destination}
                  </span>
                </div>
              </div>
            </div>

            {/* Travellers Info Table */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/70 space-y-2">
              <span className="text-xs font-bold text-slate-900 block">Traveller Details</span>
              <div className="space-y-1.5">
                {booking.travellers.map((traveller, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="font-semibold">{idx + 1}. {traveller.name} ({traveller.gender}, {traveller.age} yrs)</span>
                    <span className="text-brand-600 font-mono font-bold">
                      {traveller.seatNumber ? `Seat: ${traveller.seatNumber}` : 'Status: Confirmed'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Receipt Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                <span className="font-bold text-slate-900 block">Contact Information</span>
                <p>Email: <strong className="text-slate-800">{booking.contactEmail}</strong></p>
                <p>Phone: <strong className="text-slate-800">{booking.contactPhone}</strong></p>
                <p>Payment Mode: <strong className="text-slate-800">{booking.paymentMethod}</strong></p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                <span className="font-bold text-slate-900 block">Payment Summary</span>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{booking.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {booking.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({booking.couponCode}):</span>
                    <span>-₹{booking.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes & GST:</span>
                  <span>₹{booking.taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total Paid:</span>
                  <span className="text-brand-600">₹{booking.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Simulated Barcode / QR Section */}
            <div className="border-t border-dashed border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-slate-700" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-slate-800 tracking-widest block">
                    {booking.reference}-DEMO-VOUCHER
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Scan at airport kiosk or hotel front desk
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                <span>Simulated Voucher Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Voucher</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/my-trips"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
            >
              <Briefcase className="w-4 h-4" />
              <span>View in My Trips</span>
            </Link>

            <Link
              href="/"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
            >
              <span>Book Another Trip</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
