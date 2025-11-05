import express, { Application, Request, Response } from "express";
import { accessLogger, errorLogger, consoleLogger } from "./api/v1/middleware/logger";
import loanRoutes from "./api/v1/routes/loanRoutes";
import errorHandler from "./api/v1/middleware/errorhandler";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

const app: Application = express();
 
app.use(express.json());

// Logging middleware
app.use(consoleLogger);  
app.use(accessLogger);  
app.use(errorLogger);
 
// Health check route
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});
 
app.use("/api/v1", loanRoutes);
app.use(errorHandler);
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
 
export default app;