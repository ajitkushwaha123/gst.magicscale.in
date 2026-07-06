"use client";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect, Suspense } from "react";
import posthog from "posthog-js";
import { getRegistrationByOrderId } from "@/services/payment";
import SectionWrapper from "@/components/general/SectionWrapper";
import {
  Sparkles,
  ArrowRight,
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  Clock,
  ShieldCheck,
  SkipBack,
} from "lucide-react";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "";

  const [copied, setCopied] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      try {
        const data = await getRegistrationByOrderId(orderId);
        if (isMounted) {
          setRegistrationDetails(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  useEffect(() => {
    if (!isLoading && registrationDetails?.registration) {
      const reg = registrationDetails.registration;
      posthog.capture("payment_success_page_viewed", {
        order_id: reg.orderId,
        amount: reg.amount,
        plan_id: reg.planId,
      });

      if (typeof window !== "undefined" && window.fbq) {
        const purchaseValue = parseFloat(reg.amount || registrationDetails?.plan?.price || 0);
        window.fbq("track", "Purchase", {
          value: purchaseValue,
          currency: "INR"
        });
      }
    }
  }, [isLoading, registrationDetails]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-slate-200" />
          <div className="h-4 w-32 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  const registration = registrationDetails?.registration;
  const plan = registrationDetails?.plan;

  const sessionDetails = {
    orderId: registration?.orderId || "N/A",
    amount: registration?.amount || "999",
    serviceName: "FSSAI License Registration",
    whatsappSupportLink: plan?.whatsappSupportLink || "https://wa.me/918826073117",
  };

  const copyOrderId = () => {
    if (!sessionDetails.orderId) return;
    navigator.clipboard.writeText(sessionDetails.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionWrapper>
      <div className="flex bg-white py-10 rounded-md items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left mt-4 md:mt-12">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mx-auto md:mx-0">
                <CheckCircle2 className="h-4 w-4" />
                Payment Successful
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Your Application is <br className="hidden sm:inline" />
                Being Processed!
              </h1>

              <p className="text-base text-slate-600">
                Thank you for choosing MagicScale! We have received your payment and FSSAI License application details successfully.
              </p>

              <div className="hidden md:block border-t border-slate-200/80 pt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Next Steps
                </h4>
                <div className="flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
                  <Clock className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Our experts are reviewing your documents. Your FSSAI Registration Certificate will be generated and sent to you via WhatsApp & Email within 24 hours.
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 w-full max-w-md mx-auto">
              <div className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.06)] relative overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 w-full" />

                <div className="p-6 pb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
                      <FileText className="h-3.5 w-3.5" /> APPLICATION RECEIVED
                    </div>
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-900 mt-4 leading-snug">
                    {sessionDetails.serviceName}
                  </h2>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block font-medium uppercase tracking-wider text-[10px]">
                          STATUS
                        </span>
                        <span className="font-bold text-emerald-600">
                          In Progress
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block font-medium uppercase tracking-wider text-[10px]">
                          AMOUNT PAID
                        </span>
                        <span className="font-bold text-slate-800">
                          ₹{sessionDetails.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative h-8 bg-transparent flex items-center justify-between pointer-events-none select-none">
                  <div className="w-4 h-8 bg-slate-50 border-r border-y border-slate-200/80 rounded-r-full -ml-px" />
                  <div className="w-full border-t-2 border-dashed border-slate-200 mx-1" />
                  <div className="w-4 h-8 bg-slate-50 border-l border-y border-slate-200/80 rounded-l-full -mr-px" />
                </div>

                <div className="p-6 pt-2 bg-slate-50/60 rounded-b-[24px]">
                  <div className="text-center bg-blue-50/80 border border-blue-100/70 p-3 rounded-xl mb-4">
                    <div className="flex items-center justify-center gap-1.5 text-blue-800 font-bold text-[11px] uppercase tracking-wide">
                      <AlertCircle className="h-3.5 w-3.5 text-blue-500" />
                      Important Notice
                    </div>
                    <p className="text-[11px] text-blue-700/90 mt-1 font-medium leading-normal">
                      If any further documents are required (like NOC or modified layout), our team will reach out directly on your WhatsApp number.
                    </p>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                      Application Reference ID
                    </span>

                    <div className="mt-1.5 flex items-center justify-center gap-2">
                      <div
                        onClick={copyOrderId}
                        className="bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 font-mono text-lg font-black text-slate-800 tracking-wider shadow-sm flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition active:scale-95 group select-all"
                        title="Click to copy ID"
                      >
                        {sessionDetails.orderId.substring(0, 10).toUpperCase()}
                      </div>
                    </div>

                    <button
                      onClick={copyOrderId}
                      className="text-[10px] text-emerald-600 font-semibold mt-1.5 inline-flex items-center gap-1 hover:underline"
                    >
                      <Copy className="h-3 w-3" />{" "}
                      {copied ? "Copied!" : "Copy Reference ID"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex grid grid-cols-2 flex-col sm:flex-row md:flex-col lg:flex-row gap-3 pt-2">
                <a href="/">
                  <button className="w-full bg-white text-slate-700 border border-slate-200 font-semibold py-3 px-4 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition flex items-center justify-center gap-2 shadow-sm text-sm">
                    <SkipBack className="h-4 w-4 text-slate-500" />
                    Return Home
                  </button>
                </a>

                <a
                  href={sessionDetails.whatsappSupportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => posthog.capture("whatsapp_support_clicked", { order_id: sessionDetails.orderId })}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded-xl active:bg-[#1da850] transition flex items-center justify-center gap-2 group shadow-md shadow-slate-900/5 text-sm"
                >
                  WhatsApp Support
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-pulse h-12 w-12 rounded-full bg-slate-200" /></div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
