require("dotenv").config();
const { connectDB, testConnection } = require("./config/db");
const { connectRedis, testRedisConnection } = require("./config/redis");
const { checkBucketExists } = require("./config/s3");
const { testEmailConfig } = require("./utils/email");

async function initializeApp() {
  console.log("🚀 Initializing ZenVault Backend...\n");

  try {
    // Connect to MongoDB
    console.log("📊 Connecting to MongoDB...");
    await connectDB();

    // Test database connection
    console.log("🗄️  Testing database connection...");
    await testConnection();

    // Test Redis connection
    console.log("🔴 Testing Redis connection...");
    await connectRedis();
    await testRedisConnection();

    // Test S3 connection
    console.log("☁️  Testing AWS S3 connection...");
    await checkBucketExists();

    // Test email configuration
    console.log("📧 Testing email configuration...");
    await testEmailConfig();

    console.log("\n✅ ZenVault Backend initialization completed successfully!");
    console.log("🎉 You can now start the server with: npm run dev");
  } catch (error) {
    console.error("\n❌ Initialization failed:", error.message);
    console.log("\n💡 Make sure you have:");
    console.log("   - MongoDB running and accessible");
    console.log("   - Redis running and accessible");
    console.log("   - AWS S3 bucket created and accessible");
    console.log("   - Valid email configuration");
    console.log("   - All environment variables set correctly");
    process.exit(1);
  }
}

// Run initialization
initializeApp();
