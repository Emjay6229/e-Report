import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Employee } from '../model/Employee';
import { JwtPayload } from 'jsonwebtoken';
import { decodeToken } from './decodeToken';

export async function isDev(req: Request, res: Response, next: NextFunction) {
    const decoded = decodeToken(req.cookies.jwt) as JwtPayload
    const user: any = await Employee.findOne({ _id: decoded.userId })

    // Check if the user making the request is a developer
    // If the user is an developer, allow them to proceed to the next middleware function
    if (user.role === "Developer") {
      next();
    } else {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "ONLY ADMIN! You are not authorized to perform this action" });
    }
  }