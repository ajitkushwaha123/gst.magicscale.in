"use client";
import React from "react";
import dynamic from "next/dynamic";

import { Hero } from "@/components/general/Hero";
import StickyMobileCTA from "@/components/general/StickyMobileCTA";
const Faqs = dynamic(() => import("../../general/Faqs"), { ssr: false });
const Testimonials = dynamic(() => import("../../general/Reviews"), { ssr: false });
const MasonryGallery = dynamic(() => import("../../general/galllery"), { ssr: false });
const PainSection = dynamic(() => import("@/components/general/PainSection"), { ssr: false });
const Pricing = dynamic(() => import("../../general/Pricing"), { ssr: false });
const LicenseTypes = dynamic(() => import("../../general/LicenseTypes"), { ssr: false });
const HowItWorks = dynamic(() => import("../../general/HowItWorks"), { ssr: false });
const WhyChooseUs = dynamic(() => import("../../general/WhyChooseUs"), { ssr: false });

export default function Home() {
  return (
    <div className="w-full pb-16 text-neutral-900 transition-colors duration-300 dark:text-white">
      <Hero />
      <WhyChooseUs />
      <PainSection />
      <LicenseTypes />
      <HowItWorks />
      {/* <AgendaTimelineSection /> */}
      {/* <BonusSection
        title="Free Zomato & Swiggy Onboarding"
        value="₹5,000+ Value"
        limit={10}
        description="We'll personally help you complete restaurant onboarding on Zomato & Swiggy so you can start receiving orders faster."
      /> */}
      <StickyMobileCTA />
      <Pricing />
      <MasonryGallery />
      <Testimonials />
      <Faqs />
    </div>
  );
}
