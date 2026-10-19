'use client';

import React, { useState } from 'react';
import { Info, X, ShieldAlert, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DemoBadge() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 text-white text-xs py-2 px-4 border-b border-brand-800/60 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="bg-coral-500/30 text-coral-200 border border-coral-400/40 font-semibold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase shrink-0">
            Portfolio Demo
          </span>
          <p className="truncate text-slate-300">
            TripNova is an interactive travel-tech client demo. All bookings, tickets, and payments are strictly simulated.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white underline text-[11px]"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            Admin Dashboard
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-slate-400 hover:text-white p-0.5 rounded transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
