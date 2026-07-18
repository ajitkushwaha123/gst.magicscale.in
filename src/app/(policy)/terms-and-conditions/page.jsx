import Template from "@/components/global/template";
import { Headset, Rows, ShieldCheck, Trash2, Zap } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | MagicScale",
  description:
    "Review the Terms & Conditions governing your use of MagicScale's GST Registration and related services.",
  keywords: [
    "MagicScale",
    "Terms and Conditions",
    "GST Registration Service",
    "Service Terms",
    "GSTIN Processing",
    "Business Compliance",
  ],
  authors: [
    { name: "MagicScale", url: "https://magicscale.in" },
  ],
  openGraph: {
    title: "Terms & Conditions | MagicScale",
    description:
      "Review the Terms & Conditions governing your use of MagicScale's GST Registration and related services.",
    url: "https://magicscale.in/terms-and-conditions",
    siteName: "MagicScale",
    type: "website",
  },
};

const cardData = [
  {
    title: "Client Responsibilities & KYC Accuracy",
    description: "Clients must provide accurate and lawful business and personal documents.",
    icon: <Rows className="w-6 h-6 text-green-500" />,
    content: (
      <>
        By engaging MagicScale for GST Registration services, 
        you agree that all documents (PAN, Aadhaar, bank proofs, business address proofs, etc.) 
        provided by you are 100% authentic and legally valid. <br /> <br />
        You are solely responsible for any legal repercussions, penalties, or 
        application rejections that arise from submitting forged, expired, or 
        incorrect documents to the government authorities through our platform. 
        You also agree to complete the necessary Aadhaar OTP verification promptly.
      </>
    ),
  },
  {
    title: "Independent Consultancy Status",
    description:
      "We are a private agency assisting with government compliance.",
    icon: <Zap className="w-6 h-6 text-green-500" />,
    content: (
      <>
        MagicScale operates as an independent private consultancy. 
        We are not a government body, and we do not issue the GST Number (GSTIN) 
        directly. <br /> <br />
        Our professional fees cover the cost of consultation, document preparation, 
        and application filing on the GST portal.
      </>
    ),
  },
  {
    title: "No Guarantee of Final Approval",
    description: "Final licensing decisions rest with the GST authorities.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        While our experts ensure your GST application is submitted correctly, 
        we do not and cannot guarantee the final approval, issuance, or processing 
        timeline of your GSTIN. <br /> <br />
        The respective government department may request additional documents (SCN), 
        conduct physical premises inspections, or reject applications based on their 
        own criteria. MagicScale holds no liability for government rejections or delays.
      </>
    ),
  },
  {
    title: "Termination & Fraud Policy",
    description: "Services may be revoked for fraudulent activities.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        We reserve the right to immediately suspend or terminate our services 
        without refund if a client:{" "}
        <ul className="list-disc pl-5 mt-2">
          {" "}
          <li>Submits deliberately falsified or forged KYC documents (PAN, Aadhaar, etc.).</li>{" "}
          <li>Engages in abusive or threatening behavior toward our staff.</li>{" "}
          <li>Attempts to use our services for unlawful business activities or tax evasion.</li>{" "}
          <li>Violates these Terms & Conditions.</li>{" "}
        </ul>{" "}
        <br />
        Service termination does not create eligibility for a refund.
      </>
    ),
  },
];

const contactData = {
  title: "Questions About These Terms?",
  description: "We're happy to clarify any aspect of our Terms & Conditions.",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        By accessing or purchasing any MagicScale GST Registration 
        service or consultation, you legally agree to these Terms & Conditions.{" "}
      </p>
      <p className="mb-2">
        Support & Legal Inquiries:{" "}
        <a
          href="mailto:support@magicscale.in"
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          support@magicscale.in
        </a>
      </p>
      <p>
        MagicScale
        <br />
        New Delhi, India
        <br />
        GST Registration & Compliance Services
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Terms & Conditions"
      heading={
        <div>
          Terms & Conditions <br className="hidden sm:block" />
          For Clients{" "}
        </div>
      }
      description="Please review the terms governing your use of MagicScale's GST Registration services and compliance consultations."
      ctaDescription="By engaging our services, you agree to these Terms & Conditions, ensuring a transparent and legally compliant service experience."
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
