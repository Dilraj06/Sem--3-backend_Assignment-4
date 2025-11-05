import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse, errorResponse } from "../models/responseModel";
 
/*
Sets a custom role for a Firebase user
*/
export const setCustomClaims = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { uid, role } = req.body;
 
    if (!uid || !role) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse("UID and role are required", "MISSING_FIELDS"));
      return;
    }
 
    await auth.setCustomUserClaims(uid, { role });
 
    res
      .status(HTTP_STATUS.OK)
      .json(successResponse(`Role '${role}' assigned successfully`));
  } catch (error: unknown) {
    console.error("Error setting custom claims:", error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(errorResponse("Failed to set custom claims", "CLAIM_ERROR"));
    next(error);
  }
};