import express from "express";
import {
  createLoan,
  reviewLoan,
  getAllLoans,
  approveLoan,
} from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
 
const router = express.Router();
 
// POST /api/v1/loans - user
router.post(
  "/loans",
  authenticate,
  isAuthorized({ hasRole: ["user"] }),
  createLoan
);
 
// PUT /api/v1/loans/:id/review - officer
router.put(
  "/loans/:id/review",
  authenticate,
  isAuthorized({ hasRole: ["officer"] }),
  reviewLoan
);
 
// GET /api/v1/loans - all roles
router.get(
  "/loans",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager", "officer", "user"] }),
  getAllLoans
);
 
// PUT /api/v1/loans/:id/approve - manager
router.put(
  "/loans/:id/approve",
  authenticate,
  isAuthorized({ hasRole: ["manager"] }),
  approveLoan
);
 
export default router;