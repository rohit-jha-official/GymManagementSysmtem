import express from "express";
import {
  getNotificationStats,
  getExpiryNotifications,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(protect);
router.get("/stats", getNotificationStats);
router.get("/expiry", getExpiryNotifications);
router.patch("/mark-read", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;
