# TripNova — Premium Travel Booking Marketplace

> **Client-Facing Portfolio Demo** inspired by MakeMyTrip, engineered with Next.js 15, TypeScript, Tailwind CSS, Lucide icons, and simulated travel technology workflows.

---

## 🌟 Executive Overview

**TripNova** is a modern, responsive, travel-technology platform prototype built to demonstrate production-grade capabilities in travel booking, itinerary exploration, price computation, customer accounts, and administrative management.

The design utilizes a clean, trustworthy aesthetic featuring deep navy/royal blue branding, crisp typography, soft neutral surfaces, responsive layouts across mobile/tablet/desktop, and realistic Indian & international travel datasets (INR currency formatting, multi-stop flights, luxury hotels, private villas, and curated holiday packages).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3 with custom brand color tokens (`navy`, `coral`, `emerald`, `amber`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations / Effects**: Canvas Confetti (booking celebration), CSS micro-interactions, responsive drawers
- **State Management**: React Context (`BookingContext` for search state, cart & price breakdown; `AuthContext` for demo customer profile)
- **API & Persistence**: Next.js App Router Route Handlers (`/api/hotels`, `/api/packages`, `/api/bookings`) with PostgreSQL-ready schema architecture

---

## 🚀 Key Implemented Features

### 1. Homepage & Hero Booking Console
- **Multi-Category Tabbed Search**:
  - ✈️ **Flights**: One-way / Round-trip toggle, Origin & Destination city selectors with airport codes, Departure & Return date pickers, Traveller count and Cabin Class (Economy, Premium Economy, Business, First).
  - 🏨 **Hotels**: Destination picker, Check-in / Check-out calendar validation, Rooms and Guest counter.
  - 🏡 **Villas & Homestays**: Destination filter, Guest count, Private pool / Sea view options.
  - 🏖️ **Holiday Packages**: Destination, Travel duration, Travelers, and Package tier.
  - 🚌 **Buses**: Source, Destination, Date, and Seat type.
  - 🚆 **Trains**: Station to Station, Quota (General, Tatkal, Ladies), Date.
  - 🚕 **Cabs**: One-way / Round-trip / Outstation / Airport transfer.
- **Dynamic Promotional Banners**: Seasonal travel campaigns (`SUMMERNOVA`, `FIRSTFLY`, `LUXSTAY`).
- **Popular Destinations Grid**: Goa, Manali, Shimla, Jaipur, Dubai, Bali, Singapore, Kashmir with instant search prefill.
- **Recommended Hotels & Villas Showcase**: Live star ratings, verified review counts, amenities badges, price per night with tax breakdown.
- **Curated Holiday Packages Carousel**: Day-wise itineraries, starting rates per person, and inclusions.
- **Value Proposition ("Why TripNova")**: 24/7 Concierge, 100% Verified Stays, Best Price Assurance, Instant Confirmations.
- **Testimonials & Social Proof**: Client-ready traveler reviews and travel community stats.
- **Comprehensive Footer**: Quick links, popular domestic and international routes, newsletter subscription, payment partner badges, support lines, terms, and privacy policies.

### 2. Search & Filter Results
- Dedicated pages for `/flights`, `/hotels`, `/villas`, `/packages`, `/buses`, `/trains`, and `/cabs`.
- **Interactive Multi-Filter Sidebar**:
  - Price range slider with dynamic counter.
  - Star category (3★, 4★, 5★ luxury).
  - Guest rating (4.5+, 4.0+, 3.5+).
  - Property type (Hotel, Resort, Villa, Boutique).
  - Amenities (Pool, Free WiFi, Spa, Beachfront, Breakfast Included).
  - Airline filter (IndiGo, Air India, Vistara, Emirates, Singapore Airlines).
  - Stops filter (Direct, 1 Stop, 2+ Stops).
- **Sort Controls**: Price (Low to High / High to Low), Highest Rated, and Recommended.
- Responsive mobile filter sheet and active filter count badge.

### 3. Detailed Property & Package Views
- Image galleries with high-resolution travel photography.
- Day-by-day expandable itinerary modules for holiday packages.
- Room tier selection with capacity limits, bedding info, and pricing differences.
- House rules, check-in / check-out times, and cancellation policy badges.
- Customer reviews breakdown with category scores (Cleanliness, Location, Service, Value).

### 4. End-to-End Simulated Booking & Checkout
- **Real-Time Price Calculation**: Base fare + Room/Traveler multiplier + Taxes (18% GST) + Convenience fee - Coupon discounts.
- **Promo Coupon Engine**: Accepts valid demo coupons (`TRIPNOVA500`, `SUPERSTAY`, `GLOBAL20`) with instant savings deduction.
- **Guest / Passenger Information Validation**: First name, last name, email, phone number, and special requests.
- **Simulated Payment Gateways**: UPI (Google Pay, PhonePe, Paytm), Credit/Debit Card (simulated without real card storage), Net Banking, and Pay at Hotel.
- **Booking Reference Generator**: Generates unique alphanumeric references (e.g., `TNV-HTL-89421`).
- **Polished Confirmation Screen**: Interactive confetti animation, download booking summary button, email confirmation simulation, and "View in My Trips" link.

### 5. Customer Dashboard & Account
- `/login` and `/register` views with demo quick-login credentials.
- `/my-trips` dashboard displaying upcoming, completed, and cancelled itineraries.
- Simulated cancellation request workflow with refund estimate calculator.

### 6. Administration Dashboard (`/admin`)
- High-level KPIs: Total Demo Bookings, Gross Booking Value, Active Listings, Customer Inquiries.
- Inventory Management: View, search, and status toggle for Hotels, Flights, and Packages.
- Recent booking transactions log with status tags (`Confirmed`, `Pending`, `Refunded`).
- Persisted updates via client state and backend mock API.

---

## 🚦 Distinction of Implementation Status

| Feature Area | Status | Notes |
|---|---|---|
| **Frontend UI / UX** | ✅ Fully Implemented | Production-ready Next.js 15, Tailwind CSS, Lucide icons |
| **Search & Filtering** | ✅ Fully Implemented | Client-side & query-driven multi-criteria filtering & sorting |
| **Price Calculations & Coupons** | ✅ Fully Implemented | Dynamic GST, service fees, discount deduction |
| **Simulated Checkout Flow** | ✅ Fully Implemented | Form validation, payment selector, reference generator |
| **Confirmation & Confetti** | ✅ Fully Implemented | Celebration animation, booking summary download |
| **My Trips Dashboard** | ✅ Fully Implemented | View booking history, booking details, cancel simulation |
| **Admin Dashboard** | ✅ Fully Implemented | Management stats, inventory review, booking feed |
| **Backend API Endpoints** | ✅ Fully Implemented | Next.js API route handlers returning structured JSON |
| **Live GDS / Airline APIs** | 🟡 Simulated Demo | Labeled as simulated demo data (Amadeus/Sabre ready) |
| **Live Payment Processing** | 🟡 Simulated Demo | Labeled as simulated demo (Stripe/Razorpay ready) |
| **Database Persistence** | 🟡 PostgreSQL Ready | Uses in-memory seed dataset; schema ready for PostgreSQL |

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm or pnpm or yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd tripnova

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 🌐 Routes Overview

- `/` — Homepage with hero search, promo banners, destinations, hotels, packages, testimonials.
- `/flights` — Flight search results with airline, duration, and stops filters.
- `/hotels` — Hotel search results with price range, star, and amenity filters.
- `/villas` — Premium homestays and private villas.
- `/packages` — Curated holiday packages with duration and destination filters.
- `/buses` — Intercity bus travel booking demo.
- `/trains` — Railway booking demo with quota filters.
- `/cabs` — Outstation and airport transfer car rentals.
- `/destinations` — Destination guide directory.
- `/offers` — Promotional discount coupons and partner deals.
- `/hotel/[slug]` — Hotel detailed information, room selector, and policies.
- `/villa/[slug]` — Villa detailed view with house rules and amenities.
- `/package/[slug]` — Day-wise itinerary and package booking.
- `/checkout` — Traveller information, price calculation, coupon engine, simulated payment.
- `/booking/confirmation/[reference]` — Confirmation page with reference number and summary.
- `/my-trips` — Customer booking history and cancellation request modal.
- `/login` & `/register` — Authentication interface with demo auto-fill.
- `/contact` — Customer support directory and inquiry form.
- `/admin` — Management dashboard with inventory, bookings, and revenue metrics.
- `/api/hotels`, `/api/packages`, `/api/bookings` — RESTful JSON endpoints.
