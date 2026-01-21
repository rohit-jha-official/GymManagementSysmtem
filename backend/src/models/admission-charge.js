import mongoose from "mongoose";

const admissionChargeSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdmissionCharge", admissionChargeSchema);
