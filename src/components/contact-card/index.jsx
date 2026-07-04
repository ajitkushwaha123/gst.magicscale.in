"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function ContactCard({ contactData = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      className="border border-neutral-200 dark:border-[#272742] rounded-2xl shadow-md backdrop-blur-md bg-white dark:bg-[#0f0f1f] overflow-hidden max-w-6xl mx-auto mt-24 transition-all"
    >
      <div className="flex items-start gap-4 p-4 md:p-8 bg-grid dark:bg-grid-dark">
        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
          <Users className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-1">
            {contactData.title || "Contact Us"}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-gray-400">
            {contactData.description ||
              "We value your feedback and are here to assist you with any questions or concerns."}
          </p>
        </div>
      </div>

      <div className="rounded-xl p-4 md:p-6 mx-4 md:mx-6 mb-6 bg-neutral-50 dark:bg-transparent text-sm leading-relaxed text-neutral-700 dark:text-gray-300">
        {contactData.content || (
          <div>
            <p className="mb-4">
              At Kabootar.ai, your privacy and trust are our top priorities. If
              you have any questions, feedback, or concerns regarding our
              Privacy Policy or how we handle your data on{" "}
              <a
                href="https://web.kabootar.live"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
              >
                web.kabootar.live
              </a>
              , feel free to contact us. We're committed to being transparent
              and responsive to your needs.
            </p>
            <p>
              Whether you're looking for clarity on a specific section of our
              policy, want to better understand your data rights, or have ideas
              to improve your experience, we’re listening. Reach out to our
              support team anytime at{" "}
              <a
                href="mailto:support@kabootar.live"
                className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
              >
                support@kabootar.live
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
