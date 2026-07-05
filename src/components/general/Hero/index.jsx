import { cn } from "@/lib/utils";
import { Highlighter } from "@/components/ui/highlighter";
import { GridPattern } from "@/components/ui/grid-pattern";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export const Hero = () => {
  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center pt-20 md:pt-32 pb-8 md:pb-12 overflow-hidden flex flex-col items-center">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "absolute inset-0 h-full w-full stroke-emerald-600/30 fill-emerald-600/30 dark:stroke-emerald-400/30 dark:fill-emerald-400/30 z-0",
          "[mask-image:linear-gradient(to_bottom,white,transparent_90%)]",
        )}
      />
      <h1
        className="relative z-10 w-full mx-auto pb-4 animate-in fade-in slide-in-from-top-4 duration-700"
      >
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20 shadow-sm">
            🚀 Trusted by 10,000+ Food Businesses
          </span>
        </div>

        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.2] md:leading-[1.1] text-gray-900 dark:text-white">
          Fast & Secure{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600 drop-shadow-sm">
            FSSAI License
          </span>
          <br />
          <span className="mt-2 md:mt-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <span>In Just</span>
            <span className="inline-block -rotate-2 transform transition-transform hover:rotate-0 duration-300">
              <Highlighter action="highlight" color="#22c55e">
                <span className="text-white relative z-10 px-4 py-1 rounded-md">
                  24 Hours
                </span>
              </Highlighter>
            </span>
          </span>
        </div>
      </h1>

      <p
        className="relative z-10 mt-6 text-sm md:text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-3xl font-normal leading-relaxed mx-auto px-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both"
      >
        Ensure your food business is legally compliant with our fast, hassle-free registration.
        Get approved quickly and start selling on{" "}
        <span className="text-red-500 font-semibold">Zomato</span> &{" "}
        <span className="text-orange-500 font-semibold">Swiggy</span>{" "}.
      </p>

      <div
        className="relative z-10 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both"
      >
        {/* <div className="w-full sm:w-auto shadow-lg shadow-emerald-500/20 rounded-xl transition-all hover:scale-105 duration-300">
          <PayButton />
        </div> */}
      </div>

      <div
        className="relative hidden z-10 md:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 mb-12 text-sm font-medium text-gray-500 dark:text-gray-400 animate-in fade-in duration-700 delay-500 fill-mode-both"
      >
        <span className="flex items-center gap-1.5"><span className="text-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 rounded-full p-0.5">✓</span> 100% Online Process</span>
        <span className="flex items-center gap-1.5"><span className="text-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 rounded-full p-0.5">✓</span> Secure Payment</span>
        <span className="flex items-center gap-1.5"><span className="text-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 rounded-full p-0.5">✓</span> 24/7 Expert Support</span>
      </div>

      <div className="w-full max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-700 delay-700 ">
        <div className="group relative overflow-hidden rounded-2xl md:rounded-[24px] border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-black shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 sm:p-4">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
          </div>

          <div className="relative z-10 overflow-hidden rounded-xl md:rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center p-0 md:p-0">
            <img
              src="/fssai.webp"
              alt="FSSAI Certificate Sample"
              className="w-full h-auto md:h-[500px] object-contain md:object-cover md:object-top transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
