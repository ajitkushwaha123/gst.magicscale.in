import crypto from "crypto";
import dbConnect from "@/lib/db-connect";
import { NextResponse } from "next/server";
import { Registration } from "@/models/Registration";

const STATUS_PRIORITY = {
  CREATED: 0,
  ABANDONED: 1,
  DROPPED: 2,
  FAILED: 3,
  SUCCESS: 100,
};

async function updateRegistrationStatus({ orderId, status, paymentId }) {
  if (!orderId) return;

  const registration = await Registration.findOne({ orderId });
  if (!registration) {
    console.log(`[WEBHOOK] Registration not found: ${orderId}`);
    return;
  }

  const currentPriority = STATUS_PRIORITY[registration.paymentStatus] ?? 0;
  const nextPriority = STATUS_PRIORITY[status] ?? 0;

  if (currentPriority >= nextPriority) {
    console.log(
      `[WEBHOOK] Ignored status transition ${registration.paymentStatus} -> ${status} for ${orderId}`,
    );
    return;
  }

  registration.paymentStatus = status;
  if (paymentId) {
    registration.paymentId = paymentId;
  }

  if (status === "SUCCESS") {
    registration.paymentCompletedAt = new Date();
  }

  await registration.save();
  console.log(
    `[WEBHOOK] ${orderId} updated ${registration.paymentStatus} -> ${status}`,
  );
}

const handlers = {
  PAYMENT_SUCCESS_WEBHOOK: async (data) => {
    await updateRegistrationStatus({
      orderId: data?.order?.order_id,
      status: "SUCCESS",
      paymentId: data?.payment?.cf_payment_id,
    });
  },

  PAYMENT_FAILED_WEBHOOK: async (data) => {
    await updateRegistrationStatus({
      orderId: data?.order?.order_id,
      status: "FAILED",
    });
  },

  USER_DROPPED_WEBHOOK: async (data) => {
    await updateRegistrationStatus({
      orderId: data?.order?.order_id,
      status: "DROPPED",
    });
  },

  ABANDONED_CHECKOUT_WEBHOOK: async (data) => {
    await updateRegistrationStatus({
      orderId: data?.order?.order_id,
      status: "ABANDONED",
    });
  },

  PAYMENT_VERIFICATION_WEBHOOK: async (data) => {
    console.log("[WEBHOOK] Verification webhook received");
  },
};

function verifySignature({ rawBody, timestamp, signature, secret }) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}${rawBody}`)
    .digest("base64");

  try {
    const expectedBuffer = Buffer.from(expected);
    const signatureBuffer = Buffer.from(signature);

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  } catch (err) {
    console.error("[WEBHOOK] Signature comparison error:", err);
    return false;
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const rawBody = await req.text();
    const signature = req.headers.get("x-webhook-signature");
    const timestamp = req.headers.get("x-webhook-timestamp");

    if (!signature || !timestamp) {
      return NextResponse.json(
        { success: false, message: "Missing webhook headers" },
        { status: 401 },
      );
    }

    // const secret = process.env.CASHFREE_WEBHOOK_SECRET;
    const secret = process.env.CASHFREE_SECRET_KEY;
    if (!secret) {
      console.error(
        "Cashfree webhook secret missing in environment variables.",
      );
      return NextResponse.json(
        { success: false, message: "Webhook configuration error" },
        { status: 500 },
      );
    }

    const isValid = verifySignature({ rawBody, timestamp, signature, secret });
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 },
      );
    }

    const payload = JSON.parse(rawBody);
    const { type, data } = payload

    if (type === "WEBHOOK") {
      console.log("[WEBHOOK] Test webhook received successfully");
      return NextResponse.json({ success: true, message: "Test acknowledged" });
    }

    if (handlers[type]) {
      await handlers[type](data);
    } else {
      console.log(`[WEBHOOK] Unhandled webhook type: ${type}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cashfree Webhook Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
