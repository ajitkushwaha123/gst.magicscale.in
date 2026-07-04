import React from "react";
import Home from "@/components/global/Home";

export const metadata = {
  title: {
    absolute: "Apply for FSSAI License Online | MagicScale",
  },
  description: "Get your Basic, State, or Central FSSAI License online starting at ₹999. Expert support, hassle-free processing, and secure platform.",
};

export default function Page() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FSSAI License Online",
    url: "https://fssai.magicscale.in",
    description: "Apply online for FSSAI License starting at ₹999.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FSSAI License Registration",
    provider: {
      "@type": "Organization",
      name: "MagicScale",
    },
    areaServed: "India",
    serviceType: "Food License Registration",
    offers: {
      "@type": "Offer",
      price: "999",
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="relative bg-white dark:bg-[#0a0a1a] flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-7xl w-full mx-auto px-2 md:px-4">
          <Home />
        </div>
      </div>
    </>
  );
}
