import { NextFunction, Request, Response } from "express";
import { USER_ROLE } from "../utils/enums";

export default (requiredRole: USER_ROLE) => (req: Request, res: Response, next: NextFunction) => {
    // check if the user is authorized
    if(req.user?.role !== requiredRole) 
        return res.status(403).json({ message: 'Forbidden.' })

    next();
}