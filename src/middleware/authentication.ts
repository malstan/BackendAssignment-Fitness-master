import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Check if Authorization token is valid. Save id and role to request.
 * 
 */
export default (req: Request, res: Response, next: NextFunction) => {
  // hardcoded just for purpose of this assignment
  const jwt_secret = 'my-jwt-secret'

  const token = req.header('Authorization')?.replace('Bearer ', '')

  // check token
  if (!token) return res.status(401).json({ message: req.__('auth.noToken') })

  try {
    // verify token
    const decoded = jwt.verify(token, jwt_secret) as { id: number, role: string }

    req.user = { id: decoded.id, role: decoded.role }
    return next()

  } catch (err) {
    return res.status(400).json({ message: req.__('auth.invalidToken') })
  }
};
