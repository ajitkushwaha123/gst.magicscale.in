import mongoose, { Schema } from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: String,
    address: String,
    businessName: String,
    businessActivity: String,
    turnover: String,
    profilePicUrl: String,
    aadharUrl: String,
    panUrl: String,
    agreedToPrivacy: {
      type: Boolean,
      default: false
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "CREATED", "ABANDONED", "DROPPED", "FAILED", "SUCCESS"],
      default: "PENDING",
    },

    planId: {
      type: String,
      required: true,
    },

    orderId: String,
    tickedId: String,
    amount: Number,
  },
  {
    timestamps: true,
  },
);

export const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
