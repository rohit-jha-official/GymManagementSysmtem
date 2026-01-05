import mongoose from "mongoose";

const membershipPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Monthly, Quarterly
    durationMonths: { type: Number, required: true }, // 1,3,6,12
    price: { type: Number, required: true },
    features: [String],
    isPopular: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("MembershipPlan", membershipPlanSchema);
