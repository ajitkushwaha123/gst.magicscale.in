"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle, RefreshCw, ArrowLeft, HelpCircle } from "lucide-react";
import { useAppConfigStore } from "@/stores/app-config.store";
import PayButton from "@/components/general/Payment/PayButton";

const Page = () => {
  const plan = useAppConfigStore((state) => state.plan);
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id") || "";

  const handleRetry = () => {
    router.push(`/checkout?order_id=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all">
        <div className="bg-red-50 px-6 py-8 flex flex-col items-center justify-center border-b border-red-100">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 animate-bounce-short mb-3">
            <AlertCircle className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Payment Failed
          </h1>
          <p className="text-sm text-red-600 font-medium mt-1">
            Your transaction could not be processed
          </p>
        </div>

        <div className="p-6 space-y-6">
          {orderId && (
            <div className="bg-slate-50 rounded-lg p-3 flex justify-between items-center text-sm border border-slate-100">
              <span className="text-slate-500 font-medium">Order ID:</span>
              <span className="font-mono font-semibold text-slate-700">
                {orderId}
              </span>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Common reasons for failure:
            </h3>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside pl-1">
              <li>Insufficient funds or limit exceeded</li>
              <li>Incorrect card details or OTP timeout</li>
              <li>Temporary issue with the payment gateway</li>
            </ul>
            <p className="text-xs text-slate-400 italic mt-2">
              Don't worry—if any money was deducted, it will be refunded
              automatically within 3–5 business days.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-3">
            <PayButton />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => router.push("/")}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Home
              </button>

              <a
                href={plan?.whatsappSupportLink}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 text-sm"
              >
                <HelpCircle className="h-4 w-4" />
                Get Help
              </a>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Your personal data and payments are secured with 256-bit encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
