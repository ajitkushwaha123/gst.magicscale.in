"use client";
import React from "react";
import Title from "../Title";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import { Highlighter } from "@/components/ui/highlighter";

const IMAGES = [
  {
    id: 3,
    src: "/assets/gallery/team3.webp",
    alt: "Our Ground Executive",
  },
  {
    id: 2,
    src: "/assets/gallery/team2.webp",
    alt: "On Ground Client Meeting",
  },
  {
    id: 1,
    src: "/assets/gallery/team1.webp",
    alt: "Customer Support Team",
  },
  {
    id: 5,
    src: "/assets/gallery/team5.webp",
    alt: "Account Handling Team",
  },
  {
    id: 6,
    src: "/assets/gallery/team6.webp",
    alt: "Marketing Team",
  },
  {
    id: 7,
    src: "/assets/gallery/team7.webp",
    alt: "Client Meeting",
  },
  {
    id: 8,
    src: "/assets/gallery/team8.webp",
    alt: "Sales Team",
  },
  {
    id: 9,
    src: "/assets/gallery/team9.webp",
    alt: "Operation Team",
  },
];

function MasonryItem({ img, index }) {
  return (
    <motion.figure
      className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "200px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={400}
        height={300}
        className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-xl bg-black/45 px-3 py-2 text-xs text-white backdrop-blur">
          {img.alt}
        </div>
      </figcaption>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.figure>
  );
}

export default function MasonryGallery() {
  return (
    <SectionWrapper
      id="team"
      title={
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <Title
            title={
              <span className="text-3xl md:text-6xl">
                Meet <br />
                <Highlighter action="highlight" color="#22c55e">
                  <span className="text-white relative z-10 px-2 py-1">
                    Our Team
                  </span>
                </Highlighter>
              </span>
            }
            description="Discover the transformative power of high-quality food photography."
          />
        </motion.div>
      }
    >
      <div
        className={[
          "[column-fill:_balance]",
          "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
          "gap-4",
        ].join(" ")}
      >
        {IMAGES.map((img, i) => (
          <MasonryItem key={img.id} img={img} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
