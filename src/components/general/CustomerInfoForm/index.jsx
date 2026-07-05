"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
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
        
        toast.success("Application submitted successfully! We will contact you soon.");
        onOpenChange(false);
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Something went wrong. Please try again.");
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
      <DialogContent className="z-[100] border-0 p-0 w-full h-[99dvh] sm:h-auto sm:max-h-[90vh] sm:w-[95vw] sm:max-w-[450px] bg-white sm:rounded-2xl overflow-y-auto shadow-2xl flex flex-col justify-start">
        <div className="px-5 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5 bg-white border-b border-zinc-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <DialogHeader>
            <DialogTitle className="text-left text-2xl font-bold text-zinc-900 tracking-tight">
              Contact Details
            </DialogTitle>
            <DialogDescription className="text-left text-zinc-500 text-sm mt-1">
              Enter your name and WhatsApp number to submit your application.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex-1 overflow-y-auto min-h-0 bg-white flex flex-col">
          <div className="px-5 sm:px-8 py-6">
            <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-400 group-focus-within:text-[#22c55e] transition-colors" />
                </div>
                <Input
                  name="name"
                  placeholder="e.g. Rahul Sharma"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-14 pl-11 bg-zinc-50/80 hover:bg-zinc-50 border-zinc-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#22c55e]/20 focus-visible:border-[#22c55e] rounded-xl text-base font-medium transition-all shadow-sm"
                />
              </div>
              <FieldError touched={formik.touched.name} error={formik.errors.name} />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">WhatsApp Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-zinc-400 group-focus-within:text-[#22c55e] transition-colors" />
                </div>
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
                  className="h-14 pl-11 bg-zinc-50/80 hover:bg-zinc-50 border-zinc-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#22c55e]/20 focus-visible:border-[#22c55e] rounded-xl text-base font-medium transition-all shadow-sm"
                />
              </div>
              <FieldError touched={formik.touched.phone} error={formik.errors.phone} />
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 py-3 rounded-xl border border-emerald-100/50 mt-4">
              <Lock className="w-4 h-4 text-emerald-500" />
              Your information is 100% encrypted & secure
            </div>

            {registration.error && (
              <p className="text-sm font-medium text-red-500 text-center bg-red-50 py-3 rounded-xl mt-2">
                {registration.error.message || "Something went wrong. Please try again."}
              </p>
            )}
          </div>
        </div>

        <div className="px-5 py-5 sm:px-8 bg-white border-t border-zinc-100 mt-auto">
          <Button 
            type="submit" 
            disabled={isLoading || !plan?._id} 
            className="h-14 w-full bg-gradient-to-r from-[#22c55e] to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white text-lg font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Submit Application
                <CheckCircle2 className="w-5 h-5 ml-1" />
              </>
            )}
          </Button>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
