"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import Title from "../Title";
import { Highlighter } from "@/components/ui/highlighter";
import { FAQS } from "./helper/constants";
import { ChevronDown } from "lucide-react";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <SectionWrapper
      id="faqs"
      title={
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <Title
            title={
              <span className="text-3xl md:text-6xl">
                Frequently Asked <br />
                <Highlighter action="highlight" color="#22c55e">
                  <span className="text-white relative z-10 px-2 py-1">
                    Questions
                  </span>
                </Highlighter>
              </span>
            }
            description=""
          />
        </motion.div>
      }
    >
      <div className="space-y-4">
        {FAQS.map((faq, i) => {
          const Icon = faq.icon;
          const isOpen = openIndex === i;

          return (
            <motion.div
              key={i}
              className={`rounded-md border border-neutral-200 dark:border-neutral-700 shadow-lg dark:shadow-black/20 bg-white/70 dark:bg-[#10101a]/70 backdrop-blur transition-colors overflow-hidden`}
              whileHover={{ scale: 1.01 }}
            >
              <button
                onClick={() => toggle(i)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left font-medium text-md md:text-lg transition-all duration-300 ${
                  isOpen
                    ? "bg-green-100 dark:bg-[#1a183b]/60"
                    : "hover:bg-green-50 dark:hover:bg-[#16142f]/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0" />
                  <span className="text-neutral-900 dark:text-white">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 text-start py-5 text-sm sm:text-base text-neutral-700 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
