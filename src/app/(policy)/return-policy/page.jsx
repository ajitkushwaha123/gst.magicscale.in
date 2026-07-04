import Template from "@/components/global/template";
import { Headset, ShieldCheck, Trash2 } from "lucide-react";

export const metadata = {
  title: "Service Delivery & Cancellation Policy | MagicScale",
  description:
    "Learn about service delivery timelines, application processing, cancellations, and refund policies for MagicScale FSSAI registration services.",
  keywords: [
    "MagicScale",
    "Refund Policy",
    "Cancellation Policy",
    "Service Delivery",
    "FSSAI Processing",
    "FSSAI Licensing",
    "No Refund Policy",
  ],
  robots: "index, follow",
};

const cardData = [
  {
    title: "Service Delivery & Timelines",
    description: "Application processing times vary based on government authorities.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        MagicScale provides FSSAI registration services, compliance consultation, 
        and application processing. <br /> <br />
        Service delivery begins immediately upon successful payment and submission 
        of all required KYC documents by the applicant. Our team will review and 
        submit your application to the FSSAI portal. <br /> <br />
        Please note that the final issuance of the license depends entirely on 
        the FSSAI government processing timelines. We do not guarantee a specific 
        number of days for license approval, as delays may occur at the government level.
      </>
    ),
  },
  {
    title: "Cancellation & Document Policy",
    description: "Please ensure you have valid KYC documents before purchasing.",
    icon: <Trash2 className="w-6 h-6 text-green-500" />,
    content: (
      <>
        Applicants are responsible for providing authentic and complete KYC 
        and business documents required for processing. <br /> <br />
        Failure to provide necessary documents, or providing falsified documents, 
        does not qualify for cancellation, refund, credit, or transfer.{" "}
        <br /> <br />
        If your application is rejected by the government due to discrepancies 
        in your provided documents, the service is considered fulfilled, and no 
        refunds will be issued.
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
        once the application processing has begun. <br /> <br />
        Refunds will not be provided because:{" "}
        <ul className="list-disc pl-5 mt-2">
          {" "}
          <li>You changed your mind after purchase.</li>{" "}
          <li>You failed to provide required documents.</li>{" "}
          <li>Your application was delayed by government authorities.</li>{" "}
          <li>Your application was rejected by the FSSAI department.</li>{" "}
          <li>You decided not to launch your food business.</li>{" "}
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
  title: "Questions About Processing or Access?",
  description:
    "Contact our team if you experience a billing issue or processing problem.",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        If you believe a payment issue occurred, or experienced a service delivery 
        problem caused directly by our technical systems, please contact our 
        support team with your transaction information.{" "}
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
      title="Delivery & Cancellation Policy"
      heading={
        <div>
          Delivery, Cancellation <br className="hidden sm:block" />& Refund
          Policy{" "}
        </div>
      }
      description="Please review our policies regarding service delivery, document processing, cancellations, and refunds before making a purchase."
      ctaDescription="All MagicScale application processing services begin immediately upon document submission. Purchases are final and refunds are only considered in rare situations where a billing error is caused by our systems."
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
