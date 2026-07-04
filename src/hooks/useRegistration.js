"use client";

import { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { createRegistration } from "@/services/payment";

export const useRegistration = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutateAsync = async (payload) => {
    setIsPending(true);
    setError(null);
    
    try {
      const responseData = await createRegistration(payload);
      
      if (!responseData?.success) {
        throw new Error(responseData?.message || "Failed to create registration");
      }
      
      setData(responseData);

      const cashfree = await load({
        mode:
          process.env.NEXT_PUBLIC_CASHFREE_ENV === "production"
            ? "production"
            : "sandbox",
      });

      if (!cashfree) {
        throw new Error("Failed to initialize Cashfree");
      }

      await cashfree.checkout({
        paymentSessionId: responseData?.data?.paymentSessionId,
        redirectTarget: "_self",
      });
      
      return responseData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  return {
    registration: {
      mutateAsync,
      isPending,
      error,
      data,
    },
  };
};
