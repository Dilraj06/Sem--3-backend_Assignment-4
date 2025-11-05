
import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { MiddlewareFunction } from "../types/express";
import { AuthorizationError } from "../errors/errors";
 
/**
* Middleware factory to authorize users based on their roles
*
* @param authOptions - Options defining which roles are allowed or if same-user access is permitted
* @returns Express middleware function
*/
const authorize = (authOptions: AuthorizationOptions): MiddlewareFunction => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { role, uid } = res.locals;
            const { id } = req.params;
 
            // Allow same-user access if flag enabled
            if (authOptions.allowSameUser && id && uid === id) {
                return next();
            }
 
            // If no role found
            if (!role) {
                throw new AuthorizationError(
                    "Forbidden: No role found",
                    "ROLE_NOT_FOUND"
                );
            }
 
            // Check if the user’s role is permitted
            if (authOptions.hasRole.includes(role)) {
                return next();
            }
 
            // If the user role is not sufficient
            throw new AuthorizationError(
                "Forbidden: Insufficient role",
                "INSUFFICIENT_ROLE"
            );
        } catch (error: unknown) {
            next(error);
        }
    };
};
 
export default authorize;