"use client";
import * as Yup from "yup";
import posthog from "posthog-js";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRegistration } from "@/hooks/useRegistration";
import { useAppConfigStore } from "@/stores/app-config.store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Phone, Loader2, CheckCircle2, Lock, Mail, MapPin, Building, Map, ChevronRight, ChevronLeft } from "lucide-react";

const businessTypes = [
  { id: "food-cart", label: "Food Cart / Stall", image: "/assets/images/street-food-cart.webp" },
  { id: "restaurant", label: "Restaurant / Hotel", image: "/assets/images/restaurant-hotel.webp" },
  { id: "cloud-kitchen", label: "Cloud Kitchen", image: "/assets/images/cloud-kitchen.webp" },
  { id: "grocery-retail", label: "Grocery / Retail", image: "/assets/images/grocery-retail.webp" },
  { id: "manufacturing", label: "Manufacturing", image: "/assets/images/manufacturing.webp" },
  { id: "other", label: "Other Business", image: "/assets/images/other-business.webp" },
];

const validationSchemas = [
  Yup.object({
    businessType: Yup.string().required("Please select a business type"),
  }),

  Yup.object({
    name: Yup.string().trim().required("Name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit number")
      .required("WhatsApp number is required"),
  }),

  Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    pincode: Yup.string().matches(/^\d{6}$/, "Valid 6-digit pincode required").required("Pincode is required"),
    state: Yup.string().trim().required("State is required"),
    city: Yup.string().trim().required("City is required"),
    addressLine: Yup.string().trim().required("Flat/House/Street is required"),
  }),

  Yup.object({
    profilePicUrl: Yup.string().required("Profile picture is required"),
    aadharUrl: Yup.string().required("Aadhar card is required"),
    panUrl: Yup.string().required("PAN card is required"),
  }),
];

const FormObserver = ({ currentStep }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    localStorage.setItem("fssai_form_data", JSON.stringify({ step: currentStep, values }));
  }, [values, currentStep]);
  return null;
};

