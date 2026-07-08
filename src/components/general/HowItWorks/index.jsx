"use client";
import React from "react";
import Title from "../Title";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import { Highlighter } from "@/components/ui/highlighter";
import { FileUp, PhoneCall, KeyRound, MailCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Apply & Pay",
      description: "Submit details & documents.",
      icon: FileUp,
    },
    {
      num: "02",
      title: "Expert Connect",
      description: "Our executive calls within 4hrs (10am-7pm).",
      icon: PhoneCall,
    },
    {
      num: "03",
      title: "Verification",
      description: "Provide OTP for fast Govt. portal submission.",
      icon: KeyRound,
    },
    {
      num: "04",
      title: "License Issued",
      description: "Digital FSSAI certificate delivered to your email.",
      icon: MailCheck,
    }
  ];

  return (
    <SectionWrapper
      title={
        <div className="mx-auto mb-16 text-center">
          <Title
            title={
              <>
                Simple Process. <br />{" "}
                <Highlighter action="highlight" color={"#22c55e"}>
                  <span className="relative z-10 px-2 text-white">
                    Zero Hassle.
                  </span>
                </Highlighter>
              </>
            }
            description="How we get your FSSAI license issued smoothly in 4 easy steps."
          />
        </div>
      }
    >
      <div className="mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-6 justify-between items-stretch">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "200px" }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="flex-1 relative bg-white rounded-lg border-2 border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-5 text-center hover:border-[#22c55e]/30 hover:shadow-[0_8px_30px_rgb(31,122,77,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#22c55e] text-white text-[11px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-md border-4 border-white">
                    STEP {step.num}
                  </div>

                  <div className="mx-auto w-20 h-20 rounded-lg bg-gradient-to-b from-[#e8f2ec] to-white border border-[#22c55e]/10 flex items-center justify-center mb-6 mt-4 shadow-sm">
                    <Icon className="w-9 h-9 text-[#22c55e]" />
                  </div>

                  <h3 className="text-xl font-extrabold text-zinc-900 mb-3">{step.title}</h3>
                  <p className="text-[14px] text-zinc-500 font-medium leading-relaxed px-1 mt-auto">
                    {step.description}
                  </p>
                </motion.div>

                {!isLast && (
                  <div className="hidden md:flex items-center justify-center shrink-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#e8f2ec] flex items-center justify-center shadow-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}

                {!isLast && (
                  <div className="md:hidden flex justify-center -my-2 z-10 relative">
                    <div className="w-8 h-8 rounded-full bg-[#e8f2ec] flex items-center justify-center shadow-sm border-2 border-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-90">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
