import express from "express";
import {
  getPlans,
  updatePlan,
} from "../controllers/membershipPlanController.js";
import{protect} from "../middleware/authMiddleware.js"
const router = express.Router();
router.use(protect);
/* ✅ GET ALL MEMBERSHIP PLANS */
router.get("/", getPlans);



/* ✏️ UPDATE PLAN */
router.put("/:id", updatePlan);

export default router;
