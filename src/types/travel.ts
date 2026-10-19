export type TravelCategory = 'flights' | 'hotels' | 'villas' | 'packages' | 'buses' | 'trains' | 'cabs';

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  airlineLogo: string;
  fromCity: string;
  fromCode: string;
  fromAirport: string;
  toCity: string;
  toCode: string;
  toAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  durationMinutes: number;
  stops: number;
  stopDetails?: string;
  price: number;
  originalPrice: number;
  seatsLeft: number;
  refundable: boolean;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business';
  baggage: {
    cabin: string;
    checkIn: string;
  };
  mealIncluded: boolean;
  aircraft: string;
}

export interface HotelRoom {
  id: string;
  name: string;
  bedType: string;
  maxGuests: number;
  areaSqFt: number;
  pricePerNight: number;
  originalPrice: number;
  inclusions: string[];
  cancellationPolicy: string;
  availableRooms: number;
  image: string;
}

export interface HotelReview {
  id: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  comment: string;
  tripType: 'Couple' | 'Family' | 'Solo' | 'Friends' | 'Business';
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  propertyType: 'Hotel' | 'Luxury Resort' | 'Villa' | 'Boutique Stay' | 'Heritage Palace';
  starRating: number;
  rating: number;
  reviewCount: number;
  ratingBadge: 'Exceptional' | 'Excellent' | 'Very Good' | 'Good';
  city: string;
  state: string;
  address: string;
  locationHighlights: string[];
  pricePerNight: number;
  originalPrice: number;
  taxesAndFees: number;
  mainImage: string;
  images: string[];
  amenities: string[];
  freeCancellation: boolean;
  breakfastIncluded: boolean;
  coupleFriendly: boolean;
  description: string;
  houseRules: string[];
  checkInTime: string;
  checkOutTime: string;
  rooms: HotelRoom[];
  reviews: HotelReview[];
  featured?: boolean;
}

export interface PackageDayItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  mealsIncluded: string[];
  stayCity: string;
}

export interface HolidayPackage {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string;
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  originalPrice: number;
  heroImage: string;
  images: string[];
  theme: 'Romantic' | 'Family Fun' | 'Adventure' | 'Beach & Islands' | 'Cultural Heritage' | 'Luxury Escapes';
  rating: number;
  reviewCount: number;
  inclusions: string[];
  exclusions: string[];
  itinerary: PackageDayItinerary[];
  hotelCategory: string;
  flightsIncluded: boolean;
  featured?: boolean;
  overview: string;
}

export interface Bus {
  id: string;
  operator: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fromCity: string;
  toCity: string;
  pickupPoint: string;
  dropPoint: string;
  price: number;
  rating: number;
  reviewCount: number;
  seatsAvailable: number;
  amenities: string[];
  liveTracking: boolean;
}

export interface TrainClassSeat {
  classCode: '1A' | '2A' | '3A' | 'SL' | 'CC' | 'EC';
  className: string;
  price: number;
  status: 'AVAILABLE' | 'WL' | 'RAC';
  seatsCount: number;
  confirmationChance?: string;
}

export interface Train {
  id: string;
  trainNumber: string;
  trainName: string;
  fromStation: string;
  fromCode: string;
  toStation: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  runningDays: string[];
  classes: TrainClassSeat[];
}

export interface Cab {
  id: string;
  cabType: 'Sedan' | 'SUV' | 'Prime SUV' | 'Hatchback' | 'Luxury';
  model: string;
  capacity: number;
  luggageCount: number;
  price: number;
  perKmRate: number;
  includedKm: number;
  fuelType: string;
  rating: number;
  estimatedArrivalMin: number;
  features: string[];
  image: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  stateOrCountry: string;
  category: 'Domestic' | 'International';
  tagline: string;
  description: string;
  image: string;
  startingPrice: number;
  bestTimeToVisit: string;
  weather: string;
  topAttractions: string[];
  hotelsCount: number;
  packageCount: number;
}

export interface PromoOffer {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  discountValue: string;
  minSpend: number;
  category: TravelCategory | 'all';
  expiryDate: string;
  bannerImage: string;
  terms: string[];
}

export interface Traveller {
  id?: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  seatNumber?: string;
  berthPreference?: string;
}

export interface Booking {
  id: string;
  reference: string;
  type: TravelCategory;
  title: string;
  destination: string;
  subtitle: string;
  image: string;
  bookingDate: string;
  travelDate: string;
  returnDate?: string;
  travellers: Traveller[];
  contactEmail: string;
  contactPhone: string;
  subtotal: number;
  discount: number;
  couponCode?: string;
  taxes: number;
  totalPrice: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  paymentMethod: string;
  itemSnapshot: any;
}
