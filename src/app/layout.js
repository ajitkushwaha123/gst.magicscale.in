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
  title:
    "MagicScale | Learn How to Launch a Profitable Food Business on Swiggy & Zomato for ₹9",
  description:
    "Get your FSSAI Food License easily. We help you start, launch, and scale a profitable food business with fast, secure, and hassle-free FSSAI registration.",
  keywords: [
    "fssai license",
    "fssai registration",
    "swiggy business",
    "zomato business",
    "restaurant business",
    "food startup",
    "online food business",
    "cloud kitchen training",
    "MagicScale",
    "food entrepreneur",
  ],
  openGraph: {
    title:
      "MagicScale | Learn How to Launch a Profitable Food Business on Swiggy & Zomato for ₹9",
    description:
      "Get your fast and secure FSSAI Registration done today. Hassle-free food licensing.",
    type: "website",
    siteName: "MagicScale",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launch a Profitable Food Business on Swiggy & Zomato",
    description: "FSSAI Registration Services by MagicScale.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins antialiased`}>
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
