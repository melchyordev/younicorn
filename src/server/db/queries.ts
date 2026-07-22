import type { D1Database } from "@cloudflare/workers-types";

import { getDb } from "./db";
import * as schema from "./schema";
import type { NewSubscriber } from "./schema";

export const insertSubscriber = async (database: D1Database, newSubscriber: NewSubscriber) => {
  const db = getDb(database);
  const [user] = await db.insert(schema.subscribers).values(newSubscriber).returning();
  return user;
};
