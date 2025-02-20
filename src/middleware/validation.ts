import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Check validation result.
 * 
 */
export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()


    return res.status(422).json({ message: req.__('validation.message'), errors: errors.array() })
};
