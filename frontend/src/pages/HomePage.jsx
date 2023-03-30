import React from 'react';
import CampaignCarousel from '../components/CampaignCarousel'
import FundRaiserGrid from '../components/FundRaiserGrid'
import DonationGrid from '../components/DonationGrid'
import Hero from '../components/Hero';

export default function HomePage() {
  return (
    <>
    <Hero/>
    <div className='container text-3xl font-bold bg-gradient-to-b from-rose-100 to-teal-100'>
      
      <div className="mx-auto max-w-2xl my-6 lg:py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 ">
        
        <CampaignCarousel />
      <FundRaiserGrid/>
      <DonationGrid/>
    </div>
      </div>
  </>
  )
}
