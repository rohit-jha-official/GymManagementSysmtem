import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  durationDays: {
    type: Number,
    required: true
  },
  features: {
    type: [String],
    default: []
  }
});

export default mongoose.model("Plan", planSchema);
