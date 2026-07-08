"use client";
import React from "react";
import Title from "../Title";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import { Store, Building2, Globe2 } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";

export default function LicenseTypes() {
  const types = [
    {
      level: "TIER 1",
      title: "Basic Registration",
      turnover: "Upto ₹12 Lakhs",
      detail: "Ideal for small startups, home bakers, street vendors, and small-scale manufacturers.",
      icon: Store,
      popular: true,
    },
    {
      level: "TIER 2",
      title: "State License",
      turnover: "₹12 Lakhs - ₹20 Crores",
      detail: "Required for mid-sized businesses, hotels, restaurants, and standard manufacturers.",
      icon: Building2,
      popular: false,
    },
    {
      level: "TIER 3",
      title: "Central License",
      turnover: "Above ₹20 Crores",
      detail: "Mandatory for large-scale manufacturers, importers, and multi-state operations.",
      icon: Globe2,
      popular: false,
    },
  ];

  return (
    <SectionWrapper
      title={
        <div className="mx-auto mb-16 text-center">
          <Title
            title={
              <>
                Which FSSAI License <br />{" "}
                <Highlighter action="highlight" color={"#22c55e"}>
                  <span className="relative z-10 px-2 text-white">
                    Do You Need?
                  </span>
                </Highlighter>
              </>
            }
            description="3 distinct license types based on your business scale and annual turnover."
          />
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "200px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {types.map((type, i) => {
            const Icon = type.icon;

            return (
              <motion.div
                key={type.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "200px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
                  type.popular
                    ? "border-[#22c55e] bg-gradient-to-br from-[#e8f2ec]/80 to-white shadow-xl"
                    : "border-neutral-200 bg-white hover:shadow-xl"
                }`}
              >
                {type.popular && (
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-[#22c55e] px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white">
                      Common
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#e8f2ec] px-3 py-1 text-xs font-bold text-[#22c55e]">
                    {type.level}
                  </span>

                  <div className="rounded-2xl bg-[#e8f2ec] p-3">
                    <Icon className="h-5 w-5 text-[#22c55e]" />
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-bold text-neutral-900">
                  {type.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {type.detail}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#e8f2ec] px-3 py-1 text-xs font-semibold text-[#22c55e] ring-1 ring-inset ring-[#22c55e]/20">
                    Turnover: {type.turnover}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
