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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an FSSAI License?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An FSSAI License is a mandatory food safety registration issued by the Food Safety and Standards Authority of India (FSSAI). It is required for anyone involved in manufacturing, storing, distributing, transporting, or selling food products.",
        },
      },
      {
        "@type": "Question",
        name: "Who needs an FSSAI License?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you run any food-related business, you need an FSSAI License, including: Restaurants, Cloud Kitchens, Home Kitchens, Cafés, Bakeries, Grocery Stores, Sweet Shops, Food Manufacturers, Food Delivery Businesses, Caterers, Food Traders.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to get the license?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We process most 1-Year FSSAI Registration applications within 24 hours, provided all required documents are submitted correctly.",
        },
      },
      {
        "@type": "Question",
        name: "What documents are required?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You'll need: Aadhaar Card, PAN Card, Phone Number, Email ID, Shop/Business Name, Business Address, and a Selfie Photo.",
        },
      },
      {
        "@type": "Question",
        name: "What are your charges?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our pricing is transparent: 1 Year: ₹999, 3 Years: ₹1,500, 5 Years: ₹2,500. No hidden charges.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://fssai.magicscale.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FSSAI License Registration",
        item: "https://fssai.magicscale.in/#pricing",
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "MagicScale FSSAI Licensing",
    image: "https://fssai.magicscale.in/og-image.png",
    "@id": "https://fssai.magicscale.in",
    url: "https://fssai.magicscale.in",
    telephone: "+918826073117",
    priceRange: "₹999 - ₹2500",
    address: {
      "@type": "PostalAddress",
      streetAddress: "New Delhi",
      addressLocality: "New Delhi",
      addressRegion: "DL",
      postalCode: "110001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6139,
      longitude: 77.2090,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="relative bg-white dark:bg-[#0a0a1a] flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-7xl w-full mx-auto px-2 md:px-4">
          <Home />
        </div>
      </div>
    </>
  );
}
