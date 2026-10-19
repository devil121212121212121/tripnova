'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass, Mail, Lock, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('demo123456');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push('/my-trips');
  };

  const handleOneClickDemo = () => {
    login('rahul.sharma@example.com', 'Rahul Sharma');
    router.push('/my-trips');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 group mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md">
            <Compass className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Trip<span className="text-coral-500">Nova</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900">Sign in to your account</h2>
        <p className="text-xs text-slate-500 mt-1">
          Access your bookings, saved travellers & exclusive Nova Club benefits
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-card rounded-3xl border border-slate-200/80 sm:px-10 space-y-6">
          {/* 1-Click Demo Login Box */}
          <div className="bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-200/80 rounded-2xl p-4 text-center space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-brand-700 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Recommended for Testing</span>
            </div>
            <p className="text-xs text-slate-600">
              Instant login with active Platinum profile, saved trips, and pre-loaded wallet.
            </p>
            <button
              onClick={handleOneClickDemo}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold py-2.5 rounded-xl shadow-xs transition"
            >
              Sign In as Rahul Sharma (Demo)
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase">Or with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl transition"
            >
              Continue with Email
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 pt-2">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-brand-600 hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
