import React from "react";
import CampaignCarousel from "../components/CampaignCarousel";
import FundRaiserGrid from "../components/FundRaiserGrid";
import DonationGrid from "../components/DonationGrid";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import About from "../components/About";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="container text-3xl font-bold bg-gradient-to-b from-rose-100 to-teal-100">
        <div className="mx-auto lg:py-4 px-4 sm:py-8 sm:px-6 lg:w-full lg:px-32 ">
          <CampaignCarousel />
          <FundRaiserGrid />
          <DonationGrid />
          <About />
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
}
