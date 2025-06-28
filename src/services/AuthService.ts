import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { redisClient } from "@/config/database";
import UserModel from "@/models/User";
import {
  User,
  UserRole,
  AuthTokens,
  JwtPayload,
  LoginRequest,
  RegisterRequest,
} from "@/types";
import logger from "@/config/logger";

export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtRefreshExpiresIn: string;

  constructor() {
    // Require JWT secrets to be set in environment variables
    const jwtSecret = process.env["JWT_SECRET"];
    const jwtRefreshSecret = process.env["JWT_REFRESH_SECRET"];

    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is required");
    }
    if (!jwtRefreshSecret) {
      throw new Error("JWT_REFRESH_SECRET environment variable is required");
    }

    this.jwtSecret = jwtSecret;
    this.jwtExpiresIn = process.env["JWT_EXPIRES_IN"] || "7d";
    this.jwtRefreshSecret = jwtRefreshSecret;
    this.jwtRefreshExpiresIn = process.env["JWT_REFRESH_EXPIRES_IN"] || "30d";
  }

  async register(
    userData: RegisterRequest
  ): Promise<{ user: Omit<User, "password">; tokens: AuthTokens }> {
    try {
      // Check if user already exists
      const existingUserByEmail = await UserModel.findByEmail(userData.email);
      if (existingUserByEmail) {
        throw new Error("User with this email already exists");
      }

      const existingUserByUsername = await UserModel.findByUsername(
        userData.username
      );
      if (existingUserByUsername) {
        throw new Error("Username is already taken");
      }

      // Validate password confirmation
      if (userData.password !== userData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Create new user
      const newUser = await UserModel.create({
        email: userData.email,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        role: UserRole.USER,
        isEmailVerified: false,
        isActive: true,
      });

      // Generate tokens
      const tokens = await this.generateTokens(newUser);

      // Store refresh token in Redis
      await this.storeRefreshToken(newUser.id, tokens.refreshToken);

      // Return user without password
      const { password, ...userWithoutPassword } = newUser;

      return { user: userWithoutPassword, tokens };
    } catch (error) {
      logger.error("Registration error:", error);
      throw error;
    }
  }

  async login(
    loginData: LoginRequest
  ): Promise<{ user: Omit<User, "password">; tokens: AuthTokens }> {
    try {
      // Find user by email
      const user = await UserModel.findByEmail(loginData.email);
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error("Account is deactivated");
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(
        loginData.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      // Update last login
      await UserModel.updateLastLogin(user.id);

      // Generate tokens
      const tokens = await this.generateTokens(user);

      // Store refresh token in Redis
      await this.storeRefreshToken(user.id, tokens.refreshToken);

      // Return user without password
      const { password, ...userWithoutPassword } = user;

      return { user: userWithoutPassword, tokens };
    } catch (error) {
      logger.error("Login error:", error);
      throw error;
    }
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    try {
      // Remove refresh token from Redis
      await this.removeRefreshToken(userId, refreshToken);
      logger.info(`User ${userId} logged out successfully`);
    } catch (error) {
      logger.error("Logout error:", error);
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        this.jwtRefreshSecret
      ) as JwtPayload;

      // Check if refresh token exists in Redis
      const storedToken = await redisClient.get(
        `refresh_token:${decoded.userId}`
      );
      if (!storedToken || storedToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }

      // Get user
      const user = await UserModel.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw new Error("User not found or inactive");
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      // Update refresh token in Redis
      await this.storeRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      logger.error("Token refresh error:", error);
      throw error;
    }
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;

      // Check if user exists and is active
      const user = await UserModel.findById(decoded.userId);
      if (!user || !user.isActive) {
        throw new Error("User not found or inactive");
      }

      return decoded;
    } catch (error) {
      logger.error("Token verification error:", error);
      throw error;
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      // Verify current password
      const isCurrentPasswordValid = await UserModel.verifyPassword(
        userId,
        currentPassword
      );
      if (!isCurrentPasswordValid) {
        throw new Error("Current password is incorrect");
      }

      // Update password
      await UserModel.updatePassword(userId, newPassword);

      // Invalidate all refresh tokens for this user
      await this.invalidateAllUserTokens(userId);

      logger.info(`Password changed successfully for user ${userId}`);
    } catch (error) {
      logger.error("Password change error:", error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const user = await UserModel.findByEmail(email);
      if (!user) {
        logger.info(`Password reset requested for email: ${email}`);
        return;
      }

      // Generate password reset token
      const resetToken = uuidv4();
      // const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour (unused)

      // Store reset token in Redis
      await redisClient.setEx(
        `password_reset:${resetToken}`,
        3600, // 1 hour expiry
        JSON.stringify({ userId: user.id, email: user.email })
      );

      // TODO: Send email with reset link
      logger.info(`Password reset token generated for user ${user.id}`);
      logger.info(`Password reset token: ${resetToken}`);
    } catch (error) {
      logger.error("Forgot password error:", error);
      throw error;
    }
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    try {
      // Get reset token data from Redis
      const resetData = await redisClient.get(`password_reset:${resetToken}`);
      if (!resetData) {
        throw new Error("Invalid or expired reset token");
      }

      const { userId } = JSON.parse(resetData);

      // Update password
      await UserModel.updatePassword(userId, newPassword);

      // Remove reset token
      await redisClient.del(`password_reset:${resetToken}`);

      // Invalidate all refresh tokens for this user
      await this.invalidateAllUserTokens(userId);

      logger.info(`Password reset successfully for user ${userId}`);
    } catch (error) {
      logger.error("Password reset error:", error);
      throw error;
    }
  }

  private async generateTokens(user: User): Promise<AuthTokens> {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    } as SignOptions);

    const refreshToken = jwt.sign(payload, this.jwtRefreshSecret, {
      expiresIn: this.jwtRefreshExpiresIn,
    } as SignOptions);

    const expiresIn = this.parseExpiresIn(this.jwtExpiresIn);

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  private async storeRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<void> {
    const key = `refresh_token:${userId}`;
    const expiry = this.parseExpiresIn(this.jwtRefreshExpiresIn);

    await redisClient.setEx(key, expiry, refreshToken);
  }

  private async removeRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<void> {
    const key = `refresh_token:${userId}`;
    const storedToken = await redisClient.get(key);

    if (storedToken === refreshToken) {
      await redisClient.del(key);
    }
  }

  private async invalidateAllUserTokens(userId: string): Promise<void> {
    const key = `refresh_token:${userId}`;
    await redisClient.del(key);
  }

  private parseExpiresIn(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case "s":
        return value;
      case "m":
        return value * 60;
      case "h":
        return value * 3600;
      case "d":
        return value * 86400;
      default:
        return 3600; // Default to 1 hour
    }
  }
}

export default new AuthService();
