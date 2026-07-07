import { PLANS } from "@/constants/plans";
import { Registration } from "@/models/Registration";
import dbConnect from "@/lib/db-connect";
import { NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";
import { initiatePaytmTransaction } from "@/lib/paytm";
import { uploadToS3 } from "@/lib/aws/s3";
import mime from "mime-types";

async function processFile(fileData, fieldName) {
  if (!fileData || !fileData.startsWith("data:")) return fileData;
  try {
    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return fileData;
    const type = matches[1];
    const buffer = Buffer.from(matches[2], "base64");
    const extension = mime.extension(type) || "jpg";
    const fileName = `${fieldName}-${Date.now()}.${extension}`;
    const result = await uploadToS3({
      file: buffer,
      fileName,
      folder: "fssai/documents"
    });
    return result.url;
  } catch (error) {
    console.error(`S3 Upload error for ${fieldName}:`, error);
    return fileData;
  }
}

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

    const processedProfilePicUrl = await processFile(profilePicUrl, "profilePic");
    const processedAadharUrl = await processFile(aadharUrl, "aadhar");
    const processedPanUrl = await processFile(panUrl, "pan");

    registration = await Registration.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || "",
      address: address?.trim() || "",
      businessName: businessName?.trim() || "",
      businessActivity: businessActivity?.trim() || "",
      agreedToPrivacy: agreedToPrivacy || false,
      profilePicUrl: processedProfilePicUrl || "",
      aadharUrl: processedAadharUrl || "",
      panUrl: processedPanUrl || "",
      planId: plan._id,
      amount: plan.price,
      paymentStatus: "PENDING",
    });

    const orderId = `ORDER_${Date.now()}`;

    registration.orderId = orderId;
    await registration.save();

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: phone,
      event: "registration_created",
      properties: {
        plan_id: plan._id,
        amount: plan.price,
        order_id: orderId,
        registration_id: registration._id.toString(),
      },
    });

    const paytmResponse = await initiatePaytmTransaction(
      orderId,
      plan.price,
      `CUST_${registration._id}`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Registration created successfully.",
        data: {
          registrationId: registration._id,
          orderId: orderId,
          txnToken: paytmResponse.txnToken,
          mid: paytmResponse.mid,
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
