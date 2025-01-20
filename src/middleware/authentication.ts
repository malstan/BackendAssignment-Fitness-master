import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwt_secret = 'my-jwt-secret'

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  // check token
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' })

  try {
    // verify token
    const decoded = jwt.verify(token, jwt_secret) as { id: number, role: string }

    req.user = {id: decoded.id, role: decoded.role}
    next()
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' })
  }
};
