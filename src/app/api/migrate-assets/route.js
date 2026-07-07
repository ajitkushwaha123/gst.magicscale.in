import { NextResponse } from "next/server";
import { Registration } from "@/models/Registration";
import dbConnect from "@/lib/db-connect";
import { uploadToS3 } from "@/lib/aws/s3";
import mime from "mime-types";

// Helper function to process and upload a base64 string
async function processFile(fileData, fieldName) {
  if (!fileData || !fileData.startsWith("data:")) return null; // Only process base64 data strings
  
  try {
    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return null;
    
    const type = matches[1];
    const buffer = Buffer.from(matches[2], "base64");
    const extension = mime.extension(type) || "jpg";
    const fileName = `${fieldName}-migrated-${Date.now()}.${extension}`;
    
    const result = await uploadToS3({
      file: buffer,
      fileName,
      folder: "fssai/documents"
    });
    
    return result.url;
  } catch (error) {
    console.error(`S3 Upload error during migration for ${fieldName}:`, error);
    return null;
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    
    // Find all registrations that have a base64 string in any of the URL fields
    const registrations = await Registration.find({
      $or: [
        { profilePicUrl: { $regex: /^data:/ } },
        { aadharUrl: { $regex: /^data:/ } },
        { panUrl: { $regex: /^data:/ } }
      ]
    });
    
    let migratedCount = 0;
    
    // Process each registration sequentially to prevent overwhelming S3 or the database
    for (const reg of registrations) {
      let updated = false;
      
      const newProfilePicUrl = await processFile(reg.profilePicUrl, "profilePic");
      if (newProfilePicUrl) {
        reg.profilePicUrl = newProfilePicUrl;
        updated = true;
      }
      
      const newAadharUrl = await processFile(reg.aadharUrl, "aadhar");
      if (newAadharUrl) {
        reg.aadharUrl = newAadharUrl;
        updated = true;
      }
      
      const newPanUrl = await processFile(reg.panUrl, "pan");
      if (newPanUrl) {
        reg.panUrl = newPanUrl;
        updated = true;
      }
      
      if (updated) {
        await reg.save();
        migratedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${migratedCount} registrations out of ${registrations.length} found needing migration.`,
      migratedCount,
      totalFound: registrations.length
    });
  } catch (error) {
    console.error("Migration Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
