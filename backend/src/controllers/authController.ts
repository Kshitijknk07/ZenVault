import { Request, Response } from "express";
import supabase from "../config/supabase";

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || "",
        },
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
      user: data.user,
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

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Set session cookie
    res.cookie("supabase-auth", data.session?.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week
    });

    return res.status(200).json({
      message: "Login successful",
      user: data.user,
      session: data.session,
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

    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

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
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    return res.status(200).json({ user: data.user });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "An error occurred" });
  }
};
