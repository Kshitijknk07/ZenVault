import { Request, Response } from "express";

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    return res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "An error occurred during registration",
    });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "An error occurred during login" });
  }
};

// Logout user
export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the session cookie
    res.clearCookie("supabase-auth");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "An error occurred during logout" });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ user: {} });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "An error occurred" });
  }
};
