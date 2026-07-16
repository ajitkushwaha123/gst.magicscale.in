import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import { Lead } from "@/models/Lead";
import { Registration } from "@/models/Registration";

export async function POST(req) {
  try {
    const adminToken = req.cookies.get("admin_token")?.value;
    if (adminToken !== "authenticated") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { id, type, status } = await req.json();

    if (!id || !type || !status) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const validStatuses = ["NEW", "CALLBACK", "CALL_DONE", "CONVERTED", "NOT_INTERESTED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    let updatedDoc = null;
    if (type === "lead") {
      updatedDoc = await Lead.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
    } else if (type === "registration") {
      updatedDoc = await Registration.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
    } else {
      return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
    }

    if (!updatedDoc) {
      return NextResponse.json({ success: false, message: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Status updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Status Update Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update status" },
      { status: 500 }
    );
  }
}
