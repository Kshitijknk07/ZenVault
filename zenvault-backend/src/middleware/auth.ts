import { Request, Response, NextFunction } from 'express';
import { requireAuth, getAuth } from '@clerk/express';

export const authMiddleware = requireAuth();

export const getUser = (req: Request) => {
  const { userId } = getAuth(req);
  if (!userId) throw new Error('Unauthorized');
  return userId;
};
