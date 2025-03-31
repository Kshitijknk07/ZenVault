const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

async function migrateToClerk() {
  const dbPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    console.log("Starting migration to add Clerk authentication...");

    const columnCheckResult = await dbPool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'clerk_id'
    `);

    if (columnCheckResult.rows.length === 0) {
      console.log("Adding clerk_id column to users table...");
      await dbPool.query(
        `ALTER TABLE users ADD COLUMN clerk_id VARCHAR(100) UNIQUE`
      );
      console.log("clerk_id column added successfully");
    } else {
      console.log("clerk_id column already exists");
    }

    const indexCheckResult = await dbPool.query(`
      SELECT indexname 
      FROM pg_indexes 
      WHERE tablename = 'users' AND indexname = 'idx_users_clerk_id'
    `);

    if (indexCheckResult.rows.length === 0) {
      console.log("Creating index on clerk_id...");
      await dbPool.query(`CREATE INDEX idx_users_clerk_id ON users(clerk_id)`);
      console.log("Index created successfully");
    } else {
      console.log("Index already exists");
    }

    console.log("Migration completed successfully");
    await dbPool.end();
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
}

migrateToClerk();
