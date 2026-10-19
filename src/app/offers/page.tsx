'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Copy, Check, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function OffersPage() {
  const { promos } = useBooking();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = ['all', 'flights', 'hotels', 'packages'];

  const filtered = selectedCat === 'all'
    ? promos
    : promos.filter((p) => p.category === selectedCat || p.category === 'all');

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-coral-500/20 text-coral-300 border border-coral-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Active Portfolio Promo Codes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Special Travel Offers & Coupons
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            Copy any demo promo code below and apply it at checkout to observe instant dynamic discount calculations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                selectedCat === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Offers' : `${cat} Deals`}
            </button>
          ))}
        </div>

        {/* Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-card transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-coral-50 text-coral-600 border border-coral-200 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {promo.discountValue}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Expires: {promo.expiryDate}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">{promo.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{promo.subtitle}</p>

                {/* Terms and Conditions List */}
                <div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <span className="font-bold text-slate-900 block text-xs mb-1">Coupon Terms:</span>
                  {promo.terms.map((t, idx) => (
                    <p key={idx}>• {t}</p>
                  ))}
                  <p className="text-brand-600 font-semibold mt-1">
                    Minimum booking value: ₹{promo.minSpend.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-xl">
                    {promo.code}
                  </span>
                  <button
                    onClick={() => handleCopy(promo.code)}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl transition ${
                      copiedCode === promo.code
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <Link
                  href={promo.category === 'all' ? '/flights' : `/${promo.category}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-coral-600 hover:text-coral-700"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
