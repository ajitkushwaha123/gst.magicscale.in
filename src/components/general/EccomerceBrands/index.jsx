"use client";
import React from "react";
import { ShieldCheck, Info } from "lucide-react";

const platforms = [
    { key: "amazon", label: "Amazon", logo: "/assets/amazon.png" },
    { key: "flipkart", label: "Flipkart", logo: "/assets/flipkart.png" },
    { key: "meesho", label: "Meesho", logo: "/assets/meesho.png" },
    { key: "swiggy", label: "Swiggy", logo: "/assets/swiggy.png" },
    { key: "zomato", label: "Zomato", logo: "/assets/zomato.png" },
    { key: "blinkit", label: "Blinkit", logo: "/assets/blinkit.png" },
];

export default function EccomerceBrands() {
    return (
        <section className="mx-auto mt-10 w-full rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 p-5 shadow-sm sm:p-8">
            <header className="mb-8 text-center sm:text-left">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
                    GST for marketplaces
                </p>
                <h2 className="mt-2 text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">
                    GST is compulsory on major e-commerce platforms
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mx-0">
                    GST registration is mandatory for selling goods on online marketplaces
                    from the very first sale.
                </p>
            </header>

            <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center sm:max-w-[400px]">
                <div className="absolute inset-[12%] rounded-full border border-dashed border-emerald-300/70" />

                <div className="relative z-10 flex h-[22%] w-[22%] min-h-[88px] min-w-[88px] items-center justify-center rounded-full border border-emerald-400 bg-white shadow-[0_0_45px_rgba(16,185,129,0.35)]">
                    <img
                        src="/assets/gst-logo.png"
                        alt="GST"
                        className="h-full w-full p-3 object-contain"
                    />
                </div>

                {platforms.map((platform, index) => {
                    const total = platforms.length;
                    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;

                    return (
                        <div
                            key={platform.key}
                            className="absolute flex flex-col items-center text-center"
                            style={{
                                left: "50%",
                                top: "50%",
                                transform: `
                  translate(-50%, -50%)
                  translate(
                    calc(cos(${angle}) * clamp(110px, 30vw, 150px)),
                    calc(sin(${angle}) * clamp(110px, 30vw, 150px))
                  )
                `,
                            }}
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm sm:h-14 sm:w-14">
                                <img
                                    src={platform.logo}
                                    alt={platform.label}
                                    className="h-full w-full p-2 object-contain"
                                />
                            </div>
                            <p className="mt-1.5 max-w-[72px] text-[10px] font-medium leading-tight text-slate-600 sm:text-[11px]">
                                {platform.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-9 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-[12px] leading-relaxed text-emerald-900">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <ShieldCheck className="h-4 w-4" />
                </div>
                <p>
                    As per <strong>Section 24 of the CGST Act</strong>, GST registration
                    is mandatory for sellers operating on e-commerce platforms,
                    irrespective of turnover.
                </p>
            </div>

            <div className="mt-4 flex items-start gap-2 text-[11px] leading-snug text-slate-600">
                <Info className="mt-[1px] h-4 w-4 shrink-0 text-emerald-500" />
                <span>
                    Service providers may be subject to different thresholds. Always
                    confirm with a qualified tax professional.
                </span>
            </div>
        </section>
    );
}