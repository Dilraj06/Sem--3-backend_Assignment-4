import express, { Router } from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
 
const router: Router = express.Router();
 
// POST /api/v1/admin/setCustomClaims - admin only
router.post(
  "/admin/setCustomClaims",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  setCustomClaims
);
 
export default router;