import express from "express";
import {
  getAdmissionCharge,
  saveAdmissionCharge,
} from "../controllers/admissionChargeController.js";

const router = express.Router();

router.get("/admission-charge", getAdmissionCharge);
router.post("/admission-charge", saveAdmissionCharge);

export default router;
