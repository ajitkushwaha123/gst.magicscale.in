import Template from "@/components/global/template";
import { Bug, Headset, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Support & Issue Reporting | MagicScale",
  description:
    "Need help with your FSSAI application, document uploads, or payments? Contact the MagicScale support team.",
  keywords: [
    "MagicScale Support",
    "Service Support",
    "FSSAI Application Support",
    "consultation Support",
    "Payment Issue",
    "Document Upload Help",
  ],
  openGraph: {
    title: "Support & Issue Reporting | MagicScale",
    description:
      "Need help with your FSSAI application processing, document uploads, or payments? Contact our support team.",
    url: "https://magicscale.in/report-issue",
    siteName: "MagicScale",
    locale: "en_IN",
    type: "website",
  },
};

const cardData = [
  {
    title: "Application Issues",
    description: "Unable to complete your FSSAI registration process?",
    icon: <Bug className="w-6 h-6 text-red-500" />,
    content: (
      <>
        If you're unable to complete your FSSAI registration form, upload KYC 
        documents, or check the status of your application, our team is ready to
        help. <br /> <br />
        Please email your registered phone number, email address, and issue details to{" "}
        <a
          href="mailto:support@magicscale.in"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          support@magicscale.in
        </a>
        .
      </>
    ),
  },
  {
    title: "Payment & Billing Support",
    description: "Facing payment confirmation or billing-related issues?",
    icon: <Mail className="w-6 h-6 text-green-500" />,
    content: (
      <>
        If your payment was successful but you did not receive a confirmation receipt, 
        or if you believe a billing error occurred, please contact our support team with
        your transaction details. <br /> <br />
        We will investigate and resolve legitimate billing issues as quickly as
        possible.
      </>
    ),
  },
  {
    title: "Consultation Support",
    description: "Need assistance regarding consultation or legal guidance?",
    icon: <MapPin className="w-6 h-6 text-green-500" />,
    content: (
      <>
        For questions regarding consultation calls, documentation requirements,
        or specific compliance queries for your food business, contact our
        expert team. <br /> <br />
        MagicScale operates online and serves food entrepreneurs
        across India.
      </>
    ),
  },
];

const contactData = {
  title: "Need Help? We're Here For You",
  description:
    "Whether it's FSSAI registration, payment concerns, or document uploads, our team is ready to assist.",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        If you're facing any issue related to our FSSAI registration services, 
        consultation calls, document uploads, or payments, please reach out
        with complete details so we can assist you efficiently.{" "}
      </p>
      <p>
        📧 Support Email:{" "}
        <a
          href="mailto:support@magicscale.in"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          support@magicscale.in
        </a>
        <br />
        📍 Location: New Delhi, India
        <br />
        🛡️ MagicScale – FSSAI Licensing & Compliance Support
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Support & Issue Reporting"
      heading={
        <div>
          Need Help? <br className="hidden sm:block" />
          Contact Our Support Team{" "}
        </div>
      }
      description="Facing an issue with FSSAI application processing, document uploads, or payments? Let us know and we'll help resolve it."
      ctaDescription="Our team is committed to providing a smooth licensing experience. If you encounter any technical or processing issues, we're just an email away."
      ctaLink="/contact"
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
