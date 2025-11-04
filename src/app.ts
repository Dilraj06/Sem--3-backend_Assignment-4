import express, { Application, Request, Response } from "express";
import { accessLogger, errorLogger, consoleLogger } from "./api/v1/middleware/logger";
import loanRoutes from "./api/v1/routes/loanRoutes";
import errorHandler from "./api/v1/middleware/errorhandler";

const app: Application = express();
 
app.use(express.json());

// Logging middleware (order matters)
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
 
export default app;