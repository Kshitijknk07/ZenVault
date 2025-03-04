import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { logger } from '../utils/logger';

const userService = new UserService();

export async function createUser(req: Request, res: Response) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    const user = await userService.createUser({ email, password, role });
    res.status(201).json(user);
  } catch (error) {
    logger.error(`Error in createUser controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export async function createClerkUser(req: Request, res: Response) {
  try {
    const { clerkId, email, name } = req.body;

    if (!clerkId) {
      return res.status(400).json({
        error: 'Clerk ID is required'
      });
    }

    const existingUser = await userService.getClerkUserById(clerkId);

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    let userEmail = email;
    if (!userEmail && req.auth?.userId) {
      userEmail = `user-${clerkId}@example.com`;
    }

    if (!userEmail) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    const user = await userService.createClerkUser({
      clerkId,
      email: userEmail,
      name,
      id: undefined
    });

    res.status(201).json(user);
  } catch (error) {
    logger.error(`Error in createClerkUser controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      });
    }

    const user = await userService.updateUser(userId, updateData);
    res.json(user);
  } catch (error) {
    logger.error(`Error in updateUser controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export async function updateClerkUser(req: Request, res: Response) {
  try {
    const { clerkId } = req.params;
    const updateData = req.body;

    if (!clerkId) {
      return res.status(400).json({
        error: 'Clerk ID is required'
      });
    }

    const user = await userService.updateClerkUser(clerkId, updateData);
    res.json(user);
  } catch (error) {
    logger.error(`Error in updateClerkUser controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      });
    }

    await userService.deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Error in deleteUser controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export async function deleteClerkUser(req: Request, res: Response) {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({
        error: 'Clerk ID is required'
      });
    }

    await userService.deleteClerkUser(clerkId);
    res.json({ message: 'Clerk user deleted successfully' });
  } catch (error) {
    logger.error(`Error in deleteClerkUser controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      });
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json(user);
  } catch (error) {
    logger.error(`Error in getUser controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export async function getClerkUser(req: Request, res: Response) {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({
        error: 'Clerk ID is required'
      });
    }

    const user = await userService.getClerkUserById(clerkId);
    if (!user) {
      return res.status(404).json({
        error: 'Clerk user not found'
      });
    }

    res.json(user);
  } catch (error) {
    logger.error(`Error in getClerkUser controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const users = await userService.getAllUsers(page, limit);
    res.json(users);
  } catch (error) {
    logger.error(`Error in getAllUsers controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}

export async function getUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json(user);
  } catch (error) {
    logger.error(`Error in getUserByEmail controller: ${(error as Error).message}`);
    res.status(400).json({
      error: (error as Error).message
    });
  }
}