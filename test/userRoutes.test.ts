import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import * as userController from "../src/api/v1/controllers/userController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
 
// Mock all controller functions
jest.mock("../src/api/v1/controllers/userController", () => ({
  __esModule: true,
  getUserProfile: jest.fn((_req: Request, res: Response) =>
    res.status(HTTP_STATUS.OK).send()
  ),
}));
 
// Mock authentication and authorization middleware to bypass security
jest.mock("../src/api/v1/middleware/authenticate", () => {
  return jest.fn((_req: Request, _res: Response, next: NextFunction) => next());
});
 
jest.mock("../src/api/v1/middleware/authorize", () => {
  return jest.fn(
    (_mockOptions) =>
      (_req: Request, _res: Response, next: NextFunction) => next()
  );
});
 
describe("User Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  describe("GET /api/v1/users/:uid", () => {
    it("should call getUserProfile controller", async () => {
      await request(app).get("/api/v1/users/test123");
      expect(
        (userController as unknown as { getUserProfile: jest.Mock })
          .getUserProfile
      ).toHaveBeenCalled();
    });
  });
});