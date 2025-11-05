import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse, errorResponse } from "../models/responseModel";
 
/*
Retrieves Firebase user details
*/
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { uid } = req.params;
    const userRecord = await auth.getUser(uid);
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(userRecord, "User retrieved successfully"));
  } catch (error: unknown) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Failed to retrieve user", "FETCH_ERROR"));
    next(error);
  }
};