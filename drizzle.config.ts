import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  dialect: "sqlite",
  driver: "turso",
  schema: "./src/infrastructure/drizzle/schema.ts",
  out: "./src/infrastructure/drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DB_AUTH_TOKEN!,
  },
});
