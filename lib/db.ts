"use server";
import { neon } from "@neondatabase/serverless";

// ✅ Cache the sql client globally (per runtime)
let sql: any;

export async function getDbConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Neon DB URL is not defined");
  }

  // Create the client only once
  if (!sql) {
    sql = neon(process.env.DATABASE_URL);
  }

  return sql;
}
