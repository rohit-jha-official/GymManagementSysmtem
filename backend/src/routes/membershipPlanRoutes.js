import express from "express";
import {
  getPlans,
  updatePlan,
} from "../controllers/membershipPlanController.js";

const router = express.Router();

router.get("/", getPlans);
router.put("/:id", updatePlan);

export default router;
