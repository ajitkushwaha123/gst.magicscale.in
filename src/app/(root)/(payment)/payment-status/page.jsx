"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/general/states/loader";
import { useSearchParams, useRouter } from "next/navigation";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    let isMounted = true;
    const fetchStatus = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/payments/registration/${orderId}/status`,
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to get payment status");
        }
        const responseData = await response.json();
        
        if (isMounted) {
          setData(responseData);
          
          const status = responseData?.data?.payment_status;
          if (status === "SUCCESS") {
            router.replace(`payment-status/success?order_id=${orderId}`);
          } else if (status === "FAILED" || status === "ABANDONED") {
            router.replace(`payment-status/failed?order_id=${orderId}`);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStatus();

    return () => {
      isMounted = false;
    };
  }, [orderId, router]);

  if (!orderId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold text-gray-800">Invalid Link</h1>
        <p className="text-gray-600 mt-2">
          Missing Order ID in the URL parameter.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <Loader title="Verifying your payment status..." />;
  }

  if (error) {
    const errorMessage = error.message || "Something went wrong.";

    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold text-gray-800">Verification Error</h1>
        <p className="text-gray-600 mt-2">{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Retry Check
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Loader title="Processing payment" />
      <p className="text-gray-600 mt-2">
        Current Status:{" "}
        <span className="font-semibold text-amber-600">
          {data?.data?.payment_status}
        </span>
      </p>
      <p className="text-sm text-gray-400 mt-1">
        We are waiting for final confirmation from the gateway.
      </p>
    </div>
  );
}

export default function PaymentStatusPage() {
  return <PaymentStatusContent />;
}
