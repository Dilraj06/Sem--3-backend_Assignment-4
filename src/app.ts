import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import loanRoutes from "./api/v1/routes/loanRoutes";
import errorHandler from "./api/v1/middleware/errorhandler";

const app: Application = express();
 
app.use(express.json());
app.use(morgan("dev"));
 
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