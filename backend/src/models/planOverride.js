import mongoose from "mongoose";

const planOverrideSchema = new mongoose.Schema({
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  },
  price: { type: Number, required: true },
  isPopular: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false }
});

export default mongoose.model("PlanOverride", planOverrideSchema);
