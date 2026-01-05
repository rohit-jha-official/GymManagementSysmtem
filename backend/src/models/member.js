import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    gender: String,
    dob: Date,
    address: String,

    plan: {
      type: String,
      enum: ["Monthly", "Quarterly", "Half Yearly", "Yearly"],
      required: true,
    },

    rfid: { type: String, unique: true },

    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
