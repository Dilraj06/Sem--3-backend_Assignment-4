import express from "express";
import { getUserProfile } from "../controllers/userController";
 
const router = express.Router();
 
// GET /api/v1/users/:uid
router.get("/users/:uid", getUserProfile);
 
export default router;