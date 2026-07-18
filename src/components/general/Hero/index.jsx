"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import PayButton from "../Payment/PayButton";

export const Hero = () => {
  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center pt-20 md:pt-32 pb-0 overflow-hidden flex flex-col items-center">
      {/* Background grid */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "absolute inset-0 h-full w-full stroke-gray-200 fill-transparent dark:stroke-gray-800 z-0",
          "[mask-image:linear-gradient(to_bottom,white_40%,transparent_85%)]"
        )}
      />

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-5 flex flex-col items-center gap-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-white/80 px-3 py-1 text-[11px] font-medium text-emerald-700 shadow-sm backdrop-blur-sm dark:border-emerald-400/50 dark:bg-emerald-500/10 dark:text-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>CA‑backed GST Registration • PAN India</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
        >
          Get Your GST{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
            Approved in 3 Days
          </span>
          <span className="bg-gradient-to-r from-[#FF8C00] via-[#138808] to-[#0F4BA0] bg-clip-text text-transparent">
            <br />
            Starting at just <span className="font-black">₹1,499</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-gray-700 dark:text-gray-300 md:mt-5 md:text-lg"
        >
          Official‑style experience without the headache. A dedicated GST team
          handles eligibility, documents and{" "}
          <span className="font-semibold text-emerald-700 dark:text-emerald-300">
            end‑to‑end filing on the GST portal
          </span>{" "}
          so you can focus on your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10"
        >
          <PayButton />
        </motion.div>
      </div>

      {/* Image replaced instead of video */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="relative z-10 w-full my-12 max-h-[70vh] overflow-hidden rounded-xl md:rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-start justify-center p-8 md:p-12"
      >
        <img src={"/assets/gst-hero.png"} className="w-full h-auto max-w-4xl" alt="GST Registration" />
      </motion.div>
    </div>
  );
};