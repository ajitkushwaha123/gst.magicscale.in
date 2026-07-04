import { Lead } from "@/models/Lead";
import dbConnect from "@/lib/db-connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, phone, businessActivity, turnover, planId } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name and Phone are required" },
        { status: 400 }
      );
    }

    // Upsert by phone to prevent spamming leads for the same user
    const lead = await Lead.findOneAndUpdate(
      { phone: phone.trim() },
      {
        name: name.trim(),
        businessActivity: businessActivity?.trim() || "",
        turnover: turnover?.trim() || "",
        planId: planId || null,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Lead saved successfully",
        data: { leadId: lead._id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
