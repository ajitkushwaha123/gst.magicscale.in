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
      required: true,
    },
    turnover: {
      type: String,
      required: true,
    },
    planId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);
