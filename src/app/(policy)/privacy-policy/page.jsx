import Template from "@/components/global/template";
import { Headset, Rows, ShieldCheck, Trash2, Zap } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | MagicScale",
  description:
    "Learn how MagicScale collects, uses, and protects your personal information when you use our GST Registration services.",
  keywords: [
    "MagicScale Privacy Policy",
    "GST Registration Service",
    "Data Protection",
    "Personal Information",
    "GSTIN Registration",
    "Privacy Policy India",
  ],
  openGraph: {
    title: "Privacy Policy | MagicScale",
    description:
      "Learn how MagicScale collects, uses, and protects your personal information.",
    url: "https://magicscale.in/privacy-policy",
    siteName: "MagicScale",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | MagicScale",
    description:
      "Learn how MagicScale collects, uses, and protects your personal information.",
  },
};

const cardData = [
  {
    title: "Information We Collect",
    description:
      "We collect information required to process your GST Registration application.",
    icon: <Rows className="w-6 h-6 text-green-500" />,
    content: (
      <>
        When you apply for GST Registration through MagicScale, we collect
        your name, email address, WhatsApp/mobile number, PAN number, Aadhaar
        number, business details, bank account information, and payment-related
        data. <br /> <br />
        We may also collect website analytics, device information, and usage
        data to improve our platform performance and user experience. Documents
        uploaded by you (Aadhaar, PAN, bank statement, photograph) are used
        solely for GST application filing on the government portal.
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    description:
      "Your information is used only to process your GST application and support you.",
    icon: <Zap className="w-6 h-6 text-green-500" />,
    content: (
      <>
        We use your information to file your GST Registration application on
        the government portal, deliver your ARN and GSTIN certificate, process
        payments, and respond to support requests. <br /> <br />
        We may also send you important updates about your application status,
        Aadhaar OTP reminders, GSTIN issuance notifications, and information
        about related compliance services that may benefit your business.
      </>
    ),
  },
  {
    title: "Data Security & Protection",
    description:
      "We take reasonable measures to protect your personal information.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        We implement industry-standard security practices and access controls
        to protect your personal information — especially sensitive data like
        Aadhaar and PAN — from unauthorized access, misuse, or disclosure.{" "}
        <br /> <br />
        We do not sell your personal information to third parties. Information
        may only be shared with the Government GST portal (gst.gov.in) for
        application filing, or trusted payment processors when necessary to
        complete your transaction.
      </>
    ),
  },
  {
    title: "Your Rights & Data Requests",
    description:
      "You may request access, correction, or deletion of your information.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        You may contact us at any time to request access to your information,
        update inaccurate details, unsubscribe from marketing communications,
        or request deletion of your personal data where legally permitted.{" "}
        <br /> <br />
        To submit a privacy-related request, email us at{" "}
        <a
          href="mailto:support@magicscale.in"
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          support@magicscale.in
        </a>
        .
      </>
    ),
  },
];

const contactData = {
  title: "Questions About Your Privacy?",
  description:
    "We're committed to transparency and protecting your personal information.",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        If you have questions about this Privacy Policy, your personal data, or
        how we handle information collected through our GST Registration
        services, please contact us.{" "}
      </p>
      <p className="mb-2">
        Email:{" "}
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
        GST Registration &amp; Compliance Services
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Privacy Policy"
      heading={
        <div>
          Your Privacy. <br className="hidden sm:block" />
          Our Commitment.{" "}
        </div>
      }
      description="Learn how MagicScale collects, uses, stores, and protects your personal information when you use our GST Registration services."
      ctaDescription="We respect your privacy and are committed to protecting your data. This policy explains what information we collect during GST Registration, why we collect it, and how we keep it secure."
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
