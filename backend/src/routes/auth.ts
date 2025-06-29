import { Router } from "express";
import AuthController from "@/controllers/AuthController";
import { authenticate, requireUser } from "@/middleware/auth";
import {
  validate,
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  refreshTokenSchema,
  logoutSchema,
} from "@/middleware/validation";

const router = Router();

// Public routes
router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  AuthController.refreshToken
);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  AuthController.forgotPassword
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  AuthController.resetPassword
);
router.get("/verify-token", AuthController.verifyToken);

// Protected routes
router.post(
  "/logout",
  authenticate,
  validate(logoutSchema),
  AuthController.logout
);
router.get("/profile", authenticate, requireUser, AuthController.getProfile);
router.put(
  "/profile",
  authenticate,
  requireUser,
  validate(updateProfileSchema),
  AuthController.updateProfile
);
router.put(
  "/change-password",
  authenticate,
  requireUser,
  validate(changePasswordSchema),
  AuthController.changePassword
);

export default router;
