import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
 
// Implement later
import { successResponse } from "../models/responseModel";
 
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
    // In future steps, loan data will be saved to Firestore
    res.status(HTTP_STATUS.CREATED).json(
      successResponse({}, "Loan application created successfully")
    );
  } catch (error: unknown) {
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
 
    res.status(HTTP_STATUS.OK).json(
      successResponse({}, `Loan application ${id} reviewed successfully`)
    );
  } catch (error: unknown) {
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
    // For now, return mock data
    const loans = [
      { id: "L001", applicant: "John Doe", amount: 5000, status: "pending" },
      { id: "L002", applicant: "Jane Smith", amount: 12000, status: "reviewed" },
    ];
 
    res.status(HTTP_STATUS.OK).json(
      successResponse(loans, "Loans successfully retrieved")
    );
  } catch (error: unknown) {
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
 
    res.status(HTTP_STATUS.OK).json(
      successResponse({}, `Loan application ${id} approved successfully`)
    );
  } catch (error: unknown) {
    next(error);
  }
};