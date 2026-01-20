import mongoose from "mongoose";

const admissionChargeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdmissionCharge", admissionChargeSchema);
