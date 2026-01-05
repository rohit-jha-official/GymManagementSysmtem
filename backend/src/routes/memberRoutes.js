import express from "express";
import {
  addMember,
  getAllMembers,
  getExpiredMembers,
  getExpiringSoon,
  renewMembership,
  deleteMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/", addMember);
router.get("/", getAllMembers);
router.get("/expired", getExpiredMembers);
router.get("/expiring", getExpiringSoon);
router.delete("/:id", deleteMember);
router.post("/renew/:id", renewMembership);

export default router;

