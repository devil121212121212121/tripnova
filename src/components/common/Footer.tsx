import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, Headphones, CreditCard, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-slate-300">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-900/60 border border-brand-700/40 flex items-center justify-center shrink-0 text-brand-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Verified Partners</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hand-curated luxury resorts, licensed airlines and premier fleet operators.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-coral-900/40 border border-coral-700/40 flex items-center justify-center shrink-0 text-coral-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Best Rate Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct hotel & airline partnerships ensuring no hidden convenience surcharges.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center shrink-0 text-emerald-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24x7 Nova Concierge</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Instant emergency trip assistance and hassle-free date modification support.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-900/40 border border-indigo-700/40 flex items-center justify-center shrink-0 text-indigo-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Simulated Demo Checkout</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Zero actual financial transactions. Designed safely for live portfolio presentations.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-slate-800 text-xs">
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Trip<span className="text-coral-500">Nova</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              TripNova is a modern, high-performance travel booking marketplace inspired by MakeMyTrip and crafted for discerning travelers seeking seamless flights, stays, luxury villas, and bespoke holiday packages.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Next.js 15 • React 19 • Tailwind CSS • TypeScript</span>
              </div>
            </div>
          </div>

          {/* Col 2: Travel Products */}
          <div>
            <h5 className="text-white font-bold text-sm mb-3">Book Travel</h5>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/flights" className="hover:text-white transition">Domestic & International Flights</Link></li>
              <li><Link href="/hotels" className="hover:text-white transition">5-Star & Boutique Hotels</Link></li>
              <li><Link href="/villas" className="hover:text-white transition">Luxury Private Villas</Link></li>
              <li><Link href="/packages" className="hover:text-white transition">Curated Holiday Packages</Link></li>
              <li><Link href="/buses" className="hover:text-white transition">Intercity Volvo Buses</Link></li>
              <li><Link href="/trains" className="hover:text-white transition">Vande Bharat & Rajdhani Trains</Link></li>
              <li><Link href="/cabs" className="hover:text-white transition">Airport & Outstation Cabs</Link></li>
            </ul>
          </div>

          {/* Col 3: Destinations */}
          <div>
            <h5 className="text-white font-bold text-sm mb-3">Top Destinations</h5>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/hotels?city=Goa" className="hover:text-white transition">Goa Beach Escapes</Link></li>
              <li><Link href="/hotels?city=Manali" className="hover:text-white transition">Manali Snow Resorts</Link></li>
              <li><Link href="/hotels?city=Jaipur" className="hover:text-white transition">Jaipur Royal Heritage</Link></li>
              <li><Link href="/packages?dest=Kashmir" className="hover:text-white transition">Kashmir Valley Paradise</Link></li>
              <li><Link href="/packages?dest=Dubai" className="hover:text-white transition">Dubai Skyscrapers & Safari</Link></li>
              <li><Link href="/packages?dest=Bali" className="hover:text-white transition">Bali Rainforest Villas</Link></li>
              <li><Link href="/destinations" className="hover:text-coral-400 font-semibold transition">View All 50+ Cities →</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h5 className="text-white font-bold text-sm mb-3">Support & Admin</h5>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/my-trips" className="hover:text-white transition">My Trips & Vouchers</Link></li>
              <li><Link href="/offers" className="hover:text-white transition">Promo Codes & Discounts</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">24x7 Help Center & FAQs</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400 font-semibold transition">Admin Management Suite</Link></li>
              <li><span className="text-slate-500">Terms of Simulated Service</span></li>
              <li><span className="text-slate-500">Privacy & Data Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with payment logos simulation & copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} TripNova Travel Technologies. Portfolio demo project developed with precision.</p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-slate-400 mr-2">Simulated Payment Partners:</span>
            <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono text-[10px] border border-slate-700">UPI / GPay</span>
            <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono text-[10px] border border-slate-700">VISA</span>
            <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono text-[10px] border border-slate-700">MasterCard</span>
            <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono text-[10px] border border-slate-700">RuPay</span>
            <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono text-[10px] border border-slate-700">Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
