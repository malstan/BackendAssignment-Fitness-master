import { NextFunction, Request, Response } from "express";

import { USER_ROLE } from "../utils/enums";

/**
 * Only admin and user with ID same as route parameter ID can pass.
 * 
 */
export default (req: Request, res: Response, next: NextFunction) => {
    // check if the user is admin
    if (req.user?.role == USER_ROLE.ADMIN) return next()

    // check if authenticated user is wanted user
    if (req.user?.id.toString() == req.params.id) return next()

    return res.status(403).json({ message: req.__('auth.forbidden') })
}