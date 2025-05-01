import { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController";

const router = Router();

router.post("/register", register as any);
router.post("/login", login as any);
router.post("/logout", logout as any);
router.get("/me", getCurrentUser as any);

export default router;
