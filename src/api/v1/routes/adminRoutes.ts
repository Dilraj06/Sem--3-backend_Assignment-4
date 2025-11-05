import express from "express";
import { setCustomClaims } from "../controllers/adminController";
 
const router = express.Router();
 
// POST /api/v1/admin/setCustomClaims
router.post("/admin/setCustomClaims", setCustomClaims);
 
export default router;