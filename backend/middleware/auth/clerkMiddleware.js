const {
  clerkClient,
  ClerkExpressRequireAuth,
} = require("@clerk/clerk-sdk-node");

const protect = ClerkExpressRequireAuth({
  onError: (err, req, res) => {
    res
      .status(401)
      .json({ message: "Not authorized, authentication required" });
  },
});

const extractUser = async (req, res, next) => {
  if (req.auth) {
    try {
      req.user = {
        id: req.auth.userId,

        email: req.auth.sessionClaims.email,
        username:
          req.auth.sessionClaims.username || req.auth.sessionClaims.email,
      };
      next();
    } catch (error) {
      console.error("Error extracting user data:", error);
      res.status(500).json({ message: "Error processing authentication" });
    }
  } else {
    next();
  }
};

module.exports = { protect, extractUser };
