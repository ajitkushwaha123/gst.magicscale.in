"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegistration } from "@/hooks/useRegistration";
import { useAppConfigStore } from "@/stores/app-config.store";
import { User, Phone, Loader2, CheckCircle2, Lock } from "lucide-react";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit number")
    .required("Phone is required"),
});

const FieldError = ({ touched, error }) => {
  if (!touched || !error) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs font-medium text-red-500 mt-1 px-1"
    >
      {error}
    </motion.p>
  );
};

export default function ReserveSeatDialog({ open, onOpenChange }) {
  const plan = useAppConfigStore((state) => state.plan);
  const { registration } = useRegistration();
  const isLoading = registration.isPending;

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!plan?._id) return;

      try {
        posthog.capture("registration_submitted", {
          plan_id: plan._id,
        });

        // Save Lead to Google Sheets / DB before Payment
        try {
          await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: values.name.trim(),
              phone: values.phone.trim(),
              planId: plan._id
            }),
          });
        } catch (error) {
          console.error("Failed to save lead", error);
        }

        await registration.mutateAsync({
          name: values.name.trim(),
          phone: values.phone.trim(),
          planId: plan._id,
        });
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isLoading) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="z-[100] border-0 p-0 w-full h-[99dvh] sm:h-auto sm:max-h-[90vh] sm:w-[95vw] sm:max-w-[450px] bg-white sm:rounded-2xl flex flex-col gap-0 shadow-2xl">
        <div className="px-5 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5 bg-white shrink-0 z-10 border-b border-zinc-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <DialogHeader>
            <DialogTitle className="text-left text-2xl font-bold text-zinc-900 tracking-tight">
              Contact Details
            </DialogTitle>
            <DialogDescription className="text-left text-zinc-500 text-sm mt-1">
              Enter your name and WhatsApp number to proceed to payment.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 bg-white">
          <div className="px-5 sm:px-8 py-6">
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="h-12 pl-10 bg-zinc-50/50 border-zinc-200 focus-visible:bg-white focus-visible:ring-[#22c55e] focus-visible:border-[#22c55e] rounded-xl text-sm transition-all"
                  />
                </div>
                <FieldError touched={formik.touched.name} error={formik.errors.name} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900">WhatsApp Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9876543210"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      const cleanValue = e.target.value.replace(/\D/g, "");
                      formik.setFieldValue("phone", cleanValue);
                    }}
                    className="h-12 pl-10 bg-zinc-50/50 border-zinc-200 focus-visible:bg-white focus-visible:ring-[#22c55e] focus-visible:border-[#22c55e] rounded-xl text-sm transition-all"
                  />
                </div>
                <FieldError touched={formik.touched.phone} error={formik.errors.phone} />
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-500 bg-zinc-50 py-2.5 rounded-lg border border-zinc-100 mt-2">
                <Lock className="w-3.5 h-3.5 text-zinc-400" />
                Your information is 100% encrypted & secure
              </div>

              {registration.error && (
                <p className="text-sm font-medium text-red-500 text-center bg-red-50 py-2 rounded-lg mt-2">
                  {registration.error.message || "Something went wrong. Please try again."}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 sm:px-8 sm:py-5 bg-zinc-50 shrink-0 border-t border-zinc-100 mt-auto">
          <div className="bg-white rounded-xl p-3 border border-zinc-200 flex items-center justify-between mb-4 shadow-sm">
            <span className="text-sm font-medium text-zinc-600">{plan?.title || "FSSAI License"}</span>
            <span className="text-lg font-bold text-zinc-900">₹{plan?.price ?? 0}</span>
          </div>

          <Button type="button" onClick={formik.handleSubmit} disabled={isLoading || !plan?._id} className="h-12 w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Proceed to Payment
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
