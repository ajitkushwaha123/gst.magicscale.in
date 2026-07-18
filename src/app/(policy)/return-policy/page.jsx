import Template from "@/components/global/template";
import { Headset, ShieldCheck, Trash2 } from "lucide-react";

export const metadata = {
  title: "Service Delivery & Cancellation Policy | MagicScale",
  description:
    "Learn about service delivery timelines, application processing, cancellations, and refund policies for MagicScale GST Registration services.",
  keywords: [
    "MagicScale",
    "Refund Policy",
    "Cancellation Policy",
    "GST Registration Service",
    "GSTIN Processing",
    "No Refund Policy",
  ],
  robots: "index, follow",
};

const cardData = [
  {
    title: "Service Delivery & Timelines",
    description: "GST application processing begins immediately after payment and document submission.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        MagicScale provides GST Registration filing, ARN tracking, and GSTIN
        delivery services. <br /> <br />
        Service delivery begins immediately upon successful payment and
        submission of all required documents (Aadhaar, PAN, bank proof,
        photograph). Our team will review and submit your application to the
        GST portal. <br /> <br />
        <strong>ARN (Application Reference Number)</strong> is typically issued
        within a few hours of application submission. <strong>GSTIN</strong>{" "}
        is issued within 48 hours, subject to Aadhaar OTP verification and
        government processing. We do not guarantee a specific timeline for
        GSTIN issuance, as delays at the government level are outside our
        control.
      </>
    ),
  },
  {
    title: "Cancellation & Document Policy",
    description: "Please ensure you have valid Aadhaar, PAN, and business documents before purchasing.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Applicants are responsible for providing authentic and complete
        documents required for GST Registration processing. <br /> <br />
        Failure to provide necessary documents (Aadhaar, PAN, bank statement,
        photograph), non-availability for Aadhaar OTP verification, or
        providing falsified documents does not qualify for cancellation,
        refund, credit, or transfer. <br /> <br />
        If your GST application is rejected by the government due to
        discrepancies in the documents you provided, the service is considered
        fulfilled and no refunds will be issued.
      </>
    ),
  },
  {
    title: "Strict No Refund Policy",
    description: "Refunds are only considered when the billing mistake is on our side.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        All purchases made through MagicScale are final and non-refundable
        once the GST application processing has begun. <br /> <br />
        Refunds will not be provided because:{" "}
        <ul className="list-disc pl-5 mt-2">
          {" "}
          <li>You changed your mind after payment.</li>{" "}
          <li>You failed to provide required documents or Aadhaar OTP.</li>{" "}
          <li>Your application was delayed by government authorities.</li>{" "}
          <li>Your GST application was rejected by the department.</li>{" "}
          <li>You decided not to proceed with your business registration.</li>{" "}
        </ul>{" "}
        <br />
        Refunds may only be considered in exceptional situations where:{" "}
        <ul className="list-disc pl-5 mt-2">
          {" "}
          <li>A duplicate payment was processed.</li>{" "}
          <li>A verified technical billing error occurred on our platform.</li>{" "}
        </ul>{" "}
        <br />
        Any approved refund remains solely at the discretion of MagicScale
        after reviewing the circumstances.
      </>
    ),
  },
];

const contactData = {
  title: "Questions About Processing or Billing?",
  description:
    "Contact our team if you experience a billing issue or processing problem.",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        If you believe a payment issue occurred, or experienced a service
        delivery problem caused directly by our technical systems, please
        contact our support team with your transaction information.{" "}
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
      title="Delivery & Cancellation Policy"
      heading={
        <div>
          Delivery, Cancellation <br className="hidden sm:block" />&amp; Refund
          Policy{" "}
        </div>
      }
      description="Please review our policies regarding service delivery, document processing, cancellations, and refunds before making a purchase for GST Registration."
      ctaDescription="All MagicScale GST application processing services begin immediately upon document submission. Purchases are final and refunds are only considered in rare situations where a billing error is caused by our systems."
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
