"use client";

import { useEffect, useState, useRef } from "react";
import posthog from "posthog-js";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegistration } from "@/hooks/useRegistration";
import { useAppConfigStore } from "@/stores/app-config.store";
import Image from "next/image";
import { User, Mail, Phone, ShieldCheck, Loader2, Upload, FileText, X, MapPin, Briefcase, Lock, Store, UtensilsCrossed, Factory, Cloud, ShoppingCart, ArrowRight, ArrowLeft, CheckCircle2, Check } from "lucide-react";

// Full Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit number")
    .required("Phone is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  address: Yup.string().trim().required("Address is required"),
  businessName: Yup.string().trim().required("Business Name is required"),
  businessActivity: Yup.string().trim().required("Please select your business type"),
  turnover: Yup.string().trim().required("Please select your turnover"),
  agreedToPrivacy: Yup.boolean().oneOf([true], "You must agree to the privacy policy"),
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

  const [step, setStep] = useState(1);
  const [profilePic, setProfilePic] = useState(null);
  const [aadharDoc, setAadharDoc] = useState(null);
  const [panDoc, setPanDoc] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const profileRef = useRef(null);
  const aadharRef = useRef(null);
  const panRef = useRef(null);

  const businessTypes = [
    {
      id: "street-food",
      label: "Street Food Cart",
      image: "/assets/images/street-food-cart.webp"
    },
    {
      id: "restaurant",
      label: "Restaurant / Hotel",
      image: "/assets/images/restaurant-hotel.webp"
    },
    {
      id: "cloud-kitchen",
      label: "Cloud Kitchen",
      image: "/assets/images/cloud-kitchen.webp"
    },
    {
      id: "grocery",
      label: "Grocery / Retail",
      image: "/assets/images/grocery-retail.webp"
    },
    {
      id: "manufacturing",
      label: "Manufacturing",
      image: "/assets/images/manufacturing.webp"
    },
    {
      id: "other",
      label: "Other Business",
      image: "/assets/images/other-business.webp"
    },
  ];

  const turnoverOptions = [
    { id: "Upto 12 Lakhs", label: "Upto ₹12 Lakhs", suggest: "Basic License", desc: "For startups & small businesses" },
    { id: "12 Lakhs to 20 Crores", label: "₹12 Lakhs - ₹20 Crores", suggest: "State License", desc: "For medium-sized businesses" },
    { id: "Above 20 Crores", label: "Above ₹20 Crores", suggest: "Central License", desc: "For large businesses & exporters" }
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      businessName: "",
      businessActivity: "",
      turnover: "",
      agreedToPrivacy: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!plan?._id) return;

      try {
        setIsUploading(true);

        const uploadFile = async (file) => {
          if (!file) return "";
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const data = await res.json();
          if (!data.success) throw new Error(data.message || "Failed to upload document");
          return data.url;
        };

        const profilePicUrl = await uploadFile(profilePic);
        const aadharUrl = await uploadFile(aadharDoc);
        const panUrl = await uploadFile(panDoc);

        setIsUploading(false);

        posthog.capture("registration_submitted", {
          business_type: values.businessActivity,
          turnover: values.turnover,
          plan_id: plan._id,
          has_profile_pic: !!profilePicUrl,
          has_aadhar: !!aadharUrl,
          has_pan: !!panUrl,
        });

        await registration.mutateAsync({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email?.trim(),
          address: values.address?.trim(),
          businessName: values.businessName?.trim(),
          businessActivity: values.businessActivity?.trim(),
          turnover: values.turnover?.trim(),
          agreedToPrivacy: values.agreedToPrivacy,
          profilePicUrl,
          aadharUrl,
          panUrl,
          planId: plan._id,
        });

        onOpenChange(false);
      } catch (error) {
        console.error("Registration failed:", error);
        setUploadError(error.message || "Something went wrong.");
        setIsUploading(false);
      }
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
      setStep(1);
      setProfilePic(null);
      setAadharDoc(null);
      setPanDoc(null);
      setUploadError("");
    }
  }, [open]);

  const handleNextStep1 = () => {
    if (formik.values.businessActivity) {
      setStep(2);
    } else {
      formik.setFieldTouched("businessActivity", true);
    }
  };

  const handleNextStep2 = async () => {
    const errors = await formik.validateForm();
    if (!errors.turnover && !errors.name && !errors.phone) {
      posthog.capture("turnover_selected", {
        turnover: formik.values.turnover,
        business_type: formik.values.businessActivity,
      });
      try {
        setIsSavingLead(true);
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formik.values.name,
            phone: formik.values.phone,
            businessActivity: formik.values.businessActivity,
            turnover: formik.values.turnover,
            planId: plan?._id
          }),
        });
        posthog.capture("lead_saved", {
          business_type: formik.values.businessActivity,
          turnover: formik.values.turnover,
          plan_id: plan?._id,
        });
      } catch (error) {
        console.error("Failed to save lead", error);
      } finally {
        setIsSavingLead(false);
        setStep(3); // Proceed regardless of lead save success
      }
    } else {
      formik.setFieldTouched("turnover", true);
      formik.setFieldTouched("name", true);
      formik.setFieldTouched("phone", true);
    }
  };

  const handleNextStep3 = async () => {
    const errors = await formik.validateForm();
    if (!errors.email && !errors.address && !errors.businessName) {
      setStep(4);
    } else {
      formik.setFieldTouched("email", true);
      formik.setFieldTouched("address", true);
      formik.setFieldTouched("businessName", true);
    }
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size should be less than 5MB");
        return;
      }
      setFile(file);
      setUploadError("");
    }
  };

  const removeFile = (setFile, ref) => {
    setFile(null);
    if (ref.current) ref.current.value = "";
  };

  const renderFileUploader = (file, setFile, ref, label, accept = ".jpg,.jpeg,.png,.pdf", optional = false) => (
    <div className="space-y-1.5 pt-1">
      <label className="text-sm font-semibold text-zinc-900">
        {label} {optional && <span className="font-normal text-zinc-500 ml-1">(Optional)</span>}
      </label>
      {!file ? (
        <div
          onClick={() => ref.current?.click()}
          className="border-2 border-dashed border-zinc-200 hover:border-[#22c55e] hover:bg-[#22c55e]/5 transition-all rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer gap-2 bg-zinc-50/50"
        >
          <div className="p-2.5 bg-zinc-100 rounded-full text-zinc-500">
            <Upload className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-zinc-700">Click to upload</span>
          <span className="text-xs text-zinc-500">PDF, JPG, PNG up to 5MB</span>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border border-[#22c55e]/20 rounded-xl bg-[#22c55e]/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-white p-2 border border-[#22c55e]/20 rounded-lg text-[#22c55e] shrink-0 shadow-sm">
              <FileText className="h-4 w-4" />
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold text-zinc-900 truncate">{file.name}</p>
              <p className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(setFile, ref)} className="shrink-0 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <input
        type="file"
        ref={ref}
        onChange={(e) => handleFileChange(e, setFile)}
        accept={accept}
        className="hidden"
      />
    </div>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isLoading && !isUploading) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="z-[100] border-0 p-0 w-full h-[99dvh] sm:h-auto sm:max-h-[90vh] sm:w-[95vw] sm:max-w-[550px] bg-white sm:rounded-2xl flex flex-col gap-0 shadow-2xl">
        <div className="px-5 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5 bg-white shrink-0 z-10 border-b border-zinc-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <DialogHeader>
            <DialogTitle className="text-left text-2xl font-bold text-zinc-900 tracking-tight">
              {step === 1 && "What's your business type?"}
              {step === 2 && "Personal Details"}
              {step === 3 && "Business Details"}
              {step === 4 && "Identity Proof"}
            </DialogTitle>
            <DialogDescription className="text-left text-zinc-500 text-sm mt-1">
              {step === 1 && "Select the category that best describes your business."}
              {step === 2 && "We need this to suggest the right license & contact you."}
              {step === 3 && "Tell us about the business you are registering."}
              {step === 4 && "Securely upload your KYC documents."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 bg-white">
          <div className="px-5 sm:px-8 py-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {businessTypes.map((type) => {
                      const isSelected = formik.values.businessActivity === type.id;
                      return (
                        <div
                          key={type.id}
                          onClick={() => {
                            formik.setFieldValue("businessActivity", type.id);
                            posthog.capture("business_type_selected", { business_type: type.id });
                            setTimeout(() => setStep(2), 200);
                          }}
                          className={`group cursor-pointer rounded-[14px] border-2 p-2 flex flex-col gap-2 transition-all duration-300 ${isSelected
                            ? "border-[#22c55e] bg-[#22c55e]/5 shadow-[0_4px_15px_rgba(34,197,94,0.15)] scale-[0.98]"
                            : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm"
                            }`}
                        >
                          <div className="overflow-hidden rounded-[8px] bg-zinc-100 aspect-video flex items-center justify-center relative w-full h-full">
                            <Image src={type.image} alt={type.label} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                          </div>
                          <span className={`text-[13px] font-bold text-center px-1 pb-1 ${isSelected ? 'text-[#22c55e]' : 'text-zinc-700 group-hover:text-zinc-900'}`}>
                            {type.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <FieldError touched={formik.touched.businessActivity} error={formik.errors.businessActivity} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>

                  <div className="h-px w-full bg-zinc-100" />

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-zinc-900">What is your Annual Turnover?</label>
                    <div className="flex flex-col gap-3">
                      {turnoverOptions.map((option) => {
                        const isSelected = formik.values.turnover === option.id;
                        return (
                          <div
                            key={option.id}
                            onClick={() => formik.setFieldValue("turnover", option.id)}
                            className={`group cursor-pointer relative overflow-hidden rounded-xl border-2 p-3.5 transition-all duration-300 ${isSelected
                              ? "border-[#22c55e] bg-[#22c55e]/5 shadow-sm"
                              : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
                              }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isSelected ? "border-[#22c55e] bg-[#22c55e]" : "border-zinc-300 bg-white"
                                }`}>
                                {isSelected && <Check className="h-3 w-3 text-white" />}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h4 className={`font-semibold ${isSelected ? "text-[#22c55e]" : "text-zinc-900"}`}>
                                    {option.label}
                                  </h4>
                                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                                    {option.suggest}
                                  </span>
                                </div>
                                <p className="text-xs text-zinc-500">{option.desc}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <FieldError touched={formik.touched.turnover} error={formik.errors.turnover} />
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-500 bg-zinc-50 py-2.5 rounded-lg border border-zinc-100 mt-2">
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    Your information is 100% encrypted & secure
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-zinc-900">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="h-12 pl-10 bg-zinc-50/50 border-zinc-200 focus-visible:bg-white focus-visible:ring-[#22c55e] rounded-xl text-sm"
                        />
                      </div>
                      <FieldError touched={formik.touched.email} error={formik.errors.email} />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-zinc-900">Business Name</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                          name="businessName"
                          placeholder="e.g. Magic Kitchen"
                          value={formik.values.businessName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="h-12 pl-10 bg-zinc-50/50 border-zinc-200 focus-visible:bg-white focus-visible:ring-[#22c55e] rounded-xl text-sm"
                        />
                      </div>
                      <FieldError touched={formik.touched.businessName} error={formik.errors.businessName} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-zinc-900">Complete Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                      <textarea
                        name="address"
                        placeholder="Shop No, Street, City, Pincode"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] min-h-[80px] pl-10 pt-3 resize-none"
                      />
                    </div>
                    <FieldError touched={formik.touched.address} error={formik.errors.address} />
                  </div>

                  {renderFileUploader(profilePic, setProfilePic, profileRef, "Shop/Profile Picture", ".jpg,.jpeg,.webp", true)}
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-3.5 flex gap-3 items-start shadow-sm">
                    <div className="bg-amber-100 text-amber-600 p-1.5 rounded-full shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="text-xs text-amber-900/90 leading-relaxed font-medium">
                      <strong className="text-amber-900 block mb-0.5">Privacy First</strong>
                      All uploaded documents are stored with bank-grade encryption and will be <strong className="text-amber-700">permanently deleted</strong> once your FSSAI registration is complete.
                    </div>
                  </div>

                  <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100 flex items-center justify-between mb-2 shadow-sm">
                    <span className="text-sm font-medium text-zinc-600">{plan?.title || "FSSAI License"}</span>
                    <span className="text-lg font-bold text-zinc-900">₹{plan?.price ?? 0}</span>
                  </div>

                  {renderFileUploader(aadharDoc, setAadharDoc, aadharRef, "Aadhaar Card")}
                  {renderFileUploader(panDoc, setPanDoc, panRef, "PAN Card")}

                  <div className="pt-2">
                    <div className="flex items-start space-x-2 bg-zinc-50/50 p-3 rounded-lg border border-zinc-100">
                      <Checkbox
                        id="agreedToPrivacy"
                        name="agreedToPrivacy"
                        checked={formik.values.agreedToPrivacy}
                        onCheckedChange={(checked) => formik.setFieldValue("agreedToPrivacy", checked)}
                        className="mt-0.5 data-[state=checked]:bg-[#22c55e] data-[state=checked]:border-[#22c55e]"
                      />
                      <label
                        htmlFor="agreedToPrivacy"
                        className="text-xs font-medium leading-tight text-zinc-600 cursor-pointer"
                      >
                        I agree to the <a href="#" className="text-[#22c55e] hover:underline">Privacy Policy</a> and consent to use my documents solely for FSSAI registration.
                      </label>
                    </div>
                    <FieldError touched={formik.touched.agreedToPrivacy} error={formik.errors.agreedToPrivacy} />
                  </div>

                  {uploadError && (
                    <p className="text-sm font-medium text-red-500 text-center bg-red-50 py-2 rounded-lg">{uploadError}</p>
                  )}

                  {registration.error && (
                    <p className="text-sm font-medium text-red-500 text-center bg-red-50 py-2 rounded-lg">
                      {registration.error.message || "Something went wrong. Please try again."}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="px-5 py-4 sm:px-8 sm:py-5 bg-zinc-50 shrink-0 border-t border-zinc-100 mt-auto">
          {step === 1 && (
            <Button type="button" onClick={handleNextStep1} className="h-12 w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
              Next Step
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}

          {step === 2 && (
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(1)} disabled={isSavingLead} className="h-12 px-5 rounded-xl border-zinc-200 text-zinc-700 hover:bg-white hover:text-[#22c55e] font-medium transition-colors bg-transparent flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button type="button" onClick={handleNextStep2} disabled={isSavingLead} className="h-12 flex-1 bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                {isSavingLead ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(2)} className="h-12 px-5 rounded-xl border-zinc-200 text-zinc-700 hover:bg-white hover:text-[#22c55e] font-medium transition-colors bg-transparent flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button type="button" onClick={handleNextStep3} className="h-12 flex-1 bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                Next Step
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(3)} disabled={isLoading || isUploading} className="h-12 px-5 rounded-xl border-zinc-200 text-zinc-700 hover:bg-white hover:text-[#22c55e] font-medium bg-transparent flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button type="button" onClick={formik.handleSubmit} disabled={isLoading || isUploading || !plan?._id} className="h-12 flex-1 bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
                {(isLoading || isUploading) ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isUploading ? "Uploading..." : "Processing..."}
                  </>
                ) : (
                  <>
                    Complete & Pay
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
