"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Title = ({ title = "Title" }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="flex items-center justify-center gap-3 md:gap-4"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <Image src="/svgs/sub-title-left.svg" alt="Left Decorative Dark" width={30} height={10} className="w-auto h-auto" />
      </motion.div>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
        className="text-sm md:text-base font-bold uppercase tracking-wider text-green-600 dark:text-green-400 transition-colors"
      >
        {title}
      </motion.p>

      <motion.div
        variants={{
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <Image src="/svgs/sub-title-right.svg" alt="Right Decorative" width={30} height={10} className="w-auto h-auto" />
      </motion.div>
    </motion.div>
  );
};

export default Title;
