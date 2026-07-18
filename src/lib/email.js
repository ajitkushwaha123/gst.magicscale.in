import nodemailer from "nodemailer";
import { PLANS } from "@/constants/plans";
import dbConnect from "@/lib/db-connect";
import { AppConfig } from "@/models/AppConfig";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export async function sendPaymentSuccessEmails(lead, registration, paymentDetails) {
  try {
    const whatsappLink = PLANS["fssai-food-license"]?.whatsappSupportLink || "https://wa.me/918826073117";
    const amountPaid = paymentDetails?.amount || registration?.advanceAmount || 0;

    // 1. Send Email to Customer
    const customerHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
        <div style="background-color: #2563eb; padding: 32px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Payment Successful! 🎉</h1>
          <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 15px;">Your registration is confirmed</p>
        </div>
        
        <div style="padding: 32px 40px;">
          <p style="color: #334155; font-size: 16px; margin-top: 0;">Dear <strong style="color: #0f172a;">${registration.name}</strong>,</p>
          <p style="color: #475569; font-size: 15px; line-height: 1.6;">Thank you for choosing MagicScale! We have successfully received your payment of <strong style="color: #059669; font-size: 16px;">${formatCurrency(amountPaid)}</strong> for your FSSAI License Registration.</p>
          
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #e2e8f0;">
            <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 15px;">Transaction Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-size: 14px;">Business Name:</td>
                <td style="padding: 6px 0; color: #0f172a; font-size: 14px; text-align: right; font-weight: 600;">${registration.businessName || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-size: 14px;">Service:</td>
                <td style="padding: 6px 0; color: #0f172a; font-size: 14px; text-align: right; font-weight: 600;">FSSAI Registration</td>
              </tr>
            </table>
          </div>

          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">Our team will review your submitted documents and initiate the application process shortly. We will keep you updated on the progress.</p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${whatsappLink}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.2);">
              <span style="display: inline-block; vertical-align: middle;">💬 Contact Us on WhatsApp</span>
            </a>
          </div>
        </div>
        
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 13px; margin: 0;">Need help? Reply to this email or reach us on WhatsApp.</p>
          <p style="color: #94a3b8; font-size: 12px; margin: 8px 0 0 0;">© ${new Date().getFullYear()} MagicScale. All rights reserved.</p>
        </div>
      </div>
    `;

    // 2. Fetch Admin Emails from AppConfig DB
    await dbConnect();
    let adminEmails = ["mycodingprofiles@gmail.com"];

    try {
      const emailConfig = await AppConfig.findOne({ key: "adminEmails" });
      if (emailConfig && Array.isArray(emailConfig.value) && emailConfig.value.length > 0) {
        adminEmails = emailConfig.value;
      } else {
        // Seed the DB if the config doesn't exist yet
        await AppConfig.create({ key: "adminEmails", value: adminEmails });
      }
    } catch (dbErr) {
      console.error("Failed to fetch admin emails from AppConfig:", dbErr);
    }

    const adminHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 32px 24px; text-align: center;">
            <div style="background-color: rgba(255,255,255,0.2); width: 64px; height: 64px; border-radius: 50%; display: inline-block; margin-bottom: 16px; line-height: 64px; font-size: 32px;">💰</div>
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">New Payment Received</h1>
            <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">Action required in Admin Dashboard</p>
          </div>
          
          <div style="padding: 32px 32px 10px 32px;">
            <!-- Customer Details -->
            <h3 style="color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 16px;">Customer Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 15px; width: 40%;">Name</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${registration.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 15px; border-top: 1px solid #f1f5f9;">Phone</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right; border-top: 1px solid #f1f5f9;">
                  <a href="https://wa.me/91${registration.phone?.replace(/\\D/g, "")}" style="color: #2563eb; text-decoration: none;">${registration.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 15px; border-top: 1px solid #f1f5f9;">Email</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right; border-top: 1px solid #f1f5f9;">${registration.email || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 15px; border-top: 1px solid #f1f5f9;">Business Name</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right; border-top: 1px solid #f1f5f9;">${registration.businessName || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 15px; border-top: 1px solid #f1f5f9;">Business Type</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right; border-top: 1px solid #f1f5f9;">${registration.businessActivity || 'N/A'}</td>
              </tr>
            </table>

            <!-- Payment Details -->
            <h3 style="color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 16px;">Payment Information</h3>
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 32px; border: 1px dashed #cbd5e1;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 15px;">Status</td>
                  <td style="padding: 6px 0; text-align: right;">
                    <span style="background-color: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 1px solid #bbf7d0;">${registration.paymentStatus || 'SUCCESS'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 15px;">Advance Paid</td>
                  <td style="padding: 6px 0; color: #059669; font-size: 18px; font-weight: 800; text-align: right;">${formatCurrency(amountPaid)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 15px;">Total Plan Value</td>
                  <td style="padding: 6px 0; color: #0f172a; font-size: 15px; font-weight: 600; text-align: right;">${formatCurrency(registration.totalAmount || 0)}</td>
                </tr>
              </table>
            </div>

            <!-- Documents -->
            <h3 style="color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 16px;">Uploaded Documents</h3>
            <div style="margin-bottom: 32px;">
              ${registration.profilePicUrl ? '<a href="' + registration.profilePicUrl + '" style="display: inline-block; background-color: #eff6ff; color: #2563eb; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; border: 1px solid #bfdbfe; margin: 0 8px 8px 0;">🖼️ Photo</a>' : ''}
              ${registration.aadharUrl ? '<a href="' + registration.aadharUrl + '" style="display: inline-block; background-color: #eff6ff; color: #2563eb; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; border: 1px solid #bfdbfe; margin: 0 8px 8px 0;">📄 Aadhar</a>' : ''}
              ${registration.panUrl ? '<a href="' + registration.panUrl + '" style="display: inline-block; background-color: #eff6ff; color: #2563eb; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; border: 1px solid #bfdbfe; margin: 0 8px 8px 0;">💳 PAN</a>' : ''}
              ${(!registration.profilePicUrl && !registration.aadharUrl && !registration.panUrl) ? '<p style="color: #94a3b8; font-style: italic; font-size: 14px; margin: 0;">No documents uploaded.</p>' : ''}
            </div>

          </div>
          
          <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #f1f5f9;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin" style="background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">Open Admin Dashboard &rarr;</a>
          </div>
        </div>
        <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">This is an automated notification from MagicScale.</p>
      </div>
    `;

    const mailOptionsCustomer = {
      from: `"MagicScale" <${process.env.SMTP_USER}>`,
      to: registration.email,
      subject: "Payment Successful - MagicScale Registration",
      html: customerHtml,
    };

    const mailOptionsAdmin = {
      from: `"MagicScale Alerts" <${process.env.SMTP_USER}>`,
      to: adminEmails.join(", "),
      subject: `🚨 New Payment from ${registration.name}`,
      html: adminHtml,
    };

    // Send both emails concurrently if the user provided an email
    const promises = [transporter.sendMail(mailOptionsAdmin)];
    if (registration.email) {
      promises.push(transporter.sendMail(mailOptionsCustomer));
    }

    await Promise.allSettled(promises);
    return { success: true };
  } catch (error) {
    console.error("Error sending emails:", error);
    return { success: false, error };
  }
}
