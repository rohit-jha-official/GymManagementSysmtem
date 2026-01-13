import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },

    // 🔹 ADD THIS LINE
    admissionCharge: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Branch", branchSchema);
