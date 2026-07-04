import React from "react";
import Template from "@/components/global/template";
import { Headset, ShieldCheck, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Disclaimer | MagicScale",
  description:
    "Understand the scope, limitations, and responsibilities associated with the FSSAI registration and licensing services provided by MagicScale.",
  keywords: [
    "MagicScale Disclaimer",
    "FSSAI Licensing Service",
    "Food Business Registration",
    "FSSAI Compliance Services",
    "Business Licensing Disclaimer",
  ],
  authors: [{ name: "MagicScale", url: "https://magicscale.in" }],
  openGraph: {
    title: "Disclaimer | MagicScale",
    description:
      "Important information regarding the FSSAI registration and compliance services provided by MagicScale.",
    url: "https://magicscale.in/disclaimer",
    siteName: "MagicScale",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer | MagicScale",
    description:
      "Important information regarding the FSSAI registration and compliance services provided by MagicScale.",
  },
};

const cardData = [
  {
    title: "Independent Consultancy",
    description:
      "We are a private consultancy and not a government body.",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
    content: (
      <>
        MagicScale operates as an independent, private consultancy firm. We provide 
        assistance and support services to food businesses for obtaining their 
        FSSAI registration and compliance. <br /> <br />
        We are <strong>not</strong> a government agency, nor are we affiliated 
        with the Food Safety and Standards Authority of India (FSSAI) or any other 
        government department. We charge a professional service fee for our 
        consulting, application processing, and support services.
      </>
    ),
  },
  {
    title: "No Guarantee of Approval",
    description:
      "Final approval of licenses rests solely with the government authorities.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        While we strive to ensure every application is filled out accurately and 
        submitted promptly, MagicScale does not guarantee the approval, issuance, 
        or timeline of any FSSAI license or registration. <br /> <br />
        The final decision, processing time, and approval of the license rest 
        strictly with the respective government authorities. Rejections due to 
        incomplete documents provided by the applicant are not our responsibility.
      </>
    ),
  },
  {
    title: "Accuracy of Information",
    description:
      "Applicants are responsible for the authenticity of provided documents.",
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    content: (
      <>
        MagicScale processes applications based solely on the documents and 
        information provided by the applicant. We do not verify the legal 
        authenticity of these documents. <br /> <br />
        You are solely responsible for ensuring that all business details, 
        identities, and addresses provided to us are accurate, truthful, and 
        legally valid. MagicScale holds no liability for penalties arising 
        from falsified information.
      </>
    ),
  },
  {
    title: "Your Business Responsibility",
    description:
      "You remain fully responsible for your food business operations and compliance.",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
    content: (
      <>
        Acquiring an FSSAI registration through our service does not exempt your 
        business from adhering to ongoing food safety standards, hygiene practices, 
        or local municipal laws. <br /> <br />
        MagicScale shall not be liable for any legal actions, business closures, 
        or damages resulting from your failure to maintain compliance with FSSAI 
        regulations during your business operations.
      </>
    ),
  },
];

const contactData = {
  title: "Questions About This Disclaimer?",
  description:
    "We're happy to clarify any concerns regarding our FSSAI registration services.",
  content: (
    <div>
      {" "}
      <p className="mb-4">
        If you have questions regarding this disclaimer or the scope of 
        services provided through MagicScale, please contact us at{" "}
        <a
          href="mailto:support@magicscale.in"
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          support@magicscale.in
        </a>
        .{" "}
      </p>
      <p>
        MagicScale
        <br />
        New Delhi, India
        <br />
        FSSAI Licensing & Compliance Support
      </p>
    </div>
  ),
};

const page = () => {
  return (
    <Template
      title="Disclaimer"
      heading={
        <div>
          Disclaimer <br className="hidden sm:block" />& Important
          Information{" "}
        </div>
      }
      description="Please review the limitations, responsibilities, and terms associated with using the FSSAI registration and licensing services provided by MagicScale."
      ctaDescription="Our mission is to help food entrepreneurs secure their business compliance smoothly. Please note that we are a private consulting firm, and ultimate licensing authority rests with the government."
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
