// lib/sequelize.ts
import { Sequelize } from "sequelize";

if (
  !process.env.MYSQL_DB ||
  !process.env.MYSQL_USER ||
  !process.env.MYSQL_PASSWORD
) {
  throw new Error("Missing MySQL environment variables");
}

export const sequelize = new Sequelize(
  process.env.MYSQL_DB, // database name
  process.env.MYSQL_USER, // username
  process.env.MYSQL_PASSWORD, // password
  {
    host: process.env.MYSQL_HOST || "localhost",
    dialect: "mysql",
    logging: false, // disable SQL logs in console
  }
);

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw error;
  }
}
