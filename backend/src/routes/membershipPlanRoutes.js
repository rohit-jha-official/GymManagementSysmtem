import express from "express";
import {
  getPlans,
  createPlan,
  updatePlan,
} from "../controllers/membershipPlanController.js";

const router = express.Router();

/* ✅ GET ALL MEMBERSHIP PLANS */
router.get("/", getPlans);

/* ➕ CREATE PLAN */
router.post("/", createPlan);

/* ✏️ UPDATE PLAN */
router.put("/:id", updatePlan);

export default router;
