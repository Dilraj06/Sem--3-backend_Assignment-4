import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import * as adminController from "../src/api/v1/controllers/adminController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
 
// Mock all controller functions
jest.mock("../src/api/v1/controllers/adminController", () => ({
  setCustomClaims: jest.fn((_req: Request, res: Response) =>
    res.status(HTTP_STATUS.CREATED).send()
  ),
}));
 
// Bypass authentication and authorization 
jest.mock("../src/api/v1/middleware/authenticate", () => {
  return jest.fn((_req: Request, _res: Response, next: NextFunction) => next());
});
 
jest.mock("../src/api/v1/middleware/authorize", () => {
  return jest.fn(
    (_mockOptions) =>
      (_req: Request, _res: Response, next: NextFunction) => next()
  );
});
 
describe("Admin Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  describe("POST /api/v1/admin/setCustomClaims", () => {
    it("should call setCustomClaims controller", async () => {
      await request(app).post("/api/v1/admin/setCustomClaims");
      expect(adminController.setCustomClaims).toHaveBeenCalled();
    });
  });
});