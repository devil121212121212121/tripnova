'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, Flight, Hotel, HolidayPackage, PromoOffer, TravelCategory, Traveller } from '@/types/travel';
import { mockHotels, mockPackages, mockFlights, mockPromos, mockInitialBookings } from '@/data/mockData';

export interface CheckoutDraft {
  category: TravelCategory;
  title: string;
  subtitle: string;
  destination: string;
  image: string;
  travelDate: string;
  returnDate?: string;
  unitPrice: number;
  quantity: number; // e.g. travellers or nights
  baseAmount: number;
  taxes: number;
  appliedCoupon?: string;
  discountAmount: number;
  totalPayable: number;
  travellers: Traveller[];
  itemDetails: any;
}

interface BookingContextType {
  bookings: Booking[];
  hotels: Hotel[];
  packages: HolidayPackage[];
  flights: Flight[];
  promos: PromoOffer[];
  checkoutDraft: CheckoutDraft | null;
  setCheckoutDraft: (draft: CheckoutDraft | null) => void;
  initiateBooking: (draft: CheckoutDraft) => void;
  confirmBooking: (paymentMethod: string, contactInfo: { email: string; phone: string }) => Booking;
  cancelBooking: (reference: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string; discount: number };
  removeCoupon: () => void;
  // Admin functions
  addHotel: (hotel: Hotel) => void;
  updateHotel: (id: string, updated: Partial<Hotel>) => void;
  deleteHotel: (id: string) => void;
  addPackage: (pkg: HolidayPackage) => void;
  updatePackage: (id: string, updated: Partial<HolidayPackage>) => void;
  deletePackage: (id: string) => void;
  addFlight: (flight: Flight) => void;
  deleteFlight: (id: string) => void;
  addCoupon: (promo: PromoOffer) => void;
  deleteCoupon: (id: string) => void;
  updateBookingStatus: (reference: string, status: 'Confirmed' | 'Completed' | 'Cancelled') => void;
  resetToDefaultData: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(mockInitialBookings);
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);
  const [packages, setPackages] = useState<HolidayPackage[]>(mockPackages);
  const [flights, setFlights] = useState<Flight[]>(mockFlights);
  const [promos, setPromos] = useState<PromoOffer[]>(mockPromos);
  const [checkoutDraft, setCheckoutDraft] = useState<CheckoutDraft | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('tripnova_bookings');
      if (storedBookings) setBookings(JSON.parse(storedBookings));

      const storedHotels = localStorage.getItem('tripnova_hotels');
      if (storedHotels) setHotels(JSON.parse(storedHotels));

      const storedPackages = localStorage.getItem('tripnova_packages');
      if (storedPackages) setPackages(JSON.parse(storedPackages));

      const storedFlights = localStorage.getItem('tripnova_flights');
      if (storedFlights) setFlights(JSON.parse(storedFlights));

      const storedPromos = localStorage.getItem('tripnova_promos');
      if (storedPromos) setPromos(JSON.parse(storedPromos));

      const storedDraft = localStorage.getItem('tripnova_checkout_draft');
      if (storedDraft) setCheckoutDraft(JSON.parse(storedDraft));
    } catch {
      // storage error fallback
    }
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    try {
      localStorage.setItem('tripnova_bookings', JSON.stringify(newBookings));
    } catch {}
  };

  const initiateBooking = (draft: CheckoutDraft) => {
    setCheckoutDraft(draft);
    try {
      localStorage.setItem('tripnova_checkout_draft', JSON.stringify(draft));
    } catch {}
  };

  const applyCoupon = (code: string): { success: boolean; message: string; discount: number } => {
    if (!checkoutDraft) return { success: false, message: 'No active booking selection', discount: 0 };
    
    const promo = promos.find((p) => p.code.toUpperCase() === code.trim().toUpperCase());
    if (!promo) {
      return { success: false, message: `Promo code "${code}" is invalid or expired.`, discount: 0 };
    }

    if (promo.category !== 'all' && promo.category !== checkoutDraft.category) {
      return { success: false, message: `Coupon ${promo.code} is only applicable on ${promo.category}.`, discount: 0 };
    }

    if (checkoutDraft.baseAmount < promo.minSpend) {
      return {
        success: false,
        message: `Minimum spend of ₹${promo.minSpend.toLocaleString('en-IN')} required for coupon ${promo.code}.`,
        discount: 0
      };
    }

    let discount = 0;
    if (promo.code === 'FLYTRIP') {
      discount = Math.min(1500, Math.round(checkoutDraft.baseAmount * 0.12));
    } else if (promo.code === 'STAYNOVA') {
      discount = Math.min(3500, Math.round(checkoutDraft.baseAmount * 0.20));
    } else if (promo.code === 'TRIPSUMMER') {
      discount = 5000;
    } else if (promo.code === 'FIRSTBOOK') {
      discount = 800;
    } else {
      discount = Math.round(checkoutDraft.baseAmount * 0.10);
    }

    const updatedDraft: CheckoutDraft = {
      ...checkoutDraft,
      appliedCoupon: promo.code,
      discountAmount: discount,
      totalPayable: Math.max(0, checkoutDraft.baseAmount + checkoutDraft.taxes - discount)
    };

    setCheckoutDraft(updatedDraft);
    try {
      localStorage.setItem('tripnova_checkout_draft', JSON.stringify(updatedDraft));
    } catch {}

    return {
      success: true,
      message: `Yay! Coupon ${promo.code} applied successfully! You saved ₹${discount.toLocaleString('en-IN')}.`,
      discount
    };
  };

  const removeCoupon = () => {
    if (!checkoutDraft) return;
    const updatedDraft: CheckoutDraft = {
      ...checkoutDraft,
      appliedCoupon: undefined,
      discountAmount: 0,
      totalPayable: checkoutDraft.baseAmount + checkoutDraft.taxes
    };
    setCheckoutDraft(updatedDraft);
    try {
      localStorage.setItem('tripnova_checkout_draft', JSON.stringify(updatedDraft));
    } catch {}
  };

  const confirmBooking = (paymentMethod: string, contactInfo: { email: string; phone: string }): Booking => {
    if (!checkoutDraft) throw new Error('No draft booking to confirm');

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const reference = `TN-${randomNum}`;
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      reference,
      type: checkoutDraft.category,
      title: checkoutDraft.title,
      destination: checkoutDraft.destination,
      subtitle: checkoutDraft.subtitle,
      image: checkoutDraft.image,
      bookingDate: today,
      travelDate: checkoutDraft.travelDate,
      returnDate: checkoutDraft.returnDate,
      travellers: checkoutDraft.travellers && checkoutDraft.travellers.length > 0 ? checkoutDraft.travellers : [{ name: 'Primary Guest', age: 30, gender: 'Male' }],
      contactEmail: contactInfo.email,
      contactPhone: contactInfo.phone,
      subtotal: checkoutDraft.baseAmount,
      discount: checkoutDraft.discountAmount || 0,
      couponCode: checkoutDraft.appliedCoupon,
      taxes: checkoutDraft.taxes,
      totalPrice: checkoutDraft.totalPayable,
      status: 'Confirmed',
      paymentMethod,
      itemSnapshot: checkoutDraft.itemDetails
    };

    const nextBookings = [newBooking, ...bookings];
    saveBookings(nextBookings);

    // Clear draft
    setCheckoutDraft(null);
    try {
      localStorage.removeItem('tripnova_checkout_draft');
    } catch {}

    return newBooking;
  };

  const cancelBooking = (reference: string): boolean => {
    const updated = bookings.map((b) => {
      if (b.reference === reference) {
        return { ...b, status: 'Cancelled' as const };
      }
      return b;
    });
    saveBookings(updated);
    return true;
  };

  const updateBookingStatus = (reference: string, status: 'Confirmed' | 'Completed' | 'Cancelled') => {
    const updated = bookings.map((b) => (b.reference === reference ? { ...b, status } : b));
    saveBookings(updated);
  };

  // Admin inventory methods with storage sync
  const addHotel = (hotel: Hotel) => {
    const next = [hotel, ...hotels];
    setHotels(next);
    localStorage.setItem('tripnova_hotels', JSON.stringify(next));
  };

  const updateHotel = (id: string, updated: Partial<Hotel>) => {
    const next = hotels.map((h) => (h.id === id ? { ...h, ...updated } : h));
    setHotels(next);
    localStorage.setItem('tripnova_hotels', JSON.stringify(next));
  };

  const deleteHotel = (id: string) => {
    const next = hotels.filter((h) => h.id !== id);
    setHotels(next);
    localStorage.setItem('tripnova_hotels', JSON.stringify(next));
  };

  const addPackage = (pkg: HolidayPackage) => {
    const next = [pkg, ...packages];
    setPackages(next);
    localStorage.setItem('tripnova_packages', JSON.stringify(next));
  };

  const updatePackage = (id: string, updated: Partial<HolidayPackage>) => {
    const next = packages.map((p) => (p.id === id ? { ...p, ...updated } : p));
    setPackages(next);
    localStorage.setItem('tripnova_packages', JSON.stringify(next));
  };

  const deletePackage = (id: string) => {
    const next = packages.filter((p) => p.id !== id);
    setPackages(next);
    localStorage.setItem('tripnova_packages', JSON.stringify(next));
  };

  const addFlight = (flight: Flight) => {
    const next = [flight, ...flights];
    setFlights(next);
    localStorage.setItem('tripnova_flights', JSON.stringify(next));
  };

  const deleteFlight = (id: string) => {
    const next = flights.filter((f) => f.id !== id);
    setFlights(next);
    localStorage.setItem('tripnova_flights', JSON.stringify(next));
  };

  const addCoupon = (promo: PromoOffer) => {
    const next = [promo, ...promos];
    setPromos(next);
    localStorage.setItem('tripnova_promos', JSON.stringify(next));
  };

  const deleteCoupon = (id: string) => {
    const next = promos.filter((p) => p.id !== id);
    setPromos(next);
    localStorage.setItem('tripnova_promos', JSON.stringify(next));
  };

  const resetToDefaultData = () => {
    setBookings(mockInitialBookings);
    setHotels(mockHotels);
    setPackages(mockPackages);
    setFlights(mockFlights);
    setPromos(mockPromos);
    localStorage.removeItem('tripnova_bookings');
    localStorage.removeItem('tripnova_hotels');
    localStorage.removeItem('tripnova_packages');
    localStorage.removeItem('tripnova_flights');
    localStorage.removeItem('tripnova_promos');
    localStorage.removeItem('tripnova_checkout_draft');
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        hotels,
        packages,
        flights,
        promos,
        checkoutDraft,
        setCheckoutDraft,
        initiateBooking,
        confirmBooking,
        cancelBooking,
        applyCoupon,
        removeCoupon,
        addHotel,
        updateHotel,
        deleteHotel,
        addPackage,
        updatePackage,
        deletePackage,
        addFlight,
        deleteFlight,
        addCoupon,
        deleteCoupon,
        updateBookingStatus,
        resetToDefaultData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
