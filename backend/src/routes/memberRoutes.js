import express from "express";
import { addMember, getMembers } from "../controllers/memberController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addMember);
router.get("/", protect, getMembers);

export default router;
