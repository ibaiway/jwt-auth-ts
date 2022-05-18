import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import CONFIG from '../config/config';

function verifyToken(req: Request, res: Response, next: NextFunction): void {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      throw new Error('Missing authorization header');
    }
    const bearerToken = req.headers.authorization?.substring(7);

    const validToken: any = jsonwebtoken.verify(bearerToken, CONFIG.JWT_SECRET);
    if (validToken.role !== 1) {
      throw new Error('Access Forbidden ');
    }
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Unauthorized'
    });
  }
}

export { verifyToken };
