import express from "express";
import {
  getNotificationStats,
  getExpiryNotifications,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/stats", getNotificationStats);
router.get("/expiry", getExpiryNotifications);
router.patch("/mark-read", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;
