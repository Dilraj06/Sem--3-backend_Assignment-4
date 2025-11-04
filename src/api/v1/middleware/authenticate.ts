import { Request, Response, NextFunction } from "express";
 
/**
* Temporary authentication placeholder
* Will be replaced later with Firebase ID token verification
*/
const authenticate = (_req: Request, _res: Response, next: NextFunction): void => {
  next(); // allow every request for now
};
 
export default authenticate;