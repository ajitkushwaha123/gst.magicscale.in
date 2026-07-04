import Template from "@/components/global/template";
import { Headset, ShieldCheck, Trash2 } from "lucide-react";

export const metadata = {
  title: "Shipping & Digital Delivery Policy | MagicScale",
  description:
    "Learn how MagicScale delivers your FSSAI registration certificates, compliance documents, and consultation services.",
  keywords: [
    "MagicScale",
    "Digital Delivery",
    "Service Access",
    "FSSAI Certificate Delivery",
    "consultation",
    "License Delivery",
    "FSSAI Licensing Service",
  ],
  robots: "index, follow",
};

const cardData = [
  {
    title: "100% Digital Delivery",
    description:
      "All FSSAI registration services and consultations are delivered online.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        MagicScale provides FSSAI registration services entirely through
        digital channels. We do not sell or ship any physical products. <br />{" "}
        <br />
        Our offerings include:{" "}
        <ul className="list-disc pl-5 mt-2">
          {" "}
          <li>FSSAI registration processing and submission</li>{" "}
          <li>Digital delivery of your official FSSAI Certificate</li>{" "}
          <li>Compliance consultation sessions (via call/video)</li>{" "}
          <li>Digital hygiene templates and business resources</li>{" "}
          <li>Application tracking and updates</li>{" "}
        </ul>{" "}
        <br />
        No physical shipping, courier services, or logistics are involved. You will 
        receive your final certificate directly via email or WhatsApp once approved 
        by the government.
      </>
    ),
  },
  {
    title: "Application Tracking & Timelines",
    description: "Updates and certificates are delivered electronically.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        After successful payment and submission of your KYC documents, you will 
        receive an application reference number or submission proof via email. <br /> <br />
        Delivery timelines for the final FSSAI license depend entirely on the 
        government department's processing speed. Most standard registrations are 
        processed within 7 to 30 working days. <br /> <br />
        Once approved by the authorities, the soft copy of your FSSAI certificate 
        will be delivered to your registered email address immediately.
      </>
    ),
  },
  {
    title: "Communication & Access Responsibility",
    description:
      "Applicants are responsible for providing accurate contact details.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Applicants are responsible for providing an accurate email address and 
        phone number during registration to ensure smooth delivery of updates 
        and the final certificate. <br /> <br />
        Failure to provide necessary documents for processing, or missing a 
        scheduled compliance consultation call, does not constitute a delivery 
        failure on our part.
      </>
    ),
  },
];

const contactData = {
  title: "Need Help With Your Application?",
  description:
    "Our support team is available to assist with document delivery questions.",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        If you have submitted all your documents but have not received an 
        application update, or if your license has been approved but you haven't 
        received the digital copy, please contact our support team.{" "}
      </p>
      <p>
        Support Email:{" "}
        <a
          href="mailto:support@magicscale.in"
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          support@magicscale.in
        </a>
      </p>
      <p className="mt-3">
        MagicScale
        <br />
        New Delhi, India
        <br />
        FSSAI Registration & Compliance Services
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Shipping & Digital Delivery Policy"
      heading={
        <div>
          Digital Delivery <br className="hidden sm:block" />
          Policy{" "}
        </div>
      }
      description="Learn how application updates, consultation programs, and final FSSAI certificates are delivered by MagicScale."
      ctaDescription="All MagicScale services are delivered digitally. After government approval, your official FSSAI certificate will be sent directly to your registered email address."
      ctaLink="mailto:support@magicscale.in"
      ctaButton={
        <span className="flex items-center gap-2">
          {" "}
          <Headset className="w-4 h-4" />
          Contact Support{" "}
        </span>
      }
      infoData={cardData}
      contactData={contactData}
    />
  );
};

export default page;
