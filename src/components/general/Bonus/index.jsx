"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";

import SectionWrapper from "../SectionWrapper";
import Title from "../Title";
import { Highlighter } from "@/components/ui/highlighter";

const defaultBonus = {
  badge: "BONUS NO. 01",
  title: "Free Zomato & Swiggy Onboarding",
  description:
    "We'll personally help you get your restaurant approved and live on both platforms — no forms to chase, no setup to fumble.",
  value: "₹5,000",
  spotsLeft: 3,
  spotsTotal: 10,
  features: [
    "Restaurant registration",
    "Menu setup",
    "Document verification",
    "Account activation",
    "Listing optimization",
    "Launch guidance",
  ],
};

const INK = "#1C2420";
const PAPER = "#FFFFFF";
const STUB = "#F8F8F8";
const LINE = "rgba(28,36,32,0.16)";
const ACCENT = "#22c55e";

function Notches({ orientation = "vertical" }) {
  const count = 14;
  const notches = Array.from({ length: count });

  if (orientation === "horizontal") {
    return (
      <div className="relative h-0 w-full md:hidden">
        <div className="absolute inset-x-0 top-0 flex -translate-y-1/2 items-center justify-between px-2">
          {notches.map((_, i) => (
            <span
              key={i}
              className="h-3 w-3 shrink-0 rounded-lg"
              style={{ background: INK }}
            />
          ))}
        </div>
        <div
          className="absolute inset-x-4 top-0 border-t-2 border-dashed"
          style={{ borderColor: LINE }}
        />
      </div>
    );
  }

  return (
    <div className="relative hidden h-full w-0 md:block">
      <div className="absolute inset-y-0 left-0 flex -translate-x-1/2 flex-col items-center justify-between py-2">
        {notches.map((_, i) => (
          <span
            key={i}
            className="h-3 w-3 shrink-0 rounded-lg"
            style={{ background: INK }}
          />
        ))}
      </div>
      <div
        className="absolute inset-y-4 left-0 border-l-2 border-dashed"
        style={{ borderColor: LINE }}
      />
    </div>
  );
}

export default function BonusSection({ bonus = defaultBonus }) {
  const { badge, title, description, value, spotsLeft, spotsTotal, features } =
    bonus;

  return (
    <SectionWrapper
      title={
        <div className="mx-auto mb-16 text-center">
          <Title
            title={
              <>
                A Welcome Gift For The <br />{" "}
                <Highlighter action="highlight" color="#22c55e">
                  <span className="relative z-10 px-2 text-white">
                    First 10 Registrations
                  </span>
                </Highlighter>
              </>
            }
            description="Redeem it the day you sign up — no catch, no upsell."
          />
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "200px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto"
      >
        <div className="relative overflow-hidden rounded-[12px] border border-neutral-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#22c55e 0,#22c55e 1px,transparent 1px,transparent 20px)",
            }}
          />

          <div className="absolute left-[260px] top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white border border-neutral-200" />
          <div className="absolute left-[260px] bottom-0 h-10 w-10 -translate-x-1/2 translate-y-1/2 rounded-lg bg-white border border-neutral-200" />
          <div className="p-5 md:hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {badge}
                </p>

                <p className="mt-1 text-xs text-neutral-400 line-through">
                  Worth {value}
                </p>
              </div>

              <div className="text-right">
                <h3 className="text-4xl font-black text-green-700 leading-none">
                  FREE
                </h3>

                <p className="text-[11px] text-neutral-500">
                  {spotsLeft} Spots Left
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-dashed pt-4">
              <h3 className="text-lg font-bold">{title}</h3>

              <p className="mt-2 text-sm text-neutral-600">{description}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2"
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-xs">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:flex flex-col md:flex-row">
            <div className="bg-neutral-50 md:w-[260px] p-8 flex flex-col">
              <span className="text-xs tracking-[0.3em] uppercase text-neutral-500 font-semibold">
                {badge}
              </span>

              <div className="mt-8">
                <p className="text-sm text-neutral-400 line-through">
                  Worth {value}
                </p>

                <h3 className="text-7xl font-black leading-none text-green-700 mt-2">
                  FREE
                </h3>

                <p className="mt-2 text-sm text-neutral-500">
                  Complimentary Bonus
                </p>
              </div>

              <div className="mt-8">
                <div className="inline-flex rotate-[-10deg] rounded-md border-2 border-green-600 px-4 py-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                    Valid At Signup
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <div className="h-2 overflow-hidden rounded-lg bg-neutral-200">
                  <div
                    className="h-full rounded-lg bg-green-600"
                    style={{
                      width: `${(spotsLeft / spotsTotal) * 100}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-neutral-500">
                  Only {spotsLeft} spots remaining
                </p>
              </div>

              <div className="mt-auto pt-8">
                <p className="font-mono text-xs tracking-[0.3em] text-neutral-400">
                  #ZM-2026-001
                </p>
              </div>
            </div>
            <div className="relative hidden md:block w-px">
              <div className="absolute inset-y-0 border-l border-dashed border-neutral-300" />
            </div>
            <div className="relative flex-1 p-8 md:p-10">
              <div className="absolute right-8 top-8 rotate-12">
                <div className="rounded-lg border-[3px] border-green-600 p-3">
                  <div className="rounded-lg border border-green-600 px-4 py-3">
                    <span className="text-[10px] font-black tracking-[0.25em] text-green-700">
                      VERIFIED BONUS
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="max-w-xl text-3xl font-bold tracking-tight">
                {title}
              </h3>

              <p className="mt-4 max-w-xl text-neutral-600">{description}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-lg border border-neutral-100 bg-neutral-50 p-3"
                  >
                    <BadgeCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <span>Included automatically at signup</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
