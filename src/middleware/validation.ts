import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Check validation result.
 * 
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()

    return res.status(400).json({ errors: errors.array() })
};
