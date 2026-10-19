'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Plane,
  Building2,
  Home,
  Palmtree,
  Bus as BusIcon,
  Train as TrainIcon,
  Car,
  Briefcase,
  User,
  Menu,
  X,
  Compass,
  Tag,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { bookings } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const activeBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;

  const navCategories = [
    { name: 'Flights', href: '/flights', icon: Plane, label: 'Flights' },
    { name: 'Hotels', href: '/hotels', icon: Building2, label: 'Hotels' },
    { name: 'Villas', href: '/villas', icon: Home, label: 'Villas' },
    { name: 'Holiday Packages', href: '/packages', icon: Palmtree, label: 'Packages' },
    { name: 'Buses', href: '/buses', icon: BusIcon, label: 'Buses' },
    { name: 'Trains', href: '/trains', icon: TrainIcon, label: 'Trains' },
    { name: 'Cabs', href: '/cabs', icon: Car, label: 'Cabs' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 stroke-[2.2] animate-[spin_12s_linear_infinite]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
                Trip<span className="text-coral-500">Nova</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-600 mt-0.5">
                Travel Elegance
              </span>
            </div>
          </Link>

          {/* Desktop Category Icons (Center) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = pathname === cat.href;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-brand-600 bg-brand-50 border-b-2 border-brand-600'
                      : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-brand-600' : 'text-slate-500'}`} />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/offers"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-coral-600 px-3 py-2 rounded-lg hover:bg-coral-50/60 transition"
            >
              <Tag className="w-4 h-4 text-coral-500" />
              <span>Offers</span>
            </Link>

            <Link
              href="/my-trips"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 rounded-lg hover:bg-brand-50 transition relative"
            >
              <Briefcase className="w-4 h-4 text-brand-600" />
              <span>My Trips</span>
              {activeBookingsCount > 0 && (
                <span className="bg-coral-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full absolute -top-1 right-1 shadow-xs">
                  {activeBookingsCount}
                </span>
              )}
            </Link>

            {/* User Profile or Sign In */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-brand-300 hover:shadow-soft transition text-xs font-medium text-slate-800 bg-white"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-brand-200"
                  />
                  <div className="text-left leading-tight hidden lg:block">
                    <span className="font-semibold block text-slate-900 max-w-[100px] truncate">{user.name}</span>
                    <span className="text-[10px] text-brand-600 font-medium">{user.membershipTier}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/80">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px]">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Wallet className="w-3 h-3 text-brand-600" /> Nova Wallet
                        </span>
                        <span className="font-bold text-slate-900">₹{user.walletBalance.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <Link
                      href="/my-trips"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition"
                    >
                      <Briefcase className="w-4 h-4 text-brand-600" />
                      <span>Manage My Trips & Vouchers</span>
                    </Link>

                    <Link
                      href="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Admin Management Suite</span>
                    </Link>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out Demo Session</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm shadow-brand-600/30"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Sign Up</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/my-trips"
              className="p-2 text-slate-600 hover:text-brand-600 relative"
              aria-label="My Trips"
            >
              <Briefcase className="w-5 h-5" />
              {activeBookingsCount > 0 && (
                <span className="bg-coral-500 text-white font-bold text-[9px] px-1 rounded-full absolute top-1 right-1">
                  {activeBookingsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Subcategory Bar on medium screens (hidden on XL where it is inline in header) */}
      <div className="hidden md:flex xl:hidden bg-slate-50 border-t border-slate-200/60 overflow-x-auto no-scrollbar py-1 px-4 justify-center gap-2">
        {navCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = pathname === cat.href;
          return (
            <Link
              key={cat.name}
              href={cat.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                isActive ? 'bg-brand-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-4 gap-2">
            {navCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = pathname === cat.href;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-center text-[11px] font-medium transition ${
                    isActive ? 'bg-brand-50 text-brand-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-brand-600' : 'text-slate-500'}`} />
                  <span className="leading-tight">{cat.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            <Link
              href="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 font-medium"
            >
              <Tag className="w-4 h-4 text-coral-500" />
              <span>Offers & Deals</span>
            </Link>
            <Link
              href="/my-trips"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 font-medium"
            >
              <Briefcase className="w-4 h-4 text-brand-600" />
              <span>My Trips & Bookings</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 font-medium"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Admin Management Suite</span>
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-3">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[10px] text-slate-500">{user.membershipTier}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-semibold px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold text-sm py-2.5 rounded-xl shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>Login or Create Account</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
