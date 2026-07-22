import { beforeEach, expect, it, mock } from "bun:test";

import type { D1Database } from "@cloudflare/workers-types";
import { reset } from "drizzle-seed";

import { insertSubscriber } from "@/server/db/queries";
import type { NewSubscriber } from "@/server/db/schema";
import * as schema from "@/server/db/schema";

import { getTestDb } from "./get-test-db";

beforeEach(async () => {
  const db = getTestDb();
  await reset(db, schema);
});

mock.module("../src/server/db/db.ts", () => {
  return {
    getDb: () => getTestDb(),
  };
});

it("insert a new subscriber", async () => {
  const newSubscriber: NewSubscriber = { email: "email@test.com" };
  const subscriber = await insertSubscriber({} as D1Database, newSubscriber);
  expect(subscriber.email).toBe(newSubscriber.email);
  expect(subscriber.id).toBeDefined();
  expect(subscriber.createdAt).toBeDefined();
});

it("errors on duplicate email", async () => {
  const newSubscriber: NewSubscriber = { email: "email@test.com" };
  await insertSubscriber({} as D1Database, newSubscriber);
  expect(insertSubscriber({} as D1Database, newSubscriber)).rejects.toThrow();
});

it("errors on invalid email", async () => {
  const newSubscriber: NewSubscriber = { email: "email@test" };
  expect(insertSubscriber({} as D1Database, newSubscriber)).rejects.toThrow();
});
