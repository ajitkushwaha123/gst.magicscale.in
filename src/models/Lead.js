import mongoose, { Schema } from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    businessActivity: {
      type: String,
      required: false,
    },
    turnover: {
      type: String,
      required: false,
    },
    planId: {
      type: String,
    },
    remarks: {
      type: String,
      required: false,
    },
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

export const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);
