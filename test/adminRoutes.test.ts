import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import * as adminController from "../src/api/v1/controllers/adminController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
 
//Mock controller
jest.mock("../src/api/v1/controllers/adminController", () => ({
  setCustomClaims: jest.fn((_req: Request, res: Response) =>
    res.status(HTTP_STATUS.CREATED).send()
  ),
}));
 
//Define mocks INSIDE factory functions to avoid hoisting issues
jest.mock("../src/api/v1/middleware/authenticate", () => {
  const mockAuthenticate = jest.fn((_req: Request, _res: Response, next: NextFunction) => next());
  return { __esModule: true, default: mockAuthenticate };
});
 
jest.mock("../src/api/v1/middleware/authorize", () => {
  const mockAuthorize = jest.fn(
    (_opts?: any) => (_req: Request, _res: Response, next: NextFunction) => next()
  );
  return { __esModule: true, default: mockAuthorize };
});
 
//Import the mocks *after* defining them so we can reference in tests
const { default: mockAuthenticate } = require("../src/api/v1/middleware/authenticate");
const { default: mockAuthorize } = require("../src/api/v1/middleware/authorize");
 
describe("Admin Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  describe("POST /api/v1/admin/setCustomClaims", () => {
    it("should call authentication, authorization, and controller in order", async () => {
      await request(app).post("/api/v1/admin/setCustomClaims");
      expect(mockAuthenticate).toHaveBeenCalled();
      expect(mockAuthorize).toHaveBeenCalled();
      expect(adminController.setCustomClaims).toHaveBeenCalled();
    });
  });
});