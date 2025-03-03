import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';

declare module 'express' {
  interface Request {
    auth?: {
      userId: string;
      [key: string]: any;
    };
    user?: User;
  }
}

interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
}

const userService = new UserService();

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const userId = req.auth?.userId;

  if (!userId) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  userService.getClerkUserById(userId)
    .then(user => {
      if (!user) {
        res.status(403).json({ error: 'Access denied' });
        return;
      }

      if (user.role !== 'ADMIN') {
        res.status(403).json({ error: 'Admin access required' });
        return;
      }

      next();
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

export async function attachUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.auth?.userId;

    if (userId) {
      const user = await userService.getClerkUserById(userId);
      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}