import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import admin from "../../../../config/firebaseConfig";
import { successResponse, errorResponse } from "../models/responseModel";
 
/**
* Manages requests and responses to create a new loan application
* @param req - The express Request
* @param res - The express Response
* @param next - The express middleware chaining function
* @returns void
*/
export const createLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loanData = {
      ...req.body,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
 
    const loanRef = await admin.firestore().collection("loans").add(loanData);
 
    res.status(HTTP_STATUS.CREATED).json(
      successResponse({ id: loanRef.id }, "Loan application created successfully")
    );
  } catch (error: unknown) {
    console.error("Firestore createLoan error:", error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(errorResponse("An unexpected error occurred", "UNKNOWN_ERROR"));
    next(error);
  }
};
 
/**
* Manages requests and responses to review a loan application
* @param req - The express Request
* @param res - The express Response
* @param next - The express middleware chaining function
* @returns void
*/
export const reviewLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const db = admin.firestore();
    const loanRef = db.collection("loans").doc(id);
    const loanSnap = await loanRef.get();
 
    if (!loanSnap.exists) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse("Loan not found", "LOAN_NOT_FOUND"));
      return;
    }
 
    await loanRef.update({
      status: "reviewed",
      reviewedAt: new Date().toISOString(),
    });
 
    res.status(HTTP_STATUS.OK).json(
      successResponse({}, `Loan application ${id} reviewed successfully`)
    );
  } catch (error: unknown) {
    console.error("Firestore reviewLoan error:", error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(errorResponse("An unexpected error occurred", "UNKNOWN_ERROR"));
    next(error);
  }
};
 
/**
* Manages requests and responses to retrieve all loan applications
* @param req - The express Request
* @param res - The express Response
* @param next - The express middleware chaining function
* @returns void
*/
export const getAllLoans = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const snapshot = await admin.firestore().collection("loans").get();
    const loans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
 
    res.status(HTTP_STATUS.OK).json(
      successResponse(loans, "Loans successfully retrieved")
    );
  } catch (error: unknown) {
    console.error("Firestore getAllLoans error:", error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(errorResponse("An unexpected error occurred", "UNKNOWN_ERROR"));
    next(error);
  }
};
 
/**
* Manages requests and responses to approve a loan application
* @param req - The express Request
* @param res - The express Response
* @param next - The express middleware chaining function
* @returns void
*/
export const approveLoan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const db = admin.firestore();
    const loanRef = db.collection("loans").doc(id);
    const loanSnap = await loanRef.get();
 
    if (!loanSnap.exists) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse("Loan not found", "LOAN_NOT_FOUND"));
      return;
    }
 
    await loanRef.update({
      status: "approved",
      approvedAt: new Date().toISOString(),
    });
 
    res.status(HTTP_STATUS.OK).json(
      successResponse({}, `Loan application ${id} approved successfully`)
    );
  } catch (error: unknown) {
    console.error("Firestore approveLoan error:", error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(errorResponse("An unexpected error occurred", "UNKNOWN_ERROR"));
    next(error);
  }
};
