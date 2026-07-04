import { Registration } from "@/models/Registration";
import dbConnect from "@/lib/db-connect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required",
        },
        { status: 400 },
      );
    }

    const registration = await Registration.findOne({
      orderId,
    }).lean();

    if (!registration) {
      return NextResponse.json(
        {
          success: false,
          message: "Registration not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        payment_status: registration?.paymentStatus,
      },
    });
  } catch (error) {
    console.error("Get Registration Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
