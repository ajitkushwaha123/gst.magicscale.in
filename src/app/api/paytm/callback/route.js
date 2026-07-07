import { NextResponse } from "next/server";
import { verifyPaytmSignature } from "@/lib/paytm";
import dbConnect from "@/lib/db-connect";
import { Registration } from "@/models/Registration";
import { getPostHogClient } from "@/lib/posthog-server";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let bodyObj = {};

    if (contentType.includes("application/json")) {
      bodyObj = await req.json();
    } else {
      const textBody = await req.text();
      const searchParams = new URLSearchParams(textBody);
      searchParams.forEach((value, key) => {
        bodyObj[key] = value;
      });
    }

    const paytmChecksum = bodyObj.CHECKSUMHASH;
    delete bodyObj.CHECKSUMHASH;

    const isVerifySignature = verifyPaytmSignature(bodyObj, paytmChecksum);

    if (!isVerifySignature) {
      console.error("Paytm Checksum Mismatch", bodyObj);
      return NextResponse.json(
        { success: false, message: "Checksum mismatch" },
        { status: 400 }
      );
    }

    await dbConnect();

    const orderId = bodyObj.ORDERID;
    const status = bodyObj.STATUS;

    const registration = await Registration.findOne({ orderId: orderId });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const posthog = getPostHogClient();

    if (status === "TXN_SUCCESS") {
      await Registration.updateOne({ orderId }, { $set: { paymentStatus: "SUCCESS" } });

      posthog.capture({
        distinctId: registration.phone,
        event: "payment_completed",
        properties: {
          plan_id: registration.planId,
          amount: registration.amount,
          order_id: orderId,
          registration_id: registration._id.toString(),
        },
      });
    } else {
      await Registration.updateOne({ orderId }, { $set: { paymentStatus: "FAILED" } });

      posthog.capture({
        distinctId: registration.phone,
        event: "payment_failed",
        properties: {
          plan_id: registration.planId,
          amount: registration.amount,
          order_id: orderId,
          registration_id: registration._id.toString(),
          reason: bodyObj.RESPMSG || "Payment failed",
        },
      });
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === "production" ? "https://fssai.magicscale.in" : "http://localhost:3000");
    const redirectUrl = new URL(`/payment-status?order_id=${orderId}`, baseUrl);
    
    return NextResponse.redirect(redirectUrl, 303);
  } catch (error) {
    console.error("Paytm Callback Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
