import Template from "@/components/global/template";
import { Headset, ShieldCheck, Trash2 } from "lucide-react";

export const metadata = {
  title: "Shipping & Digital Delivery Policy | MagicScale",
  description:
    "Learn how MagicScale delivers your GST Registration certificate, GSTIN, ARN, and all related documents digitally.",
  keywords: [
    "MagicScale",
    "Digital Delivery",
    "GST Certificate Delivery",
    "GSTIN Delivery",
    "GST Registration Service",
    "ARN Number",
  ],
  robots: "index, follow",
};

const cardData = [
  {
    title: "100% Digital Delivery",
    description:
      "All GST registration services are delivered entirely online — no physical shipping.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        MagicScale provides GST Registration services entirely through digital
        channels. We do not sell or ship any physical products. <br />{" "}
        <br />
        Our offerings include:{" "}
        <ul className="list-disc pl-5 mt-2">
          {" "}
          <li>GST application filing and submission on the Govt. portal</li>{" "}
          <li>ARN (Application Reference Number) delivery via WhatsApp/email</li>{" "}
          <li>Digital delivery of your official GSTIN Certificate</li>{" "}
          <li>Aadhaar OTP assistance for e-signing</li>{" "}
          <li>Application tracking and status updates</li>{" "}
        </ul>{" "}
        <br />
        No physical shipping, courier services, or logistics are involved. You
        will receive your GSTIN Certificate directly via email or WhatsApp
        once issued by the government.
      </>
    ),
  },
  {
    title: "ARN & GSTIN Delivery Timeline",
    description: "ARN is issued immediately; GSTIN is typically within 48 hours.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        After successful payment and submission of your documents (Aadhaar,
        PAN, Bank Proof, Photo), your GST application will be submitted on the
        government portal. <br /> <br />
        <strong>ARN (Application Reference Number)</strong> is generated
        immediately upon application submission and shared with you. <br />{" "}
        <br />
        <strong>GSTIN (GST Identification Number)</strong> is typically issued
        within 48 hours of application submission, subject to Aadhaar OTP
        verification being completed and government processing. Delays due to
        government portal issues or incomplete documents are outside our
        control.
      </>
    ),
  },
  {
    title: "Communication & Access Responsibility",
    description:
      "Applicants are responsible for providing accurate contact details and completing Aadhaar OTP.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Applicants are responsible for providing an accurate email address,
        WhatsApp number, and Aadhaar-linked mobile number during registration
        to ensure smooth delivery of updates and the final GSTIN certificate.{" "}
        <br /> <br />
        Delays caused by non-availability for Aadhaar OTP verification,
        failure to submit required documents on time, or providing incorrect
        contact details do not constitute a delivery failure on our part.
      </>
    ),
  },
];

const contactData = {
  title: "Need Help With Your GST Application?",
  description:
    "Our support team is available to assist with document delivery and GSTIN status questions.",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        If you have submitted all your documents but have not received your ARN
        or GSTIN, or if your registration has been approved but you haven&apos;t
        received the digital certificate, please contact our support team.{" "}
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
        GST Registration &amp; Compliance Services
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
      description="Learn how your ARN, GSTIN, and GST Certificate are delivered by MagicScale after your GST Registration application is submitted."
      ctaDescription="All MagicScale services are delivered digitally. After government approval, your official GST Certificate (GSTIN) will be sent directly to your registered WhatsApp and email address."
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
