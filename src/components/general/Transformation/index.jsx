"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  IndianRupee,
  ShoppingBag,
} from "lucide-react";

const transformations = [
  {
    title: "From Food Cart to Restaurant",
    beforeImage: "/assets/transformation/ram's-pizza-before.webp",
    afterImage: "/assets/transformation/ram's-pizza-after.webp",
    beforeTitle: "No Direction",
    afterTitle: "Profitable Food Brand",
    metrics: [
      {
        icon: ShoppingBag,
        label: "Orders",
        value: "+127",
      },
      {
        icon: IndianRupee,
        label: "Revenue",
        value: "₹52K",
      },
    ],
    points: [
      "Clear Launch Plan",
      "Profitable Pricing Strategy",
      "Swiggy & Zomato Setup",
      "Order Growth Blueprint",
    ],
  },
  {
    title: "From Confusion To Consistent Orders",
    beforeImage: "/assets/transformation/sales-before.webp",
    afterImage: "/assets/transformation/sales-after.webp",
    beforeTitle: "No Orders",
    afterTitle: "Growing Business",
    metrics: [
      {
        icon: TrendingUp,
        label: "Growth",
        value: "3X",
      },
      {
        icon: IndianRupee,
        label: "Profit",
        value: "₹75K",
      },
    ],
    points: [
      "Marketing Framework",
      "Better Menu Engineering",
      "Higher Margins",
      "Customer Retention Strategy",
    ],
  },
];

export function FeatureCard({
  title,
  description,
  image,
  badge,
  children,
  className,
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className={clsx(
        "group relative overflow-hidden rounded-[32px] h-full",
        "border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-black",
        "shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
        "hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)]",
        "transition-all duration-300",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {badge && (
        <div
          className={clsx(
            "absolute top-6 right-6 z-20 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider shadow-sm",
            badge === "BEFORE"
              ? "bg-red-500 text-white border-red-600 dark:border-red-500 shadow-red-500/20"
              : badge === "AFTER"
                ? "bg-green-500 text-white border-green-600 dark:border-green-500 shadow-green-500/20"
                : "bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800",
          )}
        >
          {badge}
        </div>
      )}

      <div className="relative z-10 px-4 pb-4 pt-4">
        <div
          className="
            overflow-hidden
            rounded-[20px]
            border border-zinc-200 dark:border-zinc-800
            bg-gradient-to-b
            from-zinc-50 dark:from-zinc-900/50
            to-white dark:to-black
            min-h-[260px]
            flex
            items-center
            justify-center
            p-2
          "
        >
          {image ? (
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              src={image}
              alt={title}
              className="max-h-full rounded-[16px] max-w-full object-contain"
            />
          ) : (
            <div className="h-full w-full bg-zinc-100 dark:bg-zinc-800 rounded-[16px]"></div>
          )}
        </div>
      </div>
      <div className="relative z-10 p-7 pt-2">
        <div className="flex items-start justify-between gap-4">
          <div className="w-full">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {title}
            </h3>
            {description && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TransformationSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-white dark:bg-[#0A0A0A]">
      <div className="container relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-600 mb-6">
            Student Transformations
          </div>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl text-zinc-900 dark:text-white">
            See The Transformation
            <span className="block mt-2 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 bg-clip-text text-transparent pb-1">
              Before & After FSSAI License
            </span>
          </h2>

          <p className="mt-5 text-lg text-zinc-500 dark:text-zinc-400">
            Learn the exact systems used to launch and scale profitable food
            businesses on Swiggy and Zomato.
          </p>
        </motion.div>

        <div className="space-y-24">
          {transformations.map((item, index) => (
            <div key={index} className="mx-auto max-w-5xl">
              <div className="mb-10 flex flex-col items-center text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
                  {item.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {item.points.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />{" "}
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FeatureCard
                  badge="BEFORE"
                  title={item.beforeTitle}
                  description="Struggling to find direction and consistent revenue. Operating without clear marketing frameworks."
                  image={item.beforeImage}
                />
                <FeatureCard
                  badge="AFTER"
                  title={item.afterTitle}
                  image={item.afterImage}
                >
                  <div className="mt-6 flex gap-3">
                    {item.metrics.map((metric, i) => {
                      const Icon = metric.icon;
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4"
                        >
                          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1.5">
                            <Icon className="w-4 h-4" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">
                              {metric.label}
                            </span>
                          </div>
                          <div className="text-xl font-bold text-zinc-900 dark:text-white">
                            {metric.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </FeatureCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
