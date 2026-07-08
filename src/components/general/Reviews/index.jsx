"use client";
import Title from "../Title";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import { TESTIMONIALS } from "./helper/constants";
import { Highlighter } from "@/components/ui/highlighter";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Testimonials() {
  return (
    <SectionWrapper title={
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "200px" }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <Title
          title={
            <span className="text-3xl md:text-6xl">
              Our <br />
              <Highlighter action="highlight" color="#22c55e">
                <span className="text-white relative z-10 px-2 py-1">Customers</span>
              </Highlighter>
            </span>
          }
          description="800+ Restaurants already loved it "
        />
      </motion.div >
    }>

      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "200px" }}
            variants={cardVariants}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 md:p-8 backdrop-blur-lg shadow-lg dark:shadow-black/20 bg-white/60 dark:bg-[#10101a]/70 transition-colors"
          >
            <div className="flex items-center gap-1 text-yellow-500 mb-3">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed mb-6 italic">
              “{t.quote}”
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={t.img}
                alt={t.name}
                width={40}
                height={40}
                className="rounded-full object-cover border border-neutral-300 dark:border-neutral-600"
              />
              <div>
                <div className="text-sm font-semibold text-neutral-800 dark:text-white">
                  {t.name}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {t.title}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper >
    // <section className="mt-20 px-4 md:px-0 max-w-6xl mx-auto">
    //   <div className="text-center mb-12">
    //     <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white">
    //       Khud Suno Hamare Clients Se 💬
    //     </h2>
    //     <p className="text-neutral-600 dark:text-neutral-400 mt-2">
    //       100+ Restaurants already love it 🚀
    //     </p>
    //   </div>

    // <div className="grid md:grid-cols-3 gap-6">
    //   {TESTIMONIALS.map((t, i) => (
    //     <motion.div
    //       key={i}
    //       custom={i}
    //       initial="hidden"
    //       whileInView="visible"
    //       viewport={{ once: true, margin: "200px" }}
    //       variants={cardVariants}
    //       className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 md:p-8 backdrop-blur-lg shadow-lg dark:shadow-black/20 bg-white/60 dark:bg-[#10101a]/70 transition-colors"
    //     >
    //       <div className="flex items-center gap-1 text-yellow-500 mb-3">
    //         {[...Array(5)].map((_, idx) => (
    //           <Star key={idx} size={16} fill="currentColor" />
    //         ))}
    //       </div>
    //       <p className="text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed mb-6 italic">
    //         “{t.quote}”
    //       </p>
    //       <div className="flex items-center gap-3">
    //         <Image
    //           src={t.img}
    //           alt={t.name}
    //           width={40}
    //           height={40}
    //           className="rounded-full object-cover border border-neutral-300 dark:border-neutral-600"
    //         />
    //         <div>
    //           <div className="text-sm font-semibold text-neutral-800 dark:text-white">
    //             {t.name}
    //           </div>
    //           <div className="text-xs text-neutral-500 dark:text-neutral-400">
    //             {t.title}
    //           </div>
    //         </div>
    //       </div>
    //     </motion.div>
    //   ))}
    //   </div>
    // </section>
  );
}
