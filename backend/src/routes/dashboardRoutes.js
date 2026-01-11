import express from "express";
import {
  getDashboardStats,
  getMemberGrowth,
  getMonthlyGrowth
} from "../controllers/dashboardController.js";

const router = express.Router();

/* 📊 DASHBOARD STATS */
router.get("/stats", getDashboardStats);

/* 📈 MEMBER GROWTH */
router.get("/member-growth", getMemberGrowth);
router.get("/member-growth/month", getMonthlyGrowth);
export default router;
