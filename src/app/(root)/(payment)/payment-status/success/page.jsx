"use client";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect, Suspense } from "react";
import posthog from "posthog-js";
import { getRegistrationByOrderId } from "@/services/payment";
import SectionWrapper from "@/components/general/SectionWrapper";
import {
  Sparkles,
  ArrowRight,
  Ticket,
  Tv,
  AlertCircle,
  Copy,
  Calendar,
  Clock,
  ShieldCheck,
  SkipBack,
} from "lucide-react";

function TicketPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "";

  const ticketRef = useRef(null);
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
    amount: registration?.amount || 0,
    eventName: plan?.title || "FSSAI Registration Service",
    date: plan?.date || "To Be Announced",
    time: plan?.time || "Live Time slot",
    ticketNumber: registration?.ticketNumber || "000000",
    whatsappGroupLink: plan?.whatsappGroupLink || "#",
  };

  const copyTicketCode = () => {
    if (!sessionDetails.ticketNumber) return;
    navigator.clipboard.writeText(sessionDetails.ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionWrapper>
      <div className="flex bg-white py-10 rounded-md items-center justify-center">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-3 space-y-6 lg:pr-6 text-center md:text-left mt-4 md:mt-12">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mx-auto md:mx-0">
                <ShieldCheck className="h-4 w-4" />
                Seat Confirmed
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                You're Registered for <br className="hidden sm:inline" />
                the Session!
              </h1>

              <p className="text-base text-slate-600 max-w-md mx-auto md:mx-0">
                Your payment went through successfully. A detailed receipt and
                confirmation summary has been sent directly to your email
                address.
              </p>

              <div className="hidden md:block border-t border-slate-200/80 pt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Important Notice
                </h4>
                <div className="flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
                  <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Keep your digital pass accessible on the day of
                    presentation. Lucky draw prize winners are announced
                    natively during the livestream.
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4 w-full max-w-md mx-auto">
              <div
                ref={ticketRef}
                className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.06)] relative overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-500 w-full" />

                <div className="p-6 pb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">
                      <Tv className="h-3.5 w-3.5" /> LIVE SESSION ADMIT
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      #{sessionDetails.orderId.substring(0, 8)}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-900 mt-4 leading-snug">
                    {sessionDetails.eventName}
                  </h2>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block font-medium uppercase tracking-wider text-[10px]">
                          DATE
                        </span>
                        <span className="font-bold text-slate-800">
                          {sessionDetails.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block font-medium uppercase tracking-wider text-[10px]">
                          TIME
                        </span>
                        <span className="font-bold text-slate-800">
                          {sessionDetails.time}
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
                  <div className="text-center bg-amber-50/80 border border-amber-100/70 p-3 rounded-xl mb-4">
                    <div className="flex items-center justify-center gap-1.5 text-amber-800 font-bold text-xs uppercase tracking-wide">
                      <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      10 Lucky Tickets Win Free Onboarding
                    </div>
                    <p className="text-[11px] text-amber-700/90 mt-1 font-medium leading-normal">
                      Every attendee gets a ticket! 10 random winners will be
                      chosen directly after the session to get free Swiggy &
                      Zomato onboarding setup.
                    </p>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                      Your Lucky Draw Number
                    </span>

                    <div className="mt-1.5 flex items-center justify-center gap-2">
                      <div
                        onClick={copyTicketCode}
                        className="bg-white border-2 border-slate-200 rounded-xl px-4 py-2.5 font-mono text-lg font-black text-slate-800 tracking-wider shadow-sm flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition active:scale-95 group select-all"
                        title="Click to copy code"
                      >
                        <Ticket className="h-5 w-5 text-indigo-500 transform -rotate-12 group-hover:rotate-0 transition-transform" />
                        {sessionDetails.ticketNumber}
                      </div>
                    </div>

                    <button
                      onClick={copyTicketCode}
                      className="text-[10px] text-indigo-600 font-semibold mt-1.5 inline-flex items-center gap-1 hover:underline"
                    >
                      <Copy className="h-3 w-3" />{" "}
                      {copied ? "Copied!" : "Copy ticket number"}
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
                  href={sessionDetails.whatsappGroupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => posthog.capture("whatsapp_join_clicked", { order_id: sessionDetails.orderId })}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl active:bg-green-700 transition flex items-center justify-center gap-2 group shadow-md shadow-slate-900/5 text-sm"
                >
                  Join Whatsapp
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-4 text-center">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Winners announced live during presentation!</span>
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
    <Suspense fallback={<div>Loading...</div>}>
      <TicketPageContent />
    </Suspense>
  );
}
