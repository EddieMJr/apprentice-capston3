/* Database Connection */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "./.env") });

let db;

try {
  db = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PW,
  });

  console.log("Loaded ENV:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW ? "✅ (hidden)" : "❌ MISSING",
    name: process.env.DB_NAME,
  });

  await db.query("SELECT 1");
  console.log("✅ Connected to database");
} catch (err) {
  console.error("❌ Database connection failed:", err);
  process.exit(1);
}

export default db;
