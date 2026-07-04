import { PLANS } from "@/constants/plans";
import { Registration } from "@/models/Registration";
import dbConnect from "@/lib/db-connect";
import { createCashfreeOrder } from "@/lib/cashfree";
import { NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

export async function POST(req) {
  let registration = null;

  try {
    await dbConnect();

    const body = await req.json();
    const { name, phone, email, address, businessName, businessActivity, agreedToPrivacy, profilePicUrl, aadharUrl, panUrl, planId } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your name.",
        },
        { status: 400 },
      );
    }

    if (!phone?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your phone number.",
        },
        { status: 400 },
      );
    }

    if (!planId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a plan.",
        },
        { status: 400 },
      );
    }

    const plan = PLANS[planId];

    if (!plan || !plan.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected plan is unavailable.",
        },
        { status: 404 },
      );
    }

    registration = await Registration.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || "",
      address: address?.trim() || "",
      businessName: businessName?.trim() || "",
      businessActivity: businessActivity?.trim() || "",
      agreedToPrivacy: agreedToPrivacy || false,
      profilePicUrl: profilePicUrl || "",
      aadharUrl: aadharUrl || "",
      panUrl: panUrl || "",
      planId: plan._id,
      amount: plan.price,
      paymentStatus: "PENDING",
    });

    const orderId = `ORDER_${Date.now()}`;

    const order = await createCashfreeOrder({
      orderId,
      amount: plan.price,
      currency: plan.currency || "INR",
      customerId: registration._id.toString(),
      customerName: name,
      customerPhone: phone,
      customerEmail: email || `${phone}@placeholder.com`,
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?order_id={order_id}`,
    });

    registration.orderId = order.order_id;
    registration.paymentSessionId = order.payment_session_id;
    await registration.save();

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: phone,
      event: "registration_created",
      properties: {
        plan_id: plan._id,
        amount: plan.price,
        order_id: order.order_id,
        registration_id: registration._id.toString(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration created successfully. Proceed to payment.",
        data: {
          registrationId: registration._id,
          orderId: order.order_id,
          paymentSessionId: order.payment_session_id,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create Order Error:", error);
    if (registration && !registration.orderId) {
      await Registration.findByIdAndDelete(registration._id);
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while creating your registration. Please try again.",
      },
      { status: 500 },
    );
  }
}
