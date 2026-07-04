import "./globals.css";
import Providers from "@/providers";
import { Poppins } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next";
import AppShell from "@/components/global/AppShell";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import ThirdPartyScripts from "@/components/ThirdPartyScripts";

// import { PostHogProvider } from "@/components/PostHogProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://fssai.magicscale.in"),

  title: {
    default: "FSSAI License Online | MagicScale",
    template: "%s | MagicScale",
  },

  description:
    "Apply for FSSAI License online starting at ₹999. Get Basic, State and Central Food License with expert support.",

  keywords: [
    "FSSAI License",
    "Food License",
    "FSSAI Registration",
    "Food Registration",
    "Apply FSSAI License",
    "FSSAI Online",
    "Basic FSSAI License",
    "State FSSAI License",
    "Central FSSAI License",
  ],

  alternates: {
    canonical: "https://fssai.magicscale.in",
  },

  icons: {
    icon: "/og-image.png",
  },

  openGraph: {
    title: "FSSAI License Online | MagicScale",
    description: "Apply for FSSAI License online starting at ₹999. Get Basic, State and Central Food License with expert support.",
    url: "https://fssai.magicscale.in",
    siteName: "MagicScale",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MagicScale FSSAI License",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FSSAI License Online | MagicScale",
    description: "Apply for FSSAI License online starting at ₹999.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MagicScale",
    url: "https://fssai.magicscale.in",
    logo: "https://fssai.magicscale.in/og-image.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8178739633",
      contactType: "customer service",
      email: "support@magicscale.in",
      availableLanguage: ["English", "Hindi"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MagicScale FSSAI Licensing",
    url: "https://fssai.magicscale.in",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WDS53PBB');`,
          }}
        />
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WDS53PBB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <PostHogProvider> */}

        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
        {/* </PostHogProvider> */}

        {/* <Analytics />
        <SpeedInsights /> */}
        <ThirdPartyScripts />
      </body>
    </html>
  );
}
