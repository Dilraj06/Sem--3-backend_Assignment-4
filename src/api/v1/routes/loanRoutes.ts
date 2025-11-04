import express from "express";
import {
  createLoan,
  reviewLoan,
  getAllLoans,
  approveLoan,
} from "../controllers/loanController";
 
const router = express.Router();
 
// POST /api/v1/loans - user
router.post("/loans", createLoan);
 
// PUT /api/v1/loans/:id/review - officer
router.put("/loans/:id/review", reviewLoan);
 
// GET /api/v1/loans - all roles
router.get("/loans", getAllLoans);
 
// PUT /api/v1/loans/:id/approve - manager
router.put("/loans/:id/approve", approveLoan);
 
export default router;