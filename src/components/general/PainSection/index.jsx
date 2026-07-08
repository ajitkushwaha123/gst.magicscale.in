"use client";
import clsx from "clsx";
import Title from "../Title";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";
import { GridPattern } from "@/components/ui/grid-pattern";

const requiredDocuments = [
  {
    title: "Aadhaar Card",
    description: "Required for identity verification.",
    image: "/assets/images/aadhaar-card.webp",
  },
  {
    title: "PAN Card",
    description: "Mandatory for tax and financial compliance.",
    image: "/assets/images/pan-card.webp",
  },
  {
    title: "3. Passport Size Photo",
    description: "A clear selfie or recent passport-size photograph.",
    image: "/assets/images/passport-photo.webp",
  },
  {
    title: "Premises Proof",
    description: "Electricity bill or rent agreement of your business location.",
    image: "/assets/images/location-map.webp",
  },
  {
    title: "Passport Photo",
    description: "Recent photograph of the business owner or partners.",
    image: "/assets/images/chef-logo.webp",
  },
];

function DocumentCard({ title, description, image }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className={clsx(
        "group relative overflow-hidden rounded-[12px] h-full flex flex-col",
        "border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-black",
        "shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
        "transition-all duration-300",
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-lg bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-lg bg-teal-500/10 blur-3xl" />
      </div>

      <div
        className={clsx(
          "absolute top-6 right-6 z-20 inline-flex items-center rounded-lg border px-3 py-1 text-[11px] font-bold tracking-wider shadow-sm",
          "bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-emerald-500/20",
        )}
      >
        Required
      </div>

      <div className="relative z-10 px-4 pb-4 pt-4 shrink-0">
        <div
          className="
                        overflow-hidden
                        rounded-[12px]
                        border border-zinc-200 dark:border-zinc-800
                        bg-zinc-100 dark:bg-zinc-900/50
                        aspect-video
                        flex
                        items-center
                        justify-center
                    "
        >
          {image ? (
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center text-zinc-400">
              <span className="text-sm">Image Placeholder</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 p-7 pt-2 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 flex-grow">
          <div className="w-full">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RequiredDocumentsSection() {
  return (
    <section
      id="documents"
      className="relative overflow-hidden py-12 bg-zinc-50 dark:bg-[#0A0A0A]"
    >
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "absolute inset-0 h-full w-full stroke-emerald-600/30 fill-emerald-600/30 dark:stroke-emerald-400/30 dark:fill-emerald-400/30 z-0",
          "[mask-image:linear-gradient(to_bottom,white,transparent_40%)]",
        )}
      />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <Title
            title={
              <span className="text-3xl md:text-5xl">
                Documents Required For <br />{" "}
                <Highlighter action="highlight" color="#22c55e">
                  <span className="text-white relative z-10 px-2 py-1">
                    FSSAI Registration
                  </span>
                </Highlighter>
              </span>
            }
            description="Keep these simple documents ready to get your FSSAI license processed within 24 hours."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {requiredDocuments.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ delay: index * 0.1 }}
            >
              <DocumentCard {...doc} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
