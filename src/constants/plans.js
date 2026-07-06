export const PLANS = {
  "fssai-food-license": {
    _id: "fssai-food-license", // Keeping _id for compatibility with existing code
    title: "FSSAI Food License Registration",
    slug: "fssai-food-license",
    description: "Get your FSSAI Food License quickly with complete documentation, application filing, and support.",
    currency: "INR",
    price: 699, // Base price for payment fallback if needed
    badge: "Starting at ₹699",
    ctaText: "Apply Now",
    features: [
      "Expert Documentation Support",
      "Application Filing",
      "Government Fee Guidance",
      "Status Tracking",
      "Dedicated Support",
      "Fast Processing",
      "Digital License Copy"
    ],
    plans: [
      {
        licenseType: "Basic Registration",
        description: "For small food businesses with turnover up to ₹12 Lakhs/year.",
        pricing: [
          {
            duration: "1 Year",
            price: 699,
            originalPrice: 1499,
            popular: true
          },
          {
            duration: "2 Years",
            price: 1800,
            originalPrice: 2500
          },
          {
            duration: "3 Years",
            price: 2500,
            originalPrice: 3500
          },
          {
            duration: "5 Years",
            price: 3699,
            originalPrice: 5500
          }
        ]
      },
      {
        licenseType: "State License",
        description: "For medium-sized food businesses operating within one state.",
        pricing: [
          {
            duration: "1 Year",
            price: 1699,
            originalPrice: 2699
          },
          {
            duration: "2 Years",
            price: 3500,
            originalPrice: 4500
          },
          {
            duration: "3 Years",
            price: 4500,
            originalPrice: 6000
          },
          {
            duration: "5 Years",
            price: 6699,
            originalPrice: 9000
          }
        ]
      },
      {
        licenseType: "Central License",
        description: "For large food businesses, importers, exporters, and multi-state operations.",
        pricing: [
          {
            duration: "1 Year",
            price: 3699,
            originalPrice: 5699
          },
          {
            duration: "2 Years",
            price: 6699,
            originalPrice: 8699
          },
          {
            duration: "3 Years",
            price: 8699,
            originalPrice: 10699
          },
          {
            duration: "5 Years",
            price: 12699,
            originalPrice: 15699
          }
        ]
      }
    ],
    includedServices: [
      "Eligibility Check",
      "Document Verification",
      "Application Filing",
      "FSSAI Registration Assistance",
      "License Download Support",
      "Customer Support"
    ],
    documentsRequired: [
      "Aadhaar Card",
      "PAN Card",
      "Passport Size Photograph",
      "Business Name",
      "Business Address",
      "Email ID",
      "Mobile Number"
    ],
    isActive: true,
    whatsappSupportLink: "https://wa.me/918826073117"
  }
};
