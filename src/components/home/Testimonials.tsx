'use client';

import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Quote, CheckCircle, Mail } from 'lucide-react';

export default function Testimonials() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const testimonials = [
    {
      id: 1,
      name: 'Aditya & Neha Singhania',
      role: 'Honeymooners',
      city: 'Mumbai',
      destination: 'Bali Private Pool Villa',
      rating: 5,
      review: 'Our Bali honeymoon booked through TripNova was flawless. The floating breakfast at Maya Ubud and private catamaran transfers were arranged with surgical precision. 10/10 experience!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Dr. Siddharth Verma',
      role: 'Family Vacationer',
      city: 'Bengaluru',
      destination: 'Magical Kashmir Tour',
      rating: 5,
      review: 'Traveling with elderly parents can be stressful, but the heated houseboat on Dal Lake and dedicated chauffeur made it remarkably comfortable. The itinerary pacing was perfect.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Priyanka Kapoor',
      role: 'Solo Explorer',
      city: 'New Delhi',
      destination: 'Taj Exotica, Goa',
      rating: 5,
      review: 'TripNova’s transparent pricing with no hidden check-out convenience fees is refreshing. Booking my flight and luxury beach stay took under two minutes. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const faqs = [
    {
      q: 'Is this travel platform a real booking service or a portfolio demo?',
      a: 'TripNova is a portfolio demonstration project built to showcase high-end travel-tech design, seamless search UX, real-time filtering, dynamic price calculations, and complete booking simulated workflows. No actual money is charged, and no real tickets are issued with airlines or hotels.',
    },
    {
      q: 'How does the simulated booking and checkout journey work?',
      a: 'You can choose any flight, hotel room, villa, or package, proceed to checkout, enter realistic guest details, apply working demo coupons like FLYTRIP, STAYNOVA, or FIRSTBOOK, and complete a simulated payment. You will immediately receive a unique reference code (e.g., TN-782914) and a full voucher summary in My Trips.',
    },
    {
      q: 'Can I cancel or modify a demo booking?',
      a: 'Yes! Navigate to the "My Trips" page from the top navigation. You can review all confirmed bookings, view detailed ticket vouchers, and submit a 1-click cancellation to observe the refund computation and status update in real-time.',
    },
    {
      q: 'Is there an Admin Dashboard to manage inventory?',
      a: 'Yes, visit `/admin` or click "Admin Dashboard" in the top banner. You can view booking analytics, edit hotel/package listings, update booking statuses, and manage promo codes with local persistence.',
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setEmailSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-coral-600 block mb-1">
            Simulated Demo Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Loved by Discerning Travelers
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            (Sample portfolio feedback demonstrating user testimonial UI)
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-card transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{item.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-brand-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500">
                    {item.role} • {item.city}
                  </p>
                  <span className="text-[10px] text-brand-600 font-semibold block">
                    {item.destination}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive FAQ Section */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-slate-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-500 mt-1">Everything you need to know about TripNova demo operations</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm text-slate-900 bg-white hover:bg-slate-50 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-brand-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter Signup Card */}
        <div className="mt-16 bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-coral-400 text-xs font-bold uppercase tracking-wider block mb-1">
              Stay In The Know
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get Secret Travel Deals & Weekend Getaway Alerts
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Subscribe to receive weekly curated hotel drops, unadvertised flight sales, and seasonal discount coupons.
            </p>

            {emailSubscribed ? (
              <div className="mt-6 flex items-center gap-2 bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-xs font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Thank you! You are now subscribed to TripNova Secret Deals.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-coral-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-md whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
