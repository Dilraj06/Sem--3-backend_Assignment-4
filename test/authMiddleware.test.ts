import { Request, Response, NextFunction } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";
 
jest.mock("../src/config/firebaseConfig", () => ({
  auth: { verifyIdToken: jest.fn() },
}));
 
describe("authenticate middleware", () => {
  const mockReq = {} as Request;
  const mockRes = { locals: {} } as Response;
  const mockNext = jest.fn() as NextFunction;
 
  beforeEach(() => {
    jest.clearAllMocks();
  });
 
  it("should throw AuthenticationError when no token provided", async () => {
    mockReq.headers = {};
    await authenticate(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(AuthenticationError));
  });
 
  it("should call next with AuthenticationError if token invalid", async () => {
    mockReq.headers = { authorization: "Bearer invalidToken" };
    (auth.verifyIdToken as jest.Mock).mockRejectedValueOnce(new Error("Invalid token"));
    await authenticate(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(AuthenticationError));
  });
 
  it("should decode token and call next if valid", async () => {
    mockReq.headers = { authorization: "Bearer validToken" };
    (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
      uid: "123",
      role: "user",
    });
    await authenticate(mockReq, mockRes, mockNext);
    expect(mockRes.locals.uid).toBe("123");
    expect(mockRes.locals.role).toBe("user");
    expect(mockNext).toHaveBeenCalledWith();
  });
});