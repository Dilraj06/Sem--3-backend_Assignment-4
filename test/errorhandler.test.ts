import { Request, Response, NextFunction } from "express";
import errorHandler from "../src/api/v1/middleware/errorhandler";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { AppError } from "../src/api/v1/errors/errors";
 
jest.spyOn(console, "error").mockImplementation(() => {});
 
describe("Error Handler Middleware", () => {
  it("should format AppError correctly", () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
 
    const appErr = new AppError(
      "Bad Request Occurred",
      "BAD_REQUEST",
      HTTP_STATUS.BAD_REQUEST
    );
 
    errorHandler(appErr, req, res, next);
 
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        error: expect.objectContaining({
          message: "Bad Request Occurred",
          code: "BAD_REQUEST",
        }),
      })
    );
  });
 
  it("should handle generic errors gracefully", () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
 
    const genericError = { message: "Something went wrong", stack: "trace" };
 
    errorHandler(genericError as any, req, res, next);
 
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        error: expect.objectContaining({
          message: "An unexpected error occurred",
          code: "UNKNOWN_ERROR",
        }),
      })
    );
  });
});