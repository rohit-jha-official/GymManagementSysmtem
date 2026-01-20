import express from "express";
import {
  getAdmissionCharge,
  saveAdmissionCharge
} from "../controllers/admissionChargeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET admission charge
router.get("/admission-charge", protect, getAdmissionCharge);

// SAVE admission charge
router.post("/admission-charge", protect, saveAdmissionCharge);

export default router;
