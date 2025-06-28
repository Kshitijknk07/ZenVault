const jwt = require("jsonwebtoken");
const { isTokenBlacklisted, incrementRateLimit } = require("../config/redis");
const userModel = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Access denied",
        message: "No token provided",
      });
    }

    const token = authHeader.substring(7);

    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({
        error: "Access denied",
        message: "Token has been revoked",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: "Access denied",
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        error: "Access denied",
        message: "Email not verified",
      });
    }

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Access denied",
        message: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Access denied",
        message: "Invalid token",
      });
    }

    console.error("Auth middleware error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "Authentication failed",
    });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.substring(7);

    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findUserById(decoded.userId);

    if (user && user.isVerified) {
      req.user = {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      };
    }

    next();
  } catch (error) {
    next();
  }
};

const checkOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const resourceId =
        req.params.id || req.params.fileId || req.params.folderId;

      if (!resourceId) {
        return res.status(400).json({
          error: "Bad request",
          message: "Resource ID is required",
        });
      }

      let resource;
      let resourceUserId;

      switch (resourceType) {
        case "file":
          const { File } = require("../models/file.model");
          resource = await File.findOne({ _id: resourceId, userId });
          resourceUserId = resource ? resource.userId : null;
          break;
        case "folder":
          const { Folder } = require("../models/folder.model");
          resource = await Folder.findOne({ _id: resourceId, userId });
          resourceUserId = resource ? resource.userId : null;
          break;
        case "user":
          resource = await userModel.findUserById(resourceId);
          resourceUserId = resource ? resource._id : null;
          break;
        default:
          return res.status(500).json({
            error: "Internal server error",
            message: "Invalid resource type",
          });
      }

      if (!resource) {
        return res.status(404).json({
          error: "Not found",
          message: "Resource not found",
        });
      }

      if (resourceUserId.toString() !== userId.toString()) {
        return res.status(403).json({
          error: "Forbidden",
          message: "You do not have permission to access this resource",
        });
      }

      next();
    } catch (error) {
      console.error("Ownership check error:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: "Ownership verification failed",
      });
    }
  };
};

const checkSharedAccess = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const fileId = req.params.fileId || req.params.id;

    if (!fileId) {
      return res.status(400).json({
        error: "Bad request",
        message: "File ID is required",
      });
    }

    const { File } = require("../models/file.model");
    const file = await File.findOne({ _id: fileId, userId });

    if (file) {
      return next();
    }

    const { FileShare } = require("../models/fileShare.model");
    const share = await FileShare.findOne({
      fileId,
      sharedWith: userId,
      isActive: true,
      $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
    });

    if (!share) {
      return res.status(403).json({
        error: "Forbidden",
        message: "You do not have permission to access this file",
      });
    }

    req.fileShare = share;
    next();
  } catch (error) {
    console.error("Shared access check error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "Permission verification failed",
    });
  }
};

const rateLimit = (maxRequests = 100, windowMs = 900000) => {
  return async (req, res, next) => {
    try {
      const clientIp = req.ip || req.connection.remoteAddress;
      const key = `rate_limit:${clientIp}`;

      const current = await incrementRateLimit(key, windowMs);

      if (current > maxRequests) {
        return res.status(429).json({
          error: "Too many requests",
          message: "Rate limit exceeded",
        });
      }

      res.set({
        "X-RateLimit-Limit": maxRequests,
        "X-RateLimit-Remaining": Math.max(0, maxRequests - current),
        "X-RateLimit-Reset": Date.now() + windowMs,
      });

      next();
    } catch (error) {
      console.error("Rate limiting error:", error);

      next();
    }
  };
};

module.exports = {
  verifyToken,
  optionalAuth,
  checkOwnership,
  checkSharedAccess,
  rateLimit,
};
