import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/aws/s3";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded." },
        { status: 400 }
      );
    }

    const result = await uploadToS3({
      file,
      folder: "fssai/documents",
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        url: result.url,
      });
    } else {
      throw new Error("S3 Upload failed");
    }
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to upload file.",
      },
      { status: 500 }
    );
  }
}
