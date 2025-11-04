import express, { Application, Request, Response } from "express";
import morgan from "morgan";
 
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
 
 
export default app;