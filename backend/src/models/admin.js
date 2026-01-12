import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Gym Owner"
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    phone: {
      type: String,
      default: ""
    },

    gymName: {
      type: String,
      default: ""
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      default: "admin"
    },

    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      default: null
    },

    // 🔐 FORGOT PASSWORD FIELDS
    resetToken: String,
    resetTokenExpiry: Date
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
