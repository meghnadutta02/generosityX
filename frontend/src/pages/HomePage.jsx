import React from "react";
import CampaignCarousel from "../components/CampaignCarousel";
import FundRaiserGrid from "../components/FundRaiserGrid";
import DonationGrid from "../components/DonationGrid";
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import About from "../components/About";
import "../App.css";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className=" text-3xl font-bold custom-mesh">
        <div className="mx-auto lg:py-4 px-4 sm:py-8 sm:px-6 lg:w-full lg:px-32 ">
          <CampaignCarousel />
          <FundRaiserGrid />
          <DonationGrid />
          <About />
          <Contact />
        </div>
      </div>
    </>
  );
}
