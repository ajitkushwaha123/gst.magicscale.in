"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import ReserveSeatDialog from "../CustomerInfoForm";
import PayButton from "../Payment/PayButton";
import { useAppConfigStore } from "@/stores/app-config.store";

export default function StickyMobileCTA() {
  const plan = useAppConfigStore((state) => state.plan);

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-in slide-in-from-bottom-full duration-500"
      >
        <div className="border-t border-green-100 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
          <div className="mx-auto max-w-lg px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
            <div className="flex items-center gap-3 justify-between">
              <div className="min-w-fit">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black tracking-tight text-green-600">
                    ₹{plan?.price || 999}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500 font-medium">
                  <ShieldCheck className="h-3 w-3 text-green-500" />
                  <span>Fast & Secure Processing</span>
                </div>
              </div>

              <div>
                <PayButton className="w-full text-sm h-11" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
