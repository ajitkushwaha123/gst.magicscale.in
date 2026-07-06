"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import posthog from "posthog-js";
import ReserveSeatDialog from "../../CustomerInfoForm";

export default function PayButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ReserveSeatDialog open={open} onOpenChange={setOpen} />
      <button
        onClick={() => {
          posthog.capture("application_form_opened");
          if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "InitiateCheckout");
          }
          setOpen(true);
        }}
        className="group flex-1 w-full rounded-md bg-[#22c55e] px-5 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:bg-green-700 active:scale-[0.98]"
      >
        <div className="flex items-center justify-center gap-2">
          <span>Apply Now</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </button>
    </>
  );
}
