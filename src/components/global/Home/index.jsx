import React from "react";
import { Hero } from "@/components/general/Hero";
import StickyMobileCTA from "@/components/general/StickyMobileCTA";
import WhyChooseUs from "@/components/general/WhyChooseUs";
import PainSection from "@/components/general/PainSection";
import LicenseTypes from "@/components/general/LicenseTypes";
import HowItWorks from "@/components/general/HowItWorks";
import Pricing from "@/components/general/Pricing";
import MasonryGallery from "@/components/general/galllery";
import Testimonials from "@/components/general/Reviews";
import Faqs from "@/components/general/Faqs";
import EccomerceBrands from "@/components/general/EccomerceBrands";

export default function Home() {
  return (
    <div className="w-full pb-16 text-neutral-900 transition-colors duration-300 dark:text-white">
      <Hero />
      <WhyChooseUs />
      <EccomerceBrands />
      <PainSection />
      <LicenseTypes />
      <HowItWorks />
      <StickyMobileCTA />
      <Pricing />
      <MasonryGallery />
      <Testimonials />
      <Faqs />
    </div>
  );
}
