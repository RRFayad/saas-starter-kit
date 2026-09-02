import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
import { getEnvVar } from "./lib/utils";

dotenv.config({ path: ".env.local" });

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: getEnvVar("DATABASE_URL"),
  },
} satisfies Config;
