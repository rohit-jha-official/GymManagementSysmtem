import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    plan: String,
    rfid: String,
    status: { type: String, default: "Active" }
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
