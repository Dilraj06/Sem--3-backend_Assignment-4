import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import * as loanController from "../src/api/v1/controllers/loanController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
 
// Mock all controller functions
jest.mock("../src/api/v1/controllers/loanController", () => ({
  createLoan: jest.fn((_req: Request, res: Response) =>
    res.status(HTTP_STATUS.CREATED).send()
  ),
  reviewLoan: jest.fn((_req: Request, res: Response) =>
    res.status(HTTP_STATUS.OK).send()
  ),
  getAllLoans: jest.fn((_req: Request, res: Response) =>
    res.status(HTTP_STATUS.OK).send()
  ),
  approveLoan: jest.fn((_req: Request, res: Response) =>
    res.status(HTTP_STATUS.OK).send()
  ),
}));
 
// Bypass authentication/authorization middlewares, will implement later)
jest.mock("../src/api/v1/middleware/authenticate", () => {
  return jest.fn((_req: Request, _res: Response, next: NextFunction) => next());
});
 
jest.mock("../src/api/v1/middleware/authorize", () => {
  return jest.fn(
    (_mockOptions) =>
      (_req: Request, _res: Response, next: NextFunction) => next()
  );
});
 
describe("Loan Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/loans", () => {
    it("should call createLoan controller", async () => {
      await request(app).post("/api/v1/loans");
      expect(loanController.createLoan).toHaveBeenCalled();
    });
  });
 
  describe("PUT /api/v1/loans/:id/review", () => {
    it("should call reviewLoan controller", async () => {
      await request(app).put("/api/v1/loans/123/review");
      expect(loanController.reviewLoan).toHaveBeenCalled();
    });
  });
 
  describe("GET /api/v1/loans", () => {
    it("should call getAllLoans controller", async () => {
      await request(app).get("/api/v1/loans");
      expect(loanController.getAllLoans).toHaveBeenCalled();
    });
  });
 
  describe("PUT /api/v1/loans/:id/approve", () => {
    it("should call approveLoan controller", async () => {
      await request(app).put("/api/v1/loans/123/approve");
      expect(loanController.approveLoan).toHaveBeenCalled();
    });
  });
});
 