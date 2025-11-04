import { Request, Response, NextFunction } from "express";
 
/**
* Temporary authorization placeholder
* Will be replaced later with Firebase role based checks
*/
const authorize =
  (_options?: unknown) =>
  (_req: Request, _res: Response, next: NextFunction): void => {
    next(); // allow all roles for now
  };
 
export default authorize;