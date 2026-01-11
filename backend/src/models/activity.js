import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["checkin", "member", "payment", "expiry","admin"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    branchId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Branch",
  required: true,
},

  },
  { timestamps: true }
);

export default mongoose.models.Activity ||
  mongoose.model("Activity", activitySchema);
