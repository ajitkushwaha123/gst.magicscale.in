import Template from "@/components/global/template";
import { Headset, Mail, MapPin, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact Us | MagicScale",
  description:
    "Get in touch with MagicScale. We provide fast, secure, and hassle-free GST Registration services for businesses across India. Get your GSTIN in 48 hours.",
  keywords: [
    "MagicScale",
    "GST Registration Support",
    "GST help India",
    "GSTIN Registration Service",
    "GST Number Online",
    "GST consultant",
    "GST registration support",
  ],
  openGraph: {
    title: "Contact Us | MagicScale",
    description:
      "Get in touch with MagicScale. We help you get your GST Number (GSTIN) quickly and easily.",
    url: "https://magicscale.in/contact",
    siteName: "MagicScale",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MagicScale",
    description:
      "Need help with your GST Registration? Contact MagicScale today.",
  },
};

const cardData = [
  {
    title: "Application Support",
    description:
      "Need help with GST registration, document submission, or Aadhaar OTP?",
    icon: <Headset className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Whether you are starting a new GST application, need help uploading
        documents, have questions about Aadhaar OTP verification, or want to
        track your ARN status — our team is here to help. <br /> <br />
        Reach us at{" "}
        <a
          href="mailto:support@magicscale.in"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          support@magicscale.in
        </a>{" "}
        and we'll get back to you as soon as possible. You can also contact us
        directly on WhatsApp for faster support.
      </>
    ),
  },
  {
    title: "Expert GST Guidance",
    description: "Not sure which GST registration type is right for you?",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Get expert guidance on Regular GST Registration, Composition Scheme,
        and Voluntary Registration. We help retailers, Amazon/Flipkart sellers,
        freelancers, manufacturers, and service providers get their GSTIN
        quickly and correctly. <br /> <br />
        Our team will advise you on HSN/SAC codes, business type selection, and
        ensure your application is error-free before submission.
      </>
    ),
  },
  {
    title: "Location",
    description: "Serving businesses across India — 100% online.",
    icon: <MapPin className="w-6 h-6 text-green-500" />,
    content: (
      <>
        {" "}
        <strong>MagicScale</strong> <br />
        New Delhi, India <br /> <br />
        We proudly provide online GST Registration and compliance services to
        businesses nationwide — retailers, e-commerce sellers, freelancers,
        consultants, and more.
      </>
    ),
  },
];

const contactData = {
  title: "Let's Get Your GSTIN",
  description: "Questions about our GST Registration process?",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        Whether you&apos;re starting your first business, want to sell on Amazon or
        Flipkart, or need a GSTIN for B2B transactions — we&apos;re here to get your
        GST Number issued quickly and affordably at just ₹1,499.{" "}
      </p>
      <p>
        Primary Support:{" "}
        <a
          href="mailto:support@magicscale.in"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          support@magicscale.in
        </a>
        <br />
        Location: New Delhi, India
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Contact Us"
      heading={
        <div>
          Get Expert Help With Your <br className="hidden sm:block" />
          GST Registration{" "}
        </div>
      }
      description="Questions about getting your GST Number? We're here to help you get your GSTIN in 48 hours."
      ctaDescription="Reach out to our team for support, guidance, and answers to your GST registration questions. Whether you're just starting out or need help mid-application, we're happy to assist."
      ctaLink="mailto:support@magicscale.in"
      ctaButton={
        <span className="flex items-center gap-2">
          {" "}
          <Mail className="w-4 h-4" />
          Contact Support{" "}
        </span>
      }
      infoData={cardData}
      contactData={contactData}
    />
  );
};

export default page;
