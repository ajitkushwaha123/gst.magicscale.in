"use client";

import { motion } from "framer-motion";
import {
  Utensils,
  Bike,
  UtensilsCrossed,
  Calculator,
  Megaphone,
  MessageCircleQuestion,
} from "lucide-react";

import SectionWrapper from "../SectionWrapper";
import Title from "../Title";
import { Highlighter } from "@/components/ui/highlighter";

const INK = "#1C2420";
const PAPER = "#FBF8EE";
const STUB = "#F3EEDD";
const LINE = "rgba(28,36,32,0.16)";
const ACCENT = "#22c55e";

const defaultModules = [
  {
    number: "01",
    title: "Food Business Fundamentals",
    detail: "What actually makes a cloud kitchen profitable from day one.",
    icon: Utensils,
  },
  {
    number: "02",
    title: "Swiggy Setup",
    detail: "Registration, documents, and getting your listing approved.",
    icon: Bike,
  },
  {
    number: "03",
    title: "Zomato Setup",
    detail: "Mirror your Swiggy setup and go live on the second platform.",
    icon: UtensilsCrossed,
  },
  {
    number: "04",
    title: "Pricing Formula",
    detail: "The exact margin math behind every dish on your menu.",
    icon: Calculator,
  },
  {
    number: "05",
    title: "Marketing Strategy",
    detail: "Cheap, repeatable ways to get your first 100 orders.",
    icon: Megaphone,
  },
  {
    number: "06",
    title: "Live Q&A",
    detail: "Bring your menu, your numbers, your questions.",
    icon: MessageCircleQuestion,
  },
];

export default function AgendaTimelineSection({ modules = defaultModules }) {
  return (
    <SectionWrapper
      title={
        <div className="mx-auto mb-16 text-center">
          <Title
            title={
              <>
                What We're Covering, <br />{" "}
                <Highlighter action="highlight" color={ACCENT}>
                  <span className="relative z-10 px-2 text-white">
                    Module by Module
                  </span>
                </Highlighter>
              </>
            }
            description="Six sessions, back to back. Save your seat to get the full running order."
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            const isLast = i === modules.length - 1;

            return (
              <motion.div
                key={mod.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "200px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
                  isLast
                    ? "border-green-500 bg-gradient-to-br from-green-50 to-white shadow-xl"
                    : "border-neutral-200 bg-white hover:shadow-xl"
                }`}
              >
                {isLast && (
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                      LIVE
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    MODULE {mod.number}
                  </span>

                  <div className="rounded-2xl bg-green-50 p-3">
                    <Icon className="h-5 w-5 text-green-700" />
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-bold text-neutral-900">
                  {mod.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {mod.detail}
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                  <span className="text-xs font-medium text-green-700">
                    Actionable Framework
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
