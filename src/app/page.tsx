import React from 'react';
import HeroSearch from '@/components/home/HeroSearch';
import PromoBanner from '@/components/home/PromoBanner';
import PopularDestinations from '@/components/home/PopularDestinations';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import CuratedPackages from '@/components/home/CuratedPackages';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSearch />
      <PromoBanner />
      <PopularDestinations />
      <FeaturedProperties />
      <CuratedPackages />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
