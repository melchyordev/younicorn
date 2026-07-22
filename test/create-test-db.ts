import { Database } from "bun:sqlite";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const createTestDb = async () => {
  const existing = Bun.file("test.sqlite");
  if (await existing.exists()) existing.delete();

  const sqlite = new Database("test.sqlite");
  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder: "./src/server/db/migrations" });
  console.log("Test DB created and migrations ran");
};

createTestDb();
