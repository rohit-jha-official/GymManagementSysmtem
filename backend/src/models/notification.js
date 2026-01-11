import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["expiry"],
      required: true,
    },

    subtype: {
      type: String,
      enum: ["expiring", "expired"],
      required: true,
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
    branchId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Branch",
  required: true,
},

  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
