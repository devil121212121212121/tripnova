'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Tag,
  CreditCard,
  QrCode,
  Building2,
  Plane,
  Palmtree,
  Calendar,
  Users,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import { Traveller } from '@/types/travel';

export default function CheckoutPage() {
  const router = useRouter();
  const { checkoutDraft, confirmBooking, applyCoupon, removeCoupon, initiateBooking } = useBooking();
  const { user } = useAuth();

  // If draft is missing, initialize a default sample draft so user never gets blocked
  useEffect(() => {
    if (!checkoutDraft) {
      initiateBooking({
        category: 'hotels',
        title: 'Taj Exotica Resort & Spa',
        subtitle: 'Deluxe Sea View Villa Room (2 Nights • 2 Guests)',
        destination: 'Goa',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop',
        travelDate: '2026-11-12',
        returnDate: '2026-11-14',
        unitPrice: 16500,
        quantity: 2,
        baseAmount: 33000,
        taxes: 5940,
        discountAmount: 0,
        totalPayable: 38940,
        travellers: [
          { name: 'Rahul Sharma', age: 31, gender: 'Male' },
          { name: 'Priya Sharma', age: 29, gender: 'Female' }
        ],
        itemDetails: {
          hotelName: 'Taj Exotica Resort & Spa',
          roomName: 'Deluxe Sea View Villa Room',
          inclusions: ['Breakfast Buffet Included', 'Sunset Cocktail for Two'],
          checkIn: '12 Nov 2026 (2:00 PM)',
          checkOut: '14 Nov 2026 (12:00 PM)'
        }
      });
    }
  }, [checkoutDraft, initiateBooking]);

  // Form states
  const [primaryName, setPrimaryName] = useState(user?.name || 'Rahul Sharma');
  const [primaryEmail, setPrimaryEmail] = useState(user?.email || 'rahul.sharma@example.com');
  const [primaryPhone, setPrimaryPhone] = useState(user?.phone || '+91 98765 43210');
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'paylater'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const draft = checkoutDraft;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponFeedback({ type: 'success', message: res.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ type: 'error', message: res.message });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponFeedback(null);
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryName.trim() || !primaryEmail.trim() || !primaryPhone.trim()) {
      setValidationError('Please fill in all required primary traveller contact details.');
      return;
    }

    setValidationError(null);
    setIsProcessing(true);

    const paymentLabel =
      paymentMethod === 'upi'
        ? 'UPI (Google Pay / PhonePe Simulator)'
        : paymentMethod === 'card'
        ? 'Credit / Debit Card (Simulated)'
        : paymentMethod === 'netbanking'
        ? 'Net Banking (HDFC / ICICI)'
        : 'TripNova PayLater (Simulated)';

    setTimeout(() => {
      try {
        const booking = confirmBooking(paymentLabel, {
          email: primaryEmail,
          phone: primaryPhone
        });
        setIsProcessing(false);
        router.push(`/booking/confirmation/${booking.reference}`);
      } catch (err) {
        setIsProcessing(false);
        setValidationError('Booking confirmation failed. Please try again.');
      }
    }, 1200);
  };

  if (!draft) {
    return (
      <div className="p-16 text-center text-sm font-semibold">
        Preparing simulated checkout...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Checkout Header */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center">
              1
            </span>
            <h1 className="text-lg font-extrabold text-slate-900">Review & Complete Simulated Booking</h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>Safe Portfolio Simulation</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleCompleteBooking}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Review Details & Form */}
            <div className="lg:col-span-8 space-y-6">
              {validationError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Trip Item Summary Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <img src={draft.image} alt={draft.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-50 text-brand-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-brand-200">
                      {draft.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{draft.destination}</span>
                  </div>

                  <h2 className="text-lg font-extrabold text-slate-900 leading-snug">{draft.title}</h2>
                  <p className="text-xs text-slate-500">{draft.subtitle}</p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-900">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      {draft.travelDate} {draft.returnDate && `→ ${draft.returnDate}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-brand-600" />
                      {draft.quantity} {draft.category === 'hotels' || draft.category === 'villas' ? 'Nights' : 'Traveller(s)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Traveller & Contact Information */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-600" />
                    <span>Primary Guest & Contact Details</span>
                  </h3>
                  <span className="text-xs text-slate-400">Voucher will be sent here</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={primaryName}
                      onChange={(e) => setPrimaryName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={primaryEmail}
                      onChange={(e) => setPrimaryEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={primaryPhone}
                      onChange={(e) => setPrimaryPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Simulated Payment Method Selection */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-coral-500" />
                      <span>Choose Simulated Payment Method</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Zero real credentials collected. Click confirm to complete simulation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'upi',
                      label: 'UPI / QR Code',
                      desc: 'Google Pay, PhonePe, Paytm, BHIM',
                      badge: 'Instant & Zero Fee',
                    },
                    {
                      id: 'card',
                      label: 'Credit / Debit Card',
                      desc: 'Simulated Visa, MasterCard, RuPay',
                      badge: 'Simulated Sandbox',
                    },
                    {
                      id: 'netbanking',
                      label: 'Net Banking',
                      desc: 'HDFC, ICICI, SBI, Axis & 50+ Banks',
                      badge: 'All Banks',
                    },
                    {
                      id: 'paylater',
                      label: 'TripNova PayLater',
                      desc: 'Simulated 0% interest credit line',
                      badge: 'Pre-Approved',
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                        paymentMethod === method.id
                          ? 'border-brand-600 bg-brand-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id as any)}
                            className="text-brand-600 focus:ring-brand-500 w-4 h-4"
                          />
                          <span className="font-bold text-xs text-slate-900">{method.label}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                          {method.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2 pl-6">{method.desc}</p>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Dynamic Price Summary & Coupon */}
            <div className="lg:col-span-4 space-y-6">
              {/* Promo Code Box */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-coral-500" />
                  <span>Apply Promo Code</span>
                </h3>

                {draft.appliedCoupon ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-black text-emerald-800">
                        {draft.appliedCoupon}
                      </span>
                      <p className="text-[10px] text-emerald-600 font-semibold">
                        You saved ₹{draft.discountAmount.toLocaleString('en-IN')}!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. STAYNOVA, FLYTRIP"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1 text-[10px]">
                      <span className="text-slate-400">Try codes:</span>
                      {['FLYTRIP', 'STAYNOVA', 'FIRSTBOOK'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setCouponInput(c);
                            applyCoupon(c);
                          }}
                          className="bg-slate-100 hover:bg-brand-50 text-brand-700 font-mono font-bold px-1.5 py-0.5 rounded"
                        >
                          {c}
                        </button>
                      ))}
                    </div>

                    {couponFeedback && (
                      <p className={`text-[11px] font-semibold ${
                        couponFeedback.type === 'success' ? 'text-emerald-600' : 'text-red-500'
                      }`}>
                        {couponFeedback.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Breakdown Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                  Price Breakdown
                </h3>

                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Base Amount</span>
                    <span className="font-semibold text-slate-900">
                      ₹{draft.baseAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Applicable Taxes & GST</span>
                    <span className="font-semibold text-slate-900">
                      ₹{draft.taxes.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {draft.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo Discount ({draft.appliedCoupon})</span>
                      <span>-₹{draft.discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline font-black">
                    <span className="text-slate-900 text-sm">Total Amount Payable</span>
                    <span className="text-2xl text-brand-600">
                      ₹{draft.totalPayable.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-coral-500/30 hover:scale-[1.01] active:scale-95 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Simulated Trip...</span>
                    </>
                  ) : (
                    <>
                      <span>CONFIRM DEMO BOOKING</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  By clicking confirm, you agree to TripNova's simulated terms. No real currency will be charged.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
