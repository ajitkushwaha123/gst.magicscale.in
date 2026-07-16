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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h2 style="color: #111827; margin-top: 0;">New Payment Received! 💰</h2>
          <p style="color: #4b5563; font-size: 15px;">A new customer has successfully completed a payment.</p>
          
          <div style="margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <h3 style="color: #111827; font-size: 16px; margin-bottom: 12px;">Customer Details</h3>
            <p style="margin: 4px 0; color: #374151;"><strong>Name:</strong> ${registration.name}</p>
            <p style="margin: 4px 0; color: #374151;"><strong>Phone:</strong> ${registration.phone}</p>
            <p style="margin: 4px 0; color: #374151;"><strong>Email:</strong> ${registration.email || 'N/A'}</p>
            <p style="margin: 4px 0; color: #374151;"><strong>Business Name:</strong> ${registration.businessName || 'N/A'}</p>
            <p style="margin: 4px 0; color: #374151;"><strong>Amount Paid:</strong> <span style="color: #059669; font-weight: bold;">${formatCurrency(amountPaid)}</span></p>
          </div>
          
          <div style="margin-top: 24px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin" style="background: #2563eb; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; display: inline-block;">View in Admin Dashboard</a>
          </div>
        </div>
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
