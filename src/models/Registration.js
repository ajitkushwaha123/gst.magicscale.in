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
    totalAmount: Number,
    advanceAmount: Number,
    remarks: String,
    status: {
      type: String,
      enum: ["NEW", "CALLBACK", "CALL_DONE", "CONVERTED", "NOT_INTERESTED"],
      default: "NEW"
    },
    waMessaged: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

export const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
