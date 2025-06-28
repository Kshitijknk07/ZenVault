import { Request, Response, NextFunction } from "express";
import AuthService from "@/services/AuthService";
import { UserRole } from "@/types";
import logger from "@/config/logger";

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access token is required",
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const decoded = await AuthService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      logger.warn(`Invalid token attempt: ${error}`);
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    logger.error("Authentication middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Insufficient permissions",
      });
      return;
    }

    next();
  };
};

export const requireAdmin = authorize(UserRole.ADMIN);
export const requireModerator = authorize(UserRole.MODERATOR, UserRole.ADMIN);
export const requireUser = authorize(
  UserRole.USER,
  UserRole.MODERATOR,
  UserRole.ADMIN
);
