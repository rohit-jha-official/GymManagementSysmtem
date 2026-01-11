import express from "express";
import {
  getRecentActivity,
  deleteActivity,
} from "../controllers/activityController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(protect);
router.get("/recent", getRecentActivity);
router.delete("/:id",deleteActivity);

export default router;
