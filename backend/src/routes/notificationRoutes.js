import express from "express";
import {
  getExpiryNotifications,
  getNotificationStats,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getExpiryNotifications);
router.get("/stats", protect, getNotificationStats);
router.put("/read-all", protect, markAllAsRead);
router.delete("/:id", protect, deleteNotification);

export default router;
