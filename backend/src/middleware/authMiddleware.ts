import { Request, Response, NextFunction } from "express";
import supabase from "../config/supabase";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from cookie or Authorization header
    const token =
      req.cookies["supabase-auth"] || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Set the auth token for this request
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Add user to request object
    req.user = data.user;
    next();
  } catch (error: any) {
    return res
      .status(401)
      .json({ error: error.message || "Authentication failed" });
  }
};
