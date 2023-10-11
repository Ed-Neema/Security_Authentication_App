import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { getAdmins, getFacilitators } from "../controllers/users.controller.js";
const router = express.Router();


router.get("/facilitators", verifyToken, getFacilitators);
router.get("/admins", verifyToken, getAdmins);

export default router;