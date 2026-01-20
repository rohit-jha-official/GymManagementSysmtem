import express from "express";
import {
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,

} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Load admin profile (if you use it somewhere) */
router.get("/profile", protect, getAdminProfile);

/* 🔥 THIS IS THE IMPORTANT FIX */
router.put("/update", protect, updateAdminProfile);

/* Change password – DO NOT TOUCH (already working) */
router.put("/change-password", protect, changeAdminPassword);




export default router;
