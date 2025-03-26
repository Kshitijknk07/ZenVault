import { Router, Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { isAdmin } from '../middleware/authMiddleware';
import {
  createUser,
  createClerkUser,
  updateUser,
  updateClerkUser,
  deleteUser,
  deleteClerkUser,
  getUser,
  getClerkUser,
  getAllUsers,
  getUserByEmail,
} from '../controllers/userController';

type ExpressHandler = (req: Request, res: Response) => Promise<void>;

const router = Router();
const requireAuth = ClerkExpressRequireAuth();

router.post('/clerk', createClerkUser as ExpressHandler);

router.get(
  '/me',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/me',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/email/:email',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUserByEmail(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/clerk/:clerkId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getClerkUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/clerk/:clerkId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateClerkUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/clerk/:clerkId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteClerkUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:userId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:userId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:userId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Admin-only routes
const adminRouter = Router();
router.use('/', adminRouter);
adminRouter.use(requireAuth, isAdmin);

adminRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

adminRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllUsers(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
