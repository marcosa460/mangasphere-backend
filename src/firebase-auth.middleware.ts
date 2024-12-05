import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token not found' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req['user'] = decodedToken;
      next();
    } catch (error) {
      Logger.error(error);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
