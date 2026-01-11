import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },

    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone must be exactly 10 digits"],
    },

    email: String,
    gender: String,
    dob: String,
    address: String,

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MembershipPlan",
      required: true,
    },

    paidAmount: { type: Number, default: 0 },
    dueAmount: { type: Number, default: 0 },

    isRenewed: { type: Boolean, default: false },

    rfid: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },

    photo: String,
  },
  { timestamps: true }
);

export default mongoose.models.Member ||
  mongoose.model("Member", memberSchema);
