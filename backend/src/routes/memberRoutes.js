import express from "express";
import {
  addMember,
  getAllMembers,
  getMemberById,      // ✅ REQUIRED
  getExpiredMembers,
  getExpiringSoon,
  renewMember,
  deleteMember,
} from "../controllers/memberController.js";

const router = express.Router();

/**
 * ➕ ADD NEW MEMBER
 * POST /api/members
 */
router.post("/", addMember);

/**
 * 📋 GET ALL MEMBERS
 * GET /api/members
 */
router.get("/", getAllMembers);

/**
 * 👤 GET SINGLE MEMBER BY ID
 * GET /api/members/:id
 */
router.get("/:id", getMemberById);

/**
 * ❌ GET EXPIRED MEMBERS
 * GET /api/members/expired
 */
router.get("/expired", getExpiredMembers);

/**
 * ⏳ GET EXPIRING SOON
 * GET /api/members/expiring
 */
router.get("/expiring", getExpiringSoon);

/**
 * 🔄 RENEW MEMBERSHIP
 * PUT /api/members/renew/:id
 */
router.put("/renew/:id", renewMember);

/**
 * 🗑️ DELETE MEMBER
 * DELETE /api/members/:id
 */
router.delete("/:id", deleteMember);

export default router;
