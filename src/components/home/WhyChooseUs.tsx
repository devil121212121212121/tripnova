import React from 'react';
import { ShieldCheck, Zap, HeartHandshake, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Zap,
      title: 'Effortless Booking Speed',
      description: 'Find, compare and lock in your complete flight, hotel, or villa itinerary in less than 90 seconds with zero friction.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: ShieldCheck,
      title: '100% Transparent Pricing',
      description: 'What you see is what you pay. Transparent breakdown of base fares, GST, resort fees, and free cancellation eligibility.',
      color: 'from-brand-600 to-brand-700',
    },
    {
      icon: Sparkles,
      title: 'Hand-Curated Luxury Stays',
      description: 'Every villa, palace hotel, and resort in our collection undergoes a rigorous 42-point quality and hygiene audit.',
      color: 'from-coral-500 to-coral-600',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Trip Care',
      description: 'Round-the-clock priority WhatsApp and phone concierge support for flight schedule changes, upgrades, and on-ground needs.',
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
            The TripNova Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Travellers Who Expect More
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            From mountain chalets to ocean resorts, we combine cutting-edge technology with personalized hospitality so you travel with complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pillar.color} flex items-center justify-center text-white mb-5 shadow-sm`}>
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Confidence Stats Banner */}
        <div className="mt-12 bg-brand-900 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-extrabold text-white">Join 150,000+ Happy Explorers</h4>
            <p className="text-xs text-brand-200">
              Trusted by couples, solo travelers, and corporate leaders for world-class itineraries.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-10 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-coral-400">4.9/5</p>
              <p className="text-[11px] text-brand-200 font-medium mt-0.5">App Store Rating</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">99.8%</p>
              <p className="text-[11px] text-brand-200 font-medium mt-0.5">Booking Precision</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">24/7</p>
              <p className="text-[11px] text-brand-200 font-medium mt-0.5">Live Concierge</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
