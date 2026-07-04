"use client";
import React from "react";
import Head from "next/head";
import Title from "../Title";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { GradientText } from "../GradientTextButton/GradientText";
import Link from "next/link";
import InfoCardGrid from "../card/InfoCardGrid";
import ContactCard from "@/components/contact-card";

const Template = ({ title = "", heading = "", description = "", ctaDescription = "", ctaLink = "#", ctaButton = "", infoData = [], contactData, GradText = true }) => {
  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${ctaLink || ""}`;

  return (
    <>
      <Head>
        <title>{heading ? `${heading} | FoodSnap` : "FoodSnap"}</title>
        <meta name="description" content={description || "FoodSnap - Smart restaurant menu processing and automation."} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={heading || "FoodSnap"} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_USER_APP_URL}/logo.webp`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: typeof heading === "string" ? heading : "FoodSnap",
              url: pageUrl,
              description: typeof description === "string" ? description : "",
              inLanguage: "en",
            }),
          }}
        />
      </Head>

      <main className="min-h-screen px-4 md:px-12 pt-32 pb-16 bg-white dark:bg-[#0a0a1a] text-neutral-900 dark:text-white transition-colors duration-300">
        <div className="max-w-4xl dark:bg-grid-dark bg-grid mx-auto text-center relative z-10">
          {title && <Title title={title} />}

          {heading && (
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-extrabold leading-tight mt-4 bg-gradient-to-r from-green-900 dark:from-green-500 via-emerald-600 dark:via-emerald-300 to-green-900 dark:to-green-500 text-transparent bg-clip-text">
              {heading}
            </motion.h1>
          )}

          {description && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 max-w-xl mx-auto text-base md:text-lg text-neutral-600 dark:text-neutral-400">
              {description}
            </motion.p>
          )}

          {GradText && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="inline-flex items-center gap-2 mt-6">
              <GradientText icon={<Clock className="w-4 h-4 text-green-400" />} title="Last Updated on July 1, 2025" />
            </motion.div>
          )}
        </div>

        {ctaDescription && ctaButton && ctaLink && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-20 max-w-6xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 md:p-10 backdrop-blur-lg shadow-lg dark:shadow-black/20 bg-white/60 dark:bg-[#10101a]/70 transition-colors">
            <div className="flex flex-col items-center md:flex-row justify-between gap-8">
              <div className="md:w-2/3">
                <p className="text-neutral-700 dark:text-neutral-300 text-md leading-relaxed">{ctaDescription}</p>
              </div>

              <div className="md:w-1/3 w-full flex justify-end">
                <Link href={ctaLink} className="flex justify-center w-full md:w-auto items-center px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 shadow-md hover:scale-[1.02]">
                  {ctaButton}
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {infoData && (
          <div className="mt-20">
            <InfoCardGrid cardData={infoData} />
          </div>
        )}

        {contactData && (
          <div className="mt-24 max-w-6xl mx-auto">
            <ContactCard contactData={contactData} />
          </div>
        )}
      </main>
    </>
  );
};

export default Template;
