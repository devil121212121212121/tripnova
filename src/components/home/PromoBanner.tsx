'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { mockPromos } from '@/data/mockData';

export default function PromoBanner() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-coral-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Demo Savings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Exclusive Offers & Promo Codes
            </h2>
          </div>
          <Link
            href="/offers"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700 mt-2 sm:mt-0 group"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockPromos.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col justify-between p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-coral-50 text-coral-600 border border-coral-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {promo.discountValue}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Valid till {promo.expiryDate}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1">{promo.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{promo.subtitle}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  <Tag className="w-3 h-3 text-brand-600" />
                  <span>{promo.code}</span>
                </div>

                <button
                  onClick={() => handleCopy(promo.code)}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg transition ${
                    copiedCode === promo.code
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  {copiedCode === promo.code ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
