import { Request, Response } from "express";
import AuthService from "@/services/AuthService";
import UserModel from "@/models/User";
import { ApiResponse } from "@/types";
import logger from "@/config/logger";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { user, tokens } = await AuthService.register(req.body);

      const response: ApiResponse = {
        success: true,
        message: "User registered successfully",
        data: {
          user,
          tokens,
        },
      };

      res.status(201).json(response);
    } catch (error) {
      logger.error("Registration controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: error instanceof Error ? error.message : "Registration failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(400).json(response);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { user, tokens } = await AuthService.login(req.body);

      const response: ApiResponse = {
        success: true,
        message: "Login successful",
        data: {
          user,
          tokens,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error("Login controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(401).json(response);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        const response: ApiResponse = {
          success: false,
          message: "User not authenticated",
          error: "Authentication required",
        };
        res.status(401).json(response);
        return;
      }

      await AuthService.logout(userId, refreshToken);

      const response: ApiResponse = {
        success: true,
        message: "Logout successful",
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error("Logout controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: "Logout failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(500).json(response);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const tokens = await AuthService.refreshToken(refreshToken);

      const response: ApiResponse = {
        success: true,
        message: "Token refreshed successfully",
        data: { tokens },
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error("Token refresh controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: "Token refresh failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(401).json(response);
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        const response: ApiResponse = {
          success: false,
          message: "User not authenticated",
          error: "Authentication required",
        };
        res.status(401).json(response);
        return;
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        const response: ApiResponse = {
          success: false,
          message: "User not found",
          error: "User does not exist",
        };
        res.status(404).json(response);
        return;
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      const response: ApiResponse = {
        success: true,
        message: "Profile retrieved successfully",
        data: { user: userWithoutPassword },
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error("Get profile controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: "Failed to retrieve profile",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(500).json(response);
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        const response: ApiResponse = {
          success: false,
          message: "User not authenticated",
          error: "Authentication required",
        };
        res.status(401).json(response);
        return;
      }

      const updatedUser = await UserModel.updateProfile(userId, req.body);

      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;

      const response: ApiResponse = {
        success: true,
        message: "Profile updated successfully",
        data: { user: userWithoutPassword },
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error("Update profile controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: "Failed to update profile",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(400).json(response);
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const { currentPassword, newPassword } = req.body;

      if (!userId) {
        const response: ApiResponse = {
          success: false,
          message: "User not authenticated",
          error: "Authentication required",
        };
        res.status(401).json(response);
        return;
      }

      await AuthService.changePassword(userId, currentPassword, newPassword);

      const response: ApiResponse = {
        success: true,
        message: "Password changed successfully",
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error("Change password controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: "Failed to change password",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(400).json(response);
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await AuthService.forgotPassword(email);

      const response: ApiResponse = {
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent",
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error("Forgot password controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: "Failed to process password reset request",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(500).json(response);
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { resetToken, newPassword } = req.body;
      await AuthService.resetPassword(resetToken, newPassword);

      const response: ApiResponse = {
        success: true,
        message: "Password reset successfully",
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error("Reset password controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: "Failed to reset password",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(400).json(response);
    }
  }

  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const response: ApiResponse = {
          success: false,
          message: "Access token is required",
          error: "No token provided",
        };
        res.status(401).json(response);
        return;
      }

      const token = authHeader.substring(7);
      const decoded = await AuthService.verifyToken(token);

      const response: ApiResponse = {
        success: true,
        message: "Token is valid",
        data: { user: decoded },
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error("Token verification controller error:", error);

      const response: ApiResponse = {
        success: false,
        message: "Token is invalid",
        error: error instanceof Error ? error.message : "Unknown error",
      };

      res.status(401).json(response);
    }
  }
}

export default new AuthController();
