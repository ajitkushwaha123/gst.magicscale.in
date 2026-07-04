import Template from "@/components/global/template";
import { Headset, Mail, MapPin, ShieldCheck, FileCheck } from "lucide-react";

export const metadata = {
  title: "Contact Us | MagicScale",
  description:
    "Get in touch with MagicScale. We provide fast, secure, and hassle-free FSSAI Registration and licensing services for food businesses across India.",
  keywords: [
    "MagicScale",
    "FSSAI Registration Support",
    "food license help",
    "FSSAI Licensing Service",
    "food business compliance",
    "cloud kitchen license",
    "restaurant registration support",
  ],
  openGraph: {
    title: "Contact Us | MagicScale",
    description:
      "Get in touch with MagicScale. We help you secure your FSSAI license quickly and easily.",
    url: "https://magicscale.in/contact",
    siteName: "MagicScale",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MagicScale",
    description:
      "Need help with your FSSAI registration? Contact MagicScale today.",
  },
};

const cardData = [
  {
    title: "Application Support",
    description:
      "Need help with FSSAI registration, documentation, or compliance?",
    icon: <Headset className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Whether you are starting a new application, need help uploading documents, 
        or have questions about your FSSAI license status, our team is here to help. <br /> <br />
        Reach us at{" "}
        <a
          href="mailto:support@magicscale.in"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          support@magicscale.in
        </a>{" "}
        and we'll get back to you as soon as possible.
      </>
    ),
  },
  {
    title: "Expert Guidance",
    description: "Questions about which FSSAI license is right for you?",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Get guidance on Basic, State, and Central FSSAI licenses. We help restaurants, 
        cloud kitchens, retailers, and food manufacturers stay 100% compliant.
      </>
    ),
  },
  {
    title: "Location",
    description: "Serving food businesses everywhere in India.",
    icon: <MapPin className="w-6 h-6 text-green-500" />,
    content: (
      <>
        {" "}
        <strong>MagicScale</strong> <br />
        New Delhi, India <br /> <br />
        We proudly provide online FSSAI registration and business compliance services nationwide.
      </>
    ),
  },
];

const contactData = {
  title: "Let's Get You Licensed",
  description:
    "Questions about our FSSAI registration process?",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        Whether you're planning to launch your first food brand, start a cloud
        kitchen, or ensure your existing restaurant is compliant, we're
        here to secure your license quickly and affordably.{" "}
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
          FSSAI Registration{" "}
        </div>
      }
      description="Questions about securing your food license? We're here to help."
      ctaDescription="Reach out to our team for support, guidance, and answers to your compliance questions. Whether you're just starting or renewing, we're happy to assist."
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
