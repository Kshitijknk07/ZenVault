const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

async function initDb() {
  const adminPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: "postgres",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    const dbCheckResult = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );

    if (dbCheckResult.rows.length === 0) {
      console.log(`Creating database ${process.env.DB_NAME}...`);
      await adminPool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database ${process.env.DB_NAME} created successfully`);
    } else {
      console.log(`Database ${process.env.DB_NAME} already exists`);
    }

    await adminPool.end();

    const dbPool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    const sqlFilePath = path.join(__dirname, "..", "database.sql");
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");

    const statements = sqlContent
      .split(";")
      .filter((statement) => statement.trim() !== "")
      .map((statement) => statement.trim() + ";");

    for (const statement of statements) {
      if (statement.includes("CREATE DATABASE")) {
        continue;
      }
      if (statement.includes("\\c")) {
        continue;
      }
      await dbPool.query(statement);
    }

    console.log("Database tables created successfully");
    await dbPool.end();
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

initDb();
