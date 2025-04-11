const db = require("../config/db");

async function checkConnection() {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Database connection successful!");
    console.log("Current database time:", result.rows[0].now);

    const tablesResult = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    console.log("\nDatabase tables:");
    tablesResult.rows.forEach((row) => {
      console.log(`- ${row.table_name}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
  } finally {
    process.exit();
  }
}

checkConnection();
