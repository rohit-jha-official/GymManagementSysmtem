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

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    // CURRENT SNAPSHOT (for UI)
    paidAmount: { type: Number, default: 0 },
    dueAmount: { type: Number, default: 0 },
    lastPaymentDate: { type: Date },
    isRenewed: { type: Boolean, default: false },

    // 🔥 FULL PAYMENT HISTORY (for revenue)
    payments: [
      {
        planId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plan",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          enum: ["new", "renewal", "due"],
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    rfid: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },

    photo: String,

    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Member ||
  mongoose.model("Member", memberSchema);
