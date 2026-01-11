import express from "express";
import {
  getDashboardStats,
  getMemberGrowth,
  getMonthlyGrowth
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(protect);
/* 📊 DASHBOARD STATS */
router.get("/stats", getDashboardStats);

/* 📈 MEMBER GROWTH */
router.get("/member-growth", getMemberGrowth);
router.get("/member-growth/month", getMonthlyGrowth);
export default router;