const PincodeLookup = () => {
  const { values, setFieldValue } = useFormikContext();
  useEffect(() => {
    if (values.pincode && values.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${values.pincode}`)
        .then(res => res.json())
        .then(data => {
          if (data && data[0] && data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            if (postOffice) {
              setFieldValue("city", postOffice.District || postOffice.Region || "");
              setFieldValue("state", postOffice.State || "");
            }
          }
        })
        .catch(err => console.error(err));
    }
  }, [values.pincode, setFieldValue]);
  return null;
};

const FieldError = ({ touched, error }) => {
  if (!touched || !error) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs font-medium text-red-500 mt-1.5 px-1"
    >
      {error}
    </motion.p>
  );
};

export default function ReserveSeatDialog({ open, onOpenChange }) {
  const plan = useAppConfigStore((state) => state.plan);
  const { registration } = useRegistration();
  const getSavedData = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fssai_form_data");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return null;
  };

  const savedData = getSavedData();

  const [currentStep, setCurrentStep] = useState(savedData?.step || 0);
  const [direction, setDirection] = useState(1);
  const [isCapturingLead, setIsCapturingLead] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Removed resetting currentStep to 0 when modal closes to allow resuming progress

  useEffect(() => {
    const handlePaytmOpened = () => {
      onOpenChange(false);
    };
    window.addEventListener("paytm-opened", handlePaytmOpened);
    return () => window.removeEventListener("paytm-opened", handlePaytmOpened);
  }, [onOpenChange]);

  const handleNextStep = async (values, setTouched, validateForm) => {
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      setTouched(Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    if (currentStep === 1) {
      setIsCapturingLead(true);
      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name.trim(),
            phone: values.phone.trim(),
            businessActivity: values.businessType,
            planId: plan?._id
          }),
        });

        posthog.capture("lead_captured", { plan_id: plan?._id });
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", { content_name: "FSSAI Application" });
        }
      } catch (error) {
        console.error("Failed to save lead", error);
      } finally {
        setIsCapturingLead(false);
      }
    }

    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const handleFileUpload = async (e, fieldName, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const uploadPromise = fetch("/api/upload", {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload file");
      }
      setFieldValue(fieldName, data.url);
      return data;
    });

    toast.promise(uploadPromise, {
      loading: "Uploading document...",
      success: "Document uploaded successfully!",
      error: (err) => err.message || "Failed to upload document.",
    });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
    })
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!registration.isPending) onOpenChange(val); }}>
      <DialogContent className="z-[100] border-0 p-0 w-[95vw] max-w-[480px] bg-white rounded-[24px] shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">

        <div className="px-6 pt-8 pb-5 sm:px-8 bg-white border-b border-zinc-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative z-10">
          <DialogHeader>
            <DialogTitle className="text-left text-2xl font-extrabold text-zinc-900 tracking-tight">
              {currentStep === 0 && "Let's get started"}
              {currentStep === 1 && "Personal Details"}
              {currentStep === 2 && "Contact Information"}
              {currentStep === 3 && "Required Documents"}
            </DialogTitle>
            <DialogDescription className="text-left text-zinc-500 text-sm mt-1.5 font-medium leading-relaxed">
              {currentStep === 0 && "Select your business type."}
              {currentStep === 1 && "Enter your name and WhatsApp number."}
              {currentStep === 2 && "Where should we send your official FSSAI certificate?"}
              {currentStep === 3 && "Upload clear photos of your documents to verify identity."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <Formik
          initialValues={{
            businessType: savedData?.values?.businessType || "",
            name: savedData?.values?.name || "",
            phone: savedData?.values?.phone || "",
            email: savedData?.values?.email || "",
            pincode: savedData?.values?.pincode || "",
            state: savedData?.values?.state || "",
            city: savedData?.values?.city || "",
            addressLine: savedData?.values?.addressLine || "",
            profilePicUrl: savedData?.values?.profilePicUrl || "",
            aadharUrl: savedData?.values?.aadharUrl || "",
            panUrl: savedData?.values?.panUrl || "",
          }}
          validationSchema={validationSchemas[currentStep]}
          onSubmit={async (values) => {
            if (currentStep !== 3) return;
            if (!plan?._id) return;

            try {
              setIsRedirecting(true);

              // Fire Checkout events
              const advanceAmount = plan.advancePrice || 100;
              posthog.capture("checkout_initiated", { plan_id: plan._id, amount: advanceAmount, total_amount: plan.price });
              if (typeof window !== "undefined" && window.fbq) {
                window.fbq("track", "InitiateCheckout", { value: parseFloat(advanceAmount), currency: "INR" });
              }

              await registration.mutateAsync({
                name: values.name.trim(),
                phone: values.phone.trim(),
                email: values.email.trim(),
                address: `${values.addressLine.trim()}, ${values.city.trim()}, ${values.state.trim()} - ${values.pincode}`,
                businessName: values.businessType,
                profilePicUrl: values.profilePicUrl,
                aadharUrl: values.aadharUrl,
                panUrl: values.panUrl,
                planId: plan._id,
              });

              toast.success("Details securely submitted! Redirecting to payment...");
              localStorage.removeItem("fssai_form_data");
              // We intentionally do NOT close the modal here. We wait for the Paytm popup to open over it.
            } catch (error) {
              setIsRedirecting(false);
              console.error("Registration failed:", error);
              toast.error("Something went wrong. Please try again.");
            }
          }}
        >
          {({ values, errors, touched, setFieldValue, handleChange, handleBlur, setTouched, validateForm }) => (
            <Form className="flex flex-col bg-white overflow-hidden">
              <FormObserver currentStep={currentStep} />
              <PincodeLookup />
              <div className="overflow-x-hidden overflow-y-auto px-6 py-6 sm:px-8 relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >

                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">What describes your business?</label>
                          <div className="grid grid-cols-2 gap-3">
                            {businessTypes.map((type) => {
                              const isSelected = values.businessType === type.id;
                              return (
                                <button
                                  type="button"
                                  key={type.id}
                                  onClick={() => setFieldValue("businessType", type.id)}
                                  className={`group relative flex flex-col items-center justify-center p-0 rounded-2xl border-2 transition-all overflow-hidden h-[110px] ${isSelected
                                    ? "border-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.2)]"
                                    : "border-zinc-200 bg-white hover:border-emerald-300"
                                    }`}
                                >
                                  {isSelected && (
                                    <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center z-20 shadow-sm">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                    </div>
                                  )}
                                  <div className="absolute inset-0 w-full h-full z-0">
                                    <img src={type.image} alt={type.label} className="w-full h-full object-cover" />
                                    <div className={`absolute inset-0 transition-colors bg-gradient-to-t from-black/80 via-black/20 to-transparent ${isSelected ? "bg-emerald-900/60" : "group-hover:bg-black/10"}`} />
                                  </div>
                                  <span className={`absolute bottom-2 left-0 w-full z-10 text-[12px] font-bold text-white text-center px-1 drop-shadow-lg`}>
                                    {type.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <FieldError touched={touched.businessType} error={errors.businessType} />
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">

                        <div className="space-y-2">
                          <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">Full Name</label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <Field
                              name="name"
                              placeholder="e.g. Rahul Sharma"
                              className="w-full h-[52px] pl-12 pr-4 bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-base font-medium transition-all outline-none"
                            />
                          </div>
                          <FieldError touched={touched.name} error={errors.name} />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">WhatsApp Number</label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <Field
                              name="phone"
                              type="tel"
                              maxLength={10}
                              placeholder="9876543210"
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setFieldValue("phone", val);
                              }}
                              className="w-full h-[52px] pl-12 pr-4 bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-base font-medium transition-all outline-none"
                            />
                          </div>
                          <FieldError touched={touched.phone} error={errors.phone} />
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">Email Address</label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <Field
                              name="email"
                              type="email"
                              placeholder="rahul@example.com"
                              className="w-full h-[52px] pl-12 pr-4 bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-base font-medium transition-all outline-none"
                            />
                          </div>
                          <FieldError touched={touched.email} error={errors.email} />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">Pincode</label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <MapPin className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <Field
                              name="pincode"
                              maxLength={6}
                              placeholder="e.g. 400001"
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setFieldValue("pincode", val);
                              }}
                              className="w-full h-[52px] pl-12 pr-4 bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-base font-medium transition-all outline-none"
                            />
                          </div>
                          <FieldError touched={touched.pincode} error={errors.pincode} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">City</label>
                            <div className="relative group">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Map className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                              </div>
                              <Field
                                name="city"
                                placeholder="City"
                                className="w-full h-[52px] pl-12 pr-4 bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-base font-medium transition-all outline-none"
                              />
                            </div>
                            <FieldError touched={touched.city} error={errors.city} />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">State</label>
                            <div className="relative group">
                              <Field
                                name="state"
                                placeholder="State"
                                className="w-full h-[52px] px-4 bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-base font-medium transition-all outline-none"
                              />
                            </div>
                            <FieldError touched={touched.state} error={errors.state} />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">Flat, House no., Building</label>
                          <div className="relative group">
                            <div className="absolute top-3.5 left-0 pl-4 pointer-events-none">
                              <Building className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <textarea
                              name="addressLine"
                              value={values.addressLine}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Flat, Building, Street, Area"
                              rows={2}
                              className="w-full py-3.5 pl-12 pr-4 bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-xl text-base font-medium transition-all outline-none resize-none"
                            />
                          </div>
                          <FieldError touched={touched.addressLine} error={errors.addressLine} />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-5">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3 mb-2">
                          <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-emerald-800 font-medium">Your documents are encrypted and only used for your official FSSAI registration.</p>
                        </div>

                        {[
                          { id: "profilePicUrl", label: "Applicant Passport Photo", desc: "Clear photo with white background", asset: "/assets/images/passport-photo.webp" },
                          { id: "aadharUrl", label: "Aadhar Card", desc: "Front & Back in a single image/PDF", asset: "/assets/images/aadhaar-card.webp" },
                          { id: "panUrl", label: "PAN Card", desc: "Clear image of your PAN card", asset: "/assets/images/pan-card.webp" },
                        ].map((doc) => {
                          const fileData = values[doc.id];
                          const isImage = fileData && (fileData.startsWith("data:image/") || fileData.match(/\.(jpeg|jpg|gif|png|webp)($|\?)/i) || (fileData.startsWith("http") && !fileData.match(/\.pdf($|\?)/i)));
                          const isPdf = fileData && (fileData.startsWith("data:application/pdf") || fileData.match(/\.pdf($|\?)/i));

                          return (
                            <div key={doc.id} className="space-y-1.5">
                              <label className="text-[13px] font-bold tracking-wide text-zinc-800 uppercase">{doc.label}</label>
                              <p className="text-xs text-zinc-500 font-medium mb-2">{doc.desc}</p>
                              <label className="relative flex items-center justify-between p-4 border-2 border-dashed border-zinc-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer group">
                                <div className="flex items-center gap-3 overflow-hidden">
                                  {isImage ? (
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-zinc-200 shadow-sm flex-shrink-0">
                                      <img src={fileData} alt={doc.label} className="w-full h-full object-cover" />
                                    </div>
                                  ) : (
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-zinc-50 border border-zinc-200 overflow-hidden group-hover:bg-emerald-100 group-hover:border-emerald-200 transition-colors">
                                      <img src={doc.asset} alt="icon" className="w-8 h-8 object-contain drop-shadow-sm" />
                                    </div>
                                  )}
                                  <span className={`text-sm font-semibold truncate max-w-[200px] sm:max-w-[250px] ${fileData ? "text-emerald-700" : "text-zinc-600"}`}>
                                    {fileData ? (isImage ? "Image Attached" : "Document Attached") : "Click to browse file..."}
                                  </span>
                                </div>
                                <input
                                  type="file"
                                  accept="image/*,application/pdf"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={(e) => handleFileUpload(e, doc.id, setFieldValue)}
                                />
                              </label>
                              <FieldError touched={touched[doc.id]} error={errors[doc.id]} />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="px-6 py-5 sm:px-8 bg-white border-t border-zinc-100 flex items-center gap-3">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={registration.isPending || isCapturingLead}
                    className="h-14 w-14 p-0 rounded-xl border-2 border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors shrink-0"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={() => handleNextStep(values, setTouched, validateForm)}
                    disabled={isCapturingLead}
                    className="h-14 flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98]"
                  >
                    {isCapturingLead ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
                    {!isCapturingLead && <ChevronRight className="w-5 h-5" />}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={registration.isPending || isRedirecting}
                    className="h-14 flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98]"
                  >
                    {registration.isPending || isRedirecting ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <>
                        Submit <Lock className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
