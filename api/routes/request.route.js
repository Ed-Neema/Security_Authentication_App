import express from "express";
import { createComment, createRequest, getAllRequests, getAllRequestsAdmin, getAllRequestsFacilitators, getRequestWithId } from "../controllers/request.controller.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, createRequest);
router.get("/requests", verifyToken, getAllRequests);//get request for a facilitator and student
router.get("/requests/facilitator", verifyToken, getAllRequestsFacilitators);//get request for a facilitator and student
router.get("/admin/requests", verifyAdmin, getAllRequestsAdmin);//get request for a facilitator and student
router.get("/requests/:id", verifyToken, getRequestWithId);//get  single
router.post("/create-comment", verifyToken, createComment);

export default router;