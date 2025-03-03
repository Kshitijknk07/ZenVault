import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth } from '@clerk/clerk-sdk-node';
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
  getUserByEmail
} from '../controllers/userController';

type ExpressHandler = (req: Request, res: Response) => Promise<void>;

const router = Router();

router.post('/clerk', createClerkUser as ExpressHandler);

router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllUsers(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUserByEmail(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/clerk/:clerkId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getClerkUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/clerk/:clerkId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateClerkUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/clerk/:clerkId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteClerkUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.use(isAdmin);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUserByEmail(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/clerk/:clerkId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getClerkUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/clerk/:clerkId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateClerkUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/clerk/:clerkId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteClerkUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;