import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { BookingProvider } from '@/context/BookingContext';
import DemoBadge from '@/components/common/DemoBadge';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'TripNova — Premium Travel Booking Marketplace | Flights, Hotels, Villas & Packages',
  description: 'Experience seamless luxury travel booking for flights, 5-star hotels, private villas, and curated holiday packages across India, Dubai, Bali and worldwide destinations.',
  keywords: ['TripNova', 'Travel Booking', 'MakeMyTrip Clone', 'Luxury Hotels', 'Flights Booking', 'Holiday Packages', 'Villas and Homestays'],
  openGraph: {
    title: 'TripNova — Premium Travel Booking Marketplace',
    description: 'Explore and book flights, hotels, holiday packages and luxury villas with instant simulated booking confirmation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
        <AuthProvider>
          <BookingProvider>
            <DemoBadge />
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
