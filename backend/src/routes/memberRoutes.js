import express from "express";
import {
  addMember,
  getAllMembers,
  getExpiredMembers,
  getExpiringSoon,
  renewMember,
  deleteMember,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/", addMember);
router.get("/", getAllMembers);
router.get("/expired", getExpiredMembers);
router.get("/expiring", getExpiringSoon);
router.put("/renew/:id", renewMember);
router.delete("/:id", deleteMember);
export default router;

